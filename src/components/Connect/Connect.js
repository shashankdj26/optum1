import React, { Component } from "react";
import {
  attachConnectProfilesListener,
  removeConnectProfilesListener,
} from "../firebase/firebase";
import "./Connect.css";
const HeaderBackground = {
  // background: "url(/assets/images/background.png)",
  // backgroundPosition: "center",
  // backgroundSize: "contain",
  backgroundColor: "#fff",
};
const LogoLeft = {
  background: "url(/assets/images/R1Logo.png)",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
};
const LogoRight = {
  background: "url(/assets/images/koaLogo.png)",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  display: "none",
};
const closeButton = {
  background: "url(/assets/images/close.png)",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
};

class Connect extends Component {
  state = {
    list: null,
  };

  componentDidMount = () => {
    attachConnectProfilesListener((err, data) => {
      if (err) {
        console.log(data);
        return;
      }
      console.log(data);
      this.setState({
        list: data,
      });
    });
  };

  componentWillUnmount = () => {
    removeConnectProfilesListener();
  };

  handleConnectButton = (link) => {
    if (link.includes("http")) {
      window.open(link, "_blank");
      return;
    }
    link = "https://" + link;
    window.open(link, "_blank");
  };

  render() {
    const { list } = this.state;
    return (
      <>
        <div className="connectContainer">
          <div className="connectHeader bottom-border" style={HeaderBackground}>
            <div className="logo-left" style={LogoLeft}></div>
            <div
              className="connect-closeButton"
              style={closeButton}
              onClick={(e) => this.props.close(e)}
            ></div>
            <div className="logo-right" style={LogoRight}></div>
          </div>
          <div className="connectBody">
            {list && (
              <>
                {Object.keys(list).map((key) => (
                  <div className="connect-card" key={key}>
                    <div className="connect-card-head">
                      <div
                        className="connect-card-head-image"
                        style={{
                          background: `url(${list[key].profile_image})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className="connect-card-head-details">
                        <div className="connect-card-name">
                          {list[key].name}
                        </div>
                        <div className="connect-card-title">
                          {list[key].designation}
                        </div>
                        <div className="connect-card-email">
                          {list[key].email}
                        </div>
                      </div>
                    </div>
                    <div className="connect-card-body">
                      {/* <q>{list[key].what_keeps_you_amazing}</q> */}
                      <div
                        className="connect-card-button"
                        onClick={(e) =>
                          this.handleConnectButton(list[key].linked_ln_profile)
                        }
                      >
                        Connect
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Connect;
