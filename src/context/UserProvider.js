import React, { useContext } from "react";
import { auth } from "../services/firebase";
import PropTypes from "prop-types";

export const UserContext = React.createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, isLoggedIn: false };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          },
          isLoggedIn: true
        });
      } else {
        this.setState({
          currentUser: null,
          isLoggedIn: false
        });
      }
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          currentUser: this.state.currentUser,
          isLoggedIn: this.state.isLoggedIn
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default UserProvider;
