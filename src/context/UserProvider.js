import React, { useContext } from "react";
import { auth, getUserDocument } from "../services/firebase";
import PropTypes from "prop-types";

export const UserContext = React.createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, isLoggedIn: false };
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      // user logging out
      if (!userAuth) {
        this.setState({ currentUser: null, isLoggedIn: false });
      } else if (userAuth.displayName) {
        // user signs in with google
        this.setState({
          currentUser: {
            displayName: userAuth.displayName,
            email: userAuth.email,
            photoURL: userAuth.photoURL
          },
          isLoggedIn: true
        });
      } else if (userAuth && !userAuth.displayName) {
        // user signs in with email and password
        console.log(userAuth);
        this.retries = 5;
        this.intervalId = setInterval(this.loadUser, 1000, userAuth.uid);
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  async loadUser(userId) {
    console.log(`Attempting to load user. Retries left: ${this.retries}`);
    if (this.retries === 1) {
      clearInterval(this.intervalId);
    }
    try {
      const currentUser = await getUserDocument(userId);
      this.setState({ currentUser, isLoggedIn: true });
      clearInterval(this.intervalId);
    } catch (error) {
      console.log(`Error logging the user in: ${error.message}`);
      this.retries -= 1;
    }
  }

  render() {
    console.log(`User Provider state: isLoggedIn - ${this.state.isLoggedIn}`);
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
