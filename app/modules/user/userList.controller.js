angular.module('javaScriptWorld').controller('userList', function (userDAO)
{
    var ctrl = this;

    userDAO.query().$promise.then(function (result)
    {
        ctrl.users = result;
    });
});
