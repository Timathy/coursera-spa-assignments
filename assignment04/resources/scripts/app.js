(function () {
  'use strict';

  var app = angular.module('NarrowItDownApp', []);

  app.controller('NarrowItDownController', NarrowItDownController);
  app.service('MenuSearchService', MenuSearchService);
  app.directive('foundItems', FoundItems);
  app.directive('loader', Loader);
  app.constant('ApiURLPath', "http://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  MenuSearchService.$inject = ['$http', 'ApiURLPath'];

  function Loader() {
    var ddo = {
      templateUrl: './loader/loader.template.html'
    };

    return ddo;
  }

  function FoundItems() {
    var ddo = {
      templateUrl: 'menu.html',
      restrict: 'AE',
      scope: {
        items: '<',
        message: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'found',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var found = this;

    found.nothingFoundMsg = '';

    found.nothingFound = function () {
      // If the array is empty, or if the input doesn't contain
      // such items, display the message 'Nothing found!'
      if (found.items.length === 0 || found.items === '') {
        return found.message;
      }
    };
  }

  function MenuSearchService($http, ApiURLPath, CacheHttp) {
    var service, req, res, url;
    service = this;

    // Get the menu items
    url = (ApiURLPath + '/menu_items.json');

    // Set the request object for $http
    req = {
      method: 'GET',
      url: url
    };

    service.getMatchedMenuItems = function (searchTerm) {
      res = $http(req).then(function (response) {
        // If the input is not empty, execute the code
        if (searchTerm !== '') {
          // Get the menu items
          var menuItems = response.data.menu_items;
          var foundItems = [];

          // Loop through each item in the json object
          for (var i = 0; i < menuItems.length; i++) {
            // Return the result that most corresponds to search input
            if (menuItems[i].description.indexOf(searchTerm) !== -1) {
              // Push the result to the foundItems array
              foundItems.push(menuItems[i]);
            }
          }

          return foundItems;
        } else { // Else return an empty array
          return [];
        }
      }).catch(function (err) {
        console.log(err.status, err.message);
      });

      return res;
    };
  }

  function NarrowItDownController(MenuSearchService) {
    var menu, promise;
    menu = this;

    // Set found to an empty array so that we can manipulate it
    menu.found = [];

    menu.search = function (searchTerm) {
      promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      // Set the loading gif
      menu.loading = true;

      promise.then(function (res) {
        // Display the items that were looped through
        menu.found = res;

        // Set it to false, once an item has been retrieved
        menu.loading = false;

        // If the length is 0, display the message
        if (menu.found.length === 0) {
          menu.message = 'Nothing found!';
        }
      }).catch(function (err) {
        menu.loading = false;
        console.log(err.status, err.message);
      });
    };

    // Remove an item from the found array
    menu.removeItem = function (index) {
      menu.found.splice(index, 1);
    };
  }
})();
