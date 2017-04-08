(function () {
  'use strict';

  angular.module('LunchApp', [])
    .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope'];
  function LunchController($scope) {
    $scope.msg = '';
    $scope.dishes = '';
    var msgElm = document.getElementById('msgElement');
    var successMsg = document.querySelector('.smsg-success');
    var errorMsg = document.querySelector('.smsg-error');

    $scope.displayText = function () {
      $scope.dishesShow = $scope.dishes;

      if ($scope.dishes === '') {
        $scope.msg = 'Please enter data first';

        errorMsg.style.display = 'block';
        errorMsg.style.border = '1px solid #e63f3f';
        msgElm.style.color = '#e63f3f';
      } else if ($scope.dishes.trim() !== '' && $scope.dishes !== null) {
        var dishesArray = $scope.dishes.split(',').length;

        if (dishesArray <= 3) {
          $scope.msg = 'Enjoy!';

          successMsg.style.display = 'block';
          successMsg.style.border = '1px solid #5cd259';
          msgElm.style.color = '#5cd259';

          $scope.dishes = '';
        } else if (dishesArray >= 4) {
          $scope.msg = 'Too much!';

          successMsg.style.display = 'block';
          successMsg.style.border = '1px solid #eb9531';
          msgElm.style.color = '#eb9531';

          $scope.dishes = '';
        }
      }
    };
  }
})();
