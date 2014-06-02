'use strict';

(function () {
  var mockServiceData = false;

  var paycheckHistoryServicesModule = angular.module('paycheckHistory');

  if (mockServiceData) {
    paycheckHistoryServicesModule
      .service('EmployeeIds', ['$q', function (q) {
        var deferred = q.defer();
        var testIds = ["123456789", "123456789S"];
        deferred.resolve(testIds);
        return deferred.promise;
      }])
      .service('SummaryLoader', ['$resource', '$q', function (resource, q) {
        return {
          load: function (scope, employeeId, year) {
            var deferred = q.defer();

            resource('test-data-summary-' + employeeId + '-' + year + '.json').query(function (summary) {
              deferred.resolve(summary);
            });

            return deferred.promise;
          }
        }
      }])
      .service('EmployeeLoader', ['$resource', '$q', function (resource, q) {
        return {
          load: function (employeeId) {
            var deferred = q.defer();

            resource('test-data-employee-' + employeeId + '.json').get(function (employee) {
              deferred.resolve(employee);
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
      .service('SummaryLoader', ['EasyXdm', function (EasyXdm) {
        return {
          load: function (scope, employeeId, year) {
            var summary = EasyXdm.fetch(scope, '/wsapi/rest/paycheck/summary?employeeId=' + employeeId + '&year=' + year);
            summary.then(null, function (error) {
              alert("Sorry, there was an error and your paycheck data could not be retrieved.");
            });

            return summary;
          }
        }
      }])
      .service('EmployeeLoader', ['$rootScope', 'EasyXdm', function ($rootScope, EasyXdm) {
        return {
          load: function (employeeId) {
            var employee = EasyXdm.fetch($rootScope, '/wsapi/rest/employees/' + employeeId);
            employee.then(null, function (error) {
              alert("Sorry, there was an error and your employee data could not be retrieved.");
            });

            return employee;
          }
        }
      }])
  }

})();