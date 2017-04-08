(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: './resources/scripts/templates/categories.template.html',
      bindings: {
        items: '<'
      }
    });
})();
