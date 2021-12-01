import React, { Component } from "react";
import "./Login.css";
import { ImageString } from "../../../const/assets/ImageString";
import "./Login.css";
import { isMobileOnly } from "react-device-detect";

import Vimeo from "react-vimeo-embed";

const HeaderBackground = {
  // background: `url(${"/assets/images/head_bg.jpg"})`,
};

const IntroImg = {
  width: "10rem",
  position: "unset",
  left: "unset",
  transform: "none",

  // background: `url(${"/assets/images/head_bg.jpg"})`,
};
export default class Intro extends Component {
  state = {
    UI: {
      showTransitionVideo: false,
      loading: false,
    },
    playing: false,
    isFirstTime: localStorage.getItem("firstTimeIntroVideo") ? true : false,
  };
  // localStorage.getItem("firstTimeIntroVideo") ? true :
  videoRef = React.createRef();
  vimeoRef = React.createRef();

  handleContinue = () => {
    // console.log('sssssssssssssssss')
    if (isMobileOnly) {
      if (this.props.close) {
        this.props.close();
      }
      return;
    }

    if (this.introVideoRef) {
      this.introVideoRef.play().then(() => {
        console.log("played intro!!");
        this.setState((prev) => ({
          UI: {
            ...prev.UI,
            showSkip: true,
          },
        }));
      });
    } else {
      return;
    }

    this.setState((prev) => ({
      UI: {
        ...prev.UI,
        loading: true,
      },
    }));

    // if (this.videoRef.current) {
    //   let video = this.videoRef.current;
    //   video.volume = 0.65;
    //   video.play();
    // }
    // this.setState((prev) => ({
    //   playing: true,
    //   UI: {
    //     ...prev.UI,
    //     loading: true,
    //   },
    // }));
  };

  handleTransitionVideoStart = () => {
    console.log("start");
    this.setState((prev) => ({
      UI: {
        ...prev.UI,
        loading: false,
        showTransitionVideo: true,
      },
    }));
  };

  handleTransitionVideoTagEnd = () => {
    console.log("end");
    if (this.props.close) {
      this.props.close();
    }
  };

  componentDidMount() {
    // console.log(this.vimeoRef.current.container);
    // console.log(`cond ${this.vimeoRef.current}`);

    if (this.vimeoRef.current) {
      this.vimeoRef.current.container.addEventListener("timeupdate", () => {
        console.log(this.vimeoRef.current.currentTime);
      });
      this.vimeoRef.current.container.onended = function () {
        console.log("video ended");
      };
    }
  }

  hadnleIntroReady = (event) => {
    console.log(event);
    this.introVideoRef = event;
    event
      .getPlayed()
      .then((e) => {
        console.log("getplayedd!!!", e);
      })
      .catch((e) => {
        console.log(e);
        console.log("ssss");
      });
  };

  handleIntroVideoStateChange = (event, event2) => {
    console.log("sss");
    console.log(event2);
    // this.setState({
    //     introState: event.data
    // })
    setTimeout(() => {
      this.handleIntroSkip();
    }, event2.duration * 1000 - 420);
    this.handleTransitionVideoStart();
  };

  handleIntroSkip = (event) => {
    console.log("end!!", event);
    if (event) {
      event.preventDefault();
    }
    if (this.props.close) {
      console.log("intro end!!");
      localStorage.setItem("firstTimeIntroVideo", "true");

      this.props.close();
    }
  };

  componentWillUnmount() {
    if (this.videoRef) {
      if (this.videoRef.current) this.videoRef.current.remove();
    }
  }

  render() {
    return (
      <>
        {this.state.UI.loading && (
          <div className="UILoader">
            <img src="/3dAssets/UI/uiLoader.gif" alt="loading..."></img>
          </div>
        )}
        <div className="main3DContainer">
          <div id="child3DContainer">
            <Vimeo
              video={"https://vimeo.com/641126966/16228f7768"}
              className={`IntroTransitionVideo ${
                this.state.UI.showTransitionVideo
                  ? "fadeInTransitionVideo introVimeo"
                  : ""
              } `}
              //   className="introVimeo"
              // autoplay
              id="audiVideoPlayer"
              //   width="100%"
              //   height="100%"
              //   style={{
              //     width: "100%",
              //     height: "100%",
              //   }}
              //   loop={false}
              playsinline={true}
              volume={1}
              autopause={false}
              controls={false}
              ref={this.vimeoRef}
              onReady={(e) => this.hadnleIntroReady(e)}
              onPlay={(e) => this.handleIntroVideoStateChange({ data: 1 }, e)}
              onEnd={(e) => this.handleIntroSkip(e)}
              onLoaded={(e) => {
                console.log(e);
                console.log("loaded");
              }}
            ></Vimeo>
            {this.state.isFirstTime && this.state.UI.showSkip && (
              <div className="skipContianer">
                <div
                  className="skipBtn"
                  onClick={(event) => {
                    if (event) {
                      event.preventDefault();
                    }
                    this.handleIntroSkip(event);
                  }}
                >
                  Skip
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="landing-page min-height-full">
          <aside
            className="landing-pageBox d-flex justify-content-between align-items-start min-height-full image-bg"
            style={
              isMobileOnly
                ? {
                    backgroundImage: `url(${ImageString.LoginScreen})`,
                    position: "absolute",
                    height: "100vh",
                  }
                : {
                    backgroundImage: `url(${ImageString.LoginScreen})`,
                    position: "absolute",
                  }
            }
          ></aside>

          {!this.state.UI.showTransitionVideo && (
            <div className="lobbyTutContainer">
              <div className="tutCardContainer width-cal botm-brdr">
                <div className="signinBox__heading__container flx-cntr ">
                  <div
                    className="tutCardContainer-header"
                    style={{
                      ...HeaderBackground,
                      background: "#fff",
                      // borderBottom: "2px solid #D4A847",
                    }}
                  >
                    <img
                      src={"/3dAssets/UI/head.png"}
                      alt="logo1"
                      style={{ ...IntroImg }}
                    />
                  </div>
                  <div className="signinBox__heading__gradient"></div>
                </div>

                <div
                  className="tutCardContainer-body tutCardContainer-body-extraPd"
                  style={{
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                    minHeight: "fit-content",
                  }}
                >
                  <div
                    className="tutCardContainer-body-textContainer"
                    style={{ textAlign: "center" }}
                  >
                    <strong>
                      <h3
                        style={{
                          fontWeight: "bold",
                          color: "#F69637",
                          marginBottom: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        Welcome to
                      </h3>
                    </strong>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "#525357",
                        fontWeight: "bold",
                        fontSize: "2rem",
                      }}
                    >
                      STRATETH<span style={{ color: "#F69637" }}>ON</span>
                    </h2>
                    <h3
                      style={{
                        textAlign: "center",
                        color: "#525357",
                        fontSize: "1.5rem",
                      }}
                    >
                      SEASON 3 GRAND FINALE
                    </h3>
                    <br />
                    <button
                      className="tutCardButton btn  btn-red "
                      onClick={(e) => this.handleContinue(e)}
                      style={{ textAlign: "center" }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.UI.showTransitionVideo && (
            <div className="skipContianer-n">
              <div
                className="skipBtn-n"
                onClick={(event) => {
                  if (event) {
                    event.preventDefault();
                  }
                  this.handleTransitionVideoTagEnd();
                }}
              >
                Skip
              </div>
            </div>
          )}
        </section>
      </>
    );
  }
}
