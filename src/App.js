import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import AuthApp from "./components/authentication/AuthApp";
import ProfileApp from "./components/profile/ProfileApp";
import PlanApp from "./components/plans/PlanApp";
import AlertProvider from "./providers/AlertProvider";
import NotFound from "./components/errors/NotFound";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { authStateListener } from "./redux/actions/authentication";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const currentUser = useSelector(state => state.authReducer.currentUser);

  useEffect(() => {
    const listener = dispatch(authStateListener());

    // cleanup Google event listener
    return () => listener();
  }, [dispatch]);

  return (
    <AlertProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} />
        <Switch>
          <Route
            exact
            path={["/", "/signin", "/signup"]}
            render={({ match, history }) => (
              <AuthApp
                match={match}
                history={history}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/users/:displayName"
            component={ProfileApp}
          />
          <PrivateRoute
            exact
            path={[
              "/plans/create",
              "/plans/:plan_id/view",
              "/plans/:plan_id/edit"
            ]}
            component={PlanApp}
          />
          <Route exact path="*" render={() => <NotFound />} />
        </Switch>
      </Router>
    </AlertProvider>
  );
};

export default App;
