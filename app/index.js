(function ()
{
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var app = express();
    app.use(bodyParser.json());

    mongoose.connect('mongodb://localhost/javascript-world');
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function ()
    {
        mongoose.connection.close(function ()
        {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    require('./rest/index.js')(app);
    app.listen(process.env.PORT || 3000);

    module.exports = app;
})();
