module.exports = function (grunt)
{

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    function createBackendMock()
    {
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

        function handleUserPost(request, response)
        {
            var match = request._parsedUrl.path.match('/api/user/(\\d*)');
            response.writeHead(200, {'Content-Type': 'application/json'});
            request.on('data', function (data)
            {
                var user = JSON.parse(data.toString());
                if (users[user.id]) {
                    users[user.id].email = user.email;
                    users[user.id].status = user.status;
                } else {
                    if (!user.id) {
                        user.id = userIdSequence++;
                    }
                    users[user.id] = user;
                }
                response.end(JSON.stringify(users[user.id]));
            });
        }

        function handlUserGet(request, response)
        {
            var match = request._parsedUrl.path.match('/api/user/(\\d+)');
            if (match) {
                if (users[match[1]]) {
                    response.end(JSON.stringify(users[match[1]]));
                } else {
                    response.writeHead(404);
                    response.end();
                }
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                var userList = [];
                for (var key in users) {
                    userList.push(users[key]);
                }
                response.end(JSON.stringify(userList));
            }
        }

        return function (request, response, next)
        {
            if (request._parsedUrl.path.match('/api/user(/\\d+)?')) {
                if ('POST' === request.method) {
                    handleUserPost(request, response);
                } else if ('GET' === request.method) {
                    handlUserGet(request, response);
                }
            }
            next();
        }
    }

    var config = {
        app: './app'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/**/*.js', '<%= config.app %>/**/*.html'
                ]
            }
        },
        connect: {
            options: {
                port: grunt.option('frontend-port') || 9000,
                hostname: grunt.option('frontend-url') || 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect)
                    {
                        return [
                            connect.static(config.app), createBackendMock()
                        ];
                    }
                }
            },
            distPreview: {
                options: {
                    open: true,
                    middleware: function (connect)
                    {
                        return [
                            connect.static(config.dist), require('grunt-connect-proxy/lib/utils').proxyRequest
                        ];
                    }
                }
            }
        },
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                exclude: [],
                ignorePath: '<%= config.app %>/'
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', [
        'connect:livereload', 'watch'
    ]);
};
