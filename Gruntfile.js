module.exports = function (grunt)
{

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

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
                            connect.static(config.app), require('grunt-connect-proxy/lib/utils').proxyRequest
                        ];
                    }
                }
            },
            proxies: [
                {
                    context: '/api', host: 'localhost', port: 3000
                }
            ]
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
        'configureProxies:server', 'connect:livereload', 'watch'
    ]);
};
