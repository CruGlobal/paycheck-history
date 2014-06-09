'use strict';

(function () {

  var paycheckHistoryServicesModule = angular.module('paycheckHistory');

  if (mockServiceData) {
    paycheckHistoryServicesModule
      .service('EmployeeLoader', ['$resource', '$q', function (resource, q) {
        return {
          load: function (employeeId) {
            var deferred = q.defer();

            resource('test-data/employee-' + employeeId + '.json').get(function (employee) {
              deferred.resolve(employee);
            });

            return deferred.promise;
          }
        }
      }])
  }
  else {
    paycheckHistoryServicesModule
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