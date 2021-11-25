import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImageString } from "../../const/assets/ImageString";

class CallMenu extends Component {

    state = {
        audioEnabled: this.props.audioEnabled,
        video: true,
        screenShared: false,
        cameras: [],
        showCameraOptions: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cameras: nextProps.cameras });
        this.setState({ screenShared: nextProps.screenShared });
        this.setState({ audioEnabled: nextProps.audioEnabled });
    }


    onAudioClick = (event) => {
        event.preventDefault();
        if (this.props.onAudioClick) {
            this.setState({ audioEnabled: !this.state.audioEnabled });
            this.props.onAudioClick(event);
        }
    }

    onVideoClick = (event) => {
        event.preventDefault();
        if (this.props.onVideoClick) {
            this.setState({ video: !this.state.video });
            this.props.onVideoClick(event);
        }
    }


    onSettingsClick = (event) => {
        event.preventDefault();
        if (this.props.onSettingsClick) {
            this.props.onSettingsClick(event);
        }
    }


    onEndCallClick = (event) => {
        event.preventDefault();
        if (this.props.onEndCallClick) {
            this.props.onEndCallClick(event);
        }
    }

    onShareScreenClick = (event) => {
        event.preventDefault();
        if (this.props.onShareScreenClick) {
            this.props.onShareScreenClick(event);
        }
    }

    showCameraOptions = () => {
        this.setState({ showCameraOptions: !this.state.showCameraOptions })
    }

    switchCameraOptions = (camera) => {
        if (this.props.swichCameraClick) {
            this.props.swichCameraClick(camera.id);
        }
        this.showCameraOptions();
    }

    change = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            // <div className="callingBox__buttons callingBox__buttons__gradient" style={{ width: this.props.maximized ? "100%" : "calc(100% - 7rem)" }}>
            <div className="callingBox__buttons callingBox__buttons__gradient" style={{ width: "calc(100% - 7rem)" }}>
                <div className="link-btn link-btn--left">
                    <img src={ImageString.LOGO} alt="" />
                    {/* <span>{this.state.roomName}</span> */}
                </div>
                {
                    this.props.callState === 'joinedRoom' ?
                        <ul className="callingBox__buttons-list">
                            <li>
                                <button className="icon-btn" onClick={this.onVideoClick}>
                                    <i className={this.props.isVideoEnabled ? 'icon-video-btn' : 'icon-video-btn-mute'}></i>
                                </button>
                            </li>
                            <li>
                                <button className="icon-btn icon-btn--red" onClick={this.onEndCallClick}>
                                    <i className="icon-phone"></i>
                                </button>
                            </li>
                            <li>
                                <button className="icon-btn" onClick={this.onAudioClick}>
                                    <i className={this.props.isAudioEnabled ? 'icon-mic-btn' : 'icon-mic-btn-mute'}></i>
                                </button>
                            </li>
                        </ul>
                        :
                        <button
                            className="rejoinButton"
                            style={{ opacity: this.props.callState === 'disconnected' ? "1.0" : "0" }}
                            onClick={this.props.rejoinCall} >Rejoin </button>
                }
                {
                    // !isMobileOnly &&
                    this.props.callState === 'joinedRoom' && !this.props.isRemoteScreenSharing &&
                    <button onClick={this.onShareScreenClick} className="link-btn" style={{ right: "10rem" }}>
                        <i className="icon-external-link"></i>
                        <span>{!this.props.isLocalScreenSharing ? `Share your screen` : `Stop sharing`}</span></button>
                }

                {
                    // this.props.isOfficial && this.state.showRest &&
                    // <button onClick={() => {
                    //     this.props.slotReset()
                    //     this.setState({
                    //         showRest: false
                    //     })
                    // }
                    // }
                    //     className="link-btn pos-right-18">
                    //     <span>ResetState</span>
                    // </button>
                }
            </div>
        );

        return (
            <div className="callingBox__buttons">
                <div className="callingBox__buttons__left">

                    <div className={`callingBox__switch mg-r20 ${this.state.showCameraOptions ? ' active ' : ''}`}>
                        <button onClick={event => this.showCameraOptions(event)} className="link-btn"><i className="icon-camera"></i> <span>Switch Camera</span></button>
                        <ul className="callingBox__switch-dropdown">
                            {
                                this.state.cameras && this.state.cameras.map(camera =>
                                    <li key={camera.id} onClick={event => this.switchCameraOptions(camera)}>
                                        <a href="#"><i className="icon-camera"></i> <span>{camera.label}</span></a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <ul className="callingBox__buttons-list">
                        <li>
                            <button onClick={event => this.onSettingsClick(event)} className="icon-btn"><i className="icon-settings"></i></button>
                        </li>
                    </ul>
                </div>
                <ul className="callingBox__buttons-list">
                    <li>
                        <button onClick={event => this.onVideoClick(event)} className="icon-btn">
                            <i className={this.state.video ? 'icon-video-btn' : 'icon-video-btn-mute'}></i>
                        </button>
                    </li>
                    <li>
                        <button onClick={event => this.onEndCallClick(event)} className="icon-btn icon-btn--red">
                            <i className="icon-end-call"></i>
                        </button>
                    </li>
                    <li>
                        <button onClick={event => this.onAudioClick(event)} className="icon-btn">
                            <i className={this.state.audioEnabled ? 'icon-mic-btn' : 'icon-mic-btn-mute'}></i>
                        </button>
                    </li>
                </ul>
                <button onClick={event => this.onShareScreenClick(event)} className="link-btn">
                    <i className="icon-external-link"></i>
                    <span> {!this.state.screenShared ? "Start Sharing" : "Stop Sharing"}</span>
                </button>
            </div>
        )
    }
}

CallMenu.propTypes = {
    onVideoClick: PropTypes.func,
    onAudioClick: PropTypes.func,
    onEndCallClick: PropTypes.func,
    onShareScreenClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    swichCameraClick: PropTypes.func,
    cameras: PropTypes.array,
    screenShared: PropTypes.bool
}

export default CallMenu
