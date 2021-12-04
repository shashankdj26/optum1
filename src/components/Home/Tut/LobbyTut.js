// eslint-disable-next-line no-unused-vars
import { relativeTimeRounding } from "moment";
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
  // backgroundImage: `url("/assets/images/MainEventLogo.png")`,
  // backgroundPosition: "center",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "initial",
  marginTop: "0px",
  backgroundColor: "#fff",
  padding: "1rem",
  position: "relative",
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
    description: "Use the menu icons for quick navigation.",
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
              <div className="tutCardContainer width-cal main-width">
                <div
                  className="tutCardContainer-header tutCardContainer-headerImg ptb-extra justify-content-between "
                  style={HeaderBackground}
                >
                  <img
                    src={ImageString.LOGOR1_old}
                    alt="logo1"
                    className="invi"
                  ></img>
                  {/* <img
                    src={ImageString.LOGOKOA}
                    alt="logo2"
                    className="invi"
                  ></img> */}
                </div>
                <div
                  className="tutCardContainer-body tutCardContainer-body-extraPd"
                  style={{ background: "#F5F4F4" }}
                >
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
                    <strong style={{ color: "#F57F28" }}>
                      Welcome to the Grand Finale!
                    </strong>
                    <br></br>
                    <br></br>
                    We are excited to have you with us today. 12 finalist teams
                    from across 202 colleges, 5 countries, over 16,000
                    participants have made it here today. Come join us in
                    cheering them on they realise their true potential.
                  </div>
                  <div
                    // className="tutCardContainer-body-textContainer"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="tutCardButton btn  btn-yellow mg-t30 main-tut"
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
                <div className="whiteText">Tutorial</div>
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
            <div className="tutCardContainer width-cal main-width">
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
