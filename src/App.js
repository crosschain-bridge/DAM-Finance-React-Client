import {Box,Heading} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useMoralis } from "react-moralis";
import Profile from "./pages/Profile"
import Valve from "./pages/Valve"
import Home from "./pages/Home"
import Protocol from "./pages/Protocol";
import ErrorPage from "./pages/ErrorPage"
import CreatePools from "./pages/CreatePools";

function App() {

  const {
    user,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    Moralis,
    web3,
    logout,
  } = useMoralis();
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
  )
}

export default App;
