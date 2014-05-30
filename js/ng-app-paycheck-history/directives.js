'use strict';

(function () {
  angular.module('paycheckHistory').
    directive('yearSummary',function () {
      return {
        restrict: 'E',
        scope:{
          summary:'=',
          renderLink: '=',
          ownerPossessive: '=whose'
        },
        replace: true,
        templateUrl: 'js/ng-app-paycheck-history/templates/year-summary.html'
      }
    });
})();