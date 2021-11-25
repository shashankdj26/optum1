// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { isIOS } from "react-device-detect";
import "./CustomNotification.css";
import cut from "./cut.svg";
import bell from "./bell.wav";

class CustomNotification extends Component {
  state = {
    show: false,
    message: "",
  };

  bellRef = React.createRef();
  componentDidMount() {
    window.NotificationListener = this.props.firestore
      .collection("backStage")
      .doc("notifications")
      .onSnapshot((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          let data = doc.data();
          if (data.show) {
            this.showNotification(data.message, data.time);
          }
        }
      });
  }

  componentWillUnmount() {
    if (window.NotificationListener) {
      window.NotificationListener();
    }
  }

  notificationTimerRef = null;
  showNotification = (message, timeLimit = 15) => {
    if (typeof timeLimit == "string") {
      timeLimit = parseInt(timeLimit);
    }
    if (this.notificationTimerRef) {
      clearTimeout(this.notificationTimerRef);
    }
    this.setState(
      {
        show: true,
        message: message,
      },
      () => {
        this.playBellSound();
      }
    );
    this.notificationTimerRef = setTimeout(() => {
      this.setState({
        show: false,
      });
    }, timeLimit * 1000);
  };

  closeNotification = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (this.notificationTimerRef) {
      clearTimeout(this.notificationTimerRef);
    }
    this.setState({
      show: false,
    });
  };

  playBellSound = () => {
    if (this.bellRef.current) {
      this.bellRef.current.play();
    }
  };

  render() {
    return (
      <>
        <audio src={bell} ref={this.bellRef} autoPlay={false}></audio>
        <div
          className={`notificationContainer ${
            this.state.show ? "notification-show" : "notification-hidden"
          }`}
          style={
            this.state.show && isIOS ? { bottom: "auto", top: "1rem" } : {}
          }
        >
          <div className="closeButtonContainer">
            {/* <div
              className="closeButton-notification"
              onClick={this.closeNotification}
            ></div> */}
            <img
              src={cut}
              alt=""
              className="close-cut"
              onClick={this.closeNotification}
            />
          </div>
          {this.state.message}
        </div>
      </>
    );
  }
}

export default CustomNotification;
