import React, { useState } from "react";
import Firebase, { firestore, auth, firebaseApp } from "../firebase/firebase";
import swal from 'sweetalert';
import moment from 'moment';
import { AppString } from "../firebase/AppString";


class CreateArea extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      content: '',
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();

  }

  authListener() {
    auth.onAuthStateChanged((user) => {

      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }

    })

  }

  onSubmit(e) {
    e.preventDefault();

    var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

    firestore.collection(this.props.QNACollection).add(
      {
        title: this.state.user.displayName ? this.state.user.displayName : this.state.user.email,
        content: this.state.content,
        time: new Date(),
        time2: date,
        timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
        status: `${this.props.moderated ? '0' : '1'}`
      })
      .then(() => {
        this.setState({ content: '' });
        if (this.props.moderated) {
          swal("Question Submitted!", "Your question has been submitted");
        }
      });
  }

  render() {
    return (
      <form className="qa-section__input" onSubmit={this.onSubmit.bind(this)}>
        <input
          className="form-control-qna"
          name="content"
          onChange={e => this.setState({ content: e.currentTarget.value })}
          value={this.state.content}
          required
          placeholder="Enter Your Question"
          autoCorrect="off"
          autoComplete="off"
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <button className="form-control-qna__btn">
          <i className="icon-send"></i></button>
      </form>);
  }
}
export default CreateArea;
