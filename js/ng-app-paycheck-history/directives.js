'use strict';

(function () {
  angular.module('paycheckHistory').
    directive('yearSummary',function () {
      return {
        restrict: 'E',
        scope:{
          summary:'=',
          /* it is rather dumb to have to pass this in. But:
           * 1. if we use 'summary' in ng-show, it will keep showing the loading message if the list is empty.
           * 2. if I try to use 'summary' in a link function or a controller, it gets passed in as 'undefined'.
           * I don't understand why.
           *
           * So this works around the problem by giving the responsibility to the client of this directive.
           */
          summaryLoaded:'=loaded',
          renderLink: '=',
          owner: '='
        },
        replace: true,
        templateUrl: 'js/ng-app-paycheck-history/templates/year-summary.html',
        link: function(scope) {

          //TODO: find a better place to store this
          var pshrBase = "https://pshr.staging.ccci.org/psp/hcm9stg";
          scope.paystubLink = pshrBase + "/EMPLOYEE/HRMS/c/ROLE_EMPLOYEE.PY_IC_PAY_INQ.GBL"
        }
      }
    });
})();