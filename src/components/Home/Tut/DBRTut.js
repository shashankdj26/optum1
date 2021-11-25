// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { DBRData } from "../../../data/Lobby/hotspots";
import "./Tut.css"

const TutCard = [
    {
        link: "/3dAssets/UI/AudiTut/FullScreen.jpg",
        header: "Full Screen",
        description: "Tap on the icon to view the content on full screen."
    },
    {
        link: "/3dAssets/UI/AudiTut/ExitFullScreen.jpg",
        header: "Exit Full Screen",
        description: "Tap on the icon to exit full screen."
    },
    {
        link: "/3dAssets/UI/AudiTut/PlayButton.jpg",
        header: "Play Button",
        description: "Tap on the play icon to play the video."
    },
    {
        link: "/3dAssets/UI/AudiTut/Polls.jpg",
        header: "Polls",
        description: "Tap on the icon to participate in public poll."
    },
    {
        link: "/3dAssets/UI/AudiTut/Q&A.jpg",
        header: "Q&A",
        description: "Tap on the icon to submit your question and get answer to it."
    },
]

export default class DBRTut extends Component {

    state = {
        stage: 0
    }

    handleContinue = (event) => {
        if (event) {
            event.preventDefault();
        }
        this.props.skip();
    }

    openDBRZoomLink = (link, event) => {
        if (event) {
            event.preventDefault();
        }
        window.location.href = link
        // window.open(link, "_blank")
    }

    render() {
        return (
            <>
                {
                    this.state.stage === 0 &&
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
                                    <button className="tutCardButton btn  btn-yellow mg-t30" onClick={(e) => this.setState({
                                        stage: 1
                                    })}>Continue</button>
                                </div>
                            </div>
                        </div>
                    </>
                }


                {
                    this.state.stage === 1 &&
                    <>
                        <div className="lobbyTutContainer">
                            <div className="tutCardContainer tutCardContainer-sm pd-b-2">
                                <div className="tutCardContainer-header  bg-red">
                                    <div>Zoom Call</div>
                                </div>
                                <div className="tutCardContainer-body">
                                    Please click on the join button to enter the Webex call.
                                                        </div>
                                <div className="text-center">
                                    <button className="tutCardButton btn  btn-yellow mg-t30" onClick={(e) => this.handleContinue(e)}>CANCEL</button>
                                    <button className="tutCardButton btn  btn-yellow mg-t30" onClick={(e) => this.openDBRZoomLink(window.zoomlink ? window.zoomlink : DBRData.zoomlink, e)}
                                        style={{ marginLeft: '1rem' }}
                                    >JOIN</button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}
