'use strict';

(function () {
  var mockServiceData = true;

  var paycheckHistoryServicesModule = angular.module('paycheckHistory.services', ['ngResource']);

  if (mockServiceData) {
    paycheckHistoryServicesModule
      .service('SummaryLines', ['EasyXdm', '$resource', '$q', function (EasyXdm, resource, q) {
        return {
          fetch: function (scope) {
            var deferred = q.defer();

            resource('testData.json').query(function (partners) {
              deferred.resolve(partners);
            });

            return deferred.promise;
          }
        }
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
            if (error.response && error.response.code == 404) {
              return null;
            }
            else {
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
      .service('SummaryLines', ['EasyXdm', 'EmployeeIds', function (EasyXdm, EmployeeIds) {
        return {
          fetchMine: function (scope) {
            var expensesPromise = EmployeeIds.then(function (employeeIds) {
              return EasyXdm.fetch(scope, '/wsapi/rest/staffAccount/transactionSummariesByMonth?reimbursementDetail=fine&salaryDetail=coarse&transactionType=expense&employeeIds=' + employeeIds[0]);
            });
            expensesPromise.then(null, function (error) {
              alert("Sorry, there was an error and your paycheck data could not be retrieved.");
            });

            return expensesPromise;
          }
        }
      }])
  }

})();