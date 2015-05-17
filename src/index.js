'use strict';

import Navbar from './components/navbar/navbar'; // jshint ignore:line
import Data   from './components/data/data';     // jshint ignore:line
import Main   from './main/main';                // jshint ignore:line

angular.module('MyModule',
  ['ngAnimate',
   'ngCookies',
   'ngTouch',
   'ngSanitize',
   'ngResource',
   'ui.router',
   'mm.foundation',
   'MyModule.Navbar',
   'MyModule.Data',
   'MyModule.Main']
)

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'main/main.html',
    controller: 'MainController'
  });

  $urlRouterProvider.otherwise('/');
});
