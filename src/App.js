import React from "react";
import Navbar from "./components/common/Navbar";
import AlertProvider from "./context/AlertProvider";
import AuthProvider from "./context/AuthProvider";
import AuthApp from "./components/authentication/AuthApp";
import ProfileApp from "./components/profile/ProfileApp";
import PlanApp from "./components/plans/PlanApp";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
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
            path={[
              "/plans/create",
              "/plans/:plan_id/view",
              "/plans/:plan_id/edit"
            ]}
            render={({ match, history, location }) => (
              <PlanApp match={match} history={history} location={location} />
            )}
          />
          <Route exact path="*" render={() => <NotFound />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
