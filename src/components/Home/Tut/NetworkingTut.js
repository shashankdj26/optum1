// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "./Tut.css"

const TutCard = [
    // {
    //     link: "/3dAssets/UI/NetworkingTut/Connect.png",
    //     header: "Connect",
    //     description: "Tap on the menu icons to content with the attendees."
    // },
    // {
    //     link: "/3dAssets/UI/NetworkingTut/SpeakerProfile.png",
    //     header: "Speaker Profile",
    //     description: "Tap on the menu icon to view the speaker profiles."
    // },
    // {
    //     link: "/3dAssets/UI/NetworkingTut/Sessions.png",
    //     header: "Sessions",
    //     description: "Tap on the menu icon to view the speaker session."
    // },
    {
        link: "/3dAssets/UI/NetworkingTut/Chat.jpg",
        header: "Private Chat",
        description: "Tap on the main icon for one-on-one chat with the attendees."
    }
]

export default class NetworkingTut extends Component {

    handleContinue = (event) => {
        if (event) {
            event.preventDefault();
        }
        this.props.skip();
    }

    render() {
        return (
            <>
                <div className="lobbyTutContainer">
                    <div className="tutCardContainer tutCardContainer-sm">
                        <div className="tutCardContainer-header">
                            <div className="whiteText">Tutorial</div>
                        </div>
                        <div className="tutCardContainer-body">
                            {
                                TutCard.map(item => (
                                    <div key={item.header} className="tutCardContainer-bodyItem">
                                        <img alt={item.header} src={item.link}></img>
                                        <div className="bodyItem-text">
                                            <h2>{item.header}</h2>
                                            <div>
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="text-center">
                            <button className="tutCardButton btn  btn-yellow mg-t30" onClick={(e) => this.handleContinue(e)}>Continue</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
