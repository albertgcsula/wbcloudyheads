'use strict';

angular.module('cloudyHeadsApp', [
  'ngRoute',
  'cloudyHeadsApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html',controller: 'HomeCtrl'});
  $routeProvider.when('/product', {templateUrl: 'partials/product.html',controller: 'ProductCtrl'});
  $routeProvider.when('/team', {templateUrl: 'partials/team.html',controller: 'TeamCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);