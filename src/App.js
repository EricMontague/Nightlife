import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertProvider from "./providers/AlertProvider";
import Navbar from "./components/navigation/Navbar";
import AuthApp from "./components/authentication/AuthApp";
import ProfileApp from "./components/profile/ProfileApp";
import PlanApp from "./components/plans/PlanApp";
import NotFound from "./components/errors/NotFound";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { authStateListener } from "./redux/actions/authentication";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = dispatch(authStateListener());

    // cleanup Google event listener
    return () => listener();
  }, [dispatch]);

  return (
    // <AuthProvider>
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
        <PrivateRoute exact path="/users/:displayName" component={ProfileApp} />
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
    // </AuthProvider>
  );
};

export default App;
