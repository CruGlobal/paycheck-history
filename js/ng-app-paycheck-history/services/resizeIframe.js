'use strict';

(function () {
  angular.module('paycheckHistory')
    .service('ResizeIframe', ['$document', function ($document) {
      return {
        resizeIframe: function () {
          var height = $document.find("html")[0].scrollHeight;
          parent.postMessage(["setHeight", height], "*");
        }
      }
    }])
})();
