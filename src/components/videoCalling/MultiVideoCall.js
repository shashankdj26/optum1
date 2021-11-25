// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import axios from "axios";
import Video from "twilio-video";
import {
  LocalVideoTrack,
  LocalAudioTrack,
  createLocalVideoTrack,
} from "twilio-video";
import { isMobileOnly } from "react-device-detect";
import { addTwilioVideoCalRoomListener } from "../firebase/firebase";
import { ImageString } from "../../const/assets/ImageString";

class MultiVideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: false,
      identity: null,
      roomId: props.room.roomId,
      roomName: props.room.roomName,
      roomIdErr: false,
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: null,
      audioEnabled: true,
      videoEnabled: true,
      screenShared: false,
      remoteScreenShared: false,
      participants: [],
      remoteScreens: [],
      screenTrack: null,
      remoteScreenTrack: null,
      showNotification: false,
      isSlotAvailable: false, //* */
      currentParticipant: null, //* */
      clientIdentity: "",
      showRest: false,
    };
    this.localMedia = null;
    this.remoteMedia = null;
    this.timerRef = null;
    this.forceExit = false;
    this.setLocalMediaRef = (element) => {
      this.localMedia = element;
    };

    this.setRemoteMediaRef = (element) => {
      this.remoteMedia = element;
    };

    this.joinRoom = this.joinRoom.bind(this);
    // this.handleroomIdChange = this.handleroomIdChange.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.attachLocalParticipantTracks = this.attachLocalParticipantTracks.bind(
      this
    );
    this.onCameraButtonClick = this.onCameraButtonClick.bind(this);
    this.onAudioButtonClick = this.onAudioButtonClick.bind(this);
    this.shareScreen = this.shareScreen.bind(this);
    this.handleTrackEnabled = this.handleTrackEnabled.bind(this);
    this.participantConnected = this.participantConnected.bind(this);
    this.participantDisconnected = this.participantDisconnected.bind(this);
    this.trackSubscribed = this.trackSubscribed.bind(this);
    this.trackUnsubscribed = this.trackUnsubscribed.bind(this);
    this.handleParticipantTrackEnabled = this.handleParticipantTrackEnabled.bind(
      this
    );
    this.handleParticipantTrackDisabled = this.handleParticipantTrackDisabled.bind(
      this
    );
    this.stopLocalScreenShare = this.stopLocalScreenShare.bind(this);
    this.startScreenShare = this.startScreenShare.bind(this);
    this._startScreenCapture = this._startScreenCapture.bind(this);
    this.handleLocalSharedScreen = this.handleLocalSharedScreen.bind(this);
    this.handleRemoteSharedScreen = this.handleRemoteSharedScreen.bind(this);
    this.stopRemoteSharedScreen = this.stopRemoteSharedScreen.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this);
    this.onCallDisconnect = this.onCallDisconnect.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  disconnectAndShowPopup = () => {
    // console.log(this.state.isSlotAvailable, "///////////////////");
    this.forceExit = true;
    this.onCallDisconnect();
    this.props.showBusyPopup();
  };

  checkSlotAvailable = () => {
    // console.log(this.state.isSlotAvailable, "///////////////////");

    // if (!this.props.isOfficial) {
    //     if (!this.state.isSlotAvailable) {
    //         if (this.state.clientIdentity !== this.props.userName) {
    //             this.disconnectAndShowPopup();
    //             return false;
    //         }
    //     }
    // }
    return true;
  };

  checkIfSlotAlreadyTaken = () => {
    // var self = this;
    // console.log(self.state.isSlotAvailable, "///////////////////");
    // if (!this.props.isOfficial) {
    //     if (!self.state.isSlotAvailable) {
    //         if (self.state.clientIdentity !== self.props.userName) {
    //             self.forceExit = true;
    //             self.leaveRoom();
    //             self.props.showBusyPopup();
    //             return false;
    //         }
    //     }
    // }
    return true;
  };

  componentDidMount() {
    // this.processProps(this.props);
    if (this.props.isOfficial) {
      addTwilioVideoCalRoomListener(
        this.props.room.roomId,
        this.props.stallId,
        (err, roomData) => {
          if (err) {
            console.log(err);
            return;
          }
          var ava = roomData.available;
          var clientIdentity = roomData.userName
          console.log(clientIdentity);
          if (ava) {
            this.setState({
              isSlotAvailable: ava,
              clientIdentity: clientIdentity,
              showRest: false,
            });
          } else {
            this.setState({
              isSlotAvailable: ava,
              clientIdentity: clientIdentity,
            });
          }
        }
      );
    }
    axios
      .post(
        // 'https://twilioserver-dot-virtualeventdemo.el.r.appspot.com/api/token'
        // 'https://video-server-dot-ultratech-event.el.r.appspot.com/api/token'
        // 'https://videoserver.ultratechbgk.com//api/token'
        // "https://videocall.photoboothassetmanagement.co.in/api/token",
        "https://videocall.photoboothassetmanagement.co.in/api/token",
        { name: this.props.userName }
      )
      .then((results) => {
        if (this.checkSlotAvailable()) {
          const { identity, token } = results.data;
          this.setState({ identity, token });
          this.joinRoom();
          return;
        }
      });
  }

  componentWillUnmount() { }

  // componentWillReceiveProps(newProps) {
  //     if (newProps) {
  //         // console.log(newProps.liveRooms)
  //         // console.log(newProps.room);
  //         // console.log(liveRoom);
  //         this.processProps(newProps);
  //     }
  // }

  // processProps = (newProps) => {
  //     console.log("updated!!!!");
  //     var liveRoom = newProps.liveRooms.filter(value => value.id == newProps.room.roomParentId)[0];
  //     var roomData = liveRoom.slots.filter(value => value.id == newProps.room.roomId)[0]
  //     var ava = roomData.available;
  //     var clientIdentity = roomData.userId;
  //     if (ava) {
  //         this.setState({
  //             isSlotAvailable: ava,
  //             clientIdentity: clientIdentity,
  //             showRest: false,
  //         });
  //     } else {
  //         this.setState({
  //             isSlotAvailable: ava,
  //             clientIdentity: clientIdentity,
  //         });
  //     }
  // }

  onCallDisconnect() {
    if (this.props.onCallDisconnect) {
      this.props.onCallDisconnect(this.forceExit);
    }
  }

  showNotification(notification) {
    this.setState({ notification });
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
      this.setState({ notification: null });
    }, notification.timeout);
  }

  joinRoom() {
    /*
     Show an error message on room name text field if user tries         joining a room without providing a room name. This is enabled by setting `roomIdErr` to true
       */
    if (!this.checkSlotAvailable()) {
      return;
    }

    if (!this.state.roomId.trim()) {
      this.setState({ roomIdErr: true });
      return;
    }

    console.log("Joining room '" + this.state.roomId + "'...");
    let connectOptions = {
      name: this.state.roomId,
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    var self = this;
    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      (error) => {
        // alert('Could not connect to Twilio: ' + error.message);
        self.disconnectAndShowPopup();
      }
    );
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    // console.log(this.state.isSlotAvailable, "///////////////////");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });

    // display local participant tracks
    let previewContainer = this.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachLocalParticipantTracks(
        room.localParticipant,
        previewContainer
      );
    }
    var count = 0;
    room.participants.forEach((participant) => {
      count++;
      this.participantConnected(participant);
    });

    // Participant joining room
    room.on("participantConnected", (participant) =>
      this.participantConnected(participant)
    );

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", (participant) =>
      this.participantLeaveRoom(participant)
    );

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop();
        });
      }
      // Detach the local media elements
      room.localParticipant.tracks.forEach((publication) => {
        publication.track.stop();
        const attachedElements = publication.track.detach();
        attachedElements.forEach((element) => element.remove());
      });

      room.participants.forEach((participant) =>
        this.participantDisconnected(participant)
      );

      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
      this.onCallDisconnect();
    });

    if (!this.checkIfSlotAlreadyTaken()) {
      return;
    }
    var self = this;
    setTimeout(function () {
      if (!self.checkIfSlotAlreadyTaken()) {
        return;
      }
    }, 1500);

    if (this.props.isOfficial) {
      this.checUserPresence(room.participants);
    } else {
      if (room.participants.size === 0) {
        this.props.showPopup();
      }
    }
  }

  checUserPresence = (participants) => {
    //check if not availabe
    console.log("check User Presence", this.state.isSlotAvailable);
    console.log(this.state);
    if (!this.state.isSlotAvailable && this.state.clientIdentity.length > 0) {
      var self = this;
      var found = false;
      console.log("searching for " + self.state.clientIdentity);
      participants.forEach((participant) => {
        if (participant.identity == self.state.clientIdentity) {
          found = true;
          console.log(participant.identity);
        }
      });
      if (!found) {
        console.log("user might me disconnected,");
        console.log("ResetSlot");
        if (!self.state.isSlotAvailable) {
          self.setState({
            showRest: true,
          });
          self.props.slotReset();
        } else {
          console.log("No need to show resetButton");
        }
      } else {
        console.log("user is still here");
      }
    }
  };

  participantConnected(participant) {
    console.log(participant);
    const participants = this.state.participants;
    participants.push(participant);
    this.setState({ participants: participants });

    const parentDiv = document.createElement("div");
    parentDiv.id = participant.sid;
    parentDiv.classList.add("callingBox__video_1_1");

    const div = document.createElement("div");
    div.classList.add("callingBox__video_1_1-container");

    const span = document.createElement("span");
    span.id = "caller-name";
    span.classList.add("callingBox__nameTag_1_1");
    span.innerText = participant.identity;
    div.appendChild(span);

    const button = document.createElement("button");
    button.classList.add("icon-btn");
    const icon = document.createElement("i");
    icon.classList.add("icon-speaker");
    button.appendChild(icon);
    div.appendChild(button);

    const videoDiv = document.createElement("div");
    videoDiv.id = "video";
    videoDiv.classList.add("callingBox__video_1_1-wrapper");
    videoDiv.classList.add("has-video_1_1");
    div.appendChild(videoDiv);

    parentDiv.appendChild(div);

    this.remoteMedia.appendChild(parentDiv);

    participant.tracks.forEach((publication) => {
      if (publication.track) {
        this.trackSubscribed([publication.track], videoDiv);
      }
      publication.on("subscribed", this.handleTrackEnabled);
    });

    participant.on("trackSubscribed", (track) => {
      if (track.kind == "video") {
        videoDiv.setAttribute("videoId", track.sid);
      } else {
        videoDiv.setAttribute("audioId", track.sid);
      }
      this.trackSubscribed([track], videoDiv);
    });

    participant.on("trackUnsubscribed", (track) => {
      this.stopRemoteSharedScreen([track]);
    });
  }

  participantLeaveRoom = (participant) => {
    if (this.state.participants.length > 0) {
      let participants = this.state.participants;
      participants = participants.filter((par) => par.sid != participant.sid);
      // console.log(participants);
      if (!this.props.isOfficial && participants.length == 0) {
        this.props.showPopup();
      }

      this.setState({ participants: participants });
    }

    if (this.props.isOfficial) {
      console.log("Participant '" + participant.identity + "' left the room");
      console.log("Client id => '" + this.state.clientIdentity + " ");

      if (participant.identity === this.state.clientIdentity) {
        //wait for 6 sec check data to reset
        var self = this;
        setTimeout(function () {
          if (!self.state.isSlotAvailable) {
            console.log("we should wait for 20 moreSeconds ");
            self.setState({
              showRest: true,
            });
            self.props.slotReset();
          } else {
            console.log("No need to show resetButton");
          }
        }, 8000);
      }
    }
    document.getElementById(participant.sid).remove();
  };

  participantDisconnected = (participant) => {
    if (this.state.participants.length > 0) {
      let participants = this.state.participants;
      participants = participants.filter((par) => par.sid != participant.sid);
      this.setState({ participants: participants });
    }
    console.log("Participant '" + participant.identity + "' left the room");
    console.log("Client id => '" + this.state.clientIdentity + " ");
    document.getElementById(participant.sid).remove();
  };

  trackSubscribed(tracks, container) {
    tracks.forEach((track) => {
      if (track.name != "screen") {
        container.appendChild(track.attach());
        if (track.isEnabled) {
          this.handleParticipantTrackEnabled(track);
        } else {
          this.handleParticipantTrackDisabled(track);
        }
      } else {
        this.handleRemoteSharedScreen([track]);
        this.stopLocalScreenShare();
      }
    });
  }

  attachLocalParticipantTracks(participant, container) {
    let tracks = Array.from(participant.tracks.values());
    tracks.forEach((publication) => {
      container.appendChild(publication.track.attach());
    });
  }

  leaveRoom() {
    if (this.state.activeRoom) {
      this.state.activeRoom.disconnect();
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    }
  }

  handleTrackEnabled(track) {
    track.on("enabled", () => this.handleParticipantTrackEnabled(track));
    track.on("disabled", () => this.handleParticipantTrackDisabled(track));
  }

  handleParticipantTrackEnabled(track) {
    if (track.kind == "video") {
      let video = document.querySelector(`[videoid="${track.sid}"]`);
      video.parentElement.classList.remove(
        "callingBox__video_1_1-container--audio"
      );
      video.classList.remove("d-none");
    }
    if (track.kind == "audio") {
      let name = document.querySelector(`[audioid="${track.sid}"]`)
        .parentElement.firstChild;
      name.classList.add("user-speaking");
      let button = document.querySelector(`[audioid="${track.sid}"]`)
        .parentElement.childNodes[1];
      button.classList.add("active");
    }
  }

  handleParticipantTrackDisabled(track) {
    if (track.kind == "video") {
      console.log(track.sid);
      let video = document.querySelector(`[videoid="${track.sid}"]`);
      if (video) {
        video.parentElement.classList.add(
          "callingBox__video_1_1-container--audio"
        );
        video.classList.add("d-none");
      }
    }
    if (track.kind == "audio") {
      let name = document.querySelector(`[audioid="${track.sid}"]`);
      if (name) {
        name = name.parentElement.firstChild;
        name.classList.remove("user-speaking");
      }
      let button = document.querySelector(`[audioid="${track.sid}"]`);
      if (button) {
        button = button.parentElement.childNodes[1];
        button.classList.remove("active");
      }
    }
  }

  onCameraButtonClick(event) {
    event.preventDefault();

    if (this.state.activeRoom) {
      if (this.state.videoEnabled) {
        this.state.activeRoom.localParticipant.videoTracks.forEach((pub) => {
          if (pub.track.name != "screen") {
            pub.track.disable();
          }
        });
      } else {
        this.state.activeRoom.localParticipant.videoTracks.forEach((pub) => {
          if (pub.track.name != "screen") {
            pub.track.enable();
          }
        });
      }
      this.setState({ videoEnabled: !this.state.videoEnabled });
    }
  }

  onAudioButtonClick(event) {
    event.preventDefault();
    if (this.state.activeRoom) {
      if (this.state.audioEnabled) {
        this.state.activeRoom.localParticipant.audioTracks.forEach((pub) => {
          pub.track.disable();
        });
      } else {
        this.state.activeRoom.localParticipant.audioTracks.forEach((pub) => {
          pub.track.enable();
        });
      }
      this.setState({ audioEnabled: !this.state.audioEnabled });
    }
  }

  shareScreen(event) {
    event.preventDefault();
    if (this.state.activeRoom) {
      if (this.state.screenTrack == null) {
        this.startScreenShare();
      } else {
        this.stopLocalScreenShare();
      }
    }
  }

  _startScreenCapture() {
    if (navigator.getDisplayMedia) {
      return navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      return navigator.mediaDevices.getDisplayMedia({ video: true });
    } else {
      return navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }
  }

  startScreenShare() {
    const that = this;

    if (this.state.remoteScreens.length > 0) {
      //Show Notification screen already shared
      console.log("Already Shared");
      this.showNotification({
        line1: "You can't Share Screen right now.",
        line2: "Someone is already sharing.",
        timeout: 10000,
      });
      return;
    }

    this._startScreenCapture().then(function (stream) {
      const audioTracks = stream
        .getAudioTracks()
        .map((track) => new LocalAudioTrack(track));
      const videoTracks = stream.getVideoTracks().map((track) => {
        return new LocalVideoTrack(track, { name: "screen" });
      });
      const tracks = audioTracks.concat(videoTracks);
      that.handleLocalSharedScreen(tracks);
      stream.getTracks()[0].onended = () => that.stopLocalScreenShare();
    });
  }

  stopRemoteSharedScreen(tracks) {
    let remoteScreens = this.state.remoteScreens;

    tracks.forEach((track) => {
      track.detach().forEach((element) => element.remove());
      remoteScreens = remoteScreens.filter(
        (remoteScreen) => track.id != remoteScreen.id
      );
    });

    this.setState({ remoteScreens: remoteScreens });
  }

  handleRemoteSharedScreen(tracks) {
    const remoteScreens = this.state.remoteScreens;

    tracks.forEach((track) => {
      document.getElementById("screen-share").appendChild(track.attach());
      remoteScreens.push(track);
    });

    this.setState({ remoteScreens: remoteScreens });
  }

  handleLocalSharedScreen(tracks) {
    this.setState({ screenTrack: tracks });
    this.state.activeRoom.localParticipant.publishTracks(tracks);
    this.setState({ screenShared: true });
    tracks.forEach((track) => {
      document.getElementById("screen-share").appendChild(track.attach());
    });
  }

  stopLocalScreenShare() {
    try {
      if (
        this.state.activeRoom &&
        this.state.screenTrack &&
        this.state.screenShared
      ) {
        this.state.activeRoom.localParticipant.unpublishTracks(
          this.state.screenTrack
        );
        this.state.screenTrack.forEach((track) => {
          track.stop();
          track.detach().forEach((element) => element.remove());
        });
        this.setState({ screenTrack: null });
        this.setState({ screenShared: false });
      }
    } catch (e) {
      console.error(e);
    }
  }

  trackUnsubscribed(track) {
    track.detach().forEach((element) => element.remove());
  }

  openFullscreen() {
    let elem = document.getElementById("screen-share").children[1];

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  render() {
    const participants = this.state.participants;
    const length = participants.length + 1;
    let view = "auto";

    if (length <= 1) {
      view = "auto";
    } else if (length <= 4) {
      view = "auto auto";
    } else if (length <= 6) {
      view = "auto auto auto";
    } else if (length <= 8) {
      view = "auto auto auto auto";
    }

    let remoteShared = this.state.remoteScreens.length > 0;

    return (
      <>
        {this.state.zoom ? (
          <iframe src="/zoom-call/index.html" />
        ) : (
          <section className="callingBox one-on-oneVideoCall">
            <img
              src={ImageString.BACKBUTTON}
              alt="backButtonToLobby"
              className="backButton"
              onClick={(e) => this.leaveRoom(e)}
            ></img>
            {/* <header className="headerBox headerBox__gradient">
              <div className="link-btn link-btn--left">
                <img src={ImageString.LOGO} alt="" />
                <span>{this.state.roomName}</span>
              </div>
            </header> */}

            {this.state.showNotification && (
              <div className="call-end-notification">
                {this.state.notification.line1}
                <span>{this.state.notification.line2}</span>
              </div>
            )}

            <div
              className={`shared-screenBox has-video_1_1 ${this.state.screenShared || remoteShared ? "active" : ""
                }`}
              id="screen-share"
            >
              <button className="full-screen-btn" onClick={this.openFullscreen}>
                <i className="icon-full-screen"></i>
              </button>
            </div>

            <div
              className={`callingBox__video_1_1-wrapper ${this.state.screenShared || remoteShared ? "shared-active" : ""
                }`}
              style={{ gridTemplateColumns: view }}
              ref={this.setRemoteMediaRef}
            >
              <div className="callingBox__video_1_1">
                <div
                  className={`callingBox__video_1_1-container ${this.state.videoEnabled
                      ? " "
                      : " callingBox__video_1_1-container--audio "
                    }`}
                >
                  <span
                    className={`callingBox__nameTag_1_1 ${this.state.audioEnabled ? " user-speaking " : ""
                      } `}
                  >
                    {this.props.userName}
                  </span>
                  <div
                    className={`callingBox__video_1_1-wrapper has-video_1_1 ${this.state.videoEnabled ? "" : "d-none"
                      }`}
                    id="local-media"
                    ref={this.setLocalMediaRef}
                  ></div>
                </div>
              </div>
            </div>
            <div className="callingBox__buttons callingBox__buttons__gradient">
              <div className="link-btn link-btn--left">
                <img src={ImageString.LOGO} alt="" />
                <span>{this.state.roomName}</span>
              </div>
              <ul className="callingBox__buttons-list">
                <li>
                  <button
                    className="icon-btn"
                    onClick={this.onCameraButtonClick}
                  >
                    <i
                      className={
                        this.state.videoEnabled
                          ? "icon-video-btn"
                          : "icon-video-btn-mute"
                      }
                    ></i>
                  </button>
                </li>
                <li>
                  <button
                    className="icon-btn icon-btn--red"
                    onClick={this.leaveRoom}
                  >
                    <i className="icon-phone"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="icon-btn"
                    onClick={this.onAudioButtonClick}
                  >
                    <i
                      className={
                        this.state.audioEnabled
                          ? "icon-mic-btn"
                          : "icon-mic-btn-mute"
                      }
                    ></i>
                  </button>
                </li>
              </ul>
              {!isMobileOnly && (
                <button onClick={this.shareScreen} className="link-btn">
                  <i className="icon-external-link"></i>
                  <span>
                    {!this.state.screenShared
                      ? `Share your screen`
                      : `Stop sharing`}
                  </span>
                </button>
              )}

              {this.props.isOfficial && this.state.showRest && (
                <button
                  onClick={() => {
                    this.props.slotReset();
                    this.setState({
                      showRest: false,
                    });
                  }}
                  className="link-btn pos-right-18"
                >
                  <span>ResetState</span>
                </button>
              )}
            </div>
          </section>
        )}
      </>
    );
  }
}

export default MultiVideoCall;
