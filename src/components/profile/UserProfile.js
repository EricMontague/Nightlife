import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Redirect } from "react-router-dom";

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  static contextType = UserContext;

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <h1>This is the profile of {this.context.currentUser.displayName}</h1>
      );
    }
  }
}

export default UserProfile;
