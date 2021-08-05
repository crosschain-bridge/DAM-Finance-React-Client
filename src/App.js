import {Box,Heading} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from "./pages/Profile"
import Valve from "./pages/Valve"
import Home from "./pages/Home"
import Protocol from "./pages/Protocol";


function App() {
  return (
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
  );
}

export default App;
