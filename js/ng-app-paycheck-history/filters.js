'use strict';

(function () {
  angular.module('paycheckHistory').
    filter('moment', function () {
      return function (date, format) {
        return moment(date).format(format);
      };
    }).
    filter('reverse', function() {
      return function(items) {
        if (typeof items === 'undefined')
          return null;
        return items.slice().reverse();
      };
    })
    .filter('sum', function () {
      return function(array, key) {
        return _.reduce(array, function(memo, num) { return memo + num[key]; }, 0);
      }
    })
  ;
})();


