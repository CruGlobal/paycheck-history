'use strict';

(function () {
  angular.module('paycheckHistory')
    .filter('moment', function () {
      return function (date, format) {
        return moment(date).format(format);
      };
    });
})();


