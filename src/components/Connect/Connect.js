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

const wallData = {
  mani_chacko: {
    name: "Mani Chacko",
    designation: "Vice President - OptumRx technology",
    linked_ln_profile: "https://www.linkedin.com/in/mani-chacko-1908a1/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a90c95e94cb_mani_chacko_photograph.jpg",
    enabled: true,
  },
  sureshkumar_rajasekar: {
    name: "Sureshkumar Rajasekar",
    designation: "Vice President - Technology, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/rsureshkumar/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a72acd1d947_sureshkumar_rajasekhar.jpg",
    enabled: true,
  },
  nagesh_devarapalli: {
    name: "Nagesh Devarapalli",
    designation:
      "Vice President & Head of Core Infrastructure & Operations Platform, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/dvnagesh/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a72aa4c6254_nagesh_devarapalli.jpg",
    enabled: true,
  },
  gandhi_sampath: {
    name: "Gandhi Sampath",
    designation:
      "Lead - Optum Health and Enterprise Clinical Technology & Chief Technology Officer, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/srinivasagandhi/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a90c21ef31e_gandhi_sampath.jpg",
    enabled: true,
  },
  sumek_gopal: {
    name: "Sumek Gopal",
    designation: "Vice President - Talent Acquisition, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/sumekgopal/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a72abaea3c3_sumek_gopal_photo.png",
    enabled: true,
  },
  alind_sharma: {
    name: "Alind Sharma",
    designation: "Vice President - Human Capital, India",
    linked_ln_profile: "https://www.linkedin.com/in/alind-sharma-73b7764/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61ab168b5f562_alind_sharma.jpg",
    enabled: true,
  },
  nasir_ahmed: {
    name: "Nasir Ahmed",
    designation: "CTO- Enterprise Clinical Platforms, UnitedHealth Group",
    linked_ln_profile: "https://www.linkedin.com/in/nasir-ahmed-3873315/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a90c371b521_nasir_ahmed.jpg",
    enabled: true,
  },
  rajesh_kesarla: {
    name: "Rajesh Kesarla",
    designation: "Vice President & CTO, Optum Digital India",
    linked_ln_profile: "https://www.linkedin.com/in/rajesh-kesarla-7234324/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a90c704814f_rajesh_kesarla.png",
    enabled: true,
  },
  sudhama_naik: {
    name: "Sudhama Naik",
    designation: "Vice President - General Management, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/sudhamanaik/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61ab167643589_sudhama_naik.jpeg",
    enabled: true,
  },
  dr_erlyn_joan_l_chua: {
    name: "Dr Erlyn Joan L Chua",
    designation: "Vice President - General Management, Optum",
    linked_ln_profile: "https://www.linkedin.com/in/drerlynjoanchua/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61ab1669d1c62_dr_erlyn_chua.jpg",
    enabled: true,
  },
  varun_vig: {
    name: "Varun Vig",
    designation:
      "Vice President - General Management for Optum Rx RCM, Optum Rx, Clinical Ops, Optum 360",
    linked_ln_profile: "https://www.linkedin.com/in/varun-vig-7415103/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61ab1659eae9c_varun_vig.png",
    enabled: true,
  },
  rain_tan: {
    name: "Rain Tan",
    designation: "Vice President - Human Capital, Philippines",
    linked_ln_profile: "https://www.linkedin.com/in/raintan/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a90c5388f0a_rain_tan_profile_photo.jpg",
    enabled: true,
  },
  aimee_cardwell: {
    name: "Aimee Cardwell",
    designation: "Chief Information Security Officer, UnitedHealth Group",
    linked_ln_profile: "https://www.linkedin.com/in/acardwell/",
    profile_image:
      "https://d8it4huxumps7.cloudfront.net/files/61a72a89e8653_aimee_headshot_050218_0763_square.jpg",
    enabled: true,
  },
};

class Connect extends Component {
  state = {
    list: null,
  };

  componentDidMount = () => {
    if (this.props.addAnalytics) {
      this.props.addAnalytics(true);
    }
    // attachConnectProfilesListener((err, data) => {
    //   if (err) {
    //     console.log(data);
    //     return;
    //   }
    //   console.log(data);
    //   this.setState({
    //     list: data,
    //   });
    // });
    this.setState({ list: wallData });
  };

  componentWillUnmount = () => {
    if (this.props.addAnalytics) {
      this.props.addAnalytics(false);
    }
    // removeConnectProfilesListener();
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
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#656565",
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
