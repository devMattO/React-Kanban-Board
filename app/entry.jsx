import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import About from './static/about.jsx';
import NoMatch from './static/noMatch.jsx';
import App from './app.jsx';



ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App} />
    <Route path='/about' component={About} />
    <Route path='*' component={NoMatch} />
  </Router>,
  document.getElementById('kanban-container')
);