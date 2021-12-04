import React, { useState } from "react";
import "./Login.css";
import { ImageString } from "../../../const/assets/ImageString";
import { isMobileOnly } from "react-device-detect";

export default function LoginPageWithMessage(props) {
  const { needLoader, msg } = props;
  const [count, setCount] = useState(0);
  return (
    <section className="landing-page min-height-full">
      <aside
        className="landing-pageBox d-flex justify-content-between align-items-start min-height-full image-bg"
        style={
          !isMobileOnly
            ? {
                backgroundImage: `url(${ImageString.LoginScreen})`,
                backgroundPosition: "left top",
              }
            : {
                backgroundImage: `url(${ImageString.LoginScreen})`,
              }
        }
      ></aside>
      <aside className="signinBox min-height-full">
        <div
          className="signinBox__heading"
          onClick={() => {
            setCount(count + 1);
            if (count >= 7) {
              if (props.bypass) {
                props.bypass();
              }
            }
          }}
        >
          <div className="left"></div>
        </div>
        <br></br>
        {/* <div className="signinBox__body pd-t70">
                </div> */}
        {needLoader && (
          <div className="loaderContainer msg_login_container">
            <div className="msg_login">{msg}</div>
            <br />
            <img src="/assets/images/Loader.gif" alt="loader"></img>
          </div>
        )}
        {!needLoader && (
          <div className="loaderContainer msg_login_container">
            <div className="msg_login">{msg}</div>
          </div>
        )}
      </aside>
    </section>
  );
}
