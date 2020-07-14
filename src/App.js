import React from "react";
import Navbar from "./components/common/Navbar";
import UserProvider from "./context/UserProvider";
import Home from "./components/homepage/Home";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={Home} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
