'use strict';

import NavbarController from './navbar.controller';
import NavbarDirective from './navbar.directive';

export default angular.module('MyModule.Navbar', [])
.directive('navbar', NavbarDirective)
.controller('NavbarController', NavbarController);
