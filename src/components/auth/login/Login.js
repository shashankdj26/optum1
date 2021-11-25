import React, { Component } from "react";
import "./Login.css";
import mobileBottom from "./assets/bottom-mobile.png";
import cross from "./assets/closeButton.png";
import { isIOS } from "react-device-detect";
import {
  realDB,
  loadUser,
  getUserDetails,
  getUniCode,
} from "../../firebase/firebase";
import { ImageString } from "../../../const/assets/ImageString";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    name: "",
    unicode: "",
    error: false,
    errorMessage: "",
    _loading: false,
    forceDisable: false,
    forceUpdate: false,
    showConsent: false,
  };

  componentDidMount = () => {
    window.showLoginError = this.showLoginError;
  };

  onInputChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      [event.target.name]: value,
      forceDisable: false,
      error: false,
      errorMessage: "",
    });
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

  onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({
        error: false,
        forceDisable: true,
      });
      let email = this.state.email.toLowerCase().trim();
      let name = this.state.name;
      let unicode = this.state.unicode.toLowerCase().trim();
      let password = `${email}123456`;
      await getUniCode(email, unicode);
      await loadUser(email, password, "name", unicode, true);
      console.log("user loaded");
    } catch (err) {
      console.log(err);
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
        forceDisable: false,
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
      <>
        <section className="landing-page min-height-full">
          <aside
            className="landing-pageBox d-flex justify-content-between align-items-start min-height-full image-bg"
            style={{ backgroundImage: `url(${ImageString.LoginScreen})` }}
          ></aside>
          <aside className="signinBox min-height-full">
            {this.props.showLoggingIn && (
              <>
                <div className="signinBox__heading">
                  {/* <div className="left"></div> */}
                  {/* <div className="right"></div> */}
                </div>
                <br></br>
                <div
                  className="loaderContainer msg_login_container"
                  // style={{
                  //   borderTop: "0.15rem solid #e29c31",
                  // }}
                >
                  <div className="msg_login">Logging you in...</div>
                  <br />
                  <img src="/assets/images/Loader.gif" alt="loader"></img>
                </div>
              </>
            )}
            {!this.props.showLoggingIn && (
              <>
                <form onSubmit={this.onFormSubmit}>
                  <div className="signinBox__heading">
                    {/* <div className="left"></div> */}
                    {/* <div className="right"></div> */}
                  </div>
                  <div className="signinBox__body pd-top-body">
                    <div className="form-group mg-b50">
                      <input
                        type="email"
                        className="form-control "
                        name="email"
                        value={this.state.email}
                        placeholder="ENTER YOUR EMAIL ID"
                        onChange={this.onInputChange}
                        autoComplete="off"
                        autoCorrect="off"
                        required={true}
                      />
                    </div>
                    <div className="form-group mg-b50">
                      <input
                        type="text"
                        className="form-control"
                        name="unicode"
                        value={this.state.unicode}
                        placeholder="ENTER UNIQUE CODE"
                        onChange={this.onInputChange}
                        required={true}
                      />
                    </div>
                    {this.state.error && (
                      <div className="mg-b50 errorBox">
                        {/* Thank you for your interest.<br></br>
                      Please visit these links for live streaming of the summit:<br></br>
                      <div>
                        <img src="/3dAssets/UI/Icon_web.png" alt="web" onClick={() => window.open(this.props.links.weblink, "_blank")}></img>
                        <img src="/3dAssets/UI/Icon_facebook.png" alt="web" onClick={() => window.open(this.props.links.fblink, "_blank")}></img>
                        <img src="/3dAssets/UI/Icon_youtube.png" alt="web" onClick={() => window.open(this.props.links.ytlink, "_blank")}></img>
                        <img src="/3dAssets/UI/Icon_twitter.png" alt="web" onClick={() => window.open(this.props.links.twitterLink, "_blank")}></img>

                      </div> */}
                        {this.state.errorMessage}
                      </div>
                    )}
                    <div className="">
                      <button
                        className="btn btn-lg btn-signIn btn-pd"
                        disabled={
                          this.state.forceDisable
                            ? true
                            : !this.validateEmail(this.state.email)
                        }
                      >
                        SIGN IN
                      </button>
                    </div>
                    <div className="login-faqs">
                      <p style={{ textAlign: "left", color: "#fff" }}>
                        For more information, please visit the{" "}
                        <span
                          style={{
                            color: "#69b9f7",
                            display: "inline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            this.setState({ showConsent: true });
                          }}
                        >
                          FAQ document
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="bottom-mobile-img">
                    <img src={mobileBottom} />
                  </div>
                </form>
                <div
                  className={`bottom-img ${isIOS ? "ipad-bottom" : ""}`}
                ></div>
              </>
            )}
          </aside>
        </section>

        <div
          className={this.state.showConsent ? "consent__viewer" : "notOpened"}
          onClick={() => {
            this.setState({ showConsent: false });
          }}
        >
          <img src={cross} alt="" className="cross" />
          {this.state.showConsent ? (
            <>
              <iframe
                title={"pdf"}
                src={
                  "/web/viewer.html?file=%2Fassets%2Fcontent%2Finfo_desk%2FFAQs.pdf"
                }
                className="main_consent_container"
                width="100%"
                height="100%"
              ></iframe>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default Login;
