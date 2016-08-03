import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { createStore, combineReducers } from 'redux';
import About from './static/about.jsx';
import NoMatch from './static/noMatch.jsx';
import NewCard from './static/new_card_form.jsx';
import App from './app.jsx';

const reducer = combineReducers(reducers);
const store = createStore(reducer);


ReactDOM.render(
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path='/' component={App} />
      <Route path='/about' component={About} />
      <Route path='/newcard' component={NewCard} />
      <Route path='*' component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('kanban-container')
);