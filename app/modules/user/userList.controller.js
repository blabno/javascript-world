angular.module('javaScriptWorld').controller('userList', function ()
{
    this.users = [
        {
            id: 1,
            email: 'bernard.labno@pjwstk.edu.pl',
            status: 'active'
        },
        {
            id: 2,
            email: 's4237@pjwstk.edu.pl',
            status: 'inactive'
        }
    ];
});
