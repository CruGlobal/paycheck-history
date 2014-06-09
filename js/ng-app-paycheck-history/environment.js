'use strict';

/**
 * Indicates whether the apps should use test data instead of getting data from WSAPI.
 * This is used by several of the services that load data.
 */
var mockServiceData = false;

(function () {
  angular.module('config')
    .constant('pshrUriBase', 'https://pshr.staging.ccci.org/psp/hcm9stg')
    .constant('wsapiUriBase', 'https://wsapi.cru.org')
  ;

})();