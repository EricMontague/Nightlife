import React, { useContext } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext(null);

export const useCurrentUser = () => {
  return useContext(UserContext);
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
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
