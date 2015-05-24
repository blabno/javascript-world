(function ()
{
    'use strict';

    var mongoose = require('mongoose-q')(require('mongoose'));
    var taskSchema = new mongoose.Schema({
        email: String,
        status: {
            type: String,
            enum: [
                'active', 'inactive'
            ]
        }

    }, {
        collection: 'user'
    });
    var Model = mongoose.model('user', taskSchema);

    function fromMongo(element)
    {
        if (element instanceof Array) {
            return element.map(fromMongo);
        }
        element._doc.id = element._doc._id;
        delete element._doc._id;
        delete element._doc.__v;
        return element._doc;
    }

    module.exports = {
        get: function (id)
        {
            return Model.findByIdQ(id).then(fromMongo);
        },
        query: function ()
        {
            return Model.findQ().then(fromMongo);
        },
        save: function (user)
        {
            if (!user.id) {
                return new Model(user).saveQ().then(fromMongo)
            } else {
                return Model.findByIdAndUpdateQ(user.id, user).then(fromMongo)
            }
        }
    }
})();
