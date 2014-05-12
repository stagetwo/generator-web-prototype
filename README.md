# Web Prototype Generator

> [Yeoman](http://yeoman.io) generator


## Getting Started

### Yeoman

With so many great tools available to front-end web developers these days it can sometimes be difficult to understand how they all fit together. Deciding on a workflow that you’re happy with is often a very personal endeavour, but getting started isn’t always easy. Yeoman aims to solve this problem by scaffolding workflows for creating modern webapps, while at the same time mixing in many of the best practices that have evolved within the industry.

Install Yeoman:

```
$ npm install -g yo
```

### Generator

The goal of the Web Prototype generator is to enable the fast, simple creation of HTML pages. A basic structure is provided by the application but beyond that it's up to you.

To install the Web Prototype generator from npm, run:

```
$ npm install -g generator-web-prototype
```

Create a directory for your prototype and initiate the generator:

```
$ mkdir my-prototype
$ cd my-prototype
$ yo web-prototype
```

Build, watch and recompile the prototypes:

```
grunt serve
```


The generator creates the applications structure for you. The `meta` folder contains the files required by the generator. The `prototype` folder contains your files.

Within the `prototypes` folder `pages` contains your prototype pages for you to edit. `Layouts` contains the layout templates (menu, header, footer, etc.) which you can use for your pages. `Partials` contains reusable snippets of HTML which you can include in your pages. `Assets` contains your JavaScript, LESS and CSS. You only need to edit the LESS as the CSS will be regenerated each time you make a change. `Src` contains the compiled prototype pages, don't edit these as they are regenerated each time you make a change in the other files.

Use a layout template for a page:

    {
        "template": "main"
    }

Place this at the top with the name of your layout template instead of 'main'.

Inside your layout template include the following code to specify where the page content will be inserted:

```
{{= it.document }}
```

Include a partial in a page:

    {{= it.include('home-content-item', { 
        icon: 'glyphicon-globe',
        title: 'Scelerisque',
        text: 'Vivamus condimentum magna est, vel placerat ipsum luctus non.'
    }) }}

Place this anywhere in your page where you would like to include the partial, with your partial name instead of 'home-content-item'. The 'icon', 'title' and 'text' properties are values which are passed into the partial.

Add a code block anywhere in your partial to use a provided value:

```
{{= it.text }}
```

### Commands

After running the generator you will have one exmaple prototype page. You'll want to add some more. Once you've created the new prototype page you can change the HTML to anything you like.

Create a new prototype page:

```
$ grunt prototype --name new-prototype-page
```

I like to open another tab in terminal and navigate to the same directory so that you can run commands without stoping Grunt.

### More Information

If you'd like to know more about Yeoman, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

MIT
