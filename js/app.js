'use strict';

angular.module('cloudyHeadsApp', [
  'ngRoute',
  'cloudyHeadsApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/product', {templateUrl: 'partials/product.html', controller: 'ProductCtrl'});
  $routeProvider.when('/product/:productType/:productId', {templateUrl: 'partials/shop/product-detail.html', controller: 'ProductDetailCtrl'});
  $routeProvider.when('/team', {templateUrl: 'partials/team.html', controller: 'TeamCtrl'});
  $routeProvider.when('/shop/printed', {templateUrl: 'partials/shop/printed.html', controller: 'ShopCtrl'});
  $routeProvider.when('/shop/printable', {templateUrl: 'partials/shop/printable.html', controller: 'ShopCtrl'});
  $routeProvider.when('/cart', {templateUrl: 'partials/shop/cart.html', controller: 'CartCtrl'});
  $routeProvider.when('/checkout', {templateUrl: 'partials/shop/checkout.html', controller: 'CheckoutCtrl'});
  $routeProvider.when('/nfc/:nfcId', {templateUrl: 'partials/shop/cart.html', controller: 'NfcCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
