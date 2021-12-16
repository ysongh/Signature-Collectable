import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UAuth from '@uauth/js'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyCollection from './pages/MyCollection';
import HowItWorks from './pages/HowItWorks';
import {
  UNSTOPPABLEDOMAINS_CLIENTID,
  UNSTOPPABLEDOMAINS_CLIENTSECRET,
  UNSTOPPABLEDOMAINS_REDIRECT_URI,
  UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
} from './config';

const uauth = new UAuth({
  // Client credentials copied from https://unstoppabledomains.com/app-dashboard
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,

  // Requested scopes.
  scope: 'openid email wallet',

  // Redirect Uris copied from https://unstoppabledomains.com/app-dashboard
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,
})

function App() {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState('');
  const [scContract, setSCContract] = useState(null);

  useEffect(() => {
    uauth
      .user()
      .then(userData => {
        setUser(userData);
        setAccount(userData.sub);
      })
      .catch(error => {
        console.error('profile error:', error);
      })
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar
          account={account}
          setUser={setUser}
          setAccount={setAccount}
          setSCContract={setSCContract}
          uauth={uauth} />

        <Switch>
          <Route path="/my-collection">
            <MyCollection
              user={user}
              account={account} />
          </Route>
          <Route path="/howitworks">
            <HowItWorks />
          </Route>
          <Route path="/dashboard/:address">
            <Dashboard
              user={user}
              account={account}
              scContract={scContract} />
          </Route>
          <Route path="/dashboard">
            <Dashboard
              user={user}
              account={account}
              scContract={scContract} />
          </Route>
          <Route path="/">
            <Home
              user={user}
              uauth={uauth}
              setAccount={setAccount} />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </DndProvider>
  );
}

export default App;
