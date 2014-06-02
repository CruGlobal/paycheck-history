'use strict';

(function () {
  angular.module('paycheckHistory', ['ngResource'])
    .controller('DashboardController', ['$scope', 'SummaryLoader', 'EmployeeIds', 'EmployeeLoader', function (scope, SummaryLoader, EmployeeIds, EmployeeLoader) {
      scope.year = new Date().getFullYear();

      scope.employeeIds = EmployeeIds;

      EmployeeIds.then(function (employeeIds) {
        scope.myEmployee = EmployeeLoader.load(employeeIds[0]);
        if (employeeIds.length === 2)
          scope.spouseEmployee = EmployeeLoader.load(employeeIds[1]);
      });

      scope.$watch('year', function() {
        scope.mySummary = EmployeeIds.then(function (employeeIds) {
          return SummaryLoader.load(scope, employeeIds[0], scope.year);
        });
        scope.mySummaryLoaded = scope.mySummary.then(function(mySummary){
          return true;
        });

        scope.spouseSummary = EmployeeIds.then(function (employeeIds) {
          if (employeeIds.length === 2) {
            var spouseSummary = SummaryLoader.load(scope, employeeIds[1], scope.year);
            scope.spouseSummaryLoaded = spouseSummary.then(function(mySummary){
              return true;
            });
            return spouseSummary;
          }
          else {
            return [];
          }
        });
      });

    }]);

})();