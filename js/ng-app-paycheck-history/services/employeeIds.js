'use strict';

(function () {
  var paycheckHistoryServicesModule = angular.module('paycheckHistory');

  if (mockServiceData) {
    paycheckHistoryServicesModule
      .service('EmployeeIds', ['$q', function (q) {
        var deferred = q.defer();
        var testIds = ["123456789", "123456789S"];
        deferred.resolve(testIds);
        return deferred.promise;
      }])
  }
  else {
    paycheckHistoryServicesModule
      .service('EmployeeIds', ['EasyXdm', '$q', '$rootScope', function (EasyXdm, $q, $rootScope) {
        var myEmployeeId = EasyXdm.fetch($rootScope, '/wsapi/rest/authentication/my/employeeId');

        // TODO: is null the best way to represent 'there is no spouse id' ?
        var mySpouseEmployeeIdOrNull = EasyXdm.fetch($rootScope, '/wsapi/rest/authentication/my/spouse/employeeId').then(
          function (spouseId) {
            return spouseId;
          },
          function (error) {
            if (error.response && error.response.status == 404) {
              return null;
            }
            else {
              console.log('rejecting response: ', error.response)
              console.log('rejecting code: ' + error.response.status)
              return $q.reject(error);
            }
          }
        );

        var bothIds = $q.all([myEmployeeId, mySpouseEmployeeIdOrNull]).then(
          function (employeeIds) {
            return _.compact(employeeIds);
          }
        );

        $rootScope.employeeId = myEmployeeId;
        $rootScope.spouseEmployeeId = mySpouseEmployeeIdOrNull;

        return bothIds;
      }])
  }

})();