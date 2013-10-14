module.exports = function(grunt) {
    /*
     * Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , requirejs: {
            compile: {
                options: {
                    baseUrl: 'src'
                    , name: 'main'
                    , out: 'assets'
                    , mainConfigFile: 'src/main.js'
                    , optimize: 'uglify'
                    , inlineText: true
                    //, excludeShallow: []
                }
            }
        }
        , stylus: {
            compile: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    //grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');
};