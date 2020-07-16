import React, { useContext } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext(null);

export const useCurrentUser = () => {
  const value = useContext(UserContext);
  return value;
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        displayName: "Eric Montague",
        email: "eric@gmail.com",
        photoUrl:
          "https://images.unsplash.com/photo-1472691613482-5da03d62a318?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      }
    };
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
