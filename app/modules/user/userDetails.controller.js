angular.module('javaScriptWorld').controller('userDetails', function ($routeParams)
{
    var users = {
        1: {
            id: 1,
            email: 'bernard.labno@pjwstk.edu.pl',
            status: 'active'
        },
        2: {
            id: 2,
            email: 's4237@pjwstk.edu.pl',
            status: 'inactive'
        }
    };

    this.user = users[$routeParams.id];

    this.save = function ()
    {
        alert('User saved:' + JSON.stringify(this.user, null, '  '));
    }

});
