// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { ImageString } from "../../../const/assets/ImageString";
import { UserContext } from "../../auth/providers";
import "./Tut.css";

const states = {
  introCard: 0,
  tutCard: 1,
  leaderboard: 2,
};

const HeaderBackground = {
  background: "url(/assets/images/MainEventLogo.png)",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#F291BC",
  marginTop: "0",
};

const TutCard = [
  {
    link: "/3dAssets/UI/Tut/arrows.jpg",
    header: "Arrows",
    description: " Tap the left and right arrows to view more.",
  },
  {
    link: "/3dAssets/UI/Tut/hotspot.jpg",
    header: "Hotspots",
    description: "Tap on any hotspot to enter that section.",
  },
  {
    link: "/3dAssets/UI/Tut/Menu.jpg",
    header: "Menu",
    description: "Use the menu icons for quick navigation",
  },
];

class LobbyTut extends Component {
  state = {
    currentState: states.introCard,
  };

  handleContinue = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.skip();
  };

  showNextCard = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState((prev) => ({
      currentState: prev.currentState + 1,
    }));
  };

  render() {
    return (
      <>
        <div className="lobbyTutContainer">
          {this.state.currentState === states.introCard && (
            <>
              <div className="tutCardContainer width-cal">
                <div
                  className="tutCardContainer-header tutCardContainer-headerImg ptb-extra justify-content-between "
                  style={HeaderBackground}
                >
                  <img
                    src={ImageString.LOGOR1_old}
                    alt="logo1"
                    className="invi"
                  ></img>
                  <img
                    src={ImageString.LOGOKOA}
                    alt="logo2"
                    className="invi"
                  ></img>
                </div>
                <div className="tutCardContainer-body tutCardContainer-body-extraPd">
                  <div
                    className="tutCardContainer-body-textContainer"
                    style={{ textAlign: "left" }}
                  >
                    {/* <strong> */}
                    {/* <h3 style={{ textTransform: "capitalize" }}>
                      Dear{" "}
                      {this.context.displayName
                        ? this.context.displayName
                        : "Delegate"}
                      ,{" "}
                    </h3> */}
                    {/* </strong> */}
                    <strong>
                      Welcome to the Dream Team Pyjama Party - Summer 21
                      Conference!
                    </strong>
                    <br></br>
                    <br></br>
                    While we can’t be together in person this year, we have
                    tried to bring the things you love about conference to life
                    in your home.
                    <br></br>
                    We hope you find the sessions insightful and prepare you all
                    for the busy Christmas ahead.
                    <br></br>
                    Make sure you follow your agenda so you don’t miss out.
                    <br></br>
                  </div>
                  <div
                    // className="tutCardContainer-body-textContainer"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="tutCardButton btn  btn-yellow mg-t30"
                      onClick={(e) => this.showNextCard(e)}
                    >
                      LET’S START
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {this.state.currentState === states.tutCard && (
            <div className="tutCardContainer tutCardContainer-sm">
              <div className="tutCardContainer-header">
                <div className="blackText">Tutorial</div>
              </div>
              <div class="bottom-shade"></div>
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
                  className="tutCardButton btn  btn-yellow mg-top-lobby"
                  onClick={(e) => this.handleContinue(e)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {this.state.currentState === states.leaderboard && (
            <div className="tutCardContainer width-cal">
              <div
                className="tutCardContainer-header ptb-extra justify-content-between bottom-border"
                style={HeaderBackground}
              >
                <img
                  src={ImageString.LOGOR1_old}
                  alt="logo1"
                  className="invi"
                ></img>
                <img
                  src={ImageString.LOGOKOA}
                  alt="logo2"
                  className="invi"
                ></img>
              </div>
              <div className="tutCardContainer-body tutCardContainer-body-extraPd">
                <div className="tutCardContainer-body-textContainer">
                  <strong>
                    <h3>Overall Event Leaderboard</h3>
                  </strong>
                  <br></br>
                  Please visit all the zones of the the virtual event to gain
                  points &amp; be amongst the top of the leaderboard.
                  <br></br>
                  Please visit your profile section to know more.
                  <br></br>
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
        </div>
      </>
    );
  }
}
LobbyTut.contextType = UserContext;
export default LobbyTut;
