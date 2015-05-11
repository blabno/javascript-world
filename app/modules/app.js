angular.module('javaScriptWorld', ['ngRoute']).config(function ($routeProvider)
{
    $routeProvider.when('/', {
        templateUrl: 'modules/home/home.tpl.html',
        controller: 'home as home'
    });
    $routeProvider.otherwise({redirectTo: '/'});
});
