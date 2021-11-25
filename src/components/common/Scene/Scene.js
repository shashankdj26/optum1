import React, { Component } from "react";
import { isMobileOnly, isIOS } from "react-device-detect";
import ReactPlayer from "react-player";
import { ImageString } from "../../../const/assets/ImageString";
import {
  HotspotButtonType,
  HotspotType,
  TransitionType,
  AnalyticsLocations,
} from "../../../const/fixed/Types";
import { menuItems, menuItemsIndex } from "../../../const/Menu/MenuConst";
import { UserContext } from "../../auth/providers";
import {
  addCustomRealtimeHotspotAnalytics,
  addRealtimeHotspotAnalytics,
} from "../../firebase/firebase";
import Arrows from "../Arrow/Arrows";
import "../css/AudiScene.css";
import "./Scene.css";

const IntroImageStyle = {
  height: `100%`,
  width: `100%`,
  maxWidth: "none",
  position: "absolute",
  zIndex: 1,
};

const FADEOUTEFFECT = {
  animation: "fadeOutEffect 0.25s ease-in-out",
  MozAnimation: "fadeOutEffect 0.25s ease-in-out",
  WebkitAnimation: "fadeOutEffect 0.25s ease-in-out",
};

const FADEINEFFECT = {
  visibility: `visible`,
  animation: "fadeInEffect 0.25s ease-in-out",
  MozAnimation: "fadeInEffect 0.25s ease-in-out",
  WebkitAnimation: "fadeInEffect 0.25s ease-in-out",
};

const VISIBLESTYLE = {
  visibility: `visible`,
};

const HIDDENSTYLE = {
  visibility: "hidden",
};

const lobbyBranding = [
  "lobbyCenterBuildingBranding",
  "lobbyLeftBuildingBranding",
  "lobbyRightBuildingBranding",
  "lobbyLeftPillarBranding",
  "lobbyRightPillarBranding",
  "lobbyLeftWallBranding",
  "lobbyRightWallBranding",
  "lobbyInfodeskStandeeBranding",
];

export default class Scene extends Component {
  //#region Variables
  previousStyle_Overflow = "";
  currentTransitionType = TransitionType.withInComponent;
  afterTransitionItem = null;
  main3dContainer = React.createRef();
  child3dContainer = React.createRef();
  videoRef = React.createRef();
  transitionVideoRef = React.createRef();
  frameImageRef = React.createRef();
  arrowRef = React.createRef();
  //#endregion

  state = {
    CurrentUrl: {
      //shows the currentUrl
      mainVideo: this.props.initialVideo,
      image: null,
      transitionVideo: "",
    },
    UI: {
      //for toggling the UI elements on this componenet
      fadeIntroImage: false,
      showTransitionVideo: false,
      showTutComponenet: false,
      showVideo: true,
      showImage: false,
      showOverlay: false,
      showArrows: false,
      arrowsRequired: true,
      showBackButton: false,
      showGlobalBackButton: this.props.globalBackButton,
      showTutButton: true,
    },
    currentHotspot: this.props.initialHotspot,
    currentBranding: lobbyBranding,
    child3dContainerStyle: {
      //used by the arrows to change margin value to move video on the screen
      marginLeft: "0",
      height: "100vh",
    },
    frameImageClass: "fadeOut", //for image to fade out first and change to fade in if animation required
    frameVideoStyle: FADEOUTEFFECT,
    tranVideoStyle: HIDDENSTYLE,
    forceUpdate: false,
    InlinePlayer: {
      showLid: true,
      playing: false,
      fullScreen: false,
      mute: false,
    },
  };
  initialForceUpdate = null;
  forceUpdateRef = null;
  mouseInlineControlHover = false;

  ratio = this.props.ratio ? this.props.ratio : 2.33;

  componentDidMount() {
    window.scene = this;
    if (this.props.addAnalytics) {
      this.props.addAnalytics(true);
    }
    this.previousStyle_Overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    this.checkForTut();
    window.addEventListener("resize", this.hadnleResize);
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
            showArrows: true,
            arrowsRequired:
              window.innerWidth > window.innerHeight * this.ratio
                ? false
                : true,
          },
          child3dContainerStyle: {
            marginLeft: "0",
            height: "100vh",
          },
        }));
        return;
      }
      if (this.props.showingTutorialEvent) {
        this.props.showingTutorialEvent("end");
      }
    }
    this.initiScene();
  };

  closeTut = () => {
    let sceneName = "home";
    if (this.props.sceneName) {
      sceneName = this.props.sceneName;
    }
    if (this.videoRef) {
      if (this.videoRef.current) {
        if (!this.props.isImageScene) {
          this.videoRef.current.play();
        }
      }
    }
    sessionStorage.setItem(`${sceneName}-tut`, "visited");
    setTimeout(() => {
      if (this.props.showingTutorialEvent) {
        this.props.showingTutorialEvent("end");
      }
    }, 250);
    this.initiScene();
  };

  initiScene = () => {
    this.initialForceUpdate = setTimeout(() => {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          showOverlay: true,
          showArrows: true,
          showTutComponenet: false,
          arrowsRequired:
            window.innerWidth > window.innerHeight * this.ratio ? false : true,
        },
        child3dContainerStyle: {
          marginLeft: "0",
          height: "100vh",
        },
      }));
    }, 250);
    // this.forceUpdate = setTimeout(() => {
    //     this.setState({
    //         forceUpdate: true,
    //     })
    // }, 600)
  };

  hadnleResize = () => {
    if (window.innerWidth > window.innerHeight * this.ratio) {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          arrowsRequired: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          arrowsRequired: true,
        },
      }));
    }
  };

  componentWillUnmount = () => {
    if (this.props.addAnalytics) {
      this.props.addAnalytics(false);
    }
    if (this.forceUpdate) {
      clearTimeout(this.forceUpdate);
    }
    if (this.initialForceUpdate) {
      clearTimeout(this.initialForceUpdate);
    }
    document.body.style.overflow = this.previousStyle_Overflow;
    window.removeEventListener("resize", this.hadnleResize);
  };

  calculateOverlayStyle = () => {
    if (this.videoRef.current) {
      return {
        width: `${this.videoRef.current.clientWidth}px`,
        height: `${this.videoRef.current.clientHeight}px`,
      };
    } else {
      let videoRef = document.querySelector("#FrameVideo");
      if (videoRef)
        return {
          width: `${videoRef.clientWidth}px`,
          height: `${videoRef.clientHeight}px`,
        };
    }
  };

  resetCamera = () => {
    if (this.arrowRef.current) {
      this.arrowRef.current.recenterCamera();
    }
  };

  updateChild3DContainerStyle = (newStyle) => {
    this.setState({
      child3dContainerStyle: {
        ...newStyle,
      },
    });
  };

  toggleHUDElement = (hotspotValue, arrowsValue, backButtonValue) => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showOverlay: hotspotValue,
        showArrows: arrowsValue,
        showBackButton: backButtonValue,
      },
    }));
  };

  //#region Apply Transition

  startTransition = (
    event,
    transitionVideo,
    transitionType,
    newItem,
    newHotspots,
    hostspotName,
    newBranding
  ) => {
    if (event !== null) event.preventDefault();

    if (this.props.isImageScene) {
      transitionVideo = null;
    }

    this.resetCamera();

    this.currentTransitionType = transitionType;
    this.afterTransitionItem = newItem;
    if (transitionType === TransitionType.changeOverlayComponent) {
      this.handleTransitionWithOutVideo();
      return;
    }
    this.toggleHUDElement(false, false, false);
    this.setState({
      currentHotspot: newHotspots,
      currentBranding: !newBranding ? [] : newBranding,
    });
    if (transitionVideo == null) {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          showTutButton: false,
        },
      }));
      this.handleTransitionWithOutVideo();
      return;
    }
    this.newStateName = hostspotName;
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTutButton: false,
      },
      CurrentUrl: {
        ...prevState.CurrentUrl,
        // mainVideo: transitionVideo
        transitionVideo: transitionVideo,
      },
    }));
    this.transitionVideoRef.current.load();
    this.transitionVideoRef.current.play();
    this.transitionVideoRef.current.loop = false;
    // this.transitionVideoRef.current.addEventListener('ended', this.handleTransitionVideoEnd);
    // this.videoRef.current.addEventListener('loadedmetadata', this.applyFadeInDuringTransition);
  };

  applyFadeInDuringTransition = () => {
    this.videoRef.current.removeEventListener(
      "loadedmetadata",
      this.applyFadeInDuringTransition
    );
    setTimeout(() => {
      this.setState({
        frameVideoStyle: FADEINEFFECT,
      });
    }, this.videoRef.current.duration * 900);
  };

  handleTransitionVideoEnd = (event) => {
    if (this.currentTransitionType === TransitionType.withInComponent) {
      this.toggleHUDElement(false, true, true);
      this.updateChild3DContainerStyle({
        marginLeft: `0`,
        height: "100vh",
      });
      this.setState((prevState) => ({
        CurrentUrl: {
          ...prevState.CurrentUrl,
          image: this.afterTransitionItem,
        },
        UI: {
          ...prevState.UI,
          showVideo: false,
          showImage: true,
          showOverlay: true,
        },
        frameVideoStyle: HIDDENSTYLE,
      }));
      if (this.props.changeInternalStateHandler)
        this.props.changeInternalStateHandler(this.newStateName);
    } else if (this.currentTransitionType === TransitionType.changeComponent) {
      this.props.changeComponenet(event, this.afterTransitionItem);
    }
  };

  handleTransitionWithOutVideo = () => {
    if (this.currentTransitionType === TransitionType.withInComponent) {
      this.setState({
        frameVideoStyle: FADEINEFFECT,
      });
      this.setState((prevState) => ({
        CurrentUrl: {
          ...prevState.CurrentUrl,
          image: this.afterTransitionItem,
        },
        UI: {
          ...prevState.UI,
          showVideo: false,
          showImage: true,
          showOverlay: true,
          showBackButton: true,
          showArrows: true,
        },
        frameVideoStyle: HIDDENSTYLE,
      }));
    } else if (this.currentTransitionType === TransitionType.changeComponent) {
      this.props.changeComponenet(null, this.afterTransitionItem);
    } else if (
      this.currentTransitionType === TransitionType.changeOverlayComponent
    ) {
      var self = this;
      this.props.changeComponenet(null, this.afterTransitionItem, function () {
        self.toggleHUDElement(true, true, false);
        self.setState((prevState) => ({
          CurrentUrl: {
            ...prevState.CurrentUrl,
            mainVideo: self.props.initialVideo,
          },
          UI: {
            ...prevState.UI,
            showVideo: true,
            showImage: false,
            showBackButton: false,
          },
          currentHotspot: self.props.initialHotspot,
          currentBranding: lobbyBranding,
        }));
      });
    }
  };
  //#endregion

  //#region Back Button

  backToLobby = (event) => {
    event.preventDefault();

    if (this.props.stallsBackUpdate) {
      // console.log("updating Locations stalls to product_Review");
      this.props.stallsBackUpdate(AnalyticsLocations.ProductReviewBooth, event);
    }

    if (this.props.infoBackUpdate) {
      // console.log("updating info to lobby");
      this.props.infoBackUpdate(AnalyticsLocations.Lobby, event);
    }
    if (this.props.changeInternalStateHandler)
      this.props.changeInternalStateHandler("");
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
        mainVideo: this.props.initialVideo,
      },
      UI: {
        ...prevState.UI,
        showVideo: true,
        showImage: false,
        showBackButton: false,
        showTransitionVideo: false,
        showTutButton: true,
      },
      frameImageClass: "fadeOut",
      frameVideoStyle: {
        visibility: `visible`,
        animation: "fadeOutEffect 1.25s ease-in-out",
        MozAnimation: "fadeOutEffect 1.25s ease-in-out",
        WebkitAnimation: "fadeOutEffect 1.25s ease-in-out",
      },
      currentHotspot: this.props.initialHotspot,
      currentBranding: lobbyBranding,
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

  showMediaModal = (event, hotspotType, mediaLink) => {
    if (event) {
      event.preventDefault();
    }

    if (hotspotType !== HotspotType.anchor) {
      this.props.ShowMediaModal(hotspotType, mediaLink);
    } else {
      window.open(mediaLink, "_blank");
    }
  };

  handleTransitionVideoStart = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTransitionVideo: true,
      },
    }));
  };

  handleTransitionVideoTagEnd = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTransitionVideo: false,
      },
    }));
    this.handleTransitionVideoEnd(null);
  };

  handleIntroVideoStart = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        fadeIntroImage: true,
      },
    }));
  };

  handleHotspotCLick = (event, hotspotDetails) => {
    if (hotspotDetails.zoomLnk) {
      this.showMediaModal(
        null,
        HotspotType.anchor,
        this.props.initialHotspot[hotspotDetails.id].link
      );

      addRealtimeHotspotAnalytics(this.context, hotspotDetails.id);
      return;
    }

    if (
      this.props.addHotspotAnalytics &&
      hotspotDetails.transitionType !== TransitionType.changeComponent
    ) {
      this.props.addHotspotAnalytics(hotspotDetails);
    }
    console.log("scene handleclick");
    console.log(hotspotDetails);
    if (
      hotspotDetails.customAnalytics &&
      this.props.addCustomHotspotAnalytics
    ) {
      this.props.addCustomHotspotAnalytics(hotspotDetails.customAnalytics);
    }

    if (hotspotDetails.hotspotType === HotspotType.transition) {
      if (hotspotDetails.checkBeforeTransition) {
        if (this.props.checkBeforeTransitionFun) {
          this.props.checkBeforeTransitionFun(
            event,
            hotspotDetails.checkId,
            (err) => {
              if (!err) {
                this.startTransition(
                  event,
                  hotspotDetails.transitionVideo,
                  hotspotDetails.transitionType,
                  hotspotDetails.newItem,
                  hotspotDetails.hotspot,
                  hotspotDetails.name,
                  hotspotDetails.branding
                );
              }
            }
          );
        }
      } else {
        this.startTransition(
          event,
          hotspotDetails.transitionVideo,
          hotspotDetails.transitionType,
          hotspotDetails.newItem,
          hotspotDetails.hotspot,
          hotspotDetails.name,
          hotspotDetails.branding
        );
      }
    } else if (hotspotDetails.hotspotType === HotspotType.chatbot) {
      this.showMediaModal(event, hotspotDetails.hotspotType, hotspotDetails);
    } else if (hotspotDetails.hotspotType === HotspotType.custom) {
      if (this.props.customHotspotFun) {
        this.props.customHotspotFun(event, hotspotDetails);
      }
    } else if (hotspotDetails.hotspotType === HotspotType.videoCall) {
      if (this.props.handleStallCallHotspot) {
        this.props.handleStallCallHotspot(event, hotspotDetails);
      }
    } else if (hotspotDetails.hotspotType === HotspotType.stallChat) {
      if (this.props.handleStallCallHotspot) {
        this.props.handleStallChatHotspot(event, hotspotDetails);
      }
    } else {
      this.showMediaModal(
        event,
        hotspotDetails.hotspotType,
        hotspotDetails.link
      );
    }
  };

  handleInlineVideoPlayerClick = (event) => {
    console.log("in/////////////////");
    if (event) {
      event.preventDefault();
    }
    if (this.mouseInlineControlHover) {
      return;
    }
    this.setState(
      (prev) => ({
        InlinePlayer: {
          ...prev.InlinePlayer,
          playing: !prev.InlinePlayer.playing,
        },
      }),
      () => console.log(this.state.InlinePlayer)
    );
  };

  handleInlineVideoPlay = (id) => {
    // this.setState({ [`${id}`]: true })
    this.setState((prevState) => ({
      InlinePlayer: {
        ...prevState.InlinePlayer,
        showLid: false,
      },
    }));
  };

  handleInlineVideoPause = (id) => {
    // this.setState({ [`${id}`]: false })
    this.setState((prevState) => ({
      InlinePlayer: {
        ...prevState.InlinePlayer,
        showLid: true,
      },
    }));
  };

  checkToPlayVideo = () => {
    if (this.state.InlinePlayer.playing) {
      return true;
    }
    if (this.props.medialModalActive == undefined) {
      return false;
    }
    if (this.props.medialModalActive) {
      return false;
    }
  };

  handleInlineMouseHover = (value) => {
    this.mouseInlineControlHover = value;
  };

  handleInfoButton = () => {
    this.resetCamera();
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showTutComponenet: true,
      },
    }));
  };

  renderZoneNames = () => {
    return (
      <>
        <img
          id="learningCentre"
          className="learningCentre"
          src="/3dAssets/images/LobbyTitles/LearningCentre.jpg"
          style={{
            display:
              !this.state.currentHotspot["learningCentre"] ||
              !this.state.currentHotspot["learningCentre"].enabled
                ? "none"
                : "block",
          }}
        />
        <img
          id="experienceZone"
          className="experienceZone"
          src="/3dAssets/images/LobbyTitles/ExperienceZone.jpg"
          style={{
            display:
              !this.state.currentHotspot["experienceZone"] ||
              !this.state.currentHotspot["experienceZone"].enabled
                ? "none"
                : "block",
          }}
        />
        <img
          id="interviewRoom"
          className="interviewRoom"
          src="/3dAssets/images/LobbyTitles/InterviewRoom.jpg"
          style={{
            display:
              !this.state.currentHotspot["interviewRoom"] ||
              !this.state.currentHotspot["interviewRoom"].enabled
                ? "none"
                : "block",
          }}
        />
        <img
          id="Networking"
          className="Networking"
          src="/3dAssets/images/LobbyTitles/NetworkingLounge.jpg"
          style={{
            display:
              !this.state.currentHotspot["Networking"] ||
              !this.state.currentHotspot["Networking"].enabled
                ? "none"
                : "block",
          }}
        />
        <img
          id="DBR"
          className="DBR"
          src="/3dAssets/images/LobbyTitles/DigitalBoardRoom.jpg"
          style={{
            display:
              !this.state.currentHotspot["DBR"] ||
              !this.state.currentHotspot["DBR"].enabled
                ? "none"
                : "block",
          }}
        />
        <img
          id="Audi"
          className="Audi"
          src="/3dAssets/images/LobbyTitles/Auditorium.jpg"
          style={{
            display:
              !this.state.currentHotspot["Audi"] ||
              !this.state.currentHotspot["Audi"].enabled
                ? "none"
                : "block",
          }}
        />
      </>
    );
  };

  render() {
    return (
      <>
        {this.state.UI.showGlobalBackButton &&
          !this.state.UI.showBackButton &&
          (this.props.medialModalActive !== undefined
            ? !this.props.medialModalActive
            : true) && (
            <img
              src={ImageString.G_BACKBUTTON}
              alt="backButtonToLobby"
              className="globalBackButton"
              onClick={(e) =>
                this.props.changeComponenet(e, menuItems[menuItemsIndex.Lobby])
              }
            ></img>
          )}
        {this.props.showTut && this.state.UI.showTutButton && (
          <img
            src={ImageString.INFOBUTTON}
            alt="infoButton"
            className={`infoButton-audi ${isIOS ? "ios-btn-right" : ""}`}
            onClick={(e) => this.handleInfoButton(e)}
          ></img>
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
            {!this.props.isImageScene && (
              <>
                {!this.state.UI.fadeIntroImage && (
                  <>
                    <div
                      style={
                        !isMobileOnly
                          ? {
                              width: `calc(100vh * ${this.ratio})`,
                              height: "100vh",
                              position: "absolute",
                              display: "flex",
                              justifyContent: "center",
                              pointerEvents: "none",
                            }
                          : {
                              width: `calc((100vh - 6rem) * 2.33)`,
                              height: "calc(100vh - 6rem)",
                              position: "absolute",
                              display: "flex",
                              justifyContent: "center",
                              pointerEvents: "none",
                            }
                      }
                    >
                      <div
                        className={`blocker ${
                          this.state.UI.fadeIntroImage ? "d-none" : ""
                        }`}
                      >
                        <div className="lds-dual-ring"></div>
                      </div>
                      <img
                        id="introFrame"
                        className={
                          this.state.UI.fadeIntroImage ? "IntroFadeImage" : ""
                        }
                        alt="Introframe"
                        src={this.props.firstVideoFrame}
                        style={IntroImageStyle}
                      ></img>
                    </div>
                  </>
                )}
                <video
                  id="FrameVideo"
                  width="320"
                  height="240"
                  loop={true}
                  muted={true}
                  autoPlay={true}
                  preload="auto"
                  playsInline={true}
                  ref={this.videoRef}
                  style={this.state.frameVideoStyle}
                  onPlay={this.handleIntroVideoStart}
                >
                  <source
                    src={this.state.CurrentUrl.mainVideo}
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>

                <video
                  className={`TransitionVideo ${
                    this.state.UI.showTransitionVideo
                      ? "fadeInTransitionVideo"
                      : ""
                  } `}
                  width="320"
                  height="240"
                  loop={false}
                  muted={true}
                  // autoPlay={true}
                  preload="auto"
                  playsInline={true}
                  ref={this.transitionVideoRef}
                  style={
                    this.state.UI.showTransitionVideo
                      ? this.state.frameVideoStyle
                      : {}
                  }
                  onPlay={this.handleTransitionVideoStart}
                  onEnded={this.handleTransitionVideoTagEnd}
                >
                  <source
                    src={this.state.CurrentUrl.transitionVideo}
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>
              </>
            )}
            {this.state.UI.showBackButton && (
              <img
                src={ImageString.BACKBUTTON}
                alt="backButtonToLobby"
                className="backButton"
                onClick={(e) => this.backToLobby(e)}
              ></img>
            )}
            {this.state.UI.showImage && (
              <img
                id="FrameImage"
                className={this.state.frameImageClass}
                src={this.state.CurrentUrl.image}
                alt="LobbyImage"
                ref={this.frameImageRef}
              ></img>
            )}
            {this.state.UI.showOverlay && (
              <div
                id="overlayContent"
                // style={this.calculateOverlayStyle()}
                style={
                  !isMobileOnly
                    ? {
                        height: "100vh",
                        width: `calc(100vh * ${this.ratio})`,
                      }
                    : !isIOS
                    ? {
                        width: `calc((100vh - 6rem) * 2.33)`,
                        height: "calc(100vh - 6rem)",
                      }
                    : {}
                }
                className={`${
                  this.state.InlinePlayer.fullScreen ? "unsetPos" : ""
                }`}
              >
                {/* {this.state.currentBranding.map(branding => (
                                    <img
                                        key={branding}
                                        className={branding}
                                        src={this.props.brandingLinks[branding]}
                                    />
                                ))} */}

                {/* {this.renderZoneNames()} */}

                <div id="lobbyScreen">
                  {this.state.currentHotspot &&
                    Object.keys(this.state.currentHotspot).map((hotspotKey) => {
                      if (!this.state.currentHotspot[hotspotKey].enabled) {
                        return null;
                      }
                      if (
                        this.state.currentHotspot[hotspotKey].hotspotType ===
                        HotspotType.inlineVideo
                      ) {
                        return (
                          <>
                            <div
                              id="audiVideoFrame"
                              style={
                                this.state.InlinePlayer.fullScreen
                                  ? {
                                      width: "100%",
                                      height: "100%",
                                      position: "fixed",
                                      zIndex: "44",
                                    }
                                  : this.state.currentHotspot[hotspotKey].style
                              }
                              key={hotspotKey}
                            >
                              <div
                                className={`videoPlayerCover ${
                                  !this.state.InlinePlayer.showLid
                                    ? ""
                                    : "blackTransparentColor"
                                }`}
                                style={
                                  this.state.InlinePlayer.fullScreen
                                    ? {
                                        width: "100%",
                                        height: "100%",
                                      }
                                    : {
                                        ...this.state.currentHotspot[hotspotKey]
                                          .style,
                                        margin: 0,
                                      }
                                }
                                onClick={(e) =>
                                  this.handleInlineVideoPlayerClick(e)
                                }
                              >
                                <div
                                  className={`lid upperLid ${
                                    this.state.InlinePlayer.showLid
                                      ? ""
                                      : "animateLid"
                                  }`}
                                ></div>
                                <div
                                  className={`lid lowerLid ${
                                    this.state.InlinePlayer.showLid
                                      ? ""
                                      : "animateLid"
                                  }`}
                                ></div>
                                <div className={`fakePlaybutton-container`}>
                                  <div
                                    className={`fakePlaybutton ${
                                      this.state.InlinePlayer.showLid
                                        ? ""
                                        : "animateLid-0"
                                    }`}
                                  ></div>
                                </div>
                                <div className="inlineVideoControlsContainer">
                                  <div
                                    className="videoControlsContainer-fullscreen"
                                    onMouseEnter={(e) =>
                                      this.handleInlineMouseHover(true)
                                    }
                                    onMouseLeave={(e) =>
                                      this.handleInlineMouseHover(false)
                                    }
                                  >
                                    <img
                                      className="mg-b-2rem cursor-pointer inlineVideoControlsIcon"
                                      src={`/3dAssets/UI/${
                                        this.state.InlinePlayer.mute
                                          ? "mute_white.png"
                                          : "unmute_white.png"
                                      }`}
                                      alt="muteButton"
                                      onClick={(e) =>
                                        this.setState((prev) => ({
                                          InlinePlayer: {
                                            ...prev.InlinePlayer,
                                            mute: !prev.InlinePlayer.mute,
                                          },
                                        }))
                                      }
                                    ></img>
                                    <img
                                      className="cursor-pointer inlineVideoControlsIcon"
                                      src={`/3dAssets/UI/${
                                        this.state.InlinePlayer.fullScreen
                                          ? "closeFullScreen_white.png"
                                          : "FullScreen_white.png"
                                      }`}
                                      alt="fullScreenButton"
                                      onClick={(e) =>
                                        this.setState((prev) => ({
                                          InlinePlayer: {
                                            ...prev.InlinePlayer,
                                            fullScreen:
                                              !prev.InlinePlayer.fullScreen,
                                          },
                                        }))
                                      }
                                    ></img>
                                  </div>
                                </div>
                              </div>
                              <ReactPlayer
                                id="audiVideoPlayer"
                                url={this.state.currentHotspot[hotspotKey].link}
                                playing={this.checkToPlayVideo()}
                                controls={false}
                                loop={true}
                                playsinline={true}
                                width="100%"
                                height="100%"
                                volume={this.state.InlinePlayer.mute ? 0 : 0.3}
                                onPlay={() =>
                                  this.handleInlineVideoPlay(
                                    this.state.currentHotspot[hotspotKey].name
                                  )
                                }
                                onPause={() =>
                                  this.handleInlineVideoPause(
                                    this.state.currentHotspot[hotspotKey].name
                                  )
                                }
                              />
                            </div>
                          </>
                        );
                      } else {
                        if (this.state.currentHotspot[hotspotKey].buttonType) {
                          switch (
                            this.state.currentHotspot[hotspotKey].buttonType
                          ) {
                            case HotspotButtonType.named:
                              return (
                                <div
                                  key={hotspotKey}
                                  id={hotspotKey}
                                  className="button-ripple hotspot"
                                  style={
                                    this.state.currentHotspot[hotspotKey].style
                                  }
                                  onClick={(e) =>
                                    this.handleHotspotCLick(
                                      e,
                                      this.state.currentHotspot[hotspotKey]
                                    )
                                  }
                                >
                                  {this.state.currentHotspot[hotspotKey].name}
                                </div>
                              );
                            default:
                            //let it go out of switch
                          }
                        }
                        return this.props.firstVideoFrame ===
                          ImageString.ProductReview ? (
                          <img
                            key={hotspotKey}
                            id={hotspotKey}
                            src={ImageString[hotspotKey]}
                            className="hotspot scaleUpAnim"
                            onClick={(e) =>
                              this.handleHotspotCLick(
                                e,
                                this.state.currentHotspot[hotspotKey]
                              )
                            } //this.startTransition(e, this.state.currentHotspot[hotspotKey].transitionVideo, this.state.currentHotspot[hotspotKey].transitionType, this.state.currentHotspot[hotspotKey].newItem, this.state.currentHotspot[hotspotKey].hotspot)}
                            style={this.state.currentHotspot[hotspotKey].style}
                            alt="hotspot"
                          ></img>
                        ) : (
                          <img
                            key={hotspotKey}
                            id={hotspotKey}
                            src={ImageString.RIPPLE}
                            className="hotspot"
                            onClick={(e) =>
                              this.handleHotspotCLick(
                                e,
                                this.state.currentHotspot[hotspotKey]
                              )
                            } //this.startTransition(e, this.state.currentHotspot[hotspotKey].transitionVideo, this.state.currentHotspot[hotspotKey].transitionType, this.state.currentHotspot[hotspotKey].newItem, this.state.currentHotspot[hotspotKey].hotspot)}
                            style={this.state.currentHotspot[hotspotKey].style}
                            alt="hotspot"
                          ></img>
                        );
                      }
                    })}
                </div>
              </div>
            )}
            {this.state.UI.showTutComponenet && this.props.tutComponent && (
              <this.props.tutComponent
                ratio={this.ratio}
                skip={this.closeTut}
              ></this.props.tutComponent>
            )}
            {this.state.UI.showArrows && this.state.UI.arrowsRequired && (
              <>
                <Arrows
                  updateParent={this.updateChild3DContainerStyle}
                  mainContainer={this.child3dContainer.current}
                  mediaContainer={this.videoRef.current}
                  ref={this.arrowRef}
                ></Arrows>
              </>
            )}
          </div>
        </div>
        <div></div>
      </>
    );
  }
}

Scene.contextType = UserContext;
