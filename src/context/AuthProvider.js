import React, { useContext } from "react";
import { auth, getUserDocument } from "../services/firebase";
import PropTypes from "prop-types";

export const AuthContext = React.createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

class AuthProvider extends React.Component {
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
            userId: userAuth.uid,
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
      this.setState({
        currentUser: {
          userId: currentUser.id,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        },
        isLoggedIn: true
      });
      clearInterval(this.intervalId);
    } catch (error) {
      console.log(`Error logging the user in: ${error.message}`);
      this.retries -= 1;
    }
  }

  render() {
    console.log(`User Provider state: isLoggedIn - ${this.state.isLoggedIn}`);
    return (
      <AuthContext.Provider
        value={{
          savePlan: plan => this.savePlan(plan),
          currentUser: this.state.currentUser,
          isLoggedIn: this.state.isLoggedIn
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthProvider;
