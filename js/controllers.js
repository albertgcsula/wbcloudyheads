'use strict';

var cloudyHeadsApp = angular.module('cloudyHeadsApp.controllers', []);

var cartItems = [];

cloudyHeadsApp.controller('HomeCtrl', function ($scope) {
  $('body').addClass('home');
});

cloudyHeadsApp.controller('ProductCtrl', function ($scope) {
  $('body').addClass('product');
});

cloudyHeadsApp.controller('ProductDetailCtrl', function ($scope, $routeParams, $http) {
  $('body').addClass('product-detail');
  $scope.productId = $routeParams.productId;
  $scope.productType = $routeParams.productType;

  var jsonUrl = "json/" + $scope.productType + "-products.json";
  $http.get(jsonUrl).then(function(response) {
    $scope.product = response.data.products[$scope.productId];
  });

  // add to cart functionality
  var $cartStatus = $('#cartStatus');
  var $cartNav = $('#cartNav');
  var cartItem = {};
  $('#addCart').on('click', function() {
    $cartStatus.html('<p>Success! Your item has been added to cart!</p>');
    if ($('#customText').val() !== '') {
      $cartStatus.append('<p>Custom text added: ' + $('#customText').val() +'</p>');
    }

    if ($('input[name=optionsRadios]:checked').val() !== undefined) {
      $cartStatus.append('<p>Custom option added: ' + $('input[name=optionsRadios]:checked').val() +'</p>');
    }

    cartItem.id = $('#productId').val();
    cartItem.title = $('#productTitle').val();
    cartItem.description = $('#productDescription').val();
    cartItem.imageUrl = $('#productImage').val();

    cartItems.push(cartItem);

    $cartStatus.show();
    $cartNav.show();
  });
});

cloudyHeadsApp.controller('TeamCtrl', function ($scope) {
  $('body').addClass('team');
});

cloudyHeadsApp.controller('ShopCtrl', function ($scope, $http) {
  $('body').addClass('shop');

  var jsonUrl = getJsonUrl();
  $http.get(jsonUrl).then(function(response) {
    $scope.products = response.data.products;
  });
});

cloudyHeadsApp.controller('CartCtrl', function ($scope) {
  $('body').addClass('cart');
  $scope.cartItems = cartItems;

  if ($scope.cartItems.length > 0) {
    $('.checkout-section').show();
  }
});

var getJsonUrl = function () {
  var jsonUrl = "json/";

  if(window.location.href.indexOf('printable') > -1) {
    jsonUrl = "json/printable-products.json";
  } else {
    jsonUrl = "json/printed-products.json";
  }

  return jsonUrl;
};
