import React, { Component } from "react";
import UserContext from "./UserContext";
import {
  auth,
  updateUserStatus,
  addLoginAnalytics,
  addDisconnectListener,
  getUserDetails,
  signOut,
} from "../../firebase/firebase";

class UserProvider extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("UserAuth")),
  };
  checkUser = null;

  checkUserType = (email) => {
    if (email.includes("optstu")) {
      window.jry = false;
    } else if (email.includes("optjry")) {
      window.jry = true;
    }
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          this.checkUser = userAuth;
          this.checkUserType(userAuth.email);

          console.log(userAuth.email, userAuth.photoURL);
          let Id = userAuth.email;
          Id = Id.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, "");
          Id = Id.toLowerCase();

          console.log(userAuth.email, userAuth.displayName);
          await updateUserStatus(Id);
          // window.userData = await getUserDetails(userAuth.email);
          this.setState(
            {
              user: userAuth,
            },
            () => {
              console.log(this.state.user, "user found");
            }
          );

          localStorage.setItem("UserAuth", JSON.stringify(userAuth));
          await addLoginAnalytics(userAuth);
          window.app.appConfig(userAuth);
          addDisconnectListener(userAuth);
        } else {
          localStorage.removeItem("UserAuth");
          this.checkUser = null;
          localStorage.clear();
          sessionStorage.clear();
          window.userData = null;
          this.setState({
            user: null,
          });
        }
      } catch (error) {
        if (error.code === "NoUserFound") {
          if (window.showLoginError) {
            window.showLoginError(error);
          }
          if (this.checkUser !== null) {
            signOut(true);
          }
        }
      }
    });
  };
  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
