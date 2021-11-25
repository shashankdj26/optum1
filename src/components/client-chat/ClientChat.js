import React, { Component } from 'react';
import './ClientChat.css';
import Chat from 'twilio-chat';
import PropTypes from "prop-types";


class ClientChat extends Component {
    state = {
        error: null,
        isLoading: true,
        messages: [],
        showDummyText: false,
    };

    constructor(props) {
        super(props);

        this.user = {
            channel: props.channel,
            id: props.user.id,
            name: props.user.name
        };
        // console.log(this.user);
        this.message = React.createRef();
        this.messageDiv = React.createRef();
    }

    componentDidMount() {
        fetch('https://twilio-chat-api-dot-virtualeventdemo.el.r.appspot.com/chat/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            body: `identity=${encodeURIComponent(this.user.id)}`
        })
            .then(res => res.json())
            .then(data => Chat.create(data.token))
            .then(this.setupChatClient)
            .catch(this.handleError);
    }


    handleError = (error) => {
        console.error(error);
        this.setState({
            error: 'Could not load chat.'
        });
    }

    setupChatClient = (client) => {
        this.client = client;
        this.client
            .getChannelByUniqueName(this.user.channel)
            .then(channel => channel)
            .catch(error => {
                if (error.body.code === 50300) {
                    return this.client.createChannel({ uniqueName: this.user.channel, friendlyName: this.user.name, isPrivate: true, attributes: { id: this.user.id, name: this.user.name } });
                } else {
                    this.handleError(error);
                }
            })
            .then(channel => {
                this.channel = channel;
                return this.channel.join().catch(() => {
                });
            })
            .then(() => {
                this.setState({ isLoading: false });
                this.channel.invite('HelpDesk-r1rcm').catch(reason => console.log(reason))
                this.channel.getMessages().then(this.messagesLoaded);
                this.channel.on('messageAdded', this.messageAdded);
            })
            .catch(this.handleError);


    }

    twilioMessageToMessage = (message) => {
        console.log(message);
        return {
            id: message.sid,
            text: message.body,
            user: message.attributes.user || {},
            timestamp: message.timestamp
        };
    }

    messagesLoaded = (messagePage) => {
        this.setState({ messages: messagePage.items.map(this.twilioMessageToMessage) });
        this.scroll();
    }

    messageAdded = (message) => {
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                this.twilioMessageToMessage(message)
            ]
        }));
        this.scroll();
    }

    sendMessage = (event) => {
        if (this.message.current.value) {
            this.channel.sendMessage(this.message.current.value, { user: this.user });
            this.message.current.value = "";
        }
    }

    scroll = () => {
        // console.log("scroll");
        if (this.messageDiv.current) {
            const scrollHeight = this.messageDiv.current.scrollHeight;
            const height = this.messageDiv.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            this.messageDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    componentWillUnmount() {
        // this.client.shutdown();
    }

    closeChat = (event) => {
        event.preventDefault();
        this.props.closeChat(false);
    }

    render() {
        if (this.state.error) {
            return <p className="popover-modal"> {this.state.error}</p>;
        }
        //  else if (this.state.isLoading) {
        //     // return <p className="centerX popover-modal">Looking for Representative...</p>;
        //     // return <p className="centerX chatPopover-modal"></p>
        // }

        return (<>
            <div className={`publicChatBox ${this.props.visibility ? (" ") : ("d-none")}`}>
                <section className="chat-container">
                    <div className="chat-section">
                        <div className="chat-section__header bottom-border">
                            <div className="chat-section__header__title light-color">
                                Helpdesk
                            </div>
                            {
                                !this.state.isLoading &&
                                <div className="chat-section__header__close" onClick={(event) => this.closeChat(event)}></div>
                            }
                        </div>
                        <div className="chat-section__body" ref={this.messageDiv}>
                            {this.state.isLoading &&
                                <>
                                    <div className="chat-loader">
                                        <img src="/assets/images/Loader.gif" alt="Loader" width="50" />
                                    </div>
                                </>
                            }
                            {
                                !this.state.isLoading &&
                                this.state.messages.map(message =>
                                    <>
                                        {this.user.id == message.user.id &&
                                            <div
                                                className="chat-section__message chat-section__message--sent" key={message.id}>
                                                <span  key={`${message.id}-span`} className="chat-section__text"> {message.text} </span>
                                                <span key={`${message.id}-profile`} className="chat-section__profile">
                                                    <img src="assets/images/Profile-picture.png" alt="" />
                                                </span>
                                            </div>
                                        }
                                        {this.user.id != message.user.id &&
                                            <div className="chat-section__message chat-section__message--received" key={message.id}>
                                                <span className="chat-section__profile">
                                                    <img src="assets/images/chatbot-s.png" alt="" />
                                                </span>
                                                <span className="chat-section__text"> {message.text} </span>
                                            </div>
                                        }
                                    </>
                                )
                            }
                        </div>
                        {!this.state.isLoading &&
                            <div className="chat-section__footer">
                                <div className="chat-section__form">
                                    <input ref={this.message} type="text" className="chat-section__input"
                                        placeholder="Type a Message" onKeyPress={event => event.key === 'Enter' && this.sendMessage(event)}></input>
                                    <button onClick={event => this.sendMessage(event)} className="chat-section__btn"><i
                                        className="icon-send"></i></button>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </>);
    }

}

ClientChat.propTypes = {
    channel: PropTypes.string,
    user: PropTypes.object,
}

export default ClientChat;
