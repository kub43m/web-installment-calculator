# Typescript + Sass Webapp Webpack configuration.

## Features

* Features two modes: Production & Development:
    * in production the Javascript and CSS files are minified & uglified
    * file names contain (parts of) content hashes to prevent them from being cached.
    Vendor javascript bundle is not renamed as we want it to be cached.
    * source maps for .ts and .scss files are available in dev mode
* dev server with .ts, .scss, .html watches and live reload
* tslint - both app and test files are checked with tslint as part of the build process
* allows loading (requiring) html files as strings in Typescript files
* already configured unit testing framework with karma + jasmine + source maps for debugging
* vendor code is extracted into a separate bundle and *not* repeated in app's proprietary code
* examples of using third-party libraries: jQuery and jasmine
* sample test specs included
* sample .scss file
* sample .ts module


## npm scripts
* `npm run build`: removes the contents of /dist and builds in production mode
* `npm run build-dev`: removes the contents of /dist and builds in development mode
* `npm run serve`: starts local dev server on localhost:8080 and watches .ts, .scss and .html files
    for changes and live-reloads when they do change.
* `npm run test`: runs unit tests once,
* `npm run test-watch`: runs unit tests and leaves the test server running, watching for file changes,


## App structure
* /dist - folder with built app - js & css bundles as well as generated index.html
* /node_modules - installed modules used in our app
* /src - app's source files
    * /src/html - html partials
    * /src/scss - stylesheets
    * /src/ts - Typescript modules
    * /src/app.ts - app's entry point
    * /src/html.module.d.ts - html module definition, necessary for Typescript compiler if
        we want to import html files in Typescript files
    * /src/index.template.html - template for index.html, that will be populated differently,
        depending on the used mode (dev or prod)
    * /src/styles.scss - all .scss stylesheets need to be imported into this file in order
        to be used in our app.
    * /src/vendor.ts - all third-party code should be imported here in order to be available
        in our app.
* /test - contains test suites and webpack config file used in unit tests
* /karma.conf.js - configuration file for Karma - the test runner used
* /package.json - contains app metadata, used modules, and development scripts
* /README.md - the file you're currently reading :-)
* /tsconfig.json - Typescript compiler configuration
* /tslint.json - Typescript linter configuration
* /webpack.config.js - main Webpack configuration file 


## How to use
* `npm install` and then use nmp scripts, as described above, to build, run development
    server, and test the app
* CAUTION: this starter was created in Windows and may thus require some additional steps
    to be usable in other OSes (e.g. environnment variables in npm scripts are set in a
    different way)

## What's not covered
* loading other files, e.g. images (see file-loader and url-loader)
* tree-shaking