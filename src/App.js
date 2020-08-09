import React from "react";
import Navbar from "./components/common/Navbar";
import AuthProvider from "./context/AuthProvider";
import DeviceProvider from "./context/DeviceProvider";
import AuthApp from "./components/authentication/AuthApp";
import ProfileApp from "./components/profile/ProfileApp";
import PlanApp from "./components/plans/PlanApp";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <DeviceProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route
              exact
              path={["/", "/signin", "/signup"]}
              render={({ match, history }) => (
                <AuthApp match={match} history={history} />
              )}
            />
            <Route
              exact
              path="/users/:displayName"
              render={() => <ProfileApp />}
            />
            <Route
              exact
              path={["/plans/create", "/plans/view", "/plans/:plan_id/edit"]}
              render={({ match, history }) => (
                <PlanApp match={match} history={history} />
              )}
            />
            <Route exact path="*" render={() => <NotFound />} />
          </Switch>
        </Router>
      </AuthProvider>
    </DeviceProvider>
  );
};

export default App;
