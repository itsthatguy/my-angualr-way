'use strict';

function DataService($http) {
  return {
    get: function(filename){
      return $http.get('data/' + filename + '.json')
      .then(function(res){
        return res.data;
      });
    }
  };
}

export default ['$http', DataService];
