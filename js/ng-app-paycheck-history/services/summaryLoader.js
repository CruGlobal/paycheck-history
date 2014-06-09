'use strict';

(function () {
  var paycheckHistoryServicesModule = angular.module('paycheckHistory');

  if (mockServiceData) {
    paycheckHistoryServicesModule
      .service('SummaryLoader', ['$resource', '$q', function (resource, q) {
        return {
          load: function (scope, employeeId, year) {
            var deferred = q.defer();

            resource('test-data/summary-' + employeeId + '-' + year + '.json').query(function (summary) {
              deferred.resolve(summary);
            });

            return deferred.promise;
          }
        }
      }])
  }
  else {
    paycheckHistoryServicesModule
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
  }

})();