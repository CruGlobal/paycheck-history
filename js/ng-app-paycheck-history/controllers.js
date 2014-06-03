'use strict';

(function () {
  angular.module('paycheckHistory', ['ngResource'])
    .controller('DashboardController', ['$scope', 'SummaryLoader', 'EmployeeIds', 'EmployeeLoader', function (scope, SummaryLoader, EmployeeIds, EmployeeLoader) {
      scope.year = new Date().getFullYear();

      scope.employeeIds = EmployeeIds;

      scope.myEmployee = EmployeeIds.then(function (employeeIds) {
        var employee = EmployeeLoader.load(employeeIds[0]);
        if (employeeIds.length === 2)
          scope.spouseEmployee = EmployeeLoader.load(employeeIds[1]);
        return employee;
      });

      scope.myEmployee.then(function(employee){
        if (employee.payGroup !== "USS")
          window.alert("This page only works for full-time supported staff.")
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