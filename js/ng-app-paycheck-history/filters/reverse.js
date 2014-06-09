'use strict';

(function () {
  angular.module('paycheckHistory')
    .filter('reverse', function() {
      return function(items) {
        if (typeof items === 'undefined')
          return null;
        return items.slice().reverse();
      };
    });
})();


