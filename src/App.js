import React from "react";
import Navbar from "./components/common/Navbar";
import UserProvider from "./context/UserProvider";
import ThemeProvider from "./context/ThemeProvider";
import Home from "./components/homepage/Home";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  <ThemeProvider>
    <UserProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </UserProvider>
  </ThemeProvider>;
};

export default App;
