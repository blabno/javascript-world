angular.module('javaScriptWorld').controller('userDetails', function ($location, $routeParams, userDAO)
{
    var ctrl = this;

    this.save = function ()
    {
        userDAO.save(this.user).$promise.then(function ()
        {
            $location.path('/users');
        });
    };

    userDAO.get({id: $routeParams.id}).$promise.then(function (result)
    {
        ctrl.user = result;
    });

});
