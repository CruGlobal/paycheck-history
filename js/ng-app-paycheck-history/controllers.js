'use strict';

(function () {
  angular.module('paycheckHistory', ['ngResource'])
    .controller('DashboardController', ['$scope', 'SummaryLoader', 'EmployeeIds', function (scope, SummaryLoader, EmployeeIds) {
      scope.year = new Date().getFullYear();

      scope.employeeIds = EmployeeIds;

      scope.$watch('year', function() {
        scope.mySummary = EmployeeIds.then(function (employeeIds) {
          return SummaryLoader.load(scope, employeeIds[0], scope.year);
        });

        scope.spouseSummary = EmployeeIds.then(function (employeeIds) {
          if (employeeIds.length === 2)
            return SummaryLoader.load(scope, employeeIds[1], scope.year);
          else
            return [];
        });
      });

    }]);

})();