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

const app = Express();
const port = 8000;

app.use('/static', Express.static(path.join(__dirname, '../', 'dist')));
app.use('/favicon.ico', function (req, res) {
  res.status(404).send('Not found');
});
app.use(handleRender);

function handleRender(req, res) {

  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore(Map({}));
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS()
  });

  match({ history, routes }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      dispatchFetches(store.dispatch, renderProps.components, renderProps.params).then(() => {
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
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
