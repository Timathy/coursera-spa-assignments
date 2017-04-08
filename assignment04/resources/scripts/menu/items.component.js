(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: './resources/scripts/templates/items.template.html',
      bindings: {
        items: '<'
      }
    });
})();
