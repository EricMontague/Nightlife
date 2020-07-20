import React from "react";
import Navbar from "./components/common/Navbar";
import UserProvider from "./context/UserProvider";
import DeviceProvider from "./context/DeviceProvider";
import AuthApp from "./components/authentication/AuthApp";
import Home from "./components/authentication/Home";
import UserProfile from "./components/profile/UserProfile";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <DeviceProvider>
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              exact
              path={["/signin", "/signup"]}
              render={({ match, history }) => (
                <AuthApp match={match} history={history} />
              )}
            />
            <Route exact path="/users/:displayName" component={UserProfile} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </UserProvider>
    </DeviceProvider>
  );
};

export default App;
