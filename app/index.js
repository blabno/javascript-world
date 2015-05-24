(function ()
{
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    app.use(bodyParser.json());

    require('./rest/index.js')(app);
    app.listen(process.env.PORT || 3000);

    module.exports = app;
})();
