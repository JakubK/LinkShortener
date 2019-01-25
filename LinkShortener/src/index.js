import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import App from './App';
import About from './components/about/about'
import Auth from './components/auth/auth'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Panel from './components/panel/panel';
import ProtectedLink from './components/auth/protectedLink';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'

const store = createStore(reducers);

const routing = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/sign">
            <Auth>
                <Switch>
                  <Route path="/sign/in" component={SignIn}/>
                  <Route path="/sign/up" component={SignUp}/>
                </Switch>
            </Auth>
          </Route>
          <Route exact path="/link/:hash" component={ProtectedLink}/>
          <Switch>
            <Route path="/">
              <div>
                <Navbar/>
                <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/panel" component={Panel}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/:hash" render={({match}) =>
                (
                  <Redirect to={`/link/${match.params.hash}`} />
                )}/>
                </Switch>
                <Footer/>
              </div>
            </Route>
          </Switch>
        </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();