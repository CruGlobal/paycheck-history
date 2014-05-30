'use strict';

/* Filters */
(function () {
  angular.module('paycheckHistory.filters', []).
    filter('moment', function () {
      return function (date, format) {
        return moment(date).format(format);
      };
    }).
    filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    })
  ;
})();


