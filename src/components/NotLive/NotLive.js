import React, { Component } from "react";
import './NotLive.css';

class NotLive extends Component {
    render() {
        return (
            <>
                <div className="notLive-parent">
                    <div className="notLive-container">
                        <div className="notLive-head">
                            Notification
                    </div>
                        <div className="notLive-body">
                            <div className="notLive-text">Please visit this section on November 19 &amp; 20.</div>
                            <div className="notLive-button" onClick={(e)=>this.props.continue()}>Continue</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default NotLive;
