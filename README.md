kentaromiura's RPG Maker MV Base Project
========================================

Simple repository to use as a Base for developing one or multiple plugins

How to use
==========
run `npm install`

`npm run deploy` will create a copy of your plugins into `dist/js/plugins`
there's also a `deploy` command to allow you to build directly inside your project folder,
you just need to pass it the path to your project.

`npm test` will run tests, I setup the project to use [Jest](http://facebook.github.io/jest/) as a test runner
as it's compatible with ES2015 by default

the config.json will allow you to customize the namespace used to build the output files,
also it allows for adding a one-line license (you can add multiline too by escaping it)

How does it work
================
There is an example QuitOption plugin, in the `Plugins/Title/` folder,
when you run `npm run deploy` it will look at any js files inside the Plugins folder
and in case of the QuitOption example,
it will create a `dist/js/plugins/kentaromiura_Title_QuitOption.js` file

You can use ES2015 and common js or ES import syntax to import your modules

How to test
===========
Simply running `npm test` is enough
The project is set up to run any test under a `__tests__` folder
Jest is configured to not automock by default, you can turn it on the option in the package.json file
