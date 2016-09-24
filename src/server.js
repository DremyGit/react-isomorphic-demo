import path from 'path';
import Express from 'express';
import React from 'react';
import configureStore from './stores';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import routes from './routes'

import Html from './helpers/Html';
import { dispatchFetches } from './helpers/utils';

// Using express to route all of the request
const app = Express();
const port = 8000;

// Handle the static files
app.use('/static', Express.static(path.join(__dirname, '../', 'dist')));
app.use('/favicon.ico', function (req, res) {
  res.status(404).send('Not found');
});

// Handle all of the router request
app.use(handleRender);

function handleRender(req, res) {

  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  // It's very similar with the client.js,
  // but you should using memory history on server,
  // because it is not a browser.
  const memoryHistory = createMemoryHistory(req.path);
  // For all of requests, the initial state should be null
  const store = configureStore(Map({}));
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.get('routing') || {}
  });

  // Get the route info from react-router
  match({ history, routes }, (error, redirectLocation, renderProps) => {

    // Determine whether the request should be handle by React
    // or just return some http state code
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Here is the emphasis of the server-rendering,
      // we should wail until the async data operation such as
      // fetching from APIs finished. Then we can pass the state into
      // components and render the component to string.
      dispatchFetches(store.dispatch, renderProps.components, renderProps.params).then(() => {
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        // I don't know why the rendered string can't be valid by client
        // in react v15.x directly. The `data-reactid` in html > head tag
        // would make some error, so I have to replace them.
        res.send('<!doctype html>\n' +
          renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
            .replace(/ data-reactid="(.*?)"/g, '')
            .replace(/<!--\s*\/?react.*?-->/g, '')
        );
      }).catch(err => {
        console.error(err);
        if (__DEVELOPMENT__) {
          return res.status(500).send(`<pre>${err.stack}</pre>`);
        }
        return res.status(500).send('Oh! Some error happened (；′⌒`)');
      });
    } else {
      res.status(404).send('Not found')
    }
  })
}

app.listen(port, function () {
  console.info('Express server running on %d', port);
});
