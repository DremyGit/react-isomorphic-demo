# react-isomorphic-demo

A react isomorphic demo app, using Webpack/Redux/Immutable.js... and reddit.com API.

## Features

+ [react-router](https://github.com/reactjs/react-router)
+ [Webpack](https://github.com/webpack/webpack)
+ [Redux](https://github.com/reactjs/redux)
+ [normalizr](https://github.com/paularmstrong/normalizr)
+ [immutable.js](https://github.com/facebook/immutable-js)
+ [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)

## Getting Started

```
// Install npm modules
$ npm install

// Running with production mode
$ npm start

// Or running with develop mode
$ npm run start-dev
```

As we know, the reddit.com can't be access in China, so if you have a proxy,
you need add the HTTPS_PROXY environment variable when the server start,
and your browser also need to config the proxy.

```
$ HTTPS_PROXY=http://proxy_server:port npm start
```

## What can I do with it?

+ As a startkit, you can know how the react isomorphic works and learn to use it.
+ As a Simple scaffolding, allowing building of new react isomorphic application projects.

## License

[MIT](https://github.com/DremyGit/react-isomorphic-demo/blob/master/LICENSE) @ [Dremy](https://github.com/DremyGit)