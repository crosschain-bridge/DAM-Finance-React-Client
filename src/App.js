import {useEffect} from "react"
import {Box,Heading} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useMoralis } from "react-moralis";
import {initSuperfluid} from './superfluid'
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
    enableWeb3,
    logout,
  } = useMoralis();

  useEffect( () => {
    if (user){
      enableWeb3()
    }  
  },[user])

  useEffect(() => {
    if (user && web3)
      initSuperfluid()
  },[user, web3])

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
