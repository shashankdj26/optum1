import React, { Component, version } from "react";
import { UserContext } from "../auth/providers";
//#region package Import
import swal from "sweetalert";
import ReactPlayer from "react-player";
//#endregion
// chat-techcircle-antzy
// chat-techcircle-antzy
//#region importing components
import Menu from "./Menu/Menu";
import MyProfile from "./MyProfile/MyProfile";
import Scene from "../common/Scene/Scene";
import QNA from "../Qna/App1";
import PublicPoll from "../Poll/PublicPoll";
import Connect from "../Connect/Connect";
import Lottie from "react-lottie-player";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { FaHandPaper } from "react-icons/fa";
import clapSound from "./clapping.mp3";
import Intro from "../auth/login/Intro";

//#endregion
//#region Const import
import {
  AnalyticsLocations,
  HotspotType,
  StaticLinks,
} from "../../const/fixed/Types";
import {
  AudiData,
  DBRData,
  LobbyHotspots,
  LobbyHotspotsId,
  NetworkingHotspot,
  ResourceCenterStalls,
  BreakoutRoomsHotspot,
  TeamsData,
  ProductReviewHotspots,
  AudiZoomLink,
} from "../../data/Lobby/hotspots";
import { VideoPlayerData } from "../../data/Lobby/realtimeData";
import {
  SubMenuId,
  menuItems,
  menuItemsId,
  menuItemsIndex,
  NetworkingSubmenuId,
  DBRSubMenuIndex,
} from "../../const/Menu/MenuConst";
import { VideoString } from "../../const/assets/VideoString";
import { ImageString } from "../../const/assets/ImageString";
import VideoPlayer from "../common/videoPlayer/VideoPlayer";
import AudiScene from "../common/AudiScene/AudiScene";
import {
  firestore,
  updateUserLocation,
  addRealtimeHotspotAnalytics,
  checkForDailycoAdmin,
  getDailycoRoomDetails,
  checkDailycoRoomStatus,
  getAvailableTwilioVideoCallRoom,
  clearTwilioVideoCallRoom,
  addCustomRealtimeHotspotAnalytics,
  getLinkListener,
  getCommonListener,
  analytics,
  getBreakoutRoomListener,
  addScore,
  firebaseApp,
} from "../firebase/firebase";
import LobbyTut from "./Tut/LobbyTut";
import ReactAudioPlayer from "react-audio-player";
import CustomNotification from "../common/CustomNotification/CustomNotification";
import ZoomLnk from "../common/CustomNotification/ZoomLnk";
import AudiTut from "./Tut/AudiTut";
import NetworkingTut from "./Tut/NetworkingTut";
import ClientChat from "../client-chat/ClientChat";
import ListContainer from "./ListContainer/ListContainer";
import PdfPlayer from "../common/PdfPlayer/PdfPlayer";
import MultiVideoCall from "../videoCalling/MultiVideoCall";
import { AppString } from "../firebase/AppString";
import DBRTut from "./Tut/DBRTut";
import {
  isIOS,
  isIPad13,
  isMobileOnly,
  isMobileSafari,
} from "react-device-detect";

import LiveCount from "../common/LiveCount/LiveCount";
import SpeedTest from "../common/SpeedTest/SpeedTest";
import DBRScene from "../common/AudiScene/DBRScene";
import NamePins from "../NamePins/NamePins";
import ChatNotification from "../common/chatNotification/ChatNotification";
import Leaderboard from "../Leaderboard/Leaderboard";

//#endregion

const videoRatios = 2.33;

class Home extends Component {
  state = {
    BreakoutRoomsHotspot: BreakoutRoomsHotspot,
    currenLocation: "",
    playlikeLottie: false,
    playheartLottie: false,
    playClapLottie: false,
    likeCount: 0,
    heartCount: 0,
    clapCount: 0,
    UI: {
      menuItems: menuItems,
      activeMenu: menuItems[0],
      activeSubMenu: null,
      lastMenu: menuItems[0],
      overlayMenu: null,
      MenuVisible: true,
      isInteractable: false,
      showMediaModal: false,
      clicked: false,
      showHelpdeskChat: false,
      showLeaderboard: false,
      showLeaderboardButton: true,
      showIntro: this.props.canShowIntro,

      showSurveyPopup: false,
      surveyDetails: null,

      showDBRSidePanel: true,

      showStallChat: false,

      showGlobalChat: false,
    },
    HelpdeskChat: {
      showChat: false,
      showButton: true,
    },
    MediaModalInfo: {
      link: "",
      type: null,
    },
    DBRVideoCall: {
      roomOptions: { t1: { publicRoomName: "team3" } },
      room: null,
      showVideoCall: false,
      roomAdmin: null,
    },
    TwilioVideoCall: {
      slot: null,
      room: null,
      showVideoCall: false,
    },
    stallChat: {
      id: "",
    },
    backendControl: {
      activeHotspots: {
        Survey: false,
        Twitter: false,
        Audi: false,
        Networking: false,
        Infodesk: false,
        Agenda: false,
        LobbyStall1: false,
        DBR: false,
        LeadersProfile: false,
      },
      activeMenuItems: {},
      brandingLinks: {},
    },
    audiLnk: AudiData.link,
    zoomlink: DBRData.zoomlink,
  };
  currentOverlayCallback = null;
  currentAudioRef = React.createRef();
  AudioListenerRemoved = false;
  clapref = React.createRef();

  componentDidMount = () => {
    window.c = this;
    window.addEventListener("click", this.playIntroAudio);
    this.dailycoSetup();
    this.gettingMeetingRoomErrMessage();
    // window.zoomlink = DBRData.zoomlink;

    // getBreakoutRoomListener((err, hotspot) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   let newObj = {};
    //   Object.keys(this.state.BreakoutRoomsHotspot).forEach((key) => {
    //     newObj = {
    //       ...newObj,
    //       [`${key}`]: {
    //         ...this.state.BreakoutRoomsHotspot[`${key}`],
    //         ...hotspot[`${key}`],
    //       },
    //     };
    //   });
    //   console.log(newObj);
    //   this.setState({ BreakoutRoomsHotspot: newObj });
    // });

    firestore
      .collection(AppString.BACKSATGE)
      .doc("totalLikes")
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({ likeCount: doc.data().count });
        }
      });
    firestore
      .collection(AppString.BACKSATGE)
      .doc("totalHearts")
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({ heartCount: doc.data().count });
        }
      });
    firestore
      .collection(AppString.BACKSATGE)
      .doc("totalClaps")
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({ clapCount: doc.data().count });
        }
      });

    getLinkListener((err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        audiLnk: data.AudiData.link,
      });
    });
    return;
    getCommonListener((err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      var backendControl = this.state.backendControl;

      // backendControl.activeHotspots = { ...backendControl.activeHotspots, ...data.ActiveHotspots };
      backendControl.activeHotspots = { ...data.ActiveHotspots };
      backendControl.activeMenuItems = { ...data.ActiveMenuItems };
      backendControl.brandingLinks = { ...data.Branding };

      this.setState({ backendControl });

      // this.forceUpdate();
    });
  };

  componentWillUnmount() {
    if (!this.AudioListenerRemoved) {
      this.AudioListenerRemoved = true;
      window.removeEventListener("click", this.playIntroAudio);
    }
  }

  playIntroAudio = () => {
    console.log(this.currentAudioRef);
    if (this.currentAudioRef.current)
      this.currentAudioRef.current.audioEl.current.play();
    this.AudioListenerRemoved = true;
    window.removeEventListener("click", this.playIntroAudio);
  };

  //#region UI Function
  showInfoPopUp(message) {
    swal({
      title: message,
      icon: "info",
      className: "video-swal-modal",
      button: "continue",
    });
  }

  openLastMenu = (event) => {
    if (event) event.preventDefault();
    this.setState((state) => ({
      UI: { ...state.UI, activeMenu: state.UI.lastMenu, overlayMenu: null },
    }));
  };

  handleCustomHotspotClick = (event, hotspotDetails) => {
    if (event) event.preventDefault();

    console.log(hotspotDetails.links);
    if (
      hotspotDetails.id === LobbyHotspotsId.Survey &&
      this.state.backendControl.activeHotspots.Survey
    ) {
      this.setState((state) => ({
        UI: {
          ...state.UI,
          showSurveyPopup: true,
          surveyDetails: hotspotDetails.links,
        },
      }));
    }
  };

  handleClick = (event, item, overlayCloseCallback) => {
    if (event) event.preventDefault();
    this.closeMediaModal();
    this.setState({
      playlikeLottie: false,
      playClapLottie: false,
      playheartLottie: false,
    });

    if (this.state.UI.overlayMenu) {
      if (item.id === this.state.UI.overlayMenu.id) {
        return;
      }
    } else if (item.id === this.state.UI.activeMenu.id) {
      return;
    }

    if (overlayCloseCallback) {
      this.currentOverlayCallback = overlayCloseCallback;
    }

    if (item.id === menuItemsId.Networking) {
      setTimeout(() => {
        this.handleSubmenuItemClick(
          null,
          menuItems[menuItemsIndex.Networking].subMenus[0]
        );
      }, 500);
    }

    if (item.id === menuItemsId.Photobooth) {
      this.showMediaModal(HotspotType.iframe, StaticLinks.Photobooth);
    }

    if (item.id === menuItemsId.TeamBuilding) {
      addRealtimeHotspotAnalytics(this.context, "Meet_our_leaders");
    }

    if (
      item.id !== menuItemsId.MyProfile &&
      item.id !== menuItemsId.TeamBuilding &&
      item.id !== menuItemsId.Photobooth &&
      item.id !== menuItemsId.bdr
    ) {
      this.handleHelpdeskChatClose();
      this.setState((state) => ({
        UI: {
          ...state.UI,
          activeMenu: item,
          overlayMenu: null,
          lastMenu: state.UI.activeMenu,
          activeSubMenu: null,
          showHelpdeskChat: false,
          showDBRSidePanel: true,
          showStallChat: false,
          showLeaderboard: false,
          showLeaderboardButton: true,
        },
      }));
    } else if (item.id === menuItemsId.bdr) {
      this.addComponentAnalytics(AnalyticsLocations.DBR, true);

      this.handleHelpdeskChatClose();
      this.handleVideoRoomSelection(event, item.room, (err) => {
        if (!err) {
          this.setState((state) => ({
            UI: {
              ...state.UI,
              activeMenu: item,
              overlayMenu: null,
              lastMenu: state.UI.activeMenu,
              // activeSubMenu: item.subMenus[DBRSubMenuIndex.Call],
              showHelpdeskChat: false,
              showDBRSidePanel: true,
              showStallChat: false,
            },
          }));
        }
      });
    } else {
      this.setState((state) => ({
        UI: { ...state.UI, overlayMenu: item, lastMenu: state.UI.activeMenu },
      }));
    }
  };

  handleSubmenuItemClick = (event, item) => {
    if (event) event.preventDefault();
    if (this.state.UI.activeSubMenu)
      if (this.state.UI.activeSubMenu.id === item.id) {
        return;
      }

    console.log(item);
    this.addHotspotAnalytics(item.name);

    if (this.state.UI.activeMenu.id === menuItemsId.bdr) {
      if (item.id === SubMenuId.Call) {
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            showDBRSidePanel: true,
            activeSubMenu: item,
          },
        }));
      } else {
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            activeSubMenu: item,
            showDBRSidePanel: false,
          },
        }));
      }
    }

    if (this.state.UI.activeMenu.id !== menuItemsId.bdr) {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          activeSubMenu: item,
          showDBRSidePanel: false,
        },
      }));
    }
  };

  closeSubMenu = (event) => {
    if (event) event.preventDefault();
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        activeSubMenu: null,
        showMediaModal: false,
      },
      MediaModalInfo: {
        ...prevState.MediaModalInfo,
        link: "",
        type: null,
      },
    }));
  };

  hideOverlayMenu = (event) => {
    if (event) event.preventDefault();
    if (this.state.UI.overlayMenu) {
      this.setState((state) => ({
        UI: { ...state.UI, overlayMenu: null, showAskExpertError: false },
      }));
    }
    if (this.currentOverlayCallback) {
      this.currentOverlayCallback();
      this.currentOverlayCallback = null;
    }
  };

  showMediaModal = (hotspotType, mediaLink) => {
    if (hotspotType === HotspotType.chatbot) {
      window.lastChatBotRef = mediaLink;
      mediaLink.enabled = false;
      this.handleHelpdeskChatbutton();
      return;
    }
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showMediaModal: true,
      },
      MediaModalInfo: {
        ...prevState.MediaModalInfo,
        link: mediaLink ? mediaLink : "",
        type: hotspotType,
      },
    }));
  };

  handleMedialModalFromOverlay = (hotspotType, link) => {
    this.hideOverlayMenu();
    this.showMediaModal(hotspotType, link);
  };

  closeMediaModal = () => {
    var info_arr = ["Agenda", "HelpdeskChat"];
    if (info_arr.includes(this.state.currenLocation)) {
      updateUserLocation(this.context, "Infodesk");
    }

    var arr = ["Infodesk", "photoMosaic"];
    if (arr.includes(this.state.currenLocation)) {
      updateUserLocation(this.context, "lobby");
    }

    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showMediaModal: false,
      },
      MediaModalInfo: {
        ...prevState.MediaModalInfo,
        link: "",
        type: null,
      },
    }));
  };
  //#endregion

  handleTeamOptionSelection = (event, teams) => {
    // event.preventDefault();
    window.open(teams.link, "_blank");
    this.hideOverlayMenu(event);
  };

  checkIfAudioCanPlayUnderMediaModal = () => {
    if (this.state.UI.activeMenu.id === menuItemsId.Networking) {
      if (this.state.UI.activeSubMenu)
        if (this.state.UI.activeSubMenu.id === NetworkingSubmenuId.Sessions)
          if (this.state.UI.activeSubMenu.id === menuItemsId.zoomMeeting) {
            return false;
          }
    }
    if (this.state.UI.showMediaModal) {
      if (this.state.MediaModalInfo.type === HotspotType.pdf) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  handleHelpdeskChatClose = () => {
    if (window.lastChatBotRef) window.lastChatBotRef.enabled = true;
    if (this.state.HelpdeskChat.showChat) {
      this.setState({
        HelpdeskChat: {
          showChat: false,
          showButton: true,
        },
      });
    }
  };

  handleHelpdeskChatbutton = () => {
    if (this.state.HelpdeskChat.showButton) {
      this.setState({
        HelpdeskChat: {
          showChat: true,
          showButton: false,
        },
      });
    }
  };

  handleLobbyInternalState = (internalState) => {
    switch (internalState) {
      case "Infodesk":
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            showHelpdeskChat: true,
          },
        }));
        break;
      default:
        this.setState((prevState) => ({
          UI: {
            ...prevState.UI,
            showHelpdeskChat: false,
            showStallChat: false,
          },
          HelpdeskChat: {
            showChat: false,
            showButton: true,
          },
        }));
    }
  };

  handleSceneTutorial = (type) => {
    if (type === "end") {
      this.setState((prevState) => ({
        UI: {
          ...prevState.UI,
          isInteractable: true,
        },
      }));
    }
  };

  //#region Analytics
  handleHotspotAnalytics = (hotspotDetails) => {
    console.log(hotspotDetails.id);

    this.setState({ currenLocation: hotspotDetails.id }, () => {
      var arr = [
        "Infodesk",
        "photoMosaic",
        "Agenda",
        "HelpdeskChat",
        "Exhibition_MIDC",
        "Exhibition_CoinDCX",
        "Exhibition_stall4",
        "Exhibition_Mint",
      ];
      if (arr.includes(this.state.currenLocation)) {
        updateUserLocation(this.context, hotspotDetails.id);
      }
    });
    this.addHotspotAnalytics(hotspotDetails.id);
  };

  addComponentAnalytics = (location, value) => {
    //add to user
    if (value) {
      this.addHotspotAnalytics(location);
      this.addLocationAnalytics(location, value);
    }
  };

  addLocationAnalytics = (location, value) => {
    if (value) {
      // console.log("updating location");
      updateUserLocation(this.context, location);
    }
  };

  addHotspotAnalytics = (name) => {
    //call some firebase function

    addRealtimeHotspotAnalytics(this.context, name);
  };

  addCustomHotspotAnalytics = (detials) => {
    addCustomRealtimeHotspotAnalytics(this.context, detials);
  };
  //#endregion

  //#region LeaderBoard
  addScorePoints = (point) => {
    console.log("pooint->" + point);
    addScore(this.context, point);
  };
  handleLeaderboardClose = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showLeaderboard: false,
        showLeaderboardButton: true,
      },
    }));
  };
  handleLeaderboardButton = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showLeaderboard: true,
        showLeaderboardButton: false,
      },
    }));
  };

  // handleMedialModalFromOverlay
  canShowLeaderboardInNet = () => {
    if (this.state.UI.activeMenu.id === menuItemsId.Networking) {
      if (this.state.UI.activeSubMenu) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  //#endregion

  //#region Dailyco Function
  handleVideoRoomSelection = async (event, room, callback) => {
    if (event) event.preventDefault();
    try {
      console.log(room);
      if (this.state.DBRVideoCall.roomAdmin) {
        console.log(this.state.DBRVideoCall.roomAdmin);
        if (this.state.DBRVideoCall.roomAdmin.roomName === room.roomName) {
          this.setState((prevState) => ({
            DBRVideoCall: {
              ...prevState.DBRVideoCall,
              room: room,
            },
          }));
          if (callback) {
            callback(null);
          }
          return;
        }
      }

      console.log("room.docName: " + room.docName);
      const isLive = await checkDailycoRoomStatus(room.docName);
      if (isLive) {
        this.setState((prevState) => ({
          DBRVideoCall: {
            ...prevState.DBRVideoCall,
            room: room,
          },
        }));
        if (callback) {
          callback(null);
        }
      } else {
        this.showInfoPopUp("Room is not live right now.");
        if (callback) {
          callback(true);
        }
      }
    } catch (error) {
      if (callback) {
        callback(true);
      }
      console.log(error);
    }
  };

  dailycoSetup = () => {
    checkForDailycoAdmin(this.context)
      .then((data) => {
        this.setState((prevState) => ({
          DBRVideoCall: {
            ...prevState.DBRVideoCall,
            roomAdmin: data,
          },
        }));
      })
      .catch((err) => {
        if (err.code !== "NoAdmin") console.log(err);
      });

    getDailycoRoomDetails()
      .then((data) => {
        console.log(data);
        // this.handleVideoRoomSelection(null, data[Object.keys(data)[0]])
        this.setState((prevState) => ({
          DBRVideoCall: {
            ...prevState.DBRVideoCall,
            roomOptions: data,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  closeDBRVideoCallSidePanel = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showDBRSidePanel: false,
        activeSubMenu: null,
      },
    }));
  };

  openDBRZoomLink = (link, event) => {
    if (event) {
      event.preventDefault();
    }
    window.location.href = link;
    // window.open(link, "_blank")
  };
  //#endregion

  //#region Twilio VideoCAll

  gettingMeetingRoomErrMessage = async () => {
    const Messagedoc = await firestore
      .collection(AppString.BACKSTAGE)
      .doc(AppString.MEETINGROOMMESSAGE)
      .get();
    if (Messagedoc.data) {
      this.MeetingRoomMessage = Messagedoc.data().meetingRoomMsg;
      this.busyRoomMessage = Messagedoc.data().busyRoomMessage;
    }
  };

  checkAvailableVideoCallRoom = async (event, stallId) => {
    event.preventDefault();
    try {
      console.log(this.context);
      const slot = await getAvailableTwilioVideoCallRoom(this.context, stallId);
      let room = {
        roomId: slot.id,
        roomName: slot.name,
        roomParentId: "HT_Mint",
        isAdmin: slot.isAdmin,
      };
      this.setState((state) => ({
        TwilioVideoCall: {
          ...state.TwilioVideoCall,
          room: room,
          showVideoCall: true,
          slot: slot,
          stallId: stallId,
        },
      }));
      console.log(room);
    } catch (err) {
      console.log(err);
      if (err.code === "NoRoomAvaliable") {
        swal({
          text: "Videocall rooms are occupied. Please come back later, Thanks.",
        });
      }
      this.setState((state) => ({
        UI: { ...state.UI, showAskExpertError: true },
      }));
    }
  };
  clearTwilioVideoCallRoom = async () => {
    try {
      this.setState((state) => ({
        TwilioVideoCall: { ...state.TwilioVideoCall, showVideoCall: false },
        UI: { ...state.UI, overlayMenu: null, showAskExpertError: false },
      }));

      if (this.state.TwilioVideoCall.slot.id) {
        setTimeout(async () => {
          await clearTwilioVideoCallRoom(
            this.state.TwilioVideoCall.slot.id,
            this.context.email,
            this.state.TwilioVideoCall.stallId
          );
          this.setState((state) => ({
            TwilioVideoCall: {
              ...state.TwilioVideoCall,
              slot: null,
              room: null,
            },
          }));
        }, 3000);
      } else {
        console.error("No Room Id found for user");
      }
    } catch (err) {
      console.log(err);
    }
  };
  currentSlotRest = async (event) => {
    if (event) event.preventDefault();
    try {
      console.log(this.state.TwilioVideoCall.slot);
      if (this.state.TwilioVideoCall.slot.id) {
        await clearTwilioVideoCallRoom(
          this.state.TwilioVideoCall.slot.id,
          "-1",
          this.state.TwilioVideoCall.stallId
        );
      } else {
        console.error("No Room Id found for user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  showInfoPopUp = (message) => {
    swal({
      title: message,
      className: "video-swal-modal",
      button: "continue",
    });
  };

  showMeetingRoomPopup = () => {
    this.showInfoPopUp(this.MeetingRoomMessage);
  };

  showMeetingRoomBusyPopup = () => {
    this.showInfoPopUp(this.busyRoomMessage);
  };

  handleStallCallHotspot = (event, hotspotDetails) => {
    if (hotspotDetails.hotspotType !== HotspotType.videoCall) {
      return;
    }
    this.checkAvailableVideoCallRoom(event, hotspotDetails.roomDetails.id);
  };
  //#endregion

  //#region  stall chat
  handleStallChatHotspot = (event, hotspotDetails) => {
    if (hotspotDetails.hotspotType !== HotspotType.stallChat) {
      return;
    }
    if (hotspotDetails.roomDetails) {
      this.setState((prev) => ({
        UI: {
          ...prev.UI,
          showStallChat: true,
        },
        stallChat: {
          id: hotspotDetails.roomDetails.id,
        },
      }));
    } else {
      this.showInfoPopUp(
        "We are having some issue in opening chat for you. Please come back later"
      );
    }
  };
  handleStallChatHotspotClose = (event) => {
    if (event) {
      event.preventDefault();
    }

    // var info_arr = ["Agenda", "HelpdeskChat"];
    if (this.state.currenLocation === "HelpdeskChat") {
      updateUserLocation(this.context, "Infodesk");
    }

    this.setState((prev) => ({
      UI: {
        ...prev.UI,
        showStallChat: false,
      },
      stallChat: {
        id: "",
      },
    }));
  };
  //#endregion

  getActiveHotspots() {
    var lobbyHotspotsCopy = { ...LobbyHotspots };
    Object.keys(lobbyHotspotsCopy).forEach((lobbyHotspot) => {
      if (this.state.backendControl.activeHotspots[lobbyHotspot]) {
        lobbyHotspotsCopy[lobbyHotspot].enabled = true;
      } else {
        lobbyHotspotsCopy[lobbyHotspot].enabled = false;
      }
    });

    return lobbyHotspotsCopy;
  }

  getActiveMenuItems(backendControl) {
    // var backendControl = this.state.backendControl;
    var menuItemsCopy = [...this.state.UI.menuItems];
    for (var i = 0; i < menuItemsCopy.length; i++) {
      var menuItem = menuItemsCopy[i];
      var backendMenuItem = backendControl.activeMenuItems[menuItem.name];
      if (!backendMenuItem || !backendMenuItem.enabled) {
        menuItemsCopy.splice(i, 1);
      } else if (menuItem.subMenus) {
        // var subMenuItemsCopy = [...menuItem.subMenus];
        // for (var j = 0; j < subMenuItemsCopy.length; j++) {
        //     var subMenuItem = subMenuItemsCopy[j];
        //     if (!backendMenuItem.subMenus || !backendMenuItem.subMenus[subMenuItem.name]) {
        //         subMenuItemsCopy.splice(j, 1);
        //     }
        // }
        // menuItemsCopy[i].subMenus = subMenuItemsCopy;
      }
    }

    console.log(menuItemsCopy);

    // return menuItemsCopy;
    return this.state.UI.menuItems;
  }

  updatesLikeClapsHearts = async (doc) => {
    await firestore
      .collection(AppString.BACKSATGE)
      .doc(doc)
      .update({ count: firebaseApp.firestore.FieldValue.increment(1) });
  };

  closeIntro = () => {
    this.setState((prevState) => ({
      UI: {
        ...prevState.UI,
        showIntro: false,
      },
    }));
    sessionStorage.setItem("IntoPlayed", "true");
  };
  // getActiveSubMenuItems() {
  //     var activeMenuItems = this.getActiveMenuItems();
  //     for(var i = 0; i < activeMenuItems.length; i++)
  //     if(activeMenuItems this.state.UI.activeMenu.id

  //     return menuItemsCopy;
  // }

  render() {
    const { liveCountData, internetStatus } = this.props;
    // console.log(liveCountData, "/////////////////////");
    return (
      <>
        {this.state.UI.showIntro && <Intro close={this.closeIntro}></Intro>}
        {!this.state.UI.showIntro && (
          <>
            {this.state.UI.activeMenu && (
              <>
                {false &&
                  this.state.UI.activeMenu.id !== menuItemsId.Audi &&
                  this.state.UI.activeMenu.id !== menuItemsId.bdr && (
                    <>
                      <div className="indicatorSpace">
                        {internetStatus && (
                          <SpeedTest currentStatus={internetStatus}></SpeedTest>
                        )}
                        {/* {liveCountData && (
                    <>
                      <LiveCount
                        data={liveCountData}
                        location={this.state.UI.activeMenu.id}
                      ></LiveCount>
                    </>
                  )} */}
                      </div>
                    </>
                  )}
              </>
            )}
            {
              <ChatNotification
                canBeVisible={!this.state.UI.showGlobalChat}
                userEmail={this.context.email}
              ></ChatNotification>
            }

            {this.state.TwilioVideoCall.showVideoCall &&
              this.context &&
              this.state.TwilioVideoCall.room && (
                <MultiVideoCall
                  userName={
                    this.context.displayName ?? this.context.email.split("@")[0]
                  }
                  room={this.state.TwilioVideoCall.room}
                  onCallDisconnect={this.clearTwilioVideoCallRoom}
                  isOfficial={this.state.TwilioVideoCall.room.isAdmin}
                  stallId={this.state.TwilioVideoCall.stallId}
                  slotReset={this.currentSlotRest}
                  showPopup={this.showMeetingRoomPopup}
                  showBusyPopup={this.showMeetingRoomBusyPopup}
                  // timerAnalytics={this.askExpertTimerAnalytics}
                ></MultiVideoCall>
              )}
            {this.state.UI.showStallChat && (
              <>
                <div className="stallChatContainer">
                  <img
                    src={ImageString.CLOSEBUTTON}
                    className={`closeButton-mediaModal  closeButton-mediaModal-right-corner ${
                      isIOS ? "ios-btn-right ipad-stall-chat" : ""
                    }`}
                    // stallchat-cont
                    alt="MediaModalCLoseButton"
                    onClick={this.handleStallChatHotspotClose}
                    // style={{
                    //   right: "auto",
                    // }}
                  ></img>
                  <iframe
                    src={`${StaticLinks.stallChat}?${this.state.stallChat.id}`}
                    title="StallChatFrame"
                  ></iframe>
                  <div
                    className={`blocker ${
                      this.state.UI.fadeIntroImage ? "d-none" : ""
                    }`}
                    style={{ zIndex: "-1" }}
                  >
                    <div className="lds-dual-ring"></div>
                  </div>
                </div>
              </>
            )}
            <div className="wrapper">
              <section
                className={`loggedin-page has-right-menu min-height-full min-height-full image-bg ${
                  isIOS ? "ios-page" : ""
                } ${isIPad13 ? "on-ipad" : ""} ${
                  window.parent.ios_V
                    ? window.parent.ios_V === 15
                      ? "ios-15"
                      : ""
                    : ""
                } ${
                  window.parent.ios_V
                    ? window.parent.ios_V === 15 && !isMobileSafari
                      ? "ios-15-ch"
                      : ""
                    : ""
                } ${
                  window.parent.ios_V2
                    ? window.Number(window.parent.ios_V2) >=
                      window.Number("14.2")
                      ? "ios-14-2"
                      : ""
                    : ""
                }
            
            `}
              >
                <CustomNotification firestore={firestore}></CustomNotification>
                {false && <ZoomLnk firestore={firestore} />}
                {this.state.UI.showMediaModal && (
                  <>
                    <article
                      className={`img-bg videoBox h-100 zIndex-16`}
                      id="play"
                    >
                      <div className="media-modal">
                        {this.state.MediaModalInfo.type ===
                          HotspotType.videoPlayer && (
                          <VideoPlayer
                            videoData={this.state.MediaModalInfo.link}
                            close={() => this.closeMediaModal()}
                          ></VideoPlayer>
                        )}
                        {this.state.MediaModalInfo.type ===
                          HotspotType.pdfPlayer && (
                          <PdfPlayer
                            data={this.state.MediaModalInfo.link}
                            close={() => this.closeMediaModal()}
                          ></PdfPlayer>
                        )}
                        {this.state.MediaModalInfo.type === HotspotType.pdf && (
                          <iframe
                            title={"pdf"}
                            className="media-modal-content"
                            src={this.state.MediaModalInfo.link}
                          ></iframe>
                        )}
                        {this.state.MediaModalInfo.type ===
                          HotspotType.iframe && (
                          <iframe
                            title={"iframe"}
                            className={`media-modal-content-iframe holds-the-iframe ${
                              isIOS ? "ios-media-modal-content-iframe" : ""
                            }`}
                            style={
                              this.state.MediaModalInfo.link ===
                              StaticLinks.Photobooth
                                ? isMobileOnly
                                  ? {
                                      width: "70vw",
                                      height: "calc(70vw / (16/9))",
                                      marginTop: "1rem",
                                    }
                                  : { width: "80vw", height: "calc(45vw)" }
                                : {}
                            }
                            src={this.state.MediaModalInfo.link}
                            allow="camera; microphone"
                            // src=""
                          ></iframe>
                        )}
                        {this.state.MediaModalInfo.type ===
                          HotspotType.video && (
                          <div className="media-modal-content media-modal-contenet-depth mobile-video">
                            <ReactPlayer
                              config={{
                                youtube: {
                                  playerVars: { showinfo: 1 },
                                },
                              }}
                              playsinline={true}
                              playing={true}
                              volume={1}
                              loop={true}
                              url={this.state.MediaModalInfo.link}
                              controls={true}
                              width="100%"
                              height="100%"
                              style={{
                                zIndex: 3,
                                position: "relative",
                              }}
                            />
                            <div className="blocker">
                              <div className="lds-dual-ring"></div>
                            </div>
                          </div>
                        )}
                        {this.state.MediaModalInfo.type ===
                          HotspotType.image && (
                          <img
                            title={"image"}
                            className="media-modal-content-image"
                            src={this.state.MediaModalInfo.link}
                            alt="mediaModalImage"
                          ></img>
                        )}

                        {this.state.MediaModalInfo.type !==
                          HotspotType.videoPlayer &&
                          this.state.MediaModalInfo.type !==
                            HotspotType.pdfPlayer && (
                            <img
                              src={ImageString.CLOSEBUTTON}
                              className="closeButton-mediaModal"
                              alt="MediaModalCLoseButton"
                              onClick={this.closeMediaModal}
                            ></img>
                          )}
                      </div>
                    </article>
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.bdr && (
                  <>
                    <img
                      src={ImageString.G_BACKBUTTON}
                      alt="backButtonToLobby"
                      className="globalBackButton"
                      onClick={(e) =>
                        this.handleClick(e, menuItems[menuItemsIndex.Lobby])
                      }
                    ></img>
                    <iframe
                      className="media-modal-content-iframe"
                      src={`/zoom/CDN/meeting.html?name=${
                        this.props.displayName
                          ? this.props.displayName.toLowerCase()
                          : this.context.email.split("@")[0].toLowerCase()
                      }&mn=${this.props.mn}&email=${this.context.email}&pwd=${
                        this.props.pwd
                      }&role=0&lang=en-US&signature=${
                        this.props.signature
                      }&apiKey=${this.props.apiKey}`}
                      style={{
                        // position: "fixed",
                        // width: "100%",
                        height: "100vh",
                        // border: 0,
                        // zIndex: 1000,
                      }}
                    />
                    {/* <button
                  onClick={(e) => {
                    this.handleClick(e, menuItems[menuItemsIndex.Lobby]);
                  }}
                  style={{
                    position: "fixed",
                    width: 100,
                    height: 40,
                    border: 0,
                    zIndex: 1001,
                    top: "2%",
                    left: "5%",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Leave
                </button> */}
                  </>
                )}

                {this.state.UI.activeMenu.id === menuItemsId.Audi && (
                  <Lottie
                    style={{
                      position: "fixed",
                      zIndex: 111,
                      left: 0,
                      right: 0,
                      height: "100vh",
                      width: "100%",
                      pointerEvents: "none",
                      visibility: this.state.playlikeLottie
                        ? "visible"
                        : "hidden",
                    }}
                    path={"/like-anim/Likes.json"}
                    play={this.state.playlikeLottie}
                    loop={true}
                    onLoopComplete={() => {
                      this.setState({ playlikeLottie: false });
                    }}
                    onLoad={() => {
                      console.log("ready to play");
                    }}
                  />
                )}
                {this.state.UI.activeMenu.id === menuItemsId.Audi && (
                  <Lottie
                    style={{
                      position: "fixed",
                      zIndex: 111,
                      left: 0,
                      right: 0,
                      height: "100vh",
                      width: "100%",
                      pointerEvents: "none",
                      visibility: this.state.playheartLottie
                        ? "visible"
                        : "hidden",
                    }}
                    path={"/heart-anim/Heart.json"}
                    play={this.state.playheartLottie}
                    loop={true}
                    onLoopComplete={() => {
                      this.setState({ playheartLottie: false });
                    }}
                    onLoad={() => {
                      console.log("ready to play");
                    }}
                  />
                )}
                {this.state.UI.activeMenu.id === menuItemsId.Audi && (
                  <Lottie
                    style={{
                      position: "fixed",
                      zIndex: 111,
                      left: 0,
                      right: 0,
                      height: "100vh",
                      width: "100%",
                      pointerEvents: "none",
                      visibility: this.state.playClapLottie
                        ? "visible"
                        : "hidden",
                    }}
                    path={"/clap-anim/Clap.json"}
                    play={this.state.playClapLottie}
                    loop={true}
                    onLoopComplete={() => {
                      this.setState({ playClapLottie: false });
                    }}
                    onLoad={() => {
                      console.log("ready to play");
                    }}
                  />
                )}

                {this.state.UI.activeMenu.id === menuItemsId.Lobby && (
                  <>
                    <Scene
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={VideoString.LOBBYLOOP}
                      firstVideoFrame={ImageString.LOBBYLOOP}
                      // initialHotspot={this.getActiveHotspots()}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.LOBBYLOOP}
                      initialHotspot={LobbyHotspots}
                      brandingLinks={this.state.backendControl.brandingLinks}
                      globalBackButton={false}
                      changeComponenet={this.handleClick}
                      ratio={videoRatios}
                      customHotspotFun={this.handleCustomHotspotClick}
                      // for tut to work also pass name
                      sceneName="Lobby"
                      showTut={true}
                      infoBackUpdate={this.addLocationAnalytics}
                      tutComponent={LobbyTut}
                      showingTutorialEvent={this.handleSceneTutorial} //for handling transition pass start and end
                      changeInternalStateHandler={this.handleLobbyInternalState}
                      checkBeforeTransitionFun={this.handleVideoRoomSelection}
                      //Analytics
                      addHotspotAnalytics={this.handleHotspotAnalytics}
                      addAnalytics={(value) =>
                        this.addComponentAnalytics(
                          AnalyticsLocations.Lobby,
                          value
                        )
                      }
                      //
                      handleStallCallHotspot={this.handleStallCallHotspot}
                      handleStallChatHotspot={this.handleStallChatHotspot}
                      addCustomHotspotAnalytics={this.addCustomHotspotAnalytics}
                    ></Scene>
                    {this.state.UI.showHelpdeskChat && (
                      <>
                        {this.context.email &&
                          this.state.HelpdeskChat.showChat && (
                            <>
                              {/* <NotLive continue={this.handleHelpdeskChatClose}></NotLive> */}
                              <ClientChat
                                channel={this.context.email}
                                user={{
                                  id: this.context.email,
                                  name: this.context.displayName,
                                }}
                                closeChat={this.handleHelpdeskChatClose}
                                visibility={true}
                              ></ClientChat>
                            </>
                          )}
                        {this.state.HelpdeskChat.showButton && (
                          <>
                            {/* <a data-tip data-for="chatbotInfo" >
                                                    <img
                                                        className={`helpdeskchatbtn`}
                                                        src="assets/images/chatbot.png"
                                                        alt="helpdeskButton"
                                                        onClick={this.handleHelpdeskChatbutton}
                                                    />
                                                </a>
                                                <ReactTooltip id='chatbotInfo' >
                                                    <span>How may I help you ?</span>
                                                </ReactTooltip> */}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.Audi && (
                  <>
                    <AudiScene
                      changeComponenet={this.handleClick}
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={AudiData.introVideo}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.Audi}
                      globalBackButton={true}
                      AudiZoomLink={AudiZoomLink.link}
                      showZoom={false}
                      showCover={false}
                      link={this.state.audiLnk}
                      framePlacementStyle={AudiData.placementStyle}
                      hiddeMute={false}
                      //For Tutorial
                      sceneName="audi"
                      showTut={true}
                      tutComponent={AudiTut}
                      subMenus={this.state.UI.activeSubMenu}
                      //Analytics
                      addAnalytics={(value) => {
                        this.addComponentAnalytics(
                          AnalyticsLocations.Audi,
                          value
                        );
                      }}
                    ></AudiScene>

                    <div
                      className={`audiButtonContainer ${
                        this.state.UI.hideCommentsBtn
                          ? "commentSection-out"
                          : ""
                      }`}
                    >
                      <div
                        className="audiChatButton"
                        onClick={async (e) => {
                          if (e) {
                            e.preventDefault();
                          }
                          this.setState({ playlikeLottie: true });
                          this.updatesLikeClapsHearts("totalLikes");

                          await addRealtimeHotspotAnalytics(
                            this.context,
                            "likes"
                          );
                        }}
                        style={{
                          // background:
                          //   "linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(150, 150, 150, 0.4) 100%)",
                          backdropFilter: "blur(34px)",
                          // borderBottom: "0.5px solid #000000",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AiFillLike
                            className="likeButton"
                            style={{ color: "#17ACEA" }}
                          />
                          {/* <p style={{ color: "#fff", marginLeft: "0.3rem" }}>
                            {this.state.likeCount}
                          </p> */}
                        </div>
                      </div>
                      <div
                        className="audiChatButton"
                        onClick={async (e) => {
                          if (e) {
                            e.preventDefault();
                          }
                          console.log("in");
                          this.setState({ playheartLottie: true }, () => {
                            console.log(this.state.playheartLottie);
                          });
                          this.updatesLikeClapsHearts("totalHearts");
                          await addRealtimeHotspotAnalytics(
                            this.context,
                            "hearts"
                          );
                        }}
                        style={{
                          // background:
                          //   "linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(150, 150, 150, 0.4) 100%)",
                          backdropFilter: "blur(34px)",
                          // borderBottom: "0.5px solid #000000",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AiFillHeart
                            className="heartButton"
                            style={{ color: "#F52C4C" }}
                          />
                          {/* <p style={{ color: "#fff", marginLeft: "0.3rem" }}>
                            {this.state.heartCount}
                          </p> */}
                        </div>
                      </div>
                      <div
                        className="audiChatButton"
                        onClick={async (e) => {
                          if (e) {
                            e.preventDefault();
                          }
                          this.setState({ playClapLottie: true });
                          this.updatesLikeClapsHearts("totalClaps");
                          if (this.clapref.current) {
                            this.clapref.current.audioEl.current.play();
                            setTimeout(() => {
                              if (this.clapref.current) {
                                this.clapref.current.audioEl.current.pause();
                                this.clapref.current.audioEl.current.load();
                              }
                            }, 5000);
                          }
                          await addRealtimeHotspotAnalytics(
                            this.context,
                            "clap"
                          );
                        }}
                        style={{
                          // background:
                          //   "linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(150, 150, 150, 0.4) 100%)",
                          backdropFilter: "blur(34px)",
                          // borderBottom: "0.5px solid #000000",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="clap">
                            <FaHandPaper
                              className="lower__hand clapButton"
                              style={{ color: "#FFB966" }}
                            />
                          </div>
                          {/* <p style={{ color: "#fff", marginLeft: "0.3rem" }}>
                            {this.state.clapCount}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.Networking && (
                  <>
                    <Scene
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={VideoString.NETWORKING_LOOP}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.NetworkingLoung}
                      firstVideoFrame={ImageString.NetworkingLoung}
                      initialHotspot={NetworkingHotspot}
                      globalBackButton={true}
                      changeComponenet={this.handleClick}
                      ratio={videoRatios}
                      // for tut to work also pass name
                      sceneName="Networking"
                      showTut={true}
                      tutComponent={NetworkingTut}
                      showingTutorialEvent={this.handleSceneTutorial} //for handling transition pass start and end
                      //  changeInternalStateHandler={this.handleLobbyInternalState}
                      //Analytics
                      addAnalytics={(value) =>
                        this.addComponentAnalytics(
                          AnalyticsLocations.Networking,
                          value
                        )
                      }
                    ></Scene>
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.rescen && (
                  <>
                    <Scene
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={VideoString.RESOURCE_LOOP}
                      firstVideoFrame={ImageString.ResourceCenter}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.ResourceCenter}
                      initialHotspot={ResourceCenterStalls}
                      globalBackButton={true}
                      changeComponenet={this.handleClick}
                      ratio={videoRatios}
                      // for tut to work also pass name
                      sceneName="rescen"
                      showTut={false}
                      tutComponent={NetworkingTut}
                      showingTutorialEvent={this.handleSceneTutorial} //for handling transition pass start and end
                      //  changeInternalStateHandler={this.handleLobbyInternalState}
                      //Analytics
                      addHotspotAnalytics={this.handleHotspotAnalytics}
                      addCustomHotspotAnalytics={this.addCustomHotspotAnalytics}
                      addAnalytics={(value) =>
                        this.addComponentAnalytics(
                          AnalyticsLocations.Rencen,
                          value
                        )
                      }
                      handleStallCallHotspot={this.handleStallCallHotspot}
                      handleStallChatHotspot={this.handleStallChatHotspot}
                    ></Scene>
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.exibooth && (
                  <>
                    <Scene
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={VideoString.EXHIBITION_LOOP}
                      firstVideoFrame={ImageString.Exhibition}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.Exhibition}
                      initialHotspot={this.state.BreakoutRoomsHotspot}
                      globalBackButton={true}
                      changeComponenet={this.handleClick}
                      ratio={videoRatios}
                      // for tut to work also pass name
                      sceneName="Exibitionbooth"
                      showTut={false}
                      tutComponent={NetworkingTut}
                      showingTutorialEvent={this.handleSceneTutorial} //for handling transition pass start and end
                      //  changeInternalStateHandler={this.handleLobbyInternalState}
                      //Analytics
                      addHotspotAnalytics={this.handleHotspotAnalytics}
                      addCustomHotspotAnalytics={this.addCustomHotspotAnalytics}
                      addAnalytics={(value) =>
                        this.addComponentAnalytics(
                          AnalyticsLocations.ExiBooth,
                          value
                        )
                      }
                      handleStallCallHotspot={this.handleStallCallHotspot}
                      handleStallChatHotspot={this.handleStallChatHotspot}
                    ></Scene>
                  </>
                )}

                {this.state.UI.activeMenu.id === menuItemsId.ProductReview && (
                  <>
                    <Scene
                      ShowMediaModal={this.showMediaModal}
                      initialVideo={VideoString.PRODUCT_REVIEW_LOOP}
                      firstVideoFrame={ImageString.ProductReview}
                      isImageScene={isIOS || window.parent.isMac15}
                      initalImage={ImageString.ProductReview}
                      initialHotspot={ProductReviewHotspots}
                      globalBackButton={true}
                      changeComponenet={this.handleClick}
                      ratio={videoRatios}
                      stallsBackUpdate={this.addLocationAnalytics}
                      // for tut to work also pass name
                      sceneName="ProductReviewbooth"
                      showTut={false}
                      tutComponent={NetworkingTut}
                      showingTutorialEvent={this.handleSceneTutorial} //for handling transition pass start and end
                      //  changeInternalStateHandler={this.handleLobbyInternalState}
                      //Analytics
                      addHotspotAnalytics={this.handleHotspotAnalytics}
                      addCustomHotspotAnalytics={this.addCustomHotspotAnalytics}
                      addAnalytics={(value) =>
                        this.addComponentAnalytics(
                          AnalyticsLocations.ProductReviewBooth,
                          value
                        )
                      }
                      handleStallCallHotspot={this.handleStallCallHotspot}
                      handleStallChatHotspot={this.handleStallChatHotspot}
                    ></Scene>
                  </>
                )}

                {/* {
                            this.state.UI.activeMenu.id === menuItemsId.bdr && this.state.DBRVideoCall.room &&
                            <>
                                <AudiScene
                                    changeComponenet={this.handleClick}
                                    ShowMediaModal={this.showMediaModal}
                                    initialVideo={DBRData.introVideo}
                                    globalBackButton={false}

                                    link={''}
                                    framePlacementStyle={DBRData.placementStyle}
                                    hiddeMute={false}
                                    //For Tutorial
                                    sceneName="dbr"
                                    showTut={true}
                                    tutComponent={DBRTut}
                                    subMenus={this.state.UI.activeSubMenu}
                                    //Analytics
                                    addAnalytics={(value) => {
                                        this.addComponentAnalytics(AnalyticsLocations.DBR, value)
                                    }}

                                    //useDailyCo
                                    useDailyCo={true}
                                    DailyCoData={{
                                        goToLobby: this.handleClick,
                                        name: this.context.displayName ? this.context.displayName : this.context.email.split('@')[0],
                                        room: this.state.DBRVideoCall.room,
                                        isAdmin: this.state.DBRVideoCall.roomAdmin === null ? false : this.state.DBRVideoCall.roomAdmin.roomName === this.state.DBRVideoCall.room.roomName,
                                        autoInitalize: true,
                                        showSidePanel: this.state.UI.showDBRSidePanel,
                                        hideSidePanel: this.closeDBRVideoCallSidePanel
                                    }}

                                    videoInFrame={false}
                                //
                                ></AudiScene>
                            </>
                        } */}
                {/* {this.state.UI.activeMenu.id === menuItemsId.bdr &&
              this.state.DBRVideoCall.room && (
                <>
                  <DBRScene
                    changeComponenet={this.handleClick}
                    ShowMediaModal={this.showMediaModal}
                    initialVideo={DBRData.introVideo}
                    globalBackButton={false}
                    link={""}
                    framePlacementStyle={DBRData.placementStyle}
                    hiddeMute={false}
                    //For Tutorial
                    sceneName="dbr"
                    showTut={false}
                    tutComponent={DBRTut}
                    subMenus={this.state.UI.activeSubMenu}
                    //Analytics
                    addAnalytics={(value) => {
                      this.addComponentAnalytics(AnalyticsLocations.DBR, value);
                    }}
                    //useDailyCo
                    useDailyCo={true}
                    DailyCoData={{
                      goToLobby: this.handleClick,
                      name: this.context.displayName
                        ? this.context.displayName
                        : this.context.email.split("@")[0],
                      room: this.state.DBRVideoCall.room,
                      isAdmin:
                        this.state.DBRVideoCall.roomAdmin === null
                          ? false
                          : this.state.DBRVideoCall.roomAdmin.roomName ===
                          this.state.DBRVideoCall.room.roomName,
                      autoInitalize: true,
                      showSidePanel: this.state.UI.showDBRSidePanel,
                      hideSidePanel: this.closeDBRVideoCallSidePanel,
                    }}
                    videoInFrame={false}
                  //
                  ></DBRScene>
                </>
              )} */}
                {this.state.UI.overlayMenu && (
                  <>
                    {this.state.UI.overlayMenu.id ===
                      menuItemsId.TeamBuilding && (
                      <>
                        <Connect
                          close={this.hideOverlayMenu}
                          addAnalytics={(value) => {
                            this.addComponentAnalytics(
                              AnalyticsLocations.Teambuilding,
                              value
                            );
                            this.addHotspotAnalytics("Meet_our_leaders");
                          }}
                        ></Connect>

                        {/* <ListContainer
                      data={TeamsData}
                      hideOverlayMenu={this.hideOverlayMenu}
                      handleTeamOptionSelection={this.handleTeamOptionSelection}
                      //Analytics
                      // addAnalytics={(value) => {
                      //     this.addComponentAnalytics(AnalyticsLocations.Teambuilding, value);
                      // }}
                    ></ListContainer> */}
                      </>
                    )}
                  </>
                )}
                {this.state.UI.showSurveyPopup && this.state.UI.surveyDetails && (
                  <>
                    <ListContainer
                      data={this.state.UI.surveyDetails}
                      hideOverlayMenu={() => {
                        this.setState((state) => ({
                          UI: {
                            ...state.UI,
                            showSurveyPopup: false,
                            surveyDetails: null,
                          },
                        }));
                      }}
                      handleTeamOptionSelection={(event, option) => {
                        this.showMediaModal(HotspotType.iframe, option.link);
                      }}
                    ></ListContainer>
                  </>
                )}
                {this.state.UI.activeMenu.id === menuItemsId.Networking &&
                  this.state.UI.activeSubMenu && (
                    <>
                      {/* {
                                    this.state.UI.activeSubMenu.id === NetworkingSubmenuId.Speaker &&
                                    <article className={`img-bg videoBox h-100 zIndex50`} id="play">
                                        <div className="media-modal">
                                            <iframe title={"pdf"} className="media-modal-content" src={NetworkingLounge.speakerPdf}></iframe>
                                            <img src={ImageString.CLOSEBUTTON} className="closeButton-mediaModal" alt="MediaModalCLoseButton" onClick={this.closeSubMenu} ></img>
                                        </div>
                                    </article>
                                }
                                {
                                    this.state.UI.activeSubMenu.id === NetworkingSubmenuId.Sessions &&
                                    <>
                                        <VideoPlayer videoData={VideoPlayerData} close={() => this.closeSubMenu()}></VideoPlayer>
                                    </>
                                }
                                {
                                    this.state.UI.activeSubMenu.id === NetworkingSubmenuId.Connect &&
                                    <Connect close={this.closeSubMenu}></Connect>
                                } */}
                      {this.state.UI.activeSubMenu.id ===
                        NetworkingSubmenuId.Chat && (
                        // <div className="scrollableIframeParent">
                        //     <iframe className="publicChatBox" src="/Chat/index.html" title="chatFrame"></iframe>
                        // </div>
                        <div
                          // style={
                          //   isIOS ? { width: "36vw", marginBottom: "3rem" } : {}
                          // }
                          className={`stallChatContainer stallChatContainer-global ${
                            isIOS ? "ipad-launge-chat" : ""
                          }`}
                        >
                          <img
                            src={ImageString.CLOSEBUTTON}
                            className="closeButton-mediaModal closeButton-mediaModal-corner"
                            alt="MediaModalCLoseButton"
                            onClick={this.closeSubMenu}
                            // style={{
                            //   right: "auto",
                            // }}
                          ></img>
                          <iframe
                            src={`${StaticLinks.publicChat}`}
                            title="publicChat"
                          ></iframe>
                          <div
                            className={`blocker ${
                              this.state.UI.fadeIntroImage ? "d-none" : ""
                            }`}
                            style={{ zIndex: "-1" }}
                          >
                            <div className="lds-dual-ring"></div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                {this.state.UI.activeSubMenu &&
                  this.state.UI.activeMenu.id === menuItemsId.bdr && (
                    <>
                      {this.state.UI.activeSubMenu.id ===
                        SubMenuId.GoToStage && (
                        <>
                          <div className="lobbyTutContainer">
                            <div className="tutCardContainer tutCardContainer-sm pd-b-2">
                              <div className="tutCardContainer-header  bg-red">
                                <div>Webex Call</div>
                              </div>
                              <div className="tutCardContainer-body">
                                Please click on the join button to enter the
                                Webex call.
                              </div>
                              <div className="text-center">
                                <button
                                  className="tutCardButton btn  btn-yellow mg-t30"
                                  onClick={(e) => this.closeSubMenu(e)}
                                >
                                  CANCEL
                                </button>
                                <button
                                  className="tutCardButton btn  btn-yellow mg-t30"
                                  onClick={(e) =>
                                    this.openDBRZoomLink(this.state.zoomlink, e)
                                  }
                                  style={{ marginLeft: "1rem" }}
                                >
                                  JOIN
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                {false &&
                  !this.state.UI.showGlobalChat &&
                  this.state.UI.activeMenu.id !== menuItemsId.bdr && (
                    <div
                      className={`chatButton ${isIOS ? "ios-chatButton" : ""}`}
                      style={{ paddingLeft: "22px", paddingRight: "17px" }}
                      onClick={() =>
                        this.setState((prev) => ({
                          UI: {
                            ...prev.UI,
                            showGlobalChat: true,
                          },
                        }))
                      }
                    >
                      Need Help?
                    </div>
                  )}
                {this.state.UI.showGlobalChat &&
                  this.state.UI.activeMenu.id !== menuItemsId.bdr && (
                    <div
                      // style={isIOS ? { marginBottom: "3rem" } : {}}
                      className={`stallChatContainer stallChatContainer-right-global ${
                        isIOS ? "stallchat-ipad" : ""
                      }`}
                    >
                      <img
                        src={ImageString.CLOSEBUTTON}
                        className="closeButton-mediaModal closeButton-mediaModal-right-corner"
                        alt="MediaModalCLoseButton"
                        onClick={() =>
                          this.setState((prev) => ({
                            UI: {
                              ...prev.UI,
                              showGlobalChat: false,
                            },
                          }))
                        }
                      ></img>
                      <iframe
                        src={`${StaticLinks.stallChat}`}
                        title="publicChat"
                      ></iframe>
                      <div
                        className={`blocker ${
                          this.state.UI.fadeIntroImage ? "d-none" : ""
                        }`}
                        style={{ zIndex: "-1" }}
                      >
                        <div className="lds-dual-ring"></div>
                      </div>
                    </div>
                  )}

                {false &&
                  this.state.UI.showLeaderboardButton &&
                  this.state.UI.activeMenu.id === menuItemsId.Lobby &&
                  !this.state.UI.showHelpdeskChat &&
                  !this.state.UI.overlayMenu && (
                    <div
                      className="leaderboardButton m"
                      onClick={this.handleLeaderboardButton}
                    >
                      <div className="leaderboardIcon"></div>Leaderboard
                    </div>
                  )}
                {this.state.UI.showLeaderboardButton &&
                  this.canShowLeaderboardInNet() && (
                    <div
                      className="leaderboardButton ma"
                      onClick={this.handleLeaderboardButton}
                    >
                      <div className="leaderboardIcon"></div>Leaderboard
                    </div>
                  )}
                {this.state.UI.showLeaderboard && (
                  <Leaderboard
                    close={this.handleLeaderboardClose}
                  ></Leaderboard>
                )}

                {
                  <footer className={`footerBox ${isIOS ? "footer-ios" : ""}`}>
                    {this.state.UI.overlayMenu && (
                      <>
                        {this.state.UI.overlayMenu.id ===
                          menuItemsId.MyProfile && (
                          <div>
                            <MyProfile
                              close={this.hideOverlayMenu}
                              ShowMediaModal={this.handleMedialModalFromOverlay}
                            ></MyProfile>
                          </div>
                        )}
                      </>
                    )}
                    {this.state.UI.activeMenu &&
                      !this.state.UI.activeMenu.subMenus && (
                        <Menu
                          // items={this.getActiveMenuItems(this.state.backendControl)} // {this.state.UI.menuItems}
                          items={this.state.UI.menuItems}
                          mainMenuState={
                            this.state.UI.overlayMenu
                              ? this.state.UI.overlayMenu.id
                              : this.state.UI.activeMenu.id
                          }
                          onMenuItemClick={this.handleClick}
                          canInteract={this.state.UI.isInteractable}
                        ></Menu>
                      )}
                    {this.state.UI.activeMenu.subMenus && (
                      <Menu
                        items={this.state.UI.activeMenu.subMenus}
                        mainMenuState={
                          this.state.UI.activeSubMenu
                            ? this.state.UI.activeSubMenu.id
                            : -1
                        }
                        onMenuItemClick={this.handleSubmenuItemClick}
                        canInteract={this.state.UI.isInteractable}
                        backButton={true}
                        onBackButtonClick={(e) =>
                          this.handleClick(e, menuItems[menuItemsIndex.Lobby])
                        }
                      ></Menu>
                    )}
                    {this.state.UI.activeSubMenu &&
                      this.state.UI.activeMenu.id === menuItemsId.Audi && (
                        <>
                          {this.state.UI.activeSubMenu.id === SubMenuId.QNA && (
                            <div
                              className={`submenu-container active expended`}
                            >
                              <QNA
                                headerName={"Q&A"}
                                onHeadingClick={this.closeSubMenu}
                                QNACollection={"qnaAudi"}
                                QNAReplyCollection={"qnaAudiReply"}
                                canReply={false}
                                moderated={true}
                              ></QNA>
                            </div>
                          )}
                        </>
                      )}

                    {this.state.UI.activeMenu.id === menuItemsId.Audi && (
                      <div
                        className={`submenu-container active expended ${
                          this.state.UI.activeSubMenu
                            ? this.state.UI.activeSubMenu.id === SubMenuId.POll
                              ? ""
                              : "d-none"
                            : "d-none"
                        }`}
                      >
                        <PublicPoll
                          onHeadingClick={this.closeSubMenu}
                          PollAdmin_Col={"pollAdmin"}
                          PollAdmin_Doc={"adminAccess"}
                          Poll_Doc={"poll"}
                          forceOpen={() =>
                            this.handlePollforceOpen(
                              menuItemsIndex.Audi,
                              SubMenuId.POll
                            )
                          }
                        ></PublicPoll>
                      </div>
                    )}

                    {this.state.UI.activeSubMenu &&
                      this.state.UI.activeMenu.id === menuItemsId.bdr && (
                        <>
                          {this.state.UI.activeSubMenu.id === SubMenuId.QNA && (
                            <div
                              className={`submenu-container active expended`}
                            >
                              <QNA
                                headerName={"Q&A"}
                                onHeadingClick={this.closeSubMenu}
                                QNACollection={"qna-dbr"}
                                QNAReplyCollection={"qnaReply-dbr"}
                                canReply={true}
                                moderated={true}
                              ></QNA>
                            </div>
                          )}
                        </>
                      )}

                    {this.state.UI.activeMenu.id === menuItemsId.dbr && (
                      <>
                        <div
                          className={`submenu-container active expended ${
                            this.state.UI.activeSubMenu
                              ? this.state.UI.activeSubMenu.id ===
                                SubMenuId.POll
                                ? ""
                                : "d-none"
                              : "d-none"
                          }`}
                        >
                          <PublicPoll
                            onHeadingClick={this.closeSubMenu}
                            PollAdmin_Col={"pollAdmin-dbr"}
                            PollAdmin_Doc={"adminAccess"}
                            Poll_Doc={"poll-dbr"}
                            forceOpen={() =>
                              this.handlePollforceOpen(
                                menuItemsIndex.bdr,
                                SubMenuId.POll
                              )
                            }
                          ></PublicPoll>
                        </div>
                      </>
                    )}
                  </footer>
                }
              </section>
            </div>
            {this.checkIfAudioCanPlayUnderMediaModal() &&
              this.state.UI.activeMenu.id !== menuItemsId.bdr &&
              this.state.UI.activeMenu.id !== menuItemsId.Audi &&
              this.state.UI.activeMenu.id !== menuItemsId.zoomMeeting &&
              !this.state.TwilioVideoCall.showVideoCall && (
                <ReactAudioPlayer
                  src="/3dAssets/music/ambientMusic.mp3"
                  autoPlay
                  volume={0.1}
                  loop={true}
                  preload="auto"
                  ref={this.currentAudioRef}
                />
              )}

            {this.state.UI.activeMenu.id === menuItemsId.Audi && (
              <ReactAudioPlayer
                src={clapSound}
                autoPlay={false}
                volume={0.5}
                loop={false}
                preload="auto"
                onEnded={() => {
                  this.clapref.current.audioEl.current.load();
                }}
                ref={this.clapref}
              />
            )}
            {!(
              isMobileOnly && this.state.UI.activeMenu.id === menuItemsId.Audi
            ) && (
              <div className="leftBottom">
                {isMobileOnly ? (
                  <img src="/assets/images/D2C_Mobile.png"></img>
                ) : (
                  <img src="/assets/images/D2C.png"></img>
                )}
              </div>
            )}
          </>
        )}
      </>
    );
  }

  handlePollforceOpen = (menuIndex, submenuId) => {
    const menu = menuItems[menuIndex];
    const item = menu.subMenus.filter((el) => el.id === submenuId)[0];
    this.handleSubmenuItemClick(null, item);
  };
}
Home.contextType = UserContext;

export default Home;
