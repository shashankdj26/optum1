// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "./Tut.css";

const TutCard = [
  {
    link: "/3dAssets/UI/AudiTut/FullScreen.jpg",
    header: "Full Screen",
    description: "Tap on the icon to view the content on full screen.",
  },
  {
    link: "/3dAssets/UI/AudiTut/ExitFullScreen.jpg",
    header: "Exit Full Screen",
    description: "Tap on the icon to exit full screen.",
  },
  {
    link: "/3dAssets/UI/AudiTut/PlayButton.jpg",
    header: "Play Button",
    description: "Tap on the play icon to play the video.",
  },
  // {
  //     link: "/3dAssets/UI/AudiTut/Polls.jpg",
  //     header: "Polls",
  //     description: "Tap on the icon to participate in public poll."
  // },
  {
    link: "/3dAssets/UI/AudiTut/Q&A.jpg",
    header: "Comments",
    description: "Tap on the icon to add comments.",
  },
];

export default class AudiTut extends Component {
  handleContinue = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.skip();
  };

  render() {
    return (
      <>
        <div className="lobbyTutContainer">
          <div className="tutCardContainer tutCardContainer-sm">
            <div className="tutCardContainer-header">
              <div className="whiteText">Tutorial</div>
            </div>
            <div className="tutCardContainer-body">
              {TutCard.map((item) => (
                <div key={item.header} className="tutCardContainer-bodyItem">
                  <img alt={item.header} src={item.link}></img>
                  <div className="bodyItem-text">
                    <h2>{item.header}</h2>
                    <div>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                className="tutCardButton btn  btn-yellow mg-t30"
                onClick={(e) => this.handleContinue(e)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
