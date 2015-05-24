(function ()
{
    'use strict';

    var userDAO = require('../dao/userDAO.service.js');

    function handlePost(request, response)
    {
        var user = request.body;
        userDAO.save(user).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function (error)
                {
                    console.error(error);
                });
    }

    module.exports = function (router)
    {
        router.route('/api/user').get(function (request, response)
        {
            userDAO.query().then(function (result)
            {
                response.status(200).send(result);
            });
        }).post(handlePost);
        router.route('/api/user/:id').get(function (request, response)
        {
            userDAO.get(request.params.id).then(function (result)
            {
                response.status(200).send(result);
            }).catch(function (error)
                    {
                        console.log(error);
                        response.status(404).send();
                    });
        }).post(handlePost);
    };
})();
