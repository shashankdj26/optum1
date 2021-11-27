import React, { Component } from "react";
import { UserContext } from "../../auth/providers";
import ReactPlayer from "react-player";
import { VideoString } from "../../../const/assets/VideoString";
import { menuItems, menuItemsIndex } from "../../../const/Menu/MenuConst";
import { ImageString } from "../../../const/assets/ImageString";
import "../css/AudiScene.css";
import { isIOS, isMobileOnly, isSafari } from "react-device-detect";
import Dailyco from "../../dailyco/dailyco";
import VedioCall from "../../VedioCall/VedioCall";

export default class AudiScene extends Component {
  //#region Variables
  main3dContainer = React.createRef();
  child3dContainer = React.createRef();
  videoRef = React.createRef();
  mouseInlineControlHover = false;
  //#endregion

  state = {
    CurrentUrl: {
      //shows the currentUrl
      mainVideo: this.props.initialVideo,
    },
    UI: {
      //for toggling the UI elements on this componenet
      showVideo: true,
      showOverlay: false,
      showGlobalBackButton: this.props.globalBackButton,
      showSkipButton: this.props.skipButton,
      showLid: true,
      showTutComponenet: false,
      canGoFullscreen: false,
      mountDailyco: false,
      controlsHide: true,
    },
    child3dContainerStyle: {
      //used by the arrows to change margin value to move video on the screen
      marginLeft: "0",
    },
    frameVideoStyle: {
      //for fading the video element
      animation: "fadeOutEffect 1.25s ease-in-out",
      MozAnimation: "fadeOutEffect 1.25s ease-in-out",
      WebkitAnimation: "fadeOutEffect 1.25s ease-in-out",
    },
    player: {
      mute: false,
      fullScreen: false,
      maximized: false,
      playing: true,
    },
    forceUpdate: false,
    nonVideoFrame:
      this.props.videoInFrame !== undefined ? !this.props.videoInFrame : false,
  };
  forceUpdateRef = null;

  componentDidMount() {
    window.s = this;
    this.checkForFullscreen();
    if (this.props.addAnalytics) {
      this.props.addAnalytics(true);
    }
    this.previousStyle_Overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showOverlay: true,
      },
    }));
    window.addEventListener("resize", this.doForceUpdate);

    if (this.props.exceuteOnMount) {
      this.props.exceuteOnMount();
    }
    this.checkForTut();
    document.addEventListener("fullscreenchange", this.fullscreenEvent);

    if (this.props.useDailyCo) {
      this.handleIframeLoad();
    }
  }

  checkForTut = () => {
    if (this.props.showTut) {
      let sceneName = "home";
      if (!this.props.sceneName) {
        console.error("NoSceneName is provided, for now it is set to home");
      } else {
        sceneName = this.props.sceneName;
      }
      if (sessionStorage.getItem(`${sceneName}-tut`) !== "visited") {
        if (this.props.showingTutorialEvent) {
          this.props.showingTutorialEvent("start");
        }
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            showTutComponenet: true,
          },
        }));
        return;
      }
    }
  };

  closeTut = () => {
    let sceneName = "home";
    if (this.props.sceneName) {
      sceneName = this.props.sceneName;
    }
    sessionStorage.setItem(`${sceneName}-tut`, "visited");
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTutComponenet: false,
      },
    }));
  };

  doForceUpdate = () => {
    this.setState({
      forceUpdate: true,
    });
  };

  componentWillUnmount = () => {
    if (this.props.addAnalytics) {
      this.props.addAnalytics(false);
    }
    if (this.forceUpdateRef) {
      clearTimeout(this.forceUpdateRef);
    }
    document.body.style.overflow = this.previousStyle_Overflow;
    window.removeEventListener("resize", this.doForceUpdate);
    document.removeEventListener("fullscreenchange", this.fullscreenEvent);
  };

  updateChild3DContainerStyle = (newStyle) => {
    this.setState({
      child3dContainerStyle: {
        ...newStyle,
      },
    });
  };

  //#region Back Button

  backToLobby = (event) => {
    if (event) event.preventDefault();
    this.toggleHUDElement(false, false, false);
    if (this.frameImageRef.current) {
      this.setState({
        frameImageClass: "fadeIn",
      });
      this.frameImageRef.current.addEventListener(
        "webkitAnimationEnd",
        this.playLobbyLoop
      );
      this.frameImageRef.current.addEventListener(
        "animationend",
        this.playLobbyLoop
      );
    } else {
      this.playLobbyLoop();
    }
  };

  playLobbyLoop = () => {
    this.setState((prevState) => ({
      CurrentUrl: {
        ...prevState.CurrentUrl,
        mainVideo: VideoString.LOBBYLOOP,
      },
      UI: {
        ...prevState.UI,
        showVideo: true,
        showImage: false,
        showBackButton: false,
      },
      frameImageClass: "fadeOut",
      frameVideoStyle: {
        visibility: `visible`,
        animation: "fadeOutEffect 1.25s ease-in-out",
        MozAnimation: "fadeOutEffect 1.25s ease-in-out",
        WebkitAnimation: "fadeOutEffect 1.25s ease-in-out",
      },
      currentHotspot: this.LobbyHotspots,
    }));

    if (!this.props.isImageScene) {
      this.videoRef.current.load();
      this.videoRef.current.loop = true;
      this.videoRef.current.play();
    }
    setTimeout(() => {
      this.toggleHUDElement(true, true, false);
    }, 1.25 * 1000);
  };
  //#endregion

  calculateOverlayStyle = () => {
    if (this.videoRef.current) {
      return {
        width: `${this.videoRef.current.clientWidth}px`,
        height: `${this.videoRef.current.clientHeight}px`,
      };
    } else {
      let videoRef = document.querySelector("#FrameVideo");
      console.log(videoRef);
      if (videoRef)
        return {
          width: `${videoRef.clientWidth}px`,
          height: `${videoRef.clientHeight}px`,
        };
    }
  };

  handleSkip = (event) => {
    event.preventDefault();
    if (this.props.skipVideo) {
      this.props.skipVideo();
    } else {
      console.error("No function is passed to skip the video, Please check");
    }
  };

  handleBackButton = (event) => {
    event.preventDefault();
    if (this.props.changeComponenet) {
      this.props.changeComponenet(event, menuItems[menuItemsIndex.Lobby]);
    } else {
      console.error("No function is passed to change component, Please check");
    }
  };

  handleVideoEnd = (event) => {
    if (this.props.autoSkipOnCompeletion)
      if (this.props.skipVideo) {
        this.props.skipVideo();
      }
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showLid: true,
      },
    }));
  };

  handleVideoPlay = (event) => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showLid: false,
      },
    }));
  };

  handleVideoPause = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showLid: true,
      },
    }));
  };

  handleVideoPlayerClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.mouseInlineControlHover) {
      return;
    }
    this.setState((prev) => ({
      player: {
        ...prev.player,
        playing: !prev.player.playing,
      },
    }));
  };

  handleInfoButton = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTutComponenet: true,
      },
    }));
  };

  handleZoomButton = (e) => {
    e.preventDefault();
    let link = this.props.AudiZoomLink
      ? this.props.AudiZoomLink
      : "https://www.google.com";
    window.open(link);
  };

  handleInlineMouseHover = (value) => {
    this.mouseInlineControlHover = value;
  };

  handleIframeLoad = () => {
    if (this.props.useDailyCo) {
      this.setState((prev) => ({
        UI: {
          ...prev.UI,
          mountDailyco: true,
        },
      }));
    }
    // mountDailyco
  };

  toggleMaximized = () => {
    var player = this.state.player;
    player.maximized = !player.maximized;
    this.setState({ player });
  };

  onCallDisconnect = () => {
    console.log("Call Disconnected!");
    this.backToLobby();
  };

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  toggleControls = () => {
    if (this.mouseMoveRef) clearTimeout(this.mouseMoveRef);

    this.mouseMoveRef = setTimeout(() => {
      clearTimeout(this.mouseMoveRef);
      this.setState((prev) => ({
        player: {
          ...prev.player,
          controlsHide: true,
        },
      }));
    }, 2000);

    this.setState((prev) => ({
      player: {
        ...prev.player,
        controlsHide: false,
      },
    }));
  };
  render() {
    const { DailyCoData } = this.props;
    return (
      <>
        {
          // this.state.UI.mountDailyco &&
          // <>
          //     <Dailyco
          //         goToLobby={DailyCoData.goToLobby}
          //         name={DailyCoData.name}
          //         room={DailyCoData.room}
          //         isAdmin={DailyCoData.isAdmin}
          //         autoInitalize={DailyCoData.autoInitalize}
          //         showSidePanel={DailyCoData.showSidePanel}
          //         hideSidePanel={DailyCoData.hideSidePanel}
          //     >
          //     </Dailyco>
          // </>
        }
        {this.state.UI.showGlobalBackButton && (
          <img
            src={ImageString.BACKBUTTON}
            alt="backButtonToLobby"
            className="backButton audi-back"
            onClick={(e) => this.handleBackButton(e)}
          ></img>
        )}
        {this.props.showTut && (
          <img
            src={ImageString.INFOBUTTON}
            alt="infoButton"
            className={`infoButton-audi ${isIOS ? "ios-btn-right" : ""}`}
            onClick={(e) => this.handleInfoButton(e)}
          ></img>
        )}
        {this.props.showZoom && (
          <div
            className="zoom-audi"
            style={isIOS ? { bottom: "3.5rem" } : {}}
            onClick={(e) => this.handleZoomButton(e)}
          >
            <button className="zoomButtonAudi">Awards & Afterparty</button>
          </div>
        )}
        <div className="main3DContainer" ref={this.main3dContainer}>
          <div
            id="child3DContainer"
            ref={this.child3dContainer}
            style={this.state.child3dContainerStyle}
          >
            {this.props.isImageScene && (
              <img
                ref={this.videoRef}
                id="FrameVideo"
                src={this.props.initalImage}
                style={{
                  ...this.state.frameVideoStyle,
                  height: "100vh",
                  width: "auto",
                  maxWidth: "none",
                }}
                alt="MainSceneImage"
              ></img>
            )}

            {!this.props.isImageScene && !isMobileOnly && !isIOS && (
              <video
                id="FrameVideo"
                width="320"
                height="240"
                loop={true}
                autoPlay={true}
                preload="auto"
                ref={this.videoRef}
                style={this.state.frameVideoStyle}
                playsInline={true}
                muted={true}
              >
                <source
                  src={this.state.CurrentUrl.mainVideo}
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
            )}
            {this.state.UI.showOverlay && (
              <>
                <div
                  id="overlayContent"
                  style={
                    isMobileOnly && isIOS
                      ? {
                          width: "100%",
                          height: "100%",
                        }
                      : {
                          height: "100%",
                          width: "calc(100vh * 2.33)",
                        }
                  }
                  onClick={(e) => {
                    this.toggleControls();
                  }}
                  onMouseMove={(e) => {
                    this.toggleControls();
                  }}
                  onTouchMove={(e) => {
                    this.toggleControls();
                  }}
                  // style={this.calculateOverlayStyle()}
                  className={`${
                    this.state.player.fullScreen || this.state.player.maximized
                      ? "unsetPos"
                      : ""
                  }`}
                >
                  <div
                    id="audiVideoFrame"
                    className={`${isIOS ? "ios-video" : ""} ${
                      this.props.subMenus ? "w-s-m" : ""
                    }`}
                    style={
                      this.state.player.fullScreen ||
                      this.state.player.maximized
                        ? {
                            width: this.state.player.maximized
                              ? "calc(100% - 7rem)"
                              : "100%",
                            height: this.state.player.maximized
                              ? "calc(100% - 7rem)"
                              : "100%",
                            position: "fixed",
                            zIndex: "44",
                          }
                        : !isMobileOnly && !isIOS
                        ? this.props.framePlacementStyle
                        : {
                            margin: "0",
                            width: "100%",
                            height: `${
                              this.props.subMenus ? "35vh" : "calc(100% - 5rem)"
                            }`,
                          }
                    }
                  >
                    {this.state.nonVideoFrame ? (
                      <>
                        {/* <iframe
                                                        id="video-iframe"
                                                        allow="camera; microphone; autoplay"
                                                        width="100%"
                                                        height="100%"
                                                        frameBorder="0"
                                                        src={this.props.link}
                                                        title="video-iframe"
                                                        style={{ background: 'black' }}
                                                    // onLoad={this.handleIframeLoad}
                                                    ></iframe> */}
                      </>
                    ) : (
                      <>
                        {this.state.UI.canGoFullscreen && this.props.showCover && (
                          <>
                            <div
                              className={`videoPlayerCover ${
                                !this.state.UI.showLid
                                  ? ""
                                  : "blackTransparentColor"
                              }`}
                              onClick={(e) => this.handleVideoPlayerClick(e)}
                              style={
                                this.state.player.fullScreen
                                  ? {
                                      width: "100%",
                                      height: "100%",
                                    }
                                  : !isMobileOnly && !isIOS
                                  ? {
                                      ...this.props.framePlacementStyle,
                                      margin: 0,
                                    }
                                  : {
                                      margin: "0",
                                      width: "100%",
                                      height: `${
                                        this.props.subMenus ? "35vh" : "100%"
                                      }`,
                                    }
                              }
                            >
                              <div
                                className={`lid upperLid ${
                                  this.state.UI.showLid ? "" : "animateLid"
                                }`}
                              ></div>
                              <div
                                className={`lid lowerLid ${
                                  this.state.UI.showLid ? "" : "animateLid"
                                }`}
                              ></div>
                              <div className={`fakePlaybutton-container`}>
                                <div
                                  className={`fakePlaybutton ${
                                    this.state.UI.showLid ? "" : "animateLid-0"
                                  }`}
                                  onClick={
                                    this.state.UI.showLid
                                      ? (e) => this.handleVideoPlay(e)
                                      : null
                                  }
                                ></div>
                              </div>
                            </div>

                            <div
                              className={`videoPlayerCover ${
                                !this.state.UI.showLid
                                  ? ""
                                  : "blackTransparentColor"
                              }`}
                              style={
                                this.state.player.fullScreen
                                  ? {
                                      height: "100%",
                                    }
                                  : !isMobileOnly && !isIOS
                                  ? {
                                      ...this.props.framePlacementStyle,
                                      margin: 0,
                                      width: "unset",
                                    }
                                  : {
                                      margin: "0",
                                      width: "unset",
                                      height: `${
                                        this.props.subMenus ? "35vh" : "100%"
                                      }`,
                                    }
                              }
                            >
                              <div className="inlineVideoControlsContainer">
                                <div
                                  className={`videoControlsContainer-fullscreen ${
                                    this.state.player.fullScreen
                                      ? "videoControlsContainer-b-1"
                                      : ""
                                  } ${
                                    this.state.player.controlsHide
                                      ? "playerControls-hide"
                                      : ""
                                  }`}
                                  onMouseEnter={(e) =>
                                    this.handleInlineMouseHover(true)
                                  }
                                  onMouseLeave={(e) =>
                                    this.handleInlineMouseHover(false)
                                  }
                                >
                                  {this.props.hiddeMute === undefined
                                    ? true
                                    : !this.props.hiddeMute && (
                                        <img
                                          className="mg-b-2rem cursor-pointer videoControlsIcon"
                                          src={`/3dAssets/UI/${
                                            this.state.player.mute
                                              ? "mute_white.png"
                                              : "unmute_white.png"
                                          }`}
                                          alt="muteButton"
                                          onClick={(e) =>
                                            this.setState((prev) => ({
                                              player: {
                                                ...prev.player,
                                                mute: !prev.player.mute,
                                              },
                                            }))
                                          }
                                        ></img>
                                      )}

                                  <img
                                    className="cursor-pointer videoControlsIcon"
                                    src={`/3dAssets/UI/${
                                      this.state.player.fullScreen
                                        ? "closeFullScreen_white.png"
                                        : "FullScreen_white.png"
                                    }`}
                                    alt="fullScreenButton"
                                    onClick={(e) =>
                                      this.handleFullscreenButton(e)
                                    }
                                    style={
                                      this.props.hiddeMute === undefined
                                        ? {}
                                        : !this.props.hiddeMute
                                        ? {}
                                        : { marginTop: "0" }
                                    }
                                  ></img>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <ReactPlayer
                          id="audiVideoPlayer "
                          // className={`${isSafari ? "audi-video-myiframe" : ""}`}
                          url={this.props.link}
                          playing={this.state.player.playing}
                          controls={true}
                          loop={true}
                          config={{
                            youtube: {
                              playerVars: {
                                showinfo: 0,
                                controls: 1,
                                disablekb: 0,
                                enablejsapi: 0,
                                modestbranding: 1,
                                rel: 0,
                                playsinline: 1,
                              },
                            },
                          }}
                          showinfo={0}
                          playsinline={true}
                          width="100%"
                          height="100%"
                          volume={this.state.player.mute ? 0 : 1}
                          // muted={this.state.player.mute}
                          onEnded={this.handleVideoEnd}
                          onPlay={this.handleVideoPlay}
                          onPause={this.handleVideoPause}
                        />
                      </>
                    )}
                    {this.props.useDailyCo && (
                      <VedioCall
                        room={{
                          roomId: "asdf",
                          roomName: "Test Room",
                          seller: false,
                        }}
                        user={{
                          email: this.context.email
                            ? ` (${this.context.email})`
                            : "abc@xyz.com" + "_" + this.makeid(5),
                          userName: this.context.displayName, // + "_" + this.makeid(5),
                        }}
                        // roomDetails={this.props.roomDetails}
                        onDisconnect={this.onCallDisconnect}
                        forceDisconnect={this.state.forceDisconnect}
                        maximized={this.state.player.maximized}
                        toggleMaximized={this.toggleMaximized}
                        // joinAsSeller={false}
                        // stallDetails={this.props.stallDetails}
                        // categories={this.props.categories}
                        // getUserWishList={this.props.getUserWishList}
                        // addAnalytics={this.startAnalyticsforVideoCall}
                      ></VedioCall>
                    )}
                  </div>
                </div>
                {/* <div className="coverFullScreen">
                                    <div className="videoControlsContainer-fullscreen">
                                        {
                                            this.props.hiddeMute === undefined ? true : !this.props.hiddeMute &&
                                                <img
                                                    className="mg-b-2rem cursor-pointer videoControlsIcon"
                                                    src={`/3dAssets/UI/${this.state.player.mute ? 'mute_white.png' : 'unmute_white.png'}`} alt="muteButton" onClick={e => this.setState(prev => ({
                                                        player: {
                                                            ...prev.player,
                                                            mute: !prev.player.mute
                                                        }
                                                    }))}></img>
                                        }

                                        <img className="cursor-pointer videoControlsIcon"
                                            src={`/3dAssets/UI/${this.state.player.fullScreen ? 'closeFullScreen_white.png' : 'FullScreen_white.png'}`} alt="fullScreenButton" onClick={e => this.handleFullscreenButton(e)}
                                            style={this.props.hiddeMute === undefined ? {} : !this.props.hiddeMute ? {} : { marginTop: '0' }}></img>
                                    </div>
                                </div> */}
              </>
            )}
            {this.state.UI.showSkipButton && (
              <div className="welcome-footer">
                <button
                  className="btn btn-lg btn-dark"
                  onClick={(e) => this.handleSkip(e)}
                >
                  <span className="d-flex justify-content-between">
                    {this.props.skipButtonText
                      ? this.props.skipButtonText
                      : "Skip this Show"}
                    <span className="mg-l20">
                      <i className="icon-angle-right"></i>
                      <i className="icon-angle-right"></i>
                    </span>
                  </span>
                </button>
              </div>
            )}
            {this.state.UI.showTutComponenet && this.props.tutComponent && (
              <this.props.tutComponent
                ratio={this.ratio}
                skip={this.closeTut}
              ></this.props.tutComponent>
            )}
          </div>
        </div>
      </>
    );
  }

  checkForFullscreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;
    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      if (requestFullScreen) {
        console.log("can Full screem");
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            canGoFullscreen: true,
          },
        }));
      } else {
        console.log("not possible");
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            canGoFullscreen: false,
          },
        }));
      }
    }
  };

  handleFullscreenButton = (event) => {
    if (event) {
      event.preventDefault();
    }
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      if (requestFullScreen) {
        console.log("can Full screem");
        requestFullScreen.call(docEl).then(() => {
          this.setState((prev) => ({
            player: {
              ...prev.player,
              fullScreen: true,
            },
          }));
        });
      } else {
        console.log("not possible");
      }
    } else {
      if (cancelFullScreen) cancelFullScreen.call(doc);
      this.setState((prev) => ({
        player: {
          ...prev.player,
          fullScreen: false,
        },
      }));
    }

    // if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.webkitExitFullscreen) {
    //         document.webkitExitFullscreen();
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //     } else if (document.msExitFullscreen) {
    //         document.msExitFullscreen();
    //     }
    //     this.setState(prev => ({
    //         player: {
    //             ...prev.player,
    //             fullScreen: false
    //         }
    //     }))
    // } else {
    //     const _element = document.documentElement;
    //     if (_element.requestFullscreen) {
    //         _element.requestFullscreen().then(() => {
    //             this.setState(prev => ({
    //                 player: {
    //                     ...prev.player,
    //                     fullScreen: true
    //                 }
    //             }))
    //         }).catch(() => {
    //             console.log("cannot enter fullscreen")
    //         });;
    //     } else {
    //         if (_element.mozRequestFullScreen) {
    //             _element.mozRequestFullScreen().then(() => {
    //                 this.setState(prev => ({
    //                     player: {
    //                         ...prev.player,
    //                         fullScreen: true
    //                     }
    //                 }))
    //             }).catch(() => {
    //                 console.log("cannot enter fullscreen")
    //             });;
    //         } else {
    //             if (_element.webkitRequestFullscreen) {
    //                 _element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(() => {
    //                     this.setState(prev => ({
    //                         player: {
    //                             ...prev.player,
    //                             fullScreen: true
    //                         }
    //                     }))
    //                 }).catch(() => {
    //                     console.log("cannot enter fullscreen")
    //                 });;
    //             }
    //         }
    //     }
    // }
    // if (!document.fullscreenElement) {
    //     // document.documentElement.requestFullscreen().then(() => {
    //     //     this.setState(prev => ({
    //     //         player: {
    //     //             ...prev.player,
    //     //             fullScreen: true
    //     //         }
    //     //     }))
    //     // }).catch(() => {
    //     //     console.log("cannot enter fullscreen")
    //     // });

    // } else {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //         this.setState(prev => ({
    //             player: {
    //                 ...prev.player,
    //                 fullScreen: false
    //             }
    //         }))
    //     }
    // }
  };

  fullscreenEvent = () => {
    if (document.fullscreenElement) {
    } else {
      this.setState((prev) => ({
        player: {
          ...prev.player,
          fullScreen: false,
        },
      }));
    }
  };
}

AudiScene.contextType = UserContext;
