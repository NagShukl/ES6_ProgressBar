# Webpack Frontend Starterkit



Pure ES6 Implementation of ProgressBar, made it complex enough to thouch various aspect of a frontend framework should have. Its updated only minimal DOM, when change triggers.
100% responsive, No external CSS library. 
(Underconstruction Functionally working, fixing issues on test with Jasmin/karma configuration)


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Execute Test
```
npm test
```

### Build Prod Version
```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
