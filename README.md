# tictactoe-web
Webapp for the tictactoe app.

### How to build the bundle
[Webpack](https://webpack.github.io/) is used to create the bundle from the source files. I wrote a small build script, located in `build.js`, to manage the build process. For convenience, you can build using the various configurations by using the included [npm scripts](https://docs.npmjs.com/misc/scripts):
  - `npm run build`: builds using the development configuration (`webpack.config.js`)
  - `npm run dist`: builds using the production configuration (`webpack.config.production.js`)
  - `npm run watch`: watches the source files for changes and automatically rebuilds using the development configuration.

The bundle is placed in the `dist/` directory in the root of the repository.
