var biInterface = angular.module('biInterface', ['ngResource', 'ngTable']);

biInterface.config(function($routeProvider) {

  $routeProvider.
      when('/dashboard', {
      	controller: 'DashboardCtrl',
        templateUrl: '/js/views/dashboard.html'
      }).
      when('/layout', {
		controller: 'LayoutCtrl',
        templateUrl: '/js/views/layout.html'
      }).
      when('/graph', {
  	    controller: 'GraphCtrl',
        templateUrl: '/js/views/graph.html'
      }).
      when('/connection', {
      	controller: 'ConnectionCtrl',
        templateUrl: '/js/views/connection.html'
      }).
      otherwise({redirectTo: '/dashboard'});
});