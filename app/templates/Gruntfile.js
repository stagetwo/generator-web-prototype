// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {
  // load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // load npm tasks
  grunt.loadNpmTasks('grunt-stencil');

  var config = {
    app: 'app'
  }

  // configure grunt
  grunt.initConfig({
    config: config,
    watch: {
      stencil: {
        files: [
          // '<%%= config.app %>/meta/index.dot.html',
          // '<%%= config.app %>/meta/partials/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/pages/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/layouts/{,*/}*.dot.html',
          '<%%= config.app %>/prototypes/partials/{,*/}*.dot.html'
        ],
        tasks: ['stencil', 'sync']
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
      // meta: {
      //   options: {
      //     partials: '<%%= config.app %>/meta/partials',
      //     // templates: '<%%= config.app %>/prototypes/layouts',
      //     dot_template_settings: {
      //       strip: false,
      //     },
      //   },
      //   files: [
      //     {
      //       expand: true,
      //       cwd: '<%%= config.app %>/meta',
      //       src: 'index.dot.html',
      //       dest: '<%%= config.app %>',
      //       ext: '.html'
      //     }
      //   ]
      // },
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
            cwd: '<%%= config.app %>/prototypes/pages',
            src: '**/*.dot.html',
            dest: '<%%= config.app %>/prototypes/src',
            ext: '.html'
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
    'stencil',
    'sync'
  ]);

  grunt.registerTask('sync', function() {
    // retrieve config
    var config = grunt.config.get('config');

    // read in required templates
    var indexTemplate = grunt.file.read(config.app + '/meta/index.tmpl');
    var prototypeItemTemplate = grunt.file.read(config.app + '/meta/partials/prototype-item.tmpl');

    var data = {
      projectName: '<%= projectName %>',
      prototypesHTML: ''
    }

    // generate html for prototype items
    grunt.file.recurse(config.app + '/prototypes/src', function(abspath, rootdir, subdir, filename) {
      var prototypeItemHTML = grunt.template.process(prototypeItemTemplate, { data: { filename: filename, path: '/prototypes/src/' + filename } });

      data.prototypesHTML += prototypeItemHTML;

      grunt.log.writeln('Processed file: ' + filename);
    });

    // generate index html
    var indexHTML = grunt.template.process(indexTemplate, { data: data });

    // write index html to file
    grunt.file.write(config.app + '/index.html', indexHTML);
  });

  grunt.registerTask('prototype', function() {
    // retrieve config
    var config = grunt.config.get('config');

    // ensure required arguments exist and are valid
    var prototypeName = grunt.option('name');

    // TODO: check if prototype with same name already exists

    // read in new prototype page template
    var prototypeTemplate = grunt.file.read(config.app + '/meta/partials/prototype.tmpl');

    // generate html for new prototype page
    var prototypeHTML = grunt.template.process(prototypeTemplate, { data: { defaultTemplate: 'main', prototypeName: prototypeName } });

    // create prototype file
    grunt.file.write(config.app + '/prototypes/pages/' + prototypeName + '.dot.html', prototypeHTML);
  });
};