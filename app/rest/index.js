(function ()
{
    'use strict';

    var userDAO = require('../dao/userDAO.service.js');

    function handlePost(request, response)
    {
        var user = request.body;
        response.status(200).send(userDAO.save(user));
    }

    module.exports = function (router)
    {
        router.route('/api/user').get(function (request, response)
        {
            response.status(200).send(userDAO.query());
        }).post(handlePost);
        router.route('/api/user/:id').get(function (request, response)
        {
            var user = userDAO.get(request.params.id);
            if (user) {
                response.status(200).send(user);
            } else {
                response.status(404).send();
            }
        }).post(handlePost);
    };
})();
