'use strict';

(function () {
  angular.module('paycheckHistory', ['paycheckHistory.services', 'paycheckHistory.filters'])
    .controller('DashboardController', ['$scope', 'SummaryLines', function (scope, SummaryLines) {
      scope.year = new Date().getFullYear();

      scope.summaries = SummaryLines.fetch(scope);
    }]);
})();