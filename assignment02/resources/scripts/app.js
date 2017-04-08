(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
      var buyItem = this;

      // Set the text once everything is bought;
      // ng-if conditional statement is set on the html document
      buyItem.txt = 'EVERYTHING IS BOUGHT!';

      // Get the toBuy array and display the items
      buyItem.toBuy = ShoppingListCheckOffService.getBuyItems();

      // Increase the amount of quantity quantity and attach it
      // to a button
      buyItem.increaseItemQuantity = function (item) {
        ShoppingListCheckOffService.increaseQuantity(item);
      };

      // Decrease the amount of quantity and attach it
      // to a button
      buyItem.decreaseItemQuantity = function (item) {
        ShoppingListCheckOffService.decreaseQuantity(item);
      };

      // Add the items to the bought section
      buyItem.addToCart = function (item) {
        ShoppingListCheckOffService.addItem(item);

        // If the item quantity is greater or equal to zero
        // set the item quantity back to 0, once 'Buy' is clicked
        if (item.quantity >= 1) {
          item.quantity = 0;
        }
      };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var alreadyBought = this;

      // Set the text if the length of the bought array is 0;
      // ng-if conditional statement is set on the html document
      alreadyBought.txt = 'NOTHING BOUGHT YET!';

      // Get the bought array and display the items
      alreadyBought.bought = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var service, toBuy, bought;
      service = this;

      toBuy = [
        {
          name: 'The Witcher 3',
          quantity: 0
        },

        {
          name: 'Horizon Down',
          quantity: 0
        },

        {
          name: 'Mass Effect: Andromeda',
          quantity: 0
        },

        {
          name: 'Bioshock: Infinite',
          quantity: 0
        }
      ];

      bought = [];

      service.getBuyItems = function () {
        return toBuy;
      };

      // Increase the quantity
      service.increaseQuantity = function (item) {
        item.quantity += 1;
      };

      // Decrease the quantity and remove the item
      // once the user selects 0
      service.decreaseQuantity = function (item) {
        item.quantity -= 1;

        // If the item is less than or equal to zero,
        // remove the item from the list
        if (item.quantity <= 0) {
          item.quantity = 0;
          var itemIndex = toBuy.indexOf(item);

          if (itemIndex > -1) {
            toBuy.splice(itemIndex, 1);
          }
        }
      };

      // Add the items to the bought list
      service.addItem = function (item) {
        bought.push({
          name: item.name,
          quantity: item.quantity
        });
      };

      service.getBoughtItems = function () {
        return bought;
      };
    }
})();
