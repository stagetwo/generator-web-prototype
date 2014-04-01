// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
  // load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: {
      app: 'app'
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.app %>/index.html',
          '<%%= config.app %>/layouts/*.html',
          '<%%= config.app %>/partials/*.html',
          '<%%= config.app %>/pages/*.html'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%%= config.app %>'
          ]
        }
      }
    },
    bowerInstall: {
      app: {
        src: ['<%%= config.app %>/index.html'],
        ignorePath: '<%%= config.app %>/',
        exclude: ['<%%= config.app %>/bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },
  });

  // define Tasks
  grunt.registerTask('serve', ['connect:livereload', 'watch']);
};