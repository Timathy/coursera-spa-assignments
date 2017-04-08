(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ShortCategoriesController', ShortCategoriesController);

  ShortCategoriesController.$inject = ['items'];
  function ShortCategoriesController(items) {
    var shortCateg = this;

    shortCateg.items = items;
  }
})();
