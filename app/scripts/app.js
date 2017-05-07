'use strict';

/**
 * @ngdoc overview
 * @name tripsBetaApp
 * @description
 * # tripsBetaApp
 *
 * Main module of the application.
 */
angular
  .module('tripsBetaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
