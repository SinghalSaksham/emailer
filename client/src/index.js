import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/scss/style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();