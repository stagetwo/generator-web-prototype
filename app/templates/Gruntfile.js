// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
  // load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // load npm tasks
  grunt.loadNpmTasks('grunt-stencil');

  // configure grunt
  grunt.initConfig({
    config: {
      app: 'app'
    },
    watch: {
      stencil: {
        files: [
          '<%= yeoman.app %>/pages/{,*/}*.dot.html',
          '<%= yeoman.app %>/layouts/{,*/}*.dot.html',
          '<%= yeoman.app %>/partials/{,*/}*.dot.html'
        ],
        tasks: ['stencil']
      },
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
    stencil: {
      main: {
        options: {
          env: {
            title: "Stencil",
          },
          partials: '<%%= config.app %>/partials',
          templates: '<%%= config.app %>/layouts',
          dot_template_settings: { 
            strip: false,
          },
        },
        files: [
          {
            expand: true,
            cwd: "<%%= config.app %>/pages",
            src: "**/*.dot.html",
            dest: "<%%= config.app %>/src",
            ext: ".html"
          }
        ]
      },
    }
  });

  // define tasks
  grunt.registerTask('serve', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'stencil'
  ]);
};