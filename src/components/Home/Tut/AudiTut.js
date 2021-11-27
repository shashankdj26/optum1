// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "./Tut.css";

const TutCard = [
  {
    link: "/3dAssets/UI/AudiTut/FullScreen.jpg",
    header: "Full Screen",
    description: "Tap on the icon to view the content on full screen.",
  },
  {
    link: "/3dAssets/UI/AudiTut/ExitFullScreen.jpg",
    header: "Exit Full Screen",
    description: "Tap on the icon to exit full screen.",
  },
  {
    link: "/3dAssets/UI/AudiTut/PlayButton.jpg",
    header: "Play Button",
    description: "Tap on the play icon to play the video.",
  },
  {
    link: "/3dAssets/UI/AudiTut/Polls.jpg",
    header: "Polls",
    description: "Tap on the icon to participate in public poll.",
  },
  {
    link: "/3dAssets/UI/AudiTut/Q&A.jpg",
    header: "Q&A",
    description:
      "Tap on the icon to submit your question and get answer to it.",
  },
];

const state = {
  audiTut: 0,
  zoomLink: 1,
};

export default class AudiTut extends Component {
  state = {
    currentState: state.audiTut,
  };

  handleContinue = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (window.specialUser) {
      if (this.state.currentState === state.audiTut) {
        this.setState({
          currentState: state.zoomLink,
        });
      } else {
        this.props.skip();
      }
    } else {
      this.props.skip();
    }
  };

  call = (event) => {
    if (event) {
      event.preventDefault();
    }
    // window.location.href = window.zoomLink;
    window.open(window.zoomLink, "_blank");
  };

  render() {
    return (
      <>
        {this.state.currentState === state.audiTut && (
          <div className="lobbyTutContainer">
            <div className="tutCardContainer tutCardContainer-sm">
              <div className="tutCardContainer-header">
                <div>Tutorial</div>
              </div>
              <div className="tutCardContainer-body">
                {TutCard.map((item) => (
                  <div key={item.header} className="tutCardContainer-bodyItem">
                    <img alt={item.header} src={item.link}></img>
                    <div className="bodyItem-text">
                      <h2>{item.header}</h2>
                      <div>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  className="tutCardButton btn  btn-yellow mg-t30"
                  onClick={(e) => this.handleContinue(e)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.currentState === state.zoomLink && (
          <div className="lobbyTutContainer">
            <div
              className="tutCardContainer tutCardContainer-sm"
              style={{ background: "#F5F4F4" }}
            >
              <div className="tutCardContainer-header">
                <div>Redirect</div>
              </div>
              <div className="tutCardContainer-body">
                Please click on button below to go to the video call.
              </div>
              <div className="text-center">
                <button
                  className="tutCardButton btn  btn-yellow mg-t30"
                  onClick={(e) => this.handleContinue(e)}
                >
                  Cancel
                </button>
                <button
                  className="tutCardButton btn  btn-yellow mg-t30"
                  onClick={(e) => this.call(e)}
                  style={{ marginLeft: "1rem" }}
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
