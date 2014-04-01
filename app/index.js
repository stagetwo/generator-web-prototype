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
    // create directories
    this.mkdir('app');

    this.mkdir('app/assets');
    this.mkdir('app/assets/less');
    this.mkdir('app/assets/css');
    this.mkdir('app/assets/images');
    this.mkdir('app/assets/js');

    this.mkdir('app/templates');
    this.mkdir('app/templates/layouts');
    this.mkdir('app/templates/partials');
    this.mkdir('app/templates/pages');
    this.mkdir('app/prototypes');

    // copy files
    this.copy('app.less', 'app/assets/less/app.less');
    this.copy('prototypes.less', 'app/assets/less/prototypes.less');

    this.template('index.html', 'app/index.html');
    this.template('main.dot.html', 'app/templates/layouts/main.dot.html');
    this.template('breadcrumb.dot.html', 'app/templates/partials/breadcrumb.dot.html');
    this.template('home.dot.html', 'app/templates/pages/home.dot.html');
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