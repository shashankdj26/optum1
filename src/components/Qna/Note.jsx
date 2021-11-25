import React, { useState, useEffect } from "react";
import { firestore, auth, firebaseApp } from "../firebase/firebase";
import RBox from "./RBox";
import moment from "moment";

var userID;
var userName;

if (auth) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userID = user.uid;
      userName = user.displayName ? user.displayName : user.email;
    } else {
      userID = null;
    }
  });
}
function Note(props) {
  function ReplyAnswer(e) {
    var target = e.target;
    var parent = target.parentElement;
    var form = parent.querySelector("form");
    var inputBox = parent.querySelector("input");

    e.preventDefault();
    var data = new FormData(e.target);
    var rcontent = data.get("content"); // your input `name` property is `content`

    var date = moment().utcOffset("+05:30").format("hh:mm A DD-MM-YYYY");
    firestore
      .collection(props.QNAReplyCollection)
      .add({
        rcontent,
        replyby: userName,
        replybyid: userID,
        replytoid: props.id,
        time: new Date(),
        time2: date,
        timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        inputBox.value = "";
      });
  }

  return (
    <div className="qa-section__block mg-b15">
      <div className="d-flex align-items-center justify-content-between pd-b10">
        <h3 className="qa-section__title">{props.title}</h3>
        <span className="qa-section__date">{props.time.toString()}</span>
      </div>
      <h2 className="qa-section__ques pd-b20">{props.content}</h2>
      {props.canReply && (
        <>
          <form className="" onSubmit={ReplyAnswer}>
            <input
              className="form-control-qna mg-b20"
              name="content"
              id="myInput"
              required
              placeholder={"Reply to " + props.title}
              autoCorrect="off"
              autoComplete="off"
            />
          </form>
          <div>
            <RBox
              id={props.id}
              QNACollection={props.QNACollection}
              QNAReplyCollection={props.QNAReplyCollection}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default Note;
