import React, { Component } from "react";
import "./Login.css";
import { realDB, loadUser, getUserDetails } from "../../firebase/firebase";
import { ImageString } from "../../../const/assets/ImageString";

class Login extends Component {
  state = {
    email: "",
    name: "",
    passcode: "",
    error: false,
    errorMessage: "",
    _loading: false,
    forceDisable: false,
    forceUpdate: false,
  };

  componentDidMount = () => {
    window.showLoginError = this.showLoginError;
  };

  onInputChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  showLoginError = (err) => {
    this.setState({
      error: true,
      errorMessage: err.message ? err.message : err,
    });
  };

  validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkPasscode = (userPasscode) => {};

  onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({
        error: false,
        forceDisable: true,
      });

      let userPasscode = this.state.passcode.toLowerCase().trim();
      if (userPasscode === "optstu") {
        window.jry = false;
      } else if (userPasscode === "optjry") {
        window.jry = true;
      } else {
        let err = {
          code: "InvalidPasscode",
          message: "Please enter valid passcode",
        };
        throw err;
      }
      let name = this.state.name.replace(/\s+/g, "").toLowerCase().trim();
      const userEmail = userPasscode + name + "@event.com";
      const password = `${userEmail}123456`;
      // let email = this.state.email.toLowerCase();
      // let name = this.state.name;
      // let password = `${email}123456`
      await loadUser(userEmail, password, this.state.name, true);
    } catch (err) {
      this.setState({
        forceDisable: false,
      });
      let error = "";
      switch (err.code) {
        case "auth/wrong-password":
          error = "Invalid username and password.";
          break;
        case "auth/user-not-found":
          error = "User not registered";
          break;
        case "auth/too-many-requests":
          error =
            "Too many invalid requests, please wait for 60 seconds before retrying";
          break;
        case "NoUserFound":
          error = "User not registered";
          break;
        default:
          error = err.message;
      }
      this.setState({
        error: true,
        errorMessage: error,
      });
    }
  };

  checkUserStatus = async (userId) => {
    return new Promise((resolve, reject) => {
      if (userId == undefined) {
        reject({
          code: "UserIDWasNull",
          message: "Please try again later",
        });
      } else {
        if (userId === "") {
          reject({
            code: "UserIDWasNull",
            message: "Please try again later",
          });
        }
      }
      var userCheck = realDB.ref("loggedInUser/" + userId);
      userCheck.once("value").then(
        (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            if (data.state === "online") {
              let err = {
                code: "AlreadyLogged",
                message: "User Logged in from another system.",
              };
              reject(err);
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  render() {
    if (this.state._loading) {
      return <img alt="loading" src="/images/loader.gif" />;
    }
    return (
      <section className="landing-page min-height-full">
        <aside
          className="landing-pageBox d-flex justify-content-between align-items-start min-height-full image-bg"
          style={{ backgroundImage: `url(${ImageString.LoginScreen})` }}
        ></aside>
        <aside className="signinBox min-height-full">
          {this.props.showLoggingIn && (
            <>
              <div className="signinBox__heading">
                <div className="left"></div>
                {/* <div className="right"></div> */}
              </div>
              <br></br>
              <div className="loaderContainer">
                <img src="/assets/images/Loader.gif" alt="loader"></img>
                <div>Logging you in...</div>
              </div>
            </>
          )}
          {!this.props.showLoggingIn && (
            <>
              <form onSubmit={this.onFormSubmit}>
                <div className="signinBox__heading">
                  <div className="left"></div>
                  {/* <div className="right"></div> */}
                </div>
                <div className="signinBox__body pd-t70">
                  <div className="form-group mg-b50">
                    <input
                      type="text"
                      className="form-control"
                      name="passcode"
                      value={this.state.passcode}
                      placeholder="ENTER YOUR PASSCODE"
                      onChange={this.onInputChange}
                      required={true}
                    />
                  </div>
                  <div className="form-group mg-b50">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      placeholder="ENTER YOUR NAME"
                      onChange={this.onInputChange}
                      required={true}
                    />
                  </div>
                  {/* <div className="form-group mg-b50">
                                        <input type="text" className="form-control" name="email" value={this.state.email} placeholder="ENTER YOUR EMAIL ID" onChange={this.onInputChange} autoComplete="off"
                                            autoCorrect="off" required={true} />
                                    </div> */}
                  {this.state.error && (
                    <div
                      className="mg-b50"
                      style={{ color: "red", fontSize: "1.25rem" }}
                    >
                      {this.state.errorMessage}
                    </div>
                  )}
                  <div className="">
                    <button
                      className="btn btn-md btn-yellow"
                      disabled={this.state.forceDisable ? true : false}
                    >
                      LOG IN
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </aside>
      </section>
    );
  }
}

export default Login;
