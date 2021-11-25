import React, {Component} from "react";
import PropTypes from "prop-types";
import CallMenu from "./CallMenu";

class CallSideButtons extends Component {

    state= {
        activeSideMenu: false,
        showChatNotification: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activeSideMenu: nextProps.activeSideMenu });
        this.setState({ showChatNotification: nextProps.showChatNotification });
    }

    onChatClick = (event) => {
        event.preventDefault();

        if(this.props.onChatClick){
            this.props.onChatClick(event);
        }
    }

    onBuyerCollectionClick = (event) => {
        event.preventDefault();

        if(this.props.onBuyerCollectionClick){
            this.props.onBuyerCollectionClick(event);
        }
    }

    render() {
        return (
            <div className="open-chat-button__wrapper">
                <a onClick={event => this.onChatClick(event)} href="#" className={`open-chat-button ${this.state.activeSideMenu == 'Chat' ? ' active ': ''}`}>
                    <i className={`${this.state.showChatNotification ?" has-notification " : " "} icon-chats`}></i>
                </a>
                <a onClick={event => this.onBuyerCollectionClick(event)} href="#" className={`open-chat-button ${this.state.activeSideMenu == 'BuyerCollection' ? ' active ': ''}`}>
                    <i className="icon-grid"></i>
                </a>
            </div>
        )
    }
}

CallSideButtons.propTypes = {
    onChatClick: PropTypes.func,
    activeSideMenu: PropTypes.string,
    onBuyerCollectionClick: PropTypes.func,
}

export default CallSideButtons;
