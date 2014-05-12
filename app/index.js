'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var WebPrototypeGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function() {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic web prototype generator.'));

    var prompts = [{
      name: 'projectName',
      message: 'What is the name of your project?'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  app: function() {
    // directories
    this.mkdir('app');
  },

  meta: function() {
    // directories
    this.mkdir('app/meta');
    this.mkdir('app/meta/partials');
    this.mkdir('app/meta/assets');
    this.mkdir('app/meta/assets/css');

    // less
    this.mkdir('app/meta/assets/less');
    this.copy('meta.less', 'app/meta/assets/less/meta.less');

    // templates
    this.copy('index.tmpl', 'app/meta/index.tmpl');
    this.copy('prototype-item.tmpl', 'app/meta/partials/prototype-item.tmpl');
    this.copy('prototype.tmpl', 'app/meta/partials/prototype.tmpl');
  },

  prototypes: function() {
    // directories
    this.mkdir('app/prototypes');
    this.mkdir('app/prototypes/layouts');
    this.mkdir('app/prototypes/partials');
    this.mkdir('app/prototypes/pages');
    this.mkdir('app/prototypes/src');
    this.mkdir('app/prototypes/assets');
    this.mkdir('app/prototypes/assets/css');
    this.mkdir('app/prototypes/assets/images');
    this.mkdir('app/prototypes/assets/js');

    // less
    this.mkdir('app/prototypes/assets/less');
    this.copy('prototypes.less', 'app/prototypes/assets/less/prototypes.less');

    // example
    this.template('main.dot.html', 'app/prototypes/layouts/main.dot.html');
    this.template('home-content-item.dot.html', 'app/prototypes/partials/home-content-item.dot.html');
    this.template('home.dot.html', 'app/prototypes/pages/home.dot.html');
  },

  packages: function() {
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
  },

  grunt: function() {
    this.template('Gruntfile.js', 'Gruntfile.js');
  },

  project: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = WebPrototypeGenerator;