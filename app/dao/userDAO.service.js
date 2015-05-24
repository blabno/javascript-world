(function ()
{
    'use strict';

    var userIdSequence = 3;
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

    module.exports = {
        get: function (id)
        {
            return users[id];
        },
        query: function ()
        {
            var userList = [];
            for (var key in users) {
                userList.push(users[key]);
            }
            return userList;
        },
        save: function (user)
        {
            if (users[user.id]) {
                users[user.id].email = user.email;
                users[user.id].status = user.status;
            } else {
                if (!user.id) {
                    user.id = userIdSequence++;
                }
                users[user.id] = user;
            }
            return users[user.id];
        }
    }
})();
