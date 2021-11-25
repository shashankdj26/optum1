import React, {Component} from "react";
import PropTypes from "prop-types";

class CallSettings extends Component {

    state = {
        audioEnabled: this.props.audioEnabled,
        cameras: this.props.cameras || [],
        microphones: this.props.microphones || []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cameras: nextProps.cameras });
        this.setState({ microphones: nextProps.microphones });
        this.setState({ audioEnabled: nextProps.audioEnabled });
    }

    onCloseClick = (event) => {
        event.preventDefault();
        if(this.props.onCloseClick){
            this.props.onCloseClick(event);
        }
    }

    onAudioClick = (event) => {
        event.preventDefault();

        if(this.props.onAudioClick){
            this.setState({audioEnabled: !this.state.audioEnabled});
            this.props.onAudioClick(event);
        }
    }

    onMicrophoneChange = (event) =>{
        if(this.props.onMicrophoneChange){
            this.props.onMicrophoneChange(event.target.value);
        }
    }

    onCameraChange = (event) =>{
        if(this.props.onCameraChange){
            this.props.onCameraChange(event.target.value);
        }
    }


    render() {
        return (<div className="callingBox__modal ">
                <span className="callingBox__modal__overlay"></span>
                <div className="callingBox__modal__inner">
                    <div className="callingBox__modal__header d-flex align-items-center justify-content-between">
                        <h2 className="callingBox__modal__header__title text-uppercase">SETTINGS</h2>
                        <a onClick={event => this.onCloseClick(event)} className="callingBox__modal__close">
                            <i className="icon-close"></i>
                        </a>
                    </div>
                    <div className="callingBox__modal__body">
                        <div className="form-group">
                            <label className="form-label">Microphone</label>
                            <div className="form-group__has-icons">
                                <select className="form-control" onChange={this.onMicrophoneChange} >
                                    {
                                        this.state.microphones && this.state.microphones.map(microphones =>
                                            <option key={microphones.id}
                                                    value={microphones.id}
                                                    onClick={event => this.switchCameraOptions(microphones)}>
                                                {microphones.fullLabel}
                                            </option>
                                        )
                                    }
                                </select>
                                <div className="d-flex align-items-center">
                                    <button onClick={event => this.onAudioClick(event)} className="link-btn">
                                        <i className={this.state.audioEnabled ? 'icon-mic-btn': 'icon-mic-btn-mute' }></i>
                                    </button>
                                    {/*<ul className="volume-level">*/}
                                    {/*    <li></li>*/}
                                    {/*    <li className="active" style={{"width": "66%"}}></li>*/}
                                    {/*    <li className="active" style={{"width": "33%"}}></li>*/}
                                    {/*</ul>*/}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Camera</label>
                            <select className="form-control" onChange={this.onCameraChange} >
                                {
                                    this.state.cameras && this.state.cameras.map(camera =>
                                        <option key={camera.id}
                                                value={camera.id}
                                                onClick={event => this.switchCameraOptions(camera)}>
                                            {camera.fullLabel}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Connectivity</label>
                            <button className="btn btn-dark btn-status btn-status--online">Online</button>
                            {/*<button className="btn btn-dark btn-status btn-status--offline">Offline</button>*/}
                            {/*<button className="btn btn-dark btn-status btn-status--away">Away</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
CallSettings.propTypes= {
    onCloseClick: PropTypes.func,
    onCameraChange: PropTypes.func,
    onMicrophoneChange: PropTypes.func,
    onAudioClick: PropTypes.func,
    cameras: PropTypes.array,
    microphones: PropTypes.array,
    audioEnabled: PropTypes.bool
}
export default CallSettings
