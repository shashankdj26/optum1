// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import axios from 'axios';
import Video from 'twilio-video';
// import {FirebaseContext} from "../../firebase";
import { LocalVideoTrack, LocalAudioTrack, createLocalVideoTrack } from "twilio-video";
import CallMenu from "./CallMenu";
import CallSideButtons from "./CallSideButtons";
import CallSettings from "./CallSettings";
import VideoCallChat from "../VideoCallChat/VideoCallChat";
import BuyerCollection from "../BuyerCollection/BuyerCollection";
import SellerCollection from "../BuyerCollection/SellerCollection";
import PropTypes from "prop-types";

class TestVideoCall extends Component {
    // static contextType = FirebaseContext;

    constructor(props) {
        super(props);
        this.state = {
            splitScreen: this.props.splitScreen,
            identity: null,
            roomId: props.room.roomId,
            roomName: props.room.roomName,
            seller: props.room.seller,
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
            showSettings: false,
            pinActive: false,
            pinSid: null
        };
        this.localMedia = null;
        this.remoteMedia = null;

        this.setLocalMediaRef = element => {
            this.localMedia = element;
        };

        this.setRemoteMediaRef = element => {
            this.remoteMedia = element;
        };


        this.joinRoom = this.joinRoom.bind(this);
        // this.handleroomIdChange = this.handleroomIdChange.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.roomJoined = this.roomJoined.bind(this);
        this.attachLocalParticipantTracks = this.attachLocalParticipantTracks.bind(this);
        this.onCameraButtonClick = this.onCameraButtonClick.bind(this);
        this.onAudioButtonClick = this.onAudioButtonClick.bind(this);
        this.shareScreen = this.shareScreen.bind(this);
        this.handleTrackEnabled = this.handleTrackEnabled.bind(this);
        this.participantConnected = this.participantConnected.bind(this);
        this.participantDisconnected = this.participantDisconnected.bind(this);
        this.trackSubscribed = this.trackSubscribed.bind(this);
        this.trackUnsubscribed = this.trackUnsubscribed.bind(this);
        this.handleParticipantTrackEnabled = this.handleParticipantTrackEnabled.bind(this);
        this.handleParticipantTrackDisabled = this.handleParticipantTrackDisabled.bind(this);
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

    componentDidMount() {

        try {
            navigator.mediaDevices.enumerateDevices().then(this.setupDevices);
            if (this.state.cameras && this.state.cameras.length == 0) {
                alert("Camera not available.")
                this.leaveRoom();
                return;
            }
            if (this.state.microphones && this.state.microphones.length == 0) {
                alert("Microphone not available.")
                this.leaveRoom();
                return;
            }
        } catch (exception) {
            alert("Media Devices not available.")
            this.leaveRoom();
            return;
        }

        let userName = this.props.user.userName + (this.state.seller ? "$seller" : "");
        console.log(userName);
        axios.post('https://iijs-token-server.djvirtualevents.com/api/token',   //'https://iijs-token-server.djvirtualevents.com/api/token',
            { name: userName })
            .then(results => {
                const { identity, token } = results.data;
                this.setState({ identity, token });
                this.joinRoom();
            })
            .catch(error => {
                console.error(error);
                console.log("Failed to connect to djvirtualevents token server. Trying appspot server");

                axios.post('https://twilioserver-dot-iijs-virtual-event.el.r.appspot.com/api/token',    //'https://twilioserver-dot-virtualeventdemo.el.r.appspot.com/api/token',
                    { name: userName })
                    .then(results => {
                        const { identity, token } = results.data;
                        this.setState({ identity, token });
                        this.joinRoom();
                    });
            });

        // axios.post('https://twilioserver-dot-virtualeventdemo.el.r.appspot.com/api/token', {name: this.props.userName}).then(results => {
        //     const {identity, token} = results.data;
        //     this.setState({identity, token});
        //     this.joinRoom();
        // });

    }

    componentWillReceiveProps(newProps) {
        if (newProps.forceDisconnect) {
            this.leaveRoom();
        }
    }

    onCallDisconnect() {
        if (this.props.onCallDisconnect) {
            this.props.onCallDisconnect();
        }
    }

    showNotification = (showChatNotification) => {
        this.setState({ showChatNotification: showChatNotification });
    }


    joinRoom() {
        /*
     Show an error message on room name text field if user tries         joining a room without providing a room name. This is enabled by setting `roomIdErr` to true
       */
        if (!this.state.roomId.trim()) {
            this.setState({ roomIdErr: true });
            return;
        }

        console.log("Joining room '" + this.state.roomId + "'...");


        let connectOptions = {
            name: this.state.roomId,
            audio: true,
            // video: { height: 144, frameRate: 24, width: 176 },
            networkQuality: true,
            bandwidthProfile: {
                video: {
                    mode: 'grid',
                    trackSwitchOffMode: 'detected',
                    maxSubscriptionBitrate: 2400000,
                    dominantSpeakerPriority: 'high',
                    maxTracks: 6,
                    renderDimensions: {
                        high: { width: 1080, height: 720 },
                        standard: { width: 640, height: 480 },
                        low: { width: 320, height: 240 }
                    }
                }
            }
        };

        if (this.state.previewTracks) {
            connectOptions.tracks = this.state.previewTracks;
        }


        Video.createLocalTracks({
            audio: true,
            video: { name: this.getVideoId(this.state.seller) },
            networkQuality: true,
            bandwidthProfile: {
                video: {
                    mode: 'grid',
                    trackSwitchOffMode: 'detected',
                    maxSubscriptionBitrate: 2400000,
                    dominantSpeakerPriority: 'high',
                    maxTracks: 6,
                    renderDimensions: {
                        high: { width: 1080, height: 720 },
                        standard: { width: 640, height: 480 },
                        low: { width: 320, height: 240 }
                    }
                }
            }
        }).then(localTracks => {
            connectOptions.tracks = localTracks;
            Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {
                alert('Could not connect to Twilio: ' + error.message);
            });
        });
    }

    getVideoId = (isSeller) => {
        return isSeller ? 'seller-video' + this.uuidv4() : 'buyer-video' + this.uuidv4()
    }

    roomJoined(room) {
        // Called when a participant joins a room
        // if (this.props.addAnalytics) {
        //     this.props.addAnalytics();
        // }

        // debugger;
        console.log("Joined as '" + this.state.identity + "'");
        this.setState({ activeRoom: room, localMediaAvailable: true, hasJoinedRoom: true });


        // display local participant tracks
        let previewContainer = this.localMedia;
        if (previewContainer && !previewContainer.querySelector('video')) {
            this.attachLocalParticipantTracks(room.localParticipant, previewContainer);
        }

        console.log(room.participants);
        // debugger;

        room.participants.forEach(participant => this.participantConnected(participant));

        // Participant joining room
        room.on('participantConnected', participant => this.participantConnected(participant));

        // Detach all participant’s track when they leave a room.
        room.on('participantDisconnected', participant => this.participantDisconnected(participant));

        // Once the local participant leaves the room, detach the Tracks
        // of all other participants, including that of the LocalParticipant.
        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach(track => {
                    track.stop();
                });
            }
            // Detach the local media elements
            room.localParticipant.tracks.forEach(publication => {
                publication.track.stop();
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
            });

            room.participants.forEach(participant => this.participantDisconnected(participant));

            this.state.activeRoom = null;
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
            this.onCallDisconnect();
        });
    }

    setupDevices = (mediaDevices) => {
        this.setState({ cameras: this.getDevice(mediaDevices, 'videoinput', 'Camera') });
        this.setState({ microphones: this.getDevice(mediaDevices, 'audioinput', 'Audio') });
    }

    getDevice = (mediaDevices, type, defaultLable) => {
        let count = 1;
        // eslint-disable-next-line no-unused-vars
        let devices = mediaDevices.map(mediaDevice => {
            if (mediaDevice.kind === type) {
                let camera = { id: mediaDevice.deviceId, label: `${defaultLable} ${count}` };

                if (mediaDevice.label) {
                    camera.label = mediaDevice.label.length < 16 ? mediaDevice.label : mediaDevice.label.substr(0, 14) + ".."
                    camera.fullLabel = mediaDevice.label;
                }
                return camera;
            } else {
                console.log(mediaDevice)
                return null;
            }
        }).filter(camera => camera != null);
        return devices
    }

    participantConnected(participant) {
        console.log(this.state.participants);
        console.log(participant);
        const participants = this.state.participants;
        participants.push(participant);
        this.setState({ participants: participants })

        const parentDiv = document.createElement('div');
        parentDiv.id = participant.sid;
        parentDiv.classList.add("callingBox__video");

        const div = document.createElement('div');
        div.classList.add("callingBox__video-container");

        const span = document.createElement('span')
        span.id = "caller-name";
        span.classList.add("callingBox__nameTag");
        if (participant.identity.endsWith("$seller")) {
            span.classList.add("callingBox__nameTag--seller");
            span.innerText = participant.identity.replace("$seller", "");
        } else {
            span.innerText = participant.identity;
        }
        div.appendChild(span);

        const button = document.createElement('button')
        button.classList.add("icon-btn");
        const icon = document.createElement('i')
        icon.classList.add("icon-speaker");
        button.appendChild(icon);
        div.appendChild(button);

        const videoDiv = document.createElement('div');
        videoDiv.id = "video";
        videoDiv.classList.add("callingBox__video-wrapper");
        videoDiv.classList.add("has-video");
        div.appendChild(videoDiv);

        const buttonFullScreen = document.createElement('button')
        buttonFullScreen.classList.add("full-screen-btn");
        const iconFullScreen = document.createElement('i')
        iconFullScreen.classList.add("icon-full-screen");
        buttonFullScreen.appendChild(iconFullScreen);
        buttonFullScreen.addEventListener("click", () => {
            if (participant.sid != this.state.pinSid) {
                this.unPin();
            }

            this.setState({ pinSid: participant.sid });
            this.pinVideo();
        });
        videoDiv.appendChild(buttonFullScreen);



        parentDiv.appendChild(div);

        this.remoteMedia.appendChild(parentDiv);

        participant.tracks.forEach(publication => {

            if (publication.track) {
                this.trackSubscribed([publication.track], videoDiv);
            }
            publication.on('subscribed', this.handleTrackEnabled);
        });

        participant.on('trackSubscribed', track => {
            if (track.kind == 'video') {
                videoDiv.setAttribute("videoId", track.sid);
            } else {
                videoDiv.setAttribute("audioId", track.sid);
            }
            this.trackSubscribed([track], videoDiv);

        });

        participant.on('trackUnsubscribed', track => {
            this.stopRemoteSharedScreen([track]);
        });

    }

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    fakeParticipantConnected() {
        const participants = this.state.participants;
        if (participants.length === 0)
            return;
        var randomID = this.makeid(5);
        var participant = { ...participants[0] };
        participant.sid += "_" + randomID;
        participant.identity += "_" + randomID;
        participants.push(participant);
        this.setState({ participants: participants })

        const parentDiv = document.createElement('div');
        parentDiv.id = participant.sid;
        parentDiv.classList.add("callingBox__video");

        const div = document.createElement('div');
        div.classList.add("callingBox__video-container");

        const span = document.createElement('span')
        span.id = "caller-name";
        span.classList.add("callingBox__nameTag");
        if (participant.identity.endsWith("$seller")) {
            span.classList.add("callingBox__nameTag--seller");
            span.innerText = participant.identity.replace("$seller", "");
        } else {
            span.innerText = participant.identity;
        }
        div.appendChild(span);

        const button = document.createElement('button')
        button.classList.add("icon-btn");
        const icon = document.createElement('i')
        icon.classList.add("icon-speaker");
        button.appendChild(icon);
        div.appendChild(button);

        const videoDiv = document.createElement('div');
        videoDiv.id = "video";
        videoDiv.classList.add("callingBox__video-wrapper");
        videoDiv.classList.add("has-video");
        div.appendChild(videoDiv);

        const buttonFullScreen = document.createElement('button')
        buttonFullScreen.classList.add("full-screen-btn");
        const iconFullScreen = document.createElement('i')
        iconFullScreen.classList.add("icon-full-screen");
        buttonFullScreen.appendChild(iconFullScreen);
        buttonFullScreen.addEventListener("click", () => {
            if (participant.sid != this.state.pinSid) {
                this.unPin();
            }

            this.setState({ pinSid: participant.sid });
            this.pinVideo();
        });
        videoDiv.appendChild(buttonFullScreen);



        parentDiv.appendChild(div);

        this.remoteMedia.appendChild(parentDiv);

        participant.tracks.forEach(publication => {

            if (publication.track) {
                this.trackSubscribed([publication.track], videoDiv);
            }
            publication.on('subscribed', this.handleTrackEnabled);
        });

        // participant.on('trackSubscribed', track => {
        //     if (track.kind == 'video') {
        //         videoDiv.setAttribute("videoId", track.sid);
        //     } else {
        //         videoDiv.setAttribute("audioId", track.sid);
        //     }
        //     this.trackSubscribed([track], videoDiv);

        // });

        // participant.on('trackUnsubscribed', track => {
        //     this.stopRemoteSharedScreen([track]);
        // });

    }


    pinVideo = () => {
        let remoteShared = this.state.remoteScreens.length > 0;

        if (this.state.screenShared || remoteShared) {
            return;
        }

        if (this.state.pinSid) {
            if (this.state.pinActive == true) {
                this.unPin();
            } else {
                this.pin();
            }
        }

    }

    unPin = () => {
        if (this.state.pinActive == true) {
            let video = document.getElementById(this.state.pinSid);
            this.setState({ pinActive: false });
            document.getElementById('screen-share').classList.add("d-none")
            document.getElementById('screen-share').removeChild(video);
            this.remoteMedia.appendChild(video);
        }
    }

    pin = () => {
        if (this.state.pinActive == false) {
            let video = document.getElementById(this.state.pinSid);
            this.setState({ pinActive: true });
            document.getElementById('screen-share').classList.remove("d-none")
            document.getElementById('screen-share').appendChild(video);
        }
    }

    participantDisconnected(participant) {
        try {
            if (this.state.participants.length > 0) {
                let participants = this.state.participants;
                participants = participants.filter(par => par.sid != participant.sid);
                this.setState({ participants: participants })
            }
            console.log("Participant '" + participant.identity + "' left the room");
            document.getElementById(participant.sid).remove();
        } catch (e) {
            console.log(e)
        }

    }

    trackSubscribed(tracks, container) {
        tracks.forEach(track => {
            if (track.name != "screen") {
                container.appendChild(track.attach());
                if (track.isEnabled) {
                    this.handleParticipantTrackEnabled(track);
                } else {
                    this.handleParticipantTrackDisabled(track);
                }
            }
            else {
                this.handleRemoteSharedScreen([track]);
                this.stopLocalScreenShare();
            }
        });
    }

    attachLocalParticipantTracks(participant, container) {
        let tracks = Array.from(participant.tracks.values());
        tracks.forEach(publication => {
            container.appendChild(publication.track.attach());
        });
    }

    leaveRoom() {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
        }

        if (this.props.onDisconnect && !this.props.forceDisconnect) {
            this.props.onDisconnect();
        }
    }

    handleTrackEnabled(track) {
        track.on('enabled', () => this.handleParticipantTrackEnabled(track));
        track.on('disabled', () => this.handleParticipantTrackDisabled(track));
    }

    handleParticipantTrackEnabled(track) {
        try {
            if (track.kind == 'video') {
                let video = document.querySelector(`[videoid="${track.sid}"]`);
                video.parentElement.classList.remove("callingBox__video-container--audio");
                video.classList.remove("d-none");
            }
            if (track.kind == 'audio') {
                let name = document.querySelector(`[audioid="${track.sid}"]`).parentElement.firstChild;
                name.classList.add("user-speaking");
                let button = document.querySelector(`[audioid="${track.sid}"]`).parentElement.childNodes[1];
                button.classList.add("active");
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleParticipantTrackDisabled(track) {
        try {
            if (track.kind == 'video') {
                let video = document.querySelector(`[videoid="${track.sid}"]`);
                video.parentElement.classList.add("callingBox__video-container--audio");
                video.classList.add("d-none");
            } if (track.kind == 'audio') {

                let name = document.querySelector(`[audioid="${track.sid}"]`).parentElement.firstChild;
                name.classList.remove("user-speaking");

                let button = document.querySelector(`[audioid="${track.sid}"]`).parentElement.childNodes[1];
                button.classList.remove("active");
            }
        } catch (e) {
            console.log(e);
        }
    }

    onCameraButtonClick(event) {
        event.preventDefault();

        if (this.state.activeRoom) {
            if (this.state.videoEnabled) {
                this.state.activeRoom.localParticipant.videoTracks.forEach(pub => {
                    if (pub.track.name != "screen") {
                        pub.track.disable();
                    }
                });
            } else {
                this.state.activeRoom.localParticipant.videoTracks.forEach(pub => {
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
                this.state.activeRoom.localParticipant.audioTracks.forEach(pub => {
                    pub.track.disable();
                });
            } else {
                this.state.activeRoom.localParticipant.audioTracks.forEach(pub => {
                    pub.track.enable();
                });
            }
            this.setState({ audioEnabled: !this.state.audioEnabled });
        }
    }

    shareScreen(event) {
        event.preventDefault();
        this.unPin()
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
            return navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } });
        }
    }

    startScreenShare() {
        const that = this;

        if (this.state.remoteScreens.length > 0) {
            //Show Notification screen already shared
            console.log("Already Shared");
            //this.showNotification({line1: "You can't Share Screen right now.", line2: "Someone is already sharing.", timeout: 10000});
            return;
        }

        this._startScreenCapture().then(function (stream) {
            const audioTracks = stream.getAudioTracks().map(track => new LocalAudioTrack(track));
            const videoTracks = stream.getVideoTracks().map(track => {
                return new LocalVideoTrack(track, { name: "screen" });
            });
            const tracks = audioTracks.concat(videoTracks);
            that.handleLocalSharedScreen(tracks);
            stream.getTracks()[0].onended = () => that.stopLocalScreenShare();
        });

    }

    stopRemoteSharedScreen(tracks) {
        let remoteScreens = this.state.remoteScreens;

        console.log(tracks)

        tracks.forEach(track => {
            track.detach().forEach(element => element.remove());
            if (track.name == "screen")
                remoteScreens = remoteScreens.filter(remoteScreen => track.id != remoteScreen.id);
        });

        this.setState({ remoteScreens: remoteScreens });

    }

    handleRemoteSharedScreen(tracks) {
        const remoteScreens = this.state.remoteScreens;

        tracks.forEach(track => {
            // this.pinVideo();
            this.unPin();
            document.getElementById('screen-share').appendChild(track.attach());
            remoteScreens.push(track);
        })

        this.setState({ remoteScreens: remoteScreens });

    }

    handleLocalSharedScreen(tracks) {
        this.setState({ screenTrack: tracks });
        this.state.activeRoom.localParticipant.publishTracks(tracks);
        this.setState({ screenShared: true });
        tracks.forEach(track => {
            document.getElementById('screen-share').appendChild(track.attach());
        })
    }

    stopLocalScreenShare() {
        try {
            if (this.state.activeRoom && this.state.screenTrack && this.state.screenShared) {
                this.state.activeRoom.localParticipant.unpublishTracks(this.state.screenTrack);
                this.state.screenTrack.forEach(track => {
                    track.stop();
                    track.detach().forEach(element => element.remove())
                });
                this.setState({ screenTrack: null });
                this.setState({ screenShared: false });
            }
        } catch (e) {
            console.error(e);
        }
    }

    trackUnsubscribed(track) {
        track.detach().forEach(element => element.remove());
    }

    openFullscreen() {
        let elem = document.getElementById("screen-share").children[1];

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    updateVideoDevice = (id) => {
        const localParticipant = this.state.activeRoom.localParticipant;
        if (id !== '') {
            Video.createLocalVideoTrack({
                name: this.getVideoId(this.state.seller),
                deviceId: { exact: id }
            }).then((localVideoTrack) => {

                const tracks = Array.from(localParticipant.videoTracks.values()).map(publication => publication.track).filter(track => track.name != 'screen');
                console.log(localParticipant.videoTracks.values());
                localParticipant.unpublishTracks(tracks);

                tracks.forEach(track => {
                    const attachedElements = track.detach();
                    attachedElements.forEach(element => element.remove());
                });


                localParticipant.publishTrack(localVideoTrack).then(value => {
                    let previewContainer = this.localMedia;
                    previewContainer.appendChild(localVideoTrack.attach());

                    // let previewContainer1 = this.localMedia1;
                    // previewContainer1.appendChild(localVideoTrack.attach());

                });


            });
        }

        this.setState({ showCameraOptions: false })
    }

    updateAudioDevice = (id) => {
        const localParticipant = this.state.activeRoom.localParticipant;
        if (id !== '') {

            Video.createLocalAudioTrack({
                name: "seller-audio" + this.uuidv4(),
                deviceId: { exact: id }
            }).then((localAudioTrack) => {
                console.log(localAudioTrack)
                const tracks = Array.from(localParticipant.audioTracks.values()).map(publication => publication.track);
                localParticipant.unpublishTracks(tracks);

                tracks.forEach(track => {
                    const attachedElements = track.detach();
                    attachedElements.forEach(element => element.remove());
                });


                localParticipant.publishTrack(localAudioTrack).then(value => {
                    let previewContainer = this.localMedia;
                    previewContainer.appendChild(localAudioTrack.attach());

                });
            });
        }

        this.setState({ showCameraOptions: false })
    }

    handleSplitScreen = (event, sideMenu) => {
        // debugger;
        if (sideMenu == this.state.activeSideMenu) {
            this.setState({ splitScreen: false })
            this.setState({ activeSideMenu: null })
        } else {
            this.setState({ splitScreen: true })
            this.setState({ activeSideMenu: sideMenu });
        }
        console.log(this.state);
    }

    onSettingsClick = () => {
        this.setState({ showSettings: !this.state.showSettings })
    }

    onCloseClick = (event) => {
        this.setState({ splitScreen: false })
        this.setState({ activeSideMenu: null })
    }

    generateGrid = () => {
        const participants = this.state.participants;
        const length = participants.length + 1;

        let view = "auto";
        if (this.state.splitScreen && length == 2) {
            return view;
        }

        if (length <= 1) {
            view = "auto";
        } else if (length <= 4) {
            view = "auto auto"
        } else if (length <= 6) {
            view = "auto auto auto"
        } else if (length <= 8) {
            view = "auto auto auto auto"
        }
        else {
            view = "";
            var sqRoot = Math.floor(Math.sqrt(length));
            for (var i = 0; i < sqRoot; i++) {
                view += "auto ";
            }
        }
        return view;
    }

    render() {

        let view = this.generateGrid()
        let remoteShared = this.state.remoteScreens.length > 0;

        return (
            <>

                <div className={`callingBox__body  h-100 ${this.state.splitScreen ? ' callingBox__body-right__active ' : ''}`}>

                    <div className={`callingBox__left h-100 ${this.state.screenShared || remoteShared || this.state.pinActive ? "pin-video-active" : ""}`}>

                        <div className={`shared-screenBox has-video ${this.state.screenShared || remoteShared ? "active" : "d-none"}`} id="screen-share" >
                            <button className="full-screen-btn" onClick={this.openFullscreen}>
                                <i className="icon-full-screen"></i>
                            </button>
                        </div>

                        <div className={`callingBox__left-inner`} style={{ gridTemplateColumns: view }} ref={this.setRemoteMediaRef} >
                            <div className="callingBox__video">
                                <div className={`callingBox__video-container ${this.state.videoEnabled ? " " : " callingBox__video-container--audio "}`}>
                                    <span className={`callingBox__nameTag ${this.state.audioEnabled ? " user-speaking " : ""} `}>{this.props.user.userName}</span>
                                    <div className={`callingBox__video-wrapper has-video ${this.state.videoEnabled ? "" : "d-none"}`}
                                        id="local-media" ref={this.setLocalMediaRef}>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <CallSideButtons activeSideMenu={this.state.activeSideMenu}
                            showChatNotification={this.state.showChatNotification}
                            onBuyerCollectionClick={event => this.handleSplitScreen(event, 'BuyerCollection')}
                            onChatClick={event => this.handleSplitScreen(event, 'Chat')}>
                        </CallSideButtons> */}

                        <CallMenu
                            audioEnabled={this.state.audioEnabled}
                            screenShared={this.state.screenShared}
                            cameras={this.state.cameras}
                            onAudioClick={(event) => this.onAudioButtonClick(event)}
                            onVideoClick={(event) => this.onCameraButtonClick(event)}
                            onEndCallClick={(event) => this.leaveRoom(event)}
                            swichCameraClick={(cameraId) => this.updateVideoDevice(cameraId)}
                            onShareScreenClick={event => this.shareScreen(event)}
                            onSettingsClick={event => this.onSettingsClick(event)}>
                        </CallMenu>

                    </div>

                    <div className={`callingBox__right h-100 ${!this.state.splitScreen ? ' d-none ' : ''}`}>

                        {/* <VideoCallChat showNotification={value => this.showNotification(value)}
                            room={this.props.room}
                            user={this.props.user}
                            activeSideMenu={this.state.activeSideMenu}
                            onCloseClick={(event) => this.onCloseClick(event)}
                            className={`${this.state.activeSideMenu != 'Chat' ? ' d-none ' : ' '}`}>
                        </VideoCallChat> */}

                        {/* Check User Type */}
                        {
                            (this.props.joinAsSeller) ? (
                                <SellerCollection
                                    onCloseClick={(event) => this.onCloseClick(event)}
                                    roomDetails={this.props.roomDetails} roomId={this.props.room} stallDetails={this.props.stallDetails} categories={this.props.categories} getUserWishList={this.props.getUserWishList} className={`${this.state.activeSideMenu != 'BuyerCollection' ? ' d-none ' : ' '}`}></SellerCollection>
                            ) :
                                (
                                    <BuyerCollection
                                        onCloseClick={(event) => this.onCloseClick(event)}
                                        room={this.props.room} className={`${(this.state.activeSideMenu != 'BuyerCollection') ? ' d-none ' : ''}`}></BuyerCollection>
                                )
                        }
                    </div>

                </div>

                {
                    this.state.showSettings &&
                    <CallSettings
                        audioEnabled={this.state.audioEnabled}
                        microphones={this.state.microphones}
                        cameras={this.state.cameras}
                        onAudioClick={(event) => this.onAudioButtonClick(event)}
                        onMicrophoneChange={(id) => this.updateAudioDevice(id)}
                        onCameraChange={(cameraId) => this.updateVideoDevice(cameraId)}
                        onCloseClick={event => this.onSettingsClick(event)}>
                    </CallSettings>
                }

                {
                    <button
                        className="btn"
                        style={{
                            backgroundColor: this.state.showCalling ? "#1FA199" : "#242424",
                            color: "#ffffff",
                            position: "fixed",
                            right: "20px",
                            bottom: "20px",
                        }}
                        onClick={() => this.fakeParticipantConnected()}
                    >
                        Add Fake
                    </button>
                }
            </>
        );
    }

}
TestVideoCall.propTypes = {
    onDisconnect: PropTypes.func,
}


export default TestVideoCall;
