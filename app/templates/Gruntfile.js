// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {
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
          '<%%= config.app %>/pages/{,*/}*.dot.html',
          '<%%= config.app %>/layouts/{,*/}*.dot.html',
          '<%%= config.app %>/partials/{,*/}*.dot.html'
        ],
        tasks: ['stencil']
      },
      less: {
        files: ['<%%= config.app %>/assets/less/{,*/}*.less'],
        tasks: ['less']
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
          '<%%= config.app %>/prototypes/*.html',
          '<%%= config.app %>/assets/css/*.css',
          '<%%= config.app %>/assets/images/*',
          '<%%= config.app %>/assets/js/*.js'
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
    less: {
      dist: {
        files: {
          '<%%= config.app %>/assets/css/app.css': ['<%%= config.app %>/assets/less/app.less'],
          '<%%= config.app %>/assets/css/prototypes.css': ['<%%= config.app %>/assets/less/prototypes.less']
        }
      }
    },
    stencil: {
      main: {
        options: {
          partials: '<%%= config.app %>/templates/partials',
          templates: '<%%= config.app %>/templates/layouts',
          dot_template_settings: { 
            strip: false,
          },
        },
        files: [
          {
            expand: true,
            cwd: "<%%= config.app %>/templates/pages",
            src: "**/*.dot.html",
            dest: "<%%= config.app %>/prototypes",
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
    'less',
    'stencil'
  ]);
};