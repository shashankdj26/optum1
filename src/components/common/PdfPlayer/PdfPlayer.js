// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { ImageString } from "../../../const/assets/ImageString";

class PdfPlayer extends Component {
  constructor(props) {
    super(props);
    this.ids = Object.keys(this.props.data);
    this.currentVideoIndex = 0;
    this.listLength = this.ids.length;
    this.state = {
      data: this.props.data,
      currentItemId: this.ids[0],
    };
  }

  handleItemSelection = (event, id, index) => {
    event.preventDefault();
    this.currentVideoIndex = index;
    this.setState({
      currentItemId: id,
    });
  };

  onVideoFinish = () => {
    this.currentVideoIndex += 1;
    this.currentVideoIndex %= this.listLength;
    this.setState({
      currentItemId: this.ids[this.currentVideoIndex],
    });
  };

  close = (event) => {
    event.preventDefault();
    this.props.close();
  };

  render() {
    return (
      <>
        <div
          className="popover-modal popover-modal--trasparent"
          style={{ zIndex: "99" }}
        >
          <div className="popover-modal__inner">
            <div className="popover-modal__body popover-modal__body--xl">
              <div className="video-player">
                <div className="video-player__header">
                  <a
                    href="#"
                    className="video-player__close"
                    onClick={(e) => this.close(e)}
                  >
                    <i className="icon-close"></i>
                  </a>
                </div>
                <div className="video-player__body">
                  <div className="video-player__left">
                    {/* <img className="video-player__video" src={this.state.data[this.state.currentItemId].link} alt={this.state.data[this.state.currentItemId].name}></img> */}
                    <iframe
                      title={"pdf"}
                      className="video-player__video mg-b25"
                      style={{ height: "25rem" }}
                      src={`${
                        this.state.data[this.state.currentItemId].link
                      }?#zoom=50&scrollbar=1&toolbar=1&navpanes=1`}
                    ></iframe>
                    {/* <div id="pdf" className="video-player__video mg-b25" style={{ height: '120%' }}>
                                            <object id="pdf_content" width="100%" height="100%" type="application/pdf" trusted="yes" application="yes" title="Assembly" data={`${this.state.data[this.state.currentItemId].link}?#zoom=50&scrollbar=1&toolbar=1&navpanes=1`}>
                                                <iframe title={"pdf"} className="video-player__video" src={this.state.data[this.state.currentItemId].link}></iframe>
                                            </object>
                                        </div> */}
                    <h2 className="video-player__title">
                      {this.state.data[this.state.currentItemId].name}
                    </h2>
                    <p className="video-player__desc">
                      {this.state.data[this.state.currentItemId].description}
                    </p>
                  </div>

                  <div className="video-player__right">
                    <h2 className="video-player__title">Good Reads</h2>

                    <div className="video-player__list">
                      {this.ids.map((id, index) => (
                        <div
                          className="video-player__item cursor-pointer"
                          style={
                            id === this.state.currentItemId
                              ? {
                                  background: "#F57F28",
                                  color: "#fff",
                                  pointerEvents: "none",
                                }
                              : { color: "#fff" }
                          }
                          onClick={(e) =>
                            this.handleItemSelection(e, id, index)
                          }
                        >
                          <div
                            className="video-player__item-pic-contain"
                            style={{
                              backgroundImage: `url(${
                                this.state.data[id].thumbnail
                                  ? this.state.data[id].thumbnail
                                  : ImageString.PDFLOGO
                              })`,
                            }}
                          ></div>
                          {/* <img className="video-player__item-pic" src={`${this.state.data[id].thumbnail ? this.state.data[id].thumbnail : ImageString.PDFLOGO}`} alt={this.state.data[id].name} /> */}
                          <div className="video-player__item-desc">
                            <h4 className="video-player__item-title">
                              {this.state.data[id].name.length > 90
                                ? this.state.data[id].name.substr(0, 90) + "..."
                                : this.state.data[id].name}
                            </h4>
                            <p className="video-player__item-text">
                              {this.state.data[id].description.length > 40
                                ? this.state.data[id].description.substr(
                                    0,
                                    40
                                  ) + "..."
                                : this.state.data[id].description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PdfPlayer;
