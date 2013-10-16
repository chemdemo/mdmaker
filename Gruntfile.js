'use strict';

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    /*
     * Configuration
     */
    grunt.initConfig({
        // configurable paths
        yeoman: {
            pub: 'web',
            src: 'web/src',
            assets: 'web/assets'
        },
        watch: {
            options: {
                interrupt: true
            },
            compass: {
                files: ['<%= yeoman.src %>/style/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            // styles: {
            //     files: ['<%= yeoman.src %>/style/{,*/}*.css'],
            //     tasks: [/*'copy:styles', 'autoprefixer'*/]
            // },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'web/*.html',
                    '<%= yeoman.src %>/style/{,*/}*.{scss,sass}',
                    '<%= yeoman.src %>/js/{,*/}*.js',
                    '<%= yeoman.src %>/style/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= yeoman.src %>',
                        'web'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        'test',
                        '<%= yeoman.src %>',
                        'web'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    // base: '<%= yeoman.assets %>'
                    base: ['<%= yeoman.assets %>', 'web']
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.assets %>/*'
                    ]
                }]
            },
            server: ['<%= yeoman.src %>/style/{,*/}*.css']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.src %>/js/{,*/}*.js',
                // '!<%= yeoman.src %>/xxx/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                //config: 'web/compass.rb',
                //banner: '<%= pkg.description %>',
                sassDir: '<%= yeoman.src %>/style',
                cssDir: '<%= yeoman.src %>/style',
                // generatedImagesDir: '<%= yeoman.src %>/images/generated',
                // generatedImagesDir: '<%= yeoman.src %>/images',
                // imagesDir: '<%= yeoman.src %>/images',
                // javascriptsDir: '<%= yeoman.src %>/js',
                // fontsDir: '<%= yeoman.src %>/style/fonts',
                // importPath: [
                //     'lib/jquery-ui/css/no-theme/jquery-ui-1.10.3.custom.css',
                //     'lib/jquery-layout/layout-default-latest.css',
                //     '<%= yeoman.src %>/bower-components'
                // ],
                // httpImagesPath: '/style/images',
                // httpGeneratedImagesPath: '/style/images',
                // httpFontsPath: '/styles/fonts',
                outputStyle: 'compressed',
                force: true,
                assetCacheBuster: false,
                relativeAssets: false
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/style/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.src %>/style/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= yeoman.src %>',
                    name: 'main',
                    out: '<%= yeoman.assets %>',
                    mainConfigFile: '<%= yeoman.src %>/js/main.js',
                    optimize: 'uglify',
                    inlineText: true,
                    wrap: true
                    //excludeShallow: []
                }
            }
        },
        'str-replace': {
            manifest: {
                files: {'<%=  yeoman.pub %>/res.manifest': '<%=  yeoman.pub %>/res.manifest'},
                options: {
                    replacements: [
                        {
                            pattern: /(#Date ).*/,
                            replacement: '$1<%= grunt.template.today() %>'
                        },
                        {
                            pattern: /(#CacheStart\n)[\s\S]*(\n#CacheEnd)/,
                            replacement: '$1<%= cacheList %>$2'
                        }
                    ]
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.assets %>/js/{,*/}*.js',
                        '<%= yeoman.assets %>/style/{,*/}*.css',
                        '<%= yeoman.assets %>/style/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.assets %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/style/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.assets %>/style/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/style/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.assets %>/style/images'
                }]
            }
        },
        cssmin: {
            options: {
                banner: '<%= pkg.description %>',
                report: 'gzip'
            },
            dist: {
                expand: true,
                cwd: '<%= yeoman.src %>/style',
                src: ['*.css'],
                dest: '<%= yeoman.assets %>/styles/',
                ext: '.css'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.assets %>',
                    src: [
                        '*.{ico,png,gif,jpg}',
                        'style/images/{,*/}*.{webp,gif}',
                        'style/fonts/{,*/}*.*',
                        'bower-components/sass-bootstrap/fonts/*.*'
                    ]
                }]
            },
            // styles: {
            //     expand: true,
            //     dot: true,
            //     cwd: '<%= yeoman.src %>/style',
            //     dest: '<%= yeoman.src %>/style/',
            //     src: '{,*/}*.css'
            // }
        },
        modernizr: {
            devFile: '<%= yeoman.src %>/bower-components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.assets %>/js/modernizr/modernizr.js',
            files: [
                '<%= yeoman.assets %>/js/{,*/}*.js',
                '<%= yeoman.assets %>/style/{,*/}*.css'/*,
                '!<%= yeoman.assets %>/scripts/vendor/*'*/
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'compass'
            ],
            test: [
                //'copy:styles'
            ],
            dist: [
                'compass',
                //'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        bower: {
            options: {
                // exclude: ['modernizr'],
                // baseUrl: '<%= yeoman.src %>'
            },
            all: {
                rjsConfig: '<%= yeoman.src %>/js/main.js'
            }
        }
    });

    grunt.registerTask('gen-cache-list', function() {
        var r = [];
        grunt.util.recurse(arguments, function(arsg) {
            grunt.log.writeln('List res: ' + arg);
            grunt.file.recurse(arg, function(path) {
                r.push(path.replace('^' + new RegExp(grunt.config.yeoman.get('app')) + '\\/', ''));
            });
        });
        grunt.config.set('cacheList', r.join('\n'));
    });

    // see : https://github.com/benweet/stackedit
    grunt.registerTask('gen-cache', function() {
        var pub = grunt.config.yeoman.pub;
        var resFolderList = [
            pub + '/assets',
            pub + 'lib/MathJax/extensions',
            pub + 'lib/MathJax/fonts/HTML-CSS/TeX/woff',
            pub + 'lib/MathJax/jax/output/HTML-CSS/fonts/TeX',
            pub + 'lib/MathJax/jax/output/HTML-CSS/fonts/STIX'
        ];
        grunt.task.run('gen-cache-list:' + resFolderList.join(':'));
        grunt.task.run('str-replace:manifest');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'concat',
        'cssmin',
        'uglify',
        'modernizr',
        'copy:dist',
        'rev'
    ]);

    grunt.registerTask('default', [
        //'jshint',
        //'test',
        //'build'
    ]);
};