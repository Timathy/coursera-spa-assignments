(function () {
  'use strict';

  angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiURLPath', 'https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['$http', 'ApiURLPath'];
  function MenuDataService($http, ApiURLPath) {
    var service, urlCategories, urlShortCategories, reqCategories, reqShortCategories;
    service = this;

    urlCategories = (ApiURLPath + '/categories.json');
    urlShortCategories = (ApiURLPath + '/menu_items.json');

    reqCategories = {
      method: 'GET',
      url: urlCategories
    };

    service.getAllCategories = function () {
      return $http(reqCategories).then(function (res) {
        return res.data;
      });
    };

    service.getItemsForCategory = function (categoryShortName) {
      reqShortCategories = {
        method: 'GET',
        url: urlShortCategories,
        params: {
          category: categoryShortName
        }
      };

      return $http(reqShortCategories).then(function (res) {
        return res.data.menu_items;
      });
    };
  }
})();
