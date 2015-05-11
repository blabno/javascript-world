angular.module('javaScriptWorld', ['ngRoute', 'ngResource']).config(function ($routeProvider)
{
    $routeProvider.when('/', {
        templateUrl: 'modules/home/home.tpl.html',
        controller: 'home as home'
    });
    $routeProvider.when('/users', {
        templateUrl: 'modules/user/userList.tpl.html',
        controller: 'userList as userList'
    });
    $routeProvider.when('/user/:id', {
        templateUrl: 'modules/user/userDetails.tpl.html',
        controller: 'userDetails as userDetails'
    });
    $routeProvider.otherwise({redirectTo: '/'});
});
