'use strict';

var cloudyHeadsApp = angular.module('cloudyHeadsApp.controllers', []);

var cartItems = [];
var cartCount = 0;

cloudyHeadsApp.controller('HomeCtrl', function ($scope) {
  $('body').addClass('home');
  $('#jumbotron-logo-me').hide();
  $('#jumbotron-logo').css('display', 'block');
});

cloudyHeadsApp.controller('ProductCtrl', function ($scope) {
  $('body').addClass('product');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');
});

cloudyHeadsApp.controller('ProductDetailCtrl', function ($scope, $routeParams, $http) {
  $('body').addClass('product-detail');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');

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
    cartCount = cartItems.length;

    $cartStatus.show();
    $('#cart-amount').text(cartCount);
    $cartNav.show();
  });
});

cloudyHeadsApp.controller('TeamCtrl', function ($scope) {
  $('body').addClass('team');
  $('#jumbotron-logo-me').hide();
  $('#jumbotron-logo').css('display', 'block');
});

cloudyHeadsApp.controller('ShopCtrl', function ($scope, $http) {
  $('body').addClass('shop');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');

  var jsonUrl = getJsonUrl();
  $http.get(jsonUrl).then(function(response) {
    $scope.products = response.data.products;
  });
});

cloudyHeadsApp.controller('CartCtrl', function ($scope) {
  $('body').addClass('cart');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');

  $scope.cartItems = cartItems;

  if ($scope.cartItems.length > 0) {
    $('.checkout-section').show();
  }

  $('#checkoutNext').on('click', function() {
    window.location = 'http://wbcloudyheads.com/#/checkout';
  });
});

cloudyHeadsApp.controller('CheckoutCtrl', function ($scope) {
  $('body').addClass('cart');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');

  $('#checkoutButton').on('click', function() {
    $('#checkoutAlert').show();
  });
});

cloudyHeadsApp.controller('NfcCtrl', function ($scope, $routeParams, $http) {
  $('body').addClass('cart');
  $('#jumbotron-logo').hide();
  $('#jumbotron-logo-me').css('display', 'block');

  $scope.nfcId = $routeParams.nfcId;

  var jsonUrl = "json/nfc-products.json";
  $http.get(jsonUrl).then(function(response) {
    $scope.product = response.data.products[$scope.nfcId];
    cartItems.push($scope.product);
    cartCount = cartItems.length;

    $scope.cartItems = cartItems;
    if ($scope.cartItems.length > 0) {
      $('.checkout-section').show();
      $('#cart-amount').text(cartCount);
      $('#cartNav').show();
    }
  });
});

var getJsonUrl = function () {
  var jsonUrl = "json/";

  if (window.location.href.indexOf('printable') > -1) {
    jsonUrl = "json/printable-products.json";
  } else if (window.location.href.indexOf('nfc') > -1) {
    jsonUrl = "json/nfc-products.json";
  } else {
    jsonUrl = "json/printed-products.json";
  }

  return jsonUrl;
};
