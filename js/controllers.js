'use strict';

var cloudyHeadsApp = angular.module('cloudyHeadsApp.controllers', []);

cloudyHeadsApp.controller('HomeCtrl', function ($scope) {
  $('body').addClass('home');
});

cloudyHeadsApp.controller('ProductCtrl', function ($scope) {
  $('body').addClass('product');
});

cloudyHeadsApp.controller('ProductDetailCtrl', function ($scope, $routeParams, $http) {
  $('body').addClass('product-detail');
  $scope.productId = $routeParams.productId;

  var jsonUrl = getJsonUrl();
  $http.get(jsonUrl).then(function(response) {
    $scope.product = response.data.products[$scope.productId];
  });
});

cloudyHeadsApp.controller('TeamCtrl', function ($scope) {
  console.log('Team Page Controller');
});

cloudyHeadsApp.controller('ShopCtrl', function ($scope, $http) {
  $('body').addClass('shop');
  var jsonUrl = getJsonUrl();
  $http.get(jsonUrl).then(function(response) {
    $scope.products = response.data.products;
  });
});

var getJsonUrl = function () {
  var jsonUrl = "json/";

  if(window.location.href .indexOf('printable') > -1) {
    jsonUrl = "json/printable-products.json";
  } else {
    jsonUrl = "json/printed-products.json";
  }

  return jsonUrl;
};
