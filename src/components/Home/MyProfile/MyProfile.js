import React, { Component } from "react";
import { isIOS } from "react-device-detect";
import { HotspotType } from "../../../const/fixed/Types";
import UserContext from "../../auth/providers/UserContext";
import {
  addLogoutAnalytics,
  firestore,
  getUserScore,
  signOut,
} from "../../firebase/firebase";
const starStyle = {
  background: "url(/assets/images/leaderStart.png)",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
};
class MyProfile extends Component {
  state = {
    score: 0,
  };

  componentDidMount = async () => {
    window.pro = this;
    let user = {
      name: this.context.displayName ? this.context.displayName : "User",
      email: this.context.email ? this.context.email : "userEmail@example.com",
    };
    this.setState({ ...user });
    const score = await getUserScore(this.context);
    this.setState({
      score: score,
    });

    if (!this.context.displayName) {
      await this.context.updateProfile({
        displayName: this.context.email.split("@")[0],
      });
    }
    // if (window.userData) {
    //     let Id = this.context.email.split('@')[0];
    //     const userData = await this.getUserdata(Id);
    //     window.userData = userData;
    //     this.setState(window.userData);
    // } else {
    //     this.setState(window.userData);
    // }
  };

  getUserdata = (phoneNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = firestore
          .collection("userData")
          .where("phoneNumber", "==", `${phoneNumber}`);
        const query = await docRef.get();
        if (query.empty) {
          let error = {
            code: "UserNotFound",
            message: "User is not registered",
          };
          throw error;
        }
        resolve(query.docs[0].data());
      } catch (err) {
        reject(err);
      }
    });
  };

  logout = (event) => {
    event.preventDefault();
    addLogoutAnalytics(this.context).then(() => {
      signOut();
    });
  };

  handleButtonClick = () => {
    this.props.ShowMediaModal(
      HotspotType.pdf,
      "/web/viewer.html?file=%2Fassets%2Fcontent%2Fleaderboard.pdf"
    );
  };

  render() {
    console.log(this.context);
    return (
      <>
        <div className="user-profile">
          <div className="user-profile__header">
            <a
              href="#"
              className="user-profile__close"
              onClick={(e) => this.props.close(e)}
            >
              <i className="icon-close"></i>
            </a>
          </div>
          <div className="user-profile__body">
            <div className="user-profile__form">
              {/* <a href="#" className="user-profile__pic">
                                <img src="assets/images/user-pic.png" alt="" />
                                <span>Change Profile Picture</span>
                            </a> */}
              <div className="form-group">
                <label className="form-label">Name</label>
                <div className="form-group__has-icon">
                  <input
                    className="form-control"
                    value={this.state.name ? this.state.name : ""}
                    readOnly={true}
                    style={{
                      background: "#fff",
                      color: "#000",
                      border: "1px solid #000",
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Id</label>
                <div className="form-group__has-icon">
                  <input
                    className="form-control"
                    value={this.state.email ? this.state.email : ""}
                    readOnly={true}
                    style={{
                      background: "#fff",
                      color: "#000",
                      border: "1px solid #000",
                    }}
                  />
                  {/* <a href="#" className="form-group__close"><i className="icon-close"></i></a> */}
                </div>
              </div>
              {/* <div className="form-group">
                                <button className="btn btn-sm btn-yellow" onClick={(e) => this.handleButtonClick(e)}>Leaders Board Scoring Guide</button>
                            </div>
                            <div className="profile-score">
                                <div>Your <br></br>Score</div>
                                <div className="value">{this.state.score}</div>
                                <div className="scoreStar" style={starStyle}></div>
                            </div> */}
              {/* <div className="form-group">
                                <label className="form-label">Mobile No.</label>
                                <div className="form-group__has-icon">
                                    <input className="form-control" value={this.state.phoneNumber ? this.state.phoneNumber : ''} readOnly={true}/>
                                </div>
                            </div> */}
            </div>
          </div>
          <div
            // style={isIOS ? { marginBottom: "5rem" } : {}}
            className={`user-profile__footer ${
              isIOS ? "logout-profile-bottom" : ""
            }`}
          >
            <a
              href="#"
              className="btn btn-sm btn-yellow"
              onClick={(e) => this.logout(e)}
            >
              Log Out
            </a>
          </div>
        </div>
      </>
    );
  }
}
MyProfile.contextType = UserContext;
export default MyProfile;
