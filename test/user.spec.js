describe('user.endpoint', function ()
{
    'use strict';
    var supertest = require('supertest')('http://localhost:3000');
    var testHelper = require('./testHelper');

    beforeEach(function (done)
    {
        testHelper.openDBConnection();
        testHelper.seedUsers([
                    {email: 'test', status: 'active'}
                ]).then(function ()
                {
                    done();
                });
    });
    afterEach(function (done)
    {
        testHelper.closeDBConnection(done);
    });
    describe('when user NOT exist in DB', function ()
    {
        it('should get response 404', function (done)
        {
            supertest.get('/api/user/123').set('Content-type', 'application/json').send().expect(404).expect({}).end(done);
        });
    });
    describe('query', function ()
    {
        it('should get array of results', function (done)
        {
            supertest.get('/api/user').set('Content-type', 'application/json').send().expect(function (response)
            {
                var expected = [
                    {email: 'test', status: 'active'}
                ];
                if (!testHelper.isEquals(expected, response.body, ['id'])) {
                    throw new Error('Expected:\n' + JSON.stringify(expected) + '\n, but got\n' + JSON.stringify(response.body));
                } else {
                    return null;
                }
            }).end(done);
        });
    });

});
