// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import ReactPlayer from "react-player";
import { VideoType } from "../../../const/fixed/Types";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoIds = Object.keys(this.props.videoData);
    this.currentVideoIndex = 0;
    this.videoListLength = this.videoIds.length;
    this.state = {
      data: this.props.videoData,
      currentVideoId: this.getFirstEnabledVideo(),
      isloaded: false,
      isPlaying: true,
      isEnded: false,
    };
  }

  VideoPlayerRef = React.createRef();

  getFirstEnabledVideo = () => {
    for (let i = 0; i < this.videoIds.length; i++) {
      if (this.props.videoData[this.videoIds[i]].enabled) {
        return this.videoIds[i];
      }
    }
  };
  getNextEnabledVideo = () => {
    this.currentVideoIndex += 1;
    this.currentVideoIndex %= this.videoListLength;
    if (this.props.videoData[this.videoIds[this.currentVideoIndex]].enabled) {
      return this.currentVideoIndex;
    } else {
      return this.getNextEnabledVideo();
    }
  };

  handleVideoSelection = (event, id, index) => {
    // event.preventDefault();
    this.currentVideoIndex = index;
    this.setState({
      isloaded: false,
      isPlaying: true,
      isEnded: false,
      currentVideoId: id,
    });
  };

  onVideoFinish = () => {
    this.setState({
      isloaded: false,
      isPlaying: true,
      isEnded: false,
      currentVideoId: this.videoIds[this.getNextEnabledVideo()],
    });
  };

  close = (event) => {
    // event.preventDefault();
    this.props.close();
  };

  getThumnailUrl = (type, code) => {
    if (type === VideoType.youtube) {
      return `https://img.youtube.com/vi/${code}/mqdefault.jpg`;
    } else if (type === VideoType.vimeo) {
      // let thumbSRC = ''
      // var xhr = new XMLHttpRequest();
      // xhr.open("GET", "https://vimeo.com/api/v2/video/" + code + ".json", true);
      // xhr.onload = function (e) {
      //     if (xhr.readyState === 4) {
      //         if (xhr.status === 200) {
      //             var data = xhr.responseText;
      //             var parsedData = JSON.parse(data);
      //             let thumbSRClarge = parsedData[0].thumbnail_large;
      //             let thumbSplit = thumbSRClarge.split(/\d{3}(?=.jpg)/);
      //             //   let thumbSRC = thumbSplit[0] + '1280x720' + thumbSplit[1];
      //             thumbSRC = thumbSplit[0] + '260x146' + thumbSplit[1];
      //             console.log(`${thumbSRC}`)
      //             return (thumbSRC)//thumbSRC
      //         } else {
      //             console.error(xhr.statusText);
      //         }
      //     }
      // };
      // xhr.onerror = function (e) {
      //     console.error(xhr.statusText);
      // };
      // xhr.send(null);
      return `https://i.vimeocdn.com/video/${code}_240.jpg`;
    } else {
      return `http://img.youtube.com/vi/${code}/mqdefault.jpg`;
    }
  };

  render() {
    return (
      <>
        <div className="popover-modal popover-modal-0zindex">
          <div className="popover-modal__inner">
            <div className="popover-modal__body popover-modal__body--xl">
              <div className="video-player">
                <div className="video-player__header">
                  <h2></h2>
                  <div
                    className="headerCloseButton"
                    onClick={(e) => this.close(e)}
                  ></div>
                  {/* <a href="#" className="video-player__close" onClick={(e) => this.close(e)}><i className="icon-close"></i></a> */}
                </div>
                <div className="video-player__body">
                  <div className="video-player__left">
                    <div
                      className="VideoPlayer_videoContainer mg-b25"
                      style={{
                        width: "100%",
                        height: "25rem",
                        zIndex: 5,
                        position: "relative",
                      }}
                    >
                      <ReactPlayer
                        id="audiVideoPlayer"
                        config={{
                          youtube: {
                            playerVars: {
                              showinfo: 0,
                              controls: 1,
                              disablekb: 0,
                              enablejsapi: 0,
                              modestbranding: 1,
                              rel: 0,
                              playsinline: 1,
                            },
                          },
                        }}
                        url={
                          this.props.videoData[this.state.currentVideoId].link
                        }
                        playing={this.state.isPlaying}
                        controls={true}
                        playsinline={true}
                        width="100%"
                        height="100%"
                        ref={this.VideoPlayerRef}
                        onReady={() => {
                          this.setState({
                            isloaded: true,
                            isPlaying: true,
                            isEnded: false,
                          });
                        }}
                        onPause={() => {
                          this.setState({
                            isPlaying: false,
                          });
                        }}
                        onPlay={() => {
                          this.setState({
                            isPlaying: true,
                            isEnded: false,
                          });
                        }}
                        onEnded={() => {
                          //will play next video
                          if (this.VideoPlayerRef.current)
                            this.setState({
                              isEnded: true,
                              isPlaying: false,
                            });
                          else this.onVideoFinish();
                        }}
                      ></ReactPlayer>
                      {!this.state.isloaded && (
                        <div className="videoLoader">
                          <img
                            src="/assets/images/Loader.gif"
                            alt="loader"
                          ></img>
                        </div>
                      )}
                      {this.state.isloaded && this.state.isEnded && (
                        <div className="videoLoader">
                          <button
                            className="Replay_button"
                            onClick={() => {
                              if (this.VideoPlayerRef.current) {
                                this.VideoPlayerRef.current.player.seekTo(
                                  0,
                                  "seconds"
                                );
                                this.setState({
                                  isPlaying: true,
                                  isEnded: false,
                                });
                              }
                            }}
                          >
                            <img
                              alt="O"
                              src="/3dAssets/UI/loop-playback.png"
                            ></img>{" "}
                            Replay
                          </button>
                        </div>
                      )}
                    </div>

                    {/* <video controls className="video-player__video">
                                            <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
                                        </video> */}
                    <h2 className="video-player__title">
                      {this.props.videoData[this.state.currentVideoId].name}
                    </h2>
                    <p className="video-player__desc">
                      {
                        this.props.videoData[this.state.currentVideoId]
                          .description
                      }
                    </p>
                  </div>

                  <div className="video-player__right">
                    {/* <h2 className="video-player__title">MEET THE DC TEAM</h2> */}

                    <div className="video-player__list">
                      {this.videoIds.map((id, index) => {
                        if (this.props.videoData[id].enabled)
                          return (
                            <div
                              key={id}
                              className="video-player__item cursor-pointer"
                              style={
                                id === this.state.currentVideoId
                                  ? {
                                      background: "#F57F28",
                                      color: "#fff",
                                      pointerEvents: "none",
                                    }
                                  : null
                              }
                              onClick={(e) =>
                                this.handleVideoSelection(e, id, index)
                              }
                            >
                              <div
                                className="video-player__item-pic"
                                style={{
                                  backgroundImage: `url(${this.getThumnailUrl(
                                    this.props.videoData[id].type,
                                    this.props.videoData[id].videoCode
                                  )})`,
                                  backgroundPosition: "center",
                                }}
                              ></div>
                              {/* <img className="video-player__item-pic" src={`http://img.youtube.com/vi/${this.props.videoData[id].videoCode}/mqdefault.jpg`} alt={this.props.videoData[id].name} /> */}
                              <div className="video-player__item-desc">
                                <h4
                                  className={`video-player__item-title ${
                                    id === this.state.currentVideoId
                                      ? ""
                                      : "light-color"
                                  }`}
                                >
                                  {this.props.videoData[id].name.length > 90
                                    ? this.props.videoData[id].name.substr(
                                        0,
                                        90
                                      ) + "..."
                                    : this.props.videoData[id].name}
                                </h4>
                                <p className="video-player__item-text">
                                  {this.props.videoData[id].description.length >
                                  40
                                    ? this.props.videoData[
                                        id
                                      ].description.substr(0, 40) + "..."
                                    : this.props.videoData[id].description}
                                </p>
                              </div>
                            </div>
                          );
                        else return null;
                      })}
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

export default VideoPlayer;

//yutube video link =>https://youtu.be/<YouTube_Video_ID_HERE>
//https://www.youtube.com/embed/<YouTube_Video_ID_HERE>"

//YOutube VIdeo Thumbanil
// Low quality thumbnail:

// http://img.youtube.com/vi/<YouTube_Video_ID_HERE>/sddefault.jpg
// Medium quality thumbnail:

// http://img.youtube.com/vi/<YouTube_Video_ID_HERE>/mqdefault.jpg
// High quality thumbnail:

// http://img.youtube.com/vi/<YouTube_Video_ID_HERE>/hqdefault.jpg
// Maximum quality thumbnail:

// http://img.youtube.com/vi/<YouTube_Video_ID_HERE>/maxresdefault.jpg
