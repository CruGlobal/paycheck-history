'use strict';

(function () {
  angular.module('paycheckHistory', ['paycheckHistory.services', 'paycheckHistory.filters', 'paycheckHistory.directives'])
    .controller('DashboardController', ['$scope', 'SummaryLines', function (scope, SummaryLines) {
      scope.year = new Date().getFullYear();

      scope.summary = SummaryLines.fetch(scope);
    }]);
})();