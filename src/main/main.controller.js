'use strict';

function MainCtrl($scope, DataService) {
  
  DataService.get('main').then(function(data) {
    $scope.title = data.title;
    $scope.subTitle = data.sub_title;
  });
}

export default ['$scope', 'DataService', MainCtrl];
