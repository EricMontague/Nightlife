import React, { useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import DocumentTitle from "../navigation/DocumentTitle";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerUser
} from "../../redux/actions/authentication";
import withRedirect from "../../higherOrderComponents/withRedirect";

const AuthApp = () => {
  const dispatch = useDispatch();

  const loginUser = useCallback(
    (email, password) => dispatch(signInWithEmailAndPassword(email, password)),
    [dispatch]
  );
  const createUserWithEmailAndPasswordHandler = useCallback(
    user => dispatch(registerUser(user)),
    [dispatch]
  );

  return (
    <div className="centered-page-layout text-center p-all-3">
      <div className="card card-medium">
        <div className="card-body">
          <Switch>
            <Route exact path="/">
              <DocumentTitle title="Home | Nightlife">
                <Home signInWithGoogle={signInWithGoogle} />
              </DocumentTitle>
            </Route>
            <Route exact path="/signin">
              <DocumentTitle title="Sign In | Nightlife">
                <SignInForm
                  signInWithGoogle={signInWithGoogle}
                  signInWithEmailAndPassword={loginUser}
                />
              </DocumentTitle>
            </Route>
            <Route exact path="/signup">
              <DocumentTitle title="Sign Up | Nightlife">
                <SignUpForm
                  signInWithGoogle={signInWithGoogle}
                  createUserWithEmailAndPasswordHandler={
                    createUserWithEmailAndPasswordHandler
                  }
                />
              </DocumentTitle>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

// class AuthApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.registerUser = this.registerUser.bind(this);
//     this.loginUser = this.loginUser.bind(this);
//   }

//   static contextType = AuthContext;

//   componentDidMount() {
//     getRedirectSignInResult()
//       .then(result => {
//         if (result.user) {
//           storeUserDocument({
//             id: result.user.uid,
//             email: result.user.email,
//             displayName: result.user.displayName,
//             photoURL: result.user.photoURL,
//             plans: []
//           })
//             .then(() => {
//               console.log("Successfully stored user document!");
//             })
//             .catch(error => {
//               console.log(`Erro when storing document: ${error.message}`);
//             });
//         }
//       })
//       .catch(error => {
//         console.log(`Error with getting redirect result: ${error.message}`);
//       });
//   }

//   async registerUser(user) {
//     try {
//       // Create user account through firebase
//       const results = await createUserWithEmailAndPassword(
//         user.email,
//         user.password
//       );
//       storeUserDocument({
//         id: results.user.uid,
//         email: user.email,
//         password: user.password,
//         displayName: user.firstName + " " + user.lastName,
//         photoURL: "",
//         plans: []
//       });
//       // this.props.history.push("/");
//     } catch (error) {
//       console.log(
//         `An error occured while registering the user: ${error.message}`
//       );
//     }
//   }

//   async loginUser(email, password) {
//     try {
//       signInWithEmailAndPassword(email, password);
//       console.log("User login successful!");
//       // this.props.history.push("/");
//     } catch (error) {
//       console.log(`Error on login: ${error.message}`);
//     }
//   }

//   render() {
//     if (this.context.isLoggedIn) {
//       return (
//         <Redirect
//           to={`/users/${this.context.currentUser.displayName.replace(" ", "")}`}
//         />
//       );
//     } else {
//       return (
//         <div className="centered-page-layout text-center p-all-3">
//           <div className="card card-medium">
//             <div className="card-body">
//               <Switch>
//                 <Route exact path="/">
//                   <DocumentTitle title="Home | Nightlife">
//                     <Home signInWithGoogle={signInWithGoogle} />
//                   </DocumentTitle>
//                 </Route>
//                 <Route exact path="/signin">
//                   <DocumentTitle title="Sign In | Nightlife">
//                     <SignInForm
//                       signInWithGoogle={signInWithGoogle}
//                       signInWithEmailAndPassword={(email, password) =>
//                         this.loginUser(email, password)
//                       }
//                     />
//                   </DocumentTitle>
//                 </Route>
//                 <Route exact path="/signup">
//                   <DocumentTitle title="Sign Up | Nightlife">
//                     <SignUpForm
//                       signInWithGoogle={signInWithGoogle}
//                       createUserWithEmailAndPasswordHandler={user =>
//                         this.registerUser(user)
//                       }
//                     />
//                   </DocumentTitle>
//                 </Route>
//               </Switch>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// }

AuthApp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      state: PropTypes.objectOf(PropTypes.string.isRequired)
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired
  })
};

export default withRedirect(AuthApp);
