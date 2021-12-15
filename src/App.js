import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/common/Alert';
import Home from './pages/Home';
import MyCollection from './pages/MyCollection';
import HowItWorks from './pages/HowItWorks';

function App() {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState('');
  const [scContract, setSCContract] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar
          account={account}
          setUser={setUser}
          setAccount={setAccount}
          setSCContract={setSCContract} />

        <Alert />

        <Switch>
          <Route path="/my-collection">
            <MyCollection
              user={user}
              account={account} />
          </Route>
          <Route path="/collection/:address">
            <Home
              user={user}
              account={account}
              scContract={scContract} />
          </Route>
          <Route path="/howitworks">
            <HowItWorks />
          </Route>
          <Route path="/">
            <Home
              user={user}
              account={account}
              scContract={scContract} />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </DndProvider>
  );
}

export default App;
