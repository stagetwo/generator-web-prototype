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
          '<%%= config.app %>/meta/index.dot.html',
          '<%%= config.app %>/meta/partials/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/pages/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/layouts/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/partials/{,*/}*.dot.html'
        ],
        tasks: ['stencil']
      },
      less: {
        files: [
          '<%%= config.app %>/meta/assets/less/{,*/}*.less',
          '<%%= config.app %>/prototypes/assets/less/{,*/}*.less'
        ],
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
          '<%%= config.app %>/meta/assets/css/*.css',
          '<%%= config.app %>/prototypes/src/*.html',
          '<%%= config.app %>/prototypes/assets/css/*.css',
          '<%%= config.app %>/prototypes/assets/images/*',
          '<%%= config.app %>/prototypes/assets/js/*.js'
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
          '<%%= config.app %>/meta/assets/css/meta.css': ['<%%= config.app %>/meta/assets/less/meta.less'],
          '<%%= config.app %>/prototypes/assets/css/prototypes.css': ['<%%= config.app %>/prototypes/assets/less/prototypes.less']
        }
      }
    },
    stencil: {
      meta: {
        options: {
          partials: '<%%= config.app %>/meta/partials',
          // templates: '<%%= config.app %>/prototypes/layouts',
          dot_template_settings: {
            strip: false,
          },
        },
        files: [
          {
            expand: true,
            cwd: "<%%= config.app %>/meta",
            src: "index.dot.html",
            dest: "<%%= config.app %>",
            ext: ".html"
          }
        ]
      },
      prototypes: {
        options: {
          partials: '<%%= config.app %>/prototypes/partials',
          templates: '<%%= config.app %>/prototypes/layouts',
          dot_template_settings: {
            strip: false,
          },
        },
        files: [
          {
            expand: true,
            cwd: "<%%= config.app %>/prototypes/pages",
            src: "**/*.dot.html",
            dest: "<%%= config.app %>/prototypes/src",
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