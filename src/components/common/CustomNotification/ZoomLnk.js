// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { AppString } from "../../firebase/AppString";
import "./CustomNotification.css";
import "../../Home/Tut/Tut.css";

class ZoomLnk extends Component {
  state = {
    show: false,
    message: "",
    link: "https://in.search.yahoo.com/?fr2=inr",
  };

  componentDidMount() {
    window.ZoomLnk = this.props.firestore
      .collection("backStage")
      .doc("zoomLink")
      .onSnapshot((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          let data = doc.data();
          if (data.show) {
            this.showZoomLinkPopUp(data.message, data.link);
          }
        }
      });
  }

  componentWillUnmount() {
    if (window.ZoomLnk) {
      window.ZoomLnk();
    }
  }

  showZoomLinkPopUp = (message, link) => {
    this.setState({
      show: true,
      message: message,
      link: link,
    });
  };

  closeZoomLinkPopUp = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState(
      {
        show: false,
      },
      () => {
        console.log("opening zoom link");
        window.open(this.state.link);

        // this.props.firestore
        //   .collection(AppString.BACKSATGE)
        //   .doc("zoomLink")
        //   .update({
        //     show: false,
        //   });
      }
    );
  };

  render() {
    return (
      <>
        <div
          className={`lobbyTutContainer ${
            this.state.show ? "zoomLinkPopUp-show" : "zoomLinkPopUp-hidden"
          }`}
        >
          <div className="tutCardContainer tutCardContainer-sm pd-b-2 w-25">
            <div className="tutCardContainer-header  bg-red">
              <div>Zoom Call</div>
            </div>
            <div className="tutCardContainer-body">{this.state.message}</div>
            <div className="text-center">
              <button
                className="tutCardButton btn  btn-yellow mg-t30"
                onClick={this.closeZoomLinkPopUp}
              >
                Call
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ZoomLnk;
