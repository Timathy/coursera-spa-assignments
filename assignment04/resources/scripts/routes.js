(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url: '/',
      templateUrl: './resources/scripts/templates/home.template.html'
    }).state('categ', {
      url: '/categories',
      templateUrl: './resources/scripts/templates/categories.template.html',
      controller: 'CategoriesController as categ',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    }).state('categ.shortCateg', {
      url: '/{categoryShortName}/items',
      templateUrl: './resources/scripts/templates/items.template.html',
      controller: 'ShortCategoriesController as shortCateg',
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
