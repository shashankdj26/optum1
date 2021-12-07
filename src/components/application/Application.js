import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import swal from "sweetalert";
import { InternetStatus } from "../../const/fixed/Types";
import { isMobileOnly } from "react-device-detect";

import Login from "../auth/login/Login";
import LoginPageWithMessage from "../auth/login/LoginPageWithMessage";
import { UserContext } from "../auth/providers";
import { AppString } from "../firebase/AppString";
import {
  addLoginAnalytics,
  getProjectData,
  getProjectRealTimeData,
  getUserDetails,
  liveCountListener,
  turnOnUserCard,
  firestore,
  checkForSpeaker,
  checkForSpecialUser,
} from "../firebase/firebase";
import Home from "../Home/Home";

var startTime, endTime;
const downloadSize = 4995374;
var speedResult = {};
const crypto = require("crypto");
function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    try {
      const timestamp = new Date().getTime() - 30000;

      const msg = Buffer.from(
        apiKey + `${meetingNumber}` + `${timestamp}` + role
      ).toString("base64");
      const hash = crypto
        .createHmac("sha256", apiSecret.toString())
        .update(msg)
        .digest("base64");
      const sign = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
      ).toString("base64");

      res(sign);
    } catch (error) {
      console.log(error);
    }
  });
}
class Application extends Component {
  state = {
    canEnter: false,
    liveCountData: null,
    internetSpeed: InternetStatus.slow,
    mn: 93551200219,
    pwd: "hTBDH6",
    apiKey: "Tp3phWY0QFiQdAW66pMGfg",
    apiSecret: "vUvAeJiTw8UgyEGAXq30Gcd39JAKnmtw5MWz",
    signature: "",
    displayName: "",
    canShowIntro: false,
    isSpeaker: false,
    isEventLive: false,
    doneEventLiveCheck: false,
    notLiveMsg: "Event will be live soon.",
    bypass: false,
    links: {
      fblink: "",
      twitterLink: "",
      weblink: "",
      ytlink: "",
    },
  };

  bypassLock = () => {
    this.setState({
      bypass: true,
    });
  };

  checkEventStatus = () => {
    firestore
      .collection(AppString.BACKSATGE)
      .doc("eventStatus")
      .onSnapshot(
        (doc) => {
          this.setState({
            doneEventLiveCheck: true,
            isEventLive: doc.data().isLive,
            notLiveMsg: doc.data().notLiveMsg,
            links: {
              fblink: doc.data().fblink,
              twitterLink: doc.data().twitterLink,
              weblink: doc.data().weblink,
              ytlink: doc.data().ytlink,
            },
          });
        },
        (err) => console.log(err)
      );
  };

  componentDidMount() {
    this.checkEventStatus();
    window.app = this;
    this.speedTest();

    var checkVersion = function () {
      var agent = window.navigator.userAgent,
        start = agent.indexOf("OS");
      console.log(agent);
      if (
        (agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) &&
        start > -1
      ) {
        window.parent.ios_V = window.Number(
          agent.substr(start + 3, 3).replace("_", ".")
        );
        return window.parent.ios_V;
      }
      window.parent.ios_V = null;
      return 0;
    };
    const ver = checkVersion();

    var checkVersionV2 = function () {
      var agent = window.navigator.userAgent,
        start = agent.indexOf("OS");
      console.log(agent);
      if (
        (agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) &&
        start > -1
      ) {
        window.parent.ios_V2 = agent.substr(start + 3, 4).replace("_", ".");

        return window.parent.ios_V2;
      }
      window.parent.ios_V2 = null;
      return 0;
    };
    const ver2 = checkVersionV2();

    var checkMacV = () => {
      const agent = window.navigator.userAgent;
      if (
        agent.includes("Mac") ||
        agent.includes("MAC") ||
        agent.includes("mac")
      ) {
        if (agent.includes("Version/15")) {
          window.parent.isMac15 = true;
        } else {
          window.parent.isMac15 = false;
        }
      }
    };
    checkMacV();

    if (isMobileOnly) {
      document.addEventListener("click", () => {
        // console.log("aaa");
        var elem = document.body;

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
      });
    }

    if (isMobileOnly) {
      this.setState({
        canShowIntro: false,
      });
    } else {
      if (!sessionStorage.getItem("IntoPlayed")) {
        this.setState({
          canShowIntro: true,
        });
      }
    }

    setInterval(() => {
      this.speedTest();
    }, 1000 * 60 * 60);
  }

  getCurrentTimeStampV2 = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("https://dj-timeserver.glitch.me");
        const result = await res.json();
        var currDateWeb = new Date(result.epoch);
        var currDateLocal = new Date();
        var webTimeDiff = currDateWeb.getTime() - currDateLocal.getTime();
        let todaysDateTimestamp = `${currDateWeb.getFullYear()}-${
          currDateWeb.getMonth() + 1
        }-${currDateWeb.getDate()}`;
        resolve({ currDateWeb, webTimeDiff, todaysDateTimestamp });
      } catch (err) {
        reject(err);
      }
    });
  };

  appConfig = async (userAuth) => {
    try {
      this.setState({
        canEnter: false,
      });
      const { todaysDateTimestamp } = await this.getCurrentTimeStampV2();
      window.todaysDateTimestamp = todaysDateTimestamp;
      await getProjectRealTimeData();
      await getProjectData();
      const isSpeaker = await checkForSpeaker(userAuth.email);
      window.isSpeaker = isSpeaker;

      window.userData = {
        name: userAuth.displayName,
        profile_image: "/assets/images/Profile-picture.png",
      };

      checkForSpecialUser(userAuth, (err, link) => {
        if (err) {
          console.log(err);
          return;
        }
        window.specialUser = true;
        window.zoomLink = link;
      });

      // liveCountListener((data, err) => {
      //   if (err) {
      //     console.log(err);
      //     this.setState({
      //       canEnter: true,
      //     });
      //     return;
      //   }
      //   if (data) {
      //     this.setState({
      //       liveCountData: data,
      //       canEnter: true,
      //       isSpeaker
      //     });
      //   }
      // });
      firestore.collection("meetingDetails").onSnapshot(
        (query) => {
          query.forEach((doc) => {
            this.setState({
              canEnter: true,
              isSpeaker,
            });
            this.setState(
              { mn: doc.data().meetID, pwd: doc.data().pwd },
              () => {
                generateSignature(
                  this.state.apiKey,
                  this.state.apiSecret,
                  this.state.mn,
                  0
                ).then((res) => {
                  this.setState(
                    {
                      signature: res,
                      displayName: this.context.displayName,
                    },
                    () => {
                      console.log(this.state.displayName);
                    }
                  );
                });
              }
            );
          });
        },
        (err) => {
          console.log(err);
        }
      );
      // turnOnUserCard(userAuth.email);
    } catch (error) {
      console.log(error);
    }
  };

  //#region  SPeed Test
  speedTest = () => {
    console.log("speed test started");
    startTime = null;
    endTime = null;
    let skipSpeedTest = false;
    var imageAddr =
      "https://storage.googleapis.com/virtual-event-273009.appspot.com/BroadExpo/Textures/31120037-5mb.jpg";
    this.sampleImage = new Image();
    this.sampleImage.remove();
    this.sampleImage.onload = () => {
      endTime = new Date().getTime();
      if (!skipSpeedTest) {
        clearTimeout(this.speedTestTimeRef);
        this.calculateSpeed();
      }
    };
    this.sampleImage.onerror = (err, msg) => {
      window.alert(
        "Please make sure you are connected to a stabel connection."
      );
    };
    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    this.sampleImage.src = imageAddr + cacheBuster;
  };

  calculateSpeed = () => {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    speedResult.speedBps = (bitsLoaded / duration).toFixed(2);
    speedResult.speedKbps = (speedResult.speedBps / 1024).toFixed(2);
    speedResult.speedMbps = (speedResult.speedKbps / 1024).toFixed(2);
    speedResult.getResultString = () => {
      return `Your connection speed is: ${speedResult.speedBps}bps, ${speedResult.speedKbps}kbps, ${speedResult.speedMbps}Mbps,`;
    };
    console.log(
      `Your connection speed is: ${speedResult.speedBps}bps, ${speedResult.speedKbps}kbps, ${speedResult.speedMbps}Mbps,`
    );
    this.UpdateUIAfterSpeedTest();
  };

  UpdateUIAfterSpeedTest = () => {
    var speed = Math.floor(speedResult.speedMbps);
    if (speed < 2) {
      console.log("INTERNET SPEED IS low");
      this.setState({
        internetSpeed: InternetStatus.slow,
      });
    } else if (speed < 4) {
      console.log("INTERNET SPEED IS moderate");
      this.setState({
        internetSpeed: InternetStatus.moderate,
      });
    } else {
      console.log("INTERNET SPEED IS Great");
      this.setState({
        internetSpeed: InternetStatus.fast,
      });
    }
  };
  //#endregion

  render() {
    let user = this.context;

    if (!this.state.doneEventLiveCheck && !this.state.bypass) {
      return (
        <>
          <LoginPageWithMessage
            msg={"Checking Event Status"}
            needLoader={true}
          />
        </>
      );
    }

    if (
      this.state.doneEventLiveCheck &&
      !this.state.isEventLive &&
      !this.state.bypass
    ) {
      return (
        <>
          <LoginPageWithMessage
            msg={this.state.notLiveMsg}
            needLoader={false}
            bypass={this.bypassLock}
          />
        </>
      );
    }

    return (
      <>
        {user &&
        this.state.canEnter &&
        this.state.signature &&
        (this.state.isEventLive || this.state.bypass) ? (
          <div onContextMenu={(e) => e.preventDefault()}>
            <Home
              pwd={this.state.pwd}
              mn={this.state.mn}
              apiKey={this.state.apiKey}
              isSpeaker={this.state.isSpeaker}
              signature={this.state.signature}
              displayName={this.state.displayName}
              liveCountData={this.state.liveCountData}
              internetStatus={this.state.internetSpeed}
              canShowIntro={this.state.canShowIntro}
            ></Home>
          </div>
        ) : (
          <>
            <Login
              webTimeDiff={this.state.webTimeDiff}
              showLoggingIn={user ? true : false}
              links={this.state.links}
            />
          </>
        )}

        <div id="rotate">
          <div className="phone"> </div>
          <div className="message">Please rotate your device!</div>
        </div>
      </>
    );
  }
}
Application.contextType = UserContext;
export default Application;
