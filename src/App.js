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
      {isAuthenticated ? (
        <Switch>
        <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/valve">
            <Valve />
          </Route>
          <Route path="/protocol">
            <Protocol />
          </Route>
          <Route path="/">
            <Home />
          </Route>
    </Switch>
      ) : <ErrorPage />
    }
    </Box>
  )
}

export default App;
