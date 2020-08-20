import React, { useContext } from "react";
import { auth, getUserDocument } from "../services/firebase";
import Poller from "../services/polling";
import { disablePointerEvents, enablePointerEvents } from "../services/helpers";
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
    document.body.classList.add("no-pointer-events");
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      // user logging out
      if (!userAuth) {
        this.setState({ currentUser: null, isLoggedIn: false });
      } else {
        if (userAuth.displayName) {
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
          enablePointerEvents();
        } else if (userAuth && !userAuth.displayName) {
          // user signs in with email and password
          const poller = new Poller(1000, 5);
          poller.start(this.loadUser, [userAuth.uid]);
        }
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  async loadUser(userId) {
    try {
      const currentUser = await getUserDocument(userId);
      enablePointerEvents();
      this.setState({
        currentUser: {
          userId: currentUser.id,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        },
        isLoggedIn: true
      });
    } catch (error) {
      throw new Error(`Error logging the user in: ${error.message}`);
    }
  }

  render() {
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
