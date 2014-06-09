'use strict';

(function () {
  angular.module('paycheckHistory')
    .filter('sum', function () {
      return function(array, key) {
        return _.reduce(array, function(memo, num) { return memo + num[key]; }, 0);
      }
    });
})();


