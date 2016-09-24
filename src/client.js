import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { fromJS } from 'immutable';
import configureStore from './stores';
import routes from './routes'
import DevTools from './components/ReduxDevTools.js';

// To keep the consistent of states in server and client,
// we should pass all of states generate from server to
// the initial state in client, and transform into
// the structure of Immutablejs
const initialState = fromJS(window.__INITIAL_STATE__);

// Create Redux store from initial state
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing') || {}
});

render(
  <Provider store={store}>
    <div>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={history}
        routes={routes}
      />
      { __DEVTOOLS__ ? <DevTools /> : null}
    </div>
  </Provider>,
  document.getElementById('app')
);
