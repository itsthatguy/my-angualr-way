'use strict';

function NavbarCtrl($scope, $state) {
  $scope.$state = $state;
}

export default ['$scope', '$state', NavbarCtrl];
