import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'

import App from './App';
import Auth from './components/auth/auth'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/sign">
        <Auth>
            <Switch>
              <Route path="/sign/in" component={SignIn}/>
              <Route path="/sign/up" component={SignUp}/>
            </Switch>
        </Auth>
      </Route>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();