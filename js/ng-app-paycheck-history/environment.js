'use strict';

/**
 * Indicates whether the apps should use test data instead of getting data from WSAPI.
 * This is used by several of the services that load data.
 */
var mockServiceData = false;

(function () {
  angular.module('paycheckHistory')
   .constant('pshrUriBase', 'https://pshrstage.cru.org/psc/hcm92s')
    .constant('wsapiUriBase', 'https://wsapi-stage.cru.org')
  ;

})();
