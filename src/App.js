import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { initSuperfluid } from './superfluid';
import Profile from './pages/Profile';
import Valve from './pages/Valve';
import Home from './pages/Home';
import Protocol from './pages/Protocol';
import CreatePools from './pages/CreatePools';

function App() {
  const { user, enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (user && !isWeb3Enabled) {
      enableWeb3();
    }
  }, [user, enableWeb3, isWeb3Enabled]);

  useEffect(() => {
    if (user && isWeb3Enabled) initSuperfluid();
  }, [user, isWeb3Enabled]);

  return (
    <Box>
      <Switch>
        <Route path="/createpools">
          <CreatePools />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/valve">
          <Valve />
        </Route>
        <Route exact path="/protocol">
          <Protocol />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
