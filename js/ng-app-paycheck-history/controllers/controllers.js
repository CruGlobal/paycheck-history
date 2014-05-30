'use strict';

(function () {
  angular.module('paycheckHistory', ['paycheckHistory.services', 'paycheckHistory.filters', 'paycheckHistory.directives'])
    .controller('DashboardController', ['$scope', 'SummaryLines', 'EmployeeIds', function (scope, SummaryLines, EmployeeIds) {
      scope.year = new Date().getFullYear();

      scope.mySummary = EmployeeIds.then(function (employeeIds) {
        return SummaryLines.fetch(scope, employeeIds[0], scope.year);
      });

      scope.employeeIds = EmployeeIds;

      scope.spouseSummary = EmployeeIds.then(function (employeeIds) {
        if (employeeIds.length === 2)
          return SummaryLines.fetch(scope, employeeIds[1], scope.year);
        else
          return [];
      });

    }]);
})();