'use strict';

/**
 * The purpose of this service is to do cross-domain communication with wsapi, using easyXDM
 * (see http://easyxdm.net )
 *
 * It also has logic for handling authorization with wsapi, which uses Relay.
 * It assumes the user has signed in to Relay prior to requesting this page.
 *
 * In the future, it'd be good to separate out the cross-domain stuff from the wsapi/auth stuff.
 * It may also be good to use https://github.com/jpillora/xdomain instead of easyXDM.
 *
 * This file is copy/pasted from the MPGA project.
 */
(function () {
  angular.module('paycheckHistory')
    .service('EasyXdm', ['$q', '$cacheFactory', 'wsapiUriBase', function ($q, $cacheFactory, wsapiUriBase) {

      var xhr;

      reloadXhr();

      /**
       * as a side effect, this re-requests (if necessary) a new ticket from CAS, since the iframe url
       * is protected by the cas filter.
       */
      function reloadXhr() {
        var corsUrl = wsapiUriBase + '/wsapi/easyXDM/cors/';
        xhr = new easyXDM.Rpc({
          remote: corsUrl
        }, {
          remote: {
            request: {} // request is exposed by /cors/
          }
        });
      }

      var cache = $cacheFactory('EasyXdm-Cache');

      return {
        fetch: function (scope, pathAndQueryString) {
          var deferred = $q.defer();

          var url = wsapiUriBase + pathAndQueryString;

          function handleSuccessfulResponse(response) {
            var data = response.data;
            var contentType = response.headers["Content-Type"];
            var resolution;
            if (contentType == 'plain/text')
              resolution = data;
            else {
              resolution = angular.fromJson(data);
            }
            deferred.resolve(resolution);
            cache.put(pathAndQueryString, resolution);
          }

          function handleFailedRequest(response) {
            log("request to " + url + " failed.");
            var message;
            if (response) {
              log(response);
              message = "Request failed; response code is " + response.status + " when calling " + url;
            }
            else {
              message = "Request failed; no response given";
            }
            var error = {
              message: message,
              response: response,
              url: url
            };

            deferred.reject(error);
          }

          function sendRequestToUrl(retryOnUnauthorized) {
            xhr.request({
              url: url,
              method: "GET"
            }, function (response) {
              scope.$apply(function () {
                if (response.status == 200) {
                  handleSuccessfulResponse(response);
                }
                else {
                  //TODO: what to do here?
                  handleFailedRequest(response);
                }
              });
            }, function (errorPayload) {
              scope.$apply(function () {
                var response = errorPayload.data;
                if (retryOnUnauthorized && response != undefined && response.status == 401) {
                  handleNotAuthorizedResponse();
                }
                else {
                  handleFailedRequest(response);
                }
              });
            });
          }

          function handleNotAuthorizedResponse() {
            reloadXhr();

            var loggedInWithCookie = xhr.request({
              url: "/wsapi/rest/authentication/loggedInWithCookie",
              method: "GET"
            }, function (response) {
              if (response.data === "true") {
                sendRequestToUrl(false);
              }
              else {
                alert(
                    "We're sorry -- it appears you are not logged in.  This could be because your Cru session was" +
                        " ended, or because your browser is not keeping cookies the way we need it to.  When you" +
                        " click 'Ok', this page will attempt to re-verify your login, which may fix the issue.  If" +
                        " you get this message again, however, please switch to Chrome as your browser for this report.  If" +
                        " that doesn't resolve the problem, please contact techhelp@cru.org.  Again, sorry for the trouble!");
                deferred.reject("User is not logged in");
                window.top.location.reload();
              }
            }, function (errorPayload) {
              var message = errorPayload.message;
              var response = errorPayload.data;
              log("unable to check if logged in: " + message);
              log(response);
              deferred.reject("Unable to check if logged in; response code " + response.status);
            });
          }

          if (cache.get(pathAndQueryString) == undefined) {
            sendRequestToUrl(true);
          }
          else {
            var resolution = cache.get(pathAndQueryString);
            deferred.resolve(resolution);
          }

          return deferred.promise;
        }
      };
    }]);
})();