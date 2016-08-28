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

// 通过服务端注入的全局变量得到初始 state
const initialState = fromJS(window.__INITIAL_STATE__);

// 使用初始 state 创建 Redux store
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing').toJS()
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