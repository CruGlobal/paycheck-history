'use strict';

/**
 * Indicates whether the apps should use test data instead of getting data from WSAPI.
 * This is used in services.js.
 */
var mockServiceData = false;

(function () {
  angular.module('config')
    .constant('pshrUriBase', 'https://pshr.staging.ccci.org/psp/hcm9stg')
    .constant('wsapiUriBase', 'http://hart-a321.net.ccci.org:8680')
  ;

})();