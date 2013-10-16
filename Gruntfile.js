'use strict';

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt, require('./package'));

    /*
     * Configuration
     */
    grunt.initConfig({
        // configurable paths
        yeoman: {
            home: 'web/index.html',
            src: 'web/src',
            assets: 'web/assets'
        },
        watch: {
            compass: {
                files: ['<%= yeoman.src %>/style/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.src %>/style/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'web/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.src %>}/js/{,*/}*.js',
                    '<%= yeoman.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
                        '.tmp',
                        '<%= yeoman.src %>',
                        '<%= yeoman.home %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.src %>',
                        '<%= yeoman.home %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    // base: '<%= yeoman.assets %>'
                    base: ['<%= yeoman.assets %>', '<%= yeoman.home %>']
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.assets %>/*'
                    ]
                }]
            },
            server: '.tmp'
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
                sassDir: '<%= yeoman.src %>/style',
                cssDir: '.tmp/style',
                // generatedImagesDir: '.tmp/images/generated',
                generatedImagesDir: '.tmp/images',
                imagesDir: '<%= yeoman.src %>/images',
                javascriptsDir: '<%= yeoman.src %>/js',
                fontsDir: '<%= yeoman.src %>/style/fonts',
                importPath: '<%= yeoman.src %>/bower-components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.assets %>/style/images'
                }
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
                    cwd: '.tmp/style/',
                    src: '{,*/}*.css',
                    dest: '.tmp/style/'
                }]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
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
        // useminPrepare: {
        //     options: {
        //         dest: '<%= yeoman.assets %>'
        //     },
        //     html: 'web/index.html'
        // },
        usemin: {
            options: {
                dirs: ['<%= yeoman.assets %>']
            },
            // html: ['<%= yeoman.assets %>/{,*/}*.html'],
            css: ['<%= yeoman.assets %>/style/{,*/}*.css']
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
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%= yeoman.assets %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= yeoman.src %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>',
                    src: '*.html',
                    dest: '<%= yeoman.assets %>'
                }]
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
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.src %>/style',
                dest: '.tmp/style/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            devFile: '<%= yeoman.src %>/bower-components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.assets %>/bower-components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.assets %>/js/{,*/}*.js',
                '<%= yeoman.assets %>/style/{,*/}*.css'/*,
                '!<%= yeoman.assets %>/scripts/vendor/*'*/
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'// ,
                // 'htmlmin'
            ]
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%= yeoman.src %>/js/main.js'
            }
        }
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
        // 'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'concat',
        'cssmin',
        'uglify',
        'modernizr',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};