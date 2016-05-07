'use strict';

angular.module('cloudyHeadsApp', [
  'ngRoute',
  'cloudyHeadsApp.about'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);