angular.module('javaScriptWorld').service('userDAO', function ($resource)
{

    return $resource('/api/user/:id', {id: '@id'});
});
