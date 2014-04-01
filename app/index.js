'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var WebPrototypeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic web prototype generator.'));

    var prompts = [{
      name: 'prototypeName',
      message: 'What would you like to call your prototype?'
    }];

    this.prompt(prompts, function (props) {
      this.prototypeName = props.prototypeName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/layouts');
    this.mkdir('app/pages');
    this.mkdir('app/partials');

    this.template('index.html', 'app/index.html');
    this.template('breadcrumb.dot.html', 'app/partials/breadcrumb.dot.html');
    this.template('home.dot.html', 'app/pages/home.dot.html');
    this.template('main.dot.html', 'app/layouts/main.dot.html');
  },

  projectfiles: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
  }
});

module.exports = WebPrototypeGenerator;