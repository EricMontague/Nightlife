import React, { useContext } from "react";
import { auth } from "../services/firebase";
import PropTypes from "prop-types";

const UserContext = React.createContext(null);

export const useCurrentUser = () => {
  const value = useContext(UserContext);
  return value;
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
      });
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default UserProvider;
