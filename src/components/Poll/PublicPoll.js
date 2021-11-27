import React, { Component } from "react";
import { firestore } from "../firebase/firebase";
import { AppString } from "../firebase/AppString";

const pollStates = {
  pollAnswer: 0,
  results: 1,
  waitForResults: 2,
  waitForLive: 3,
};

class PublicPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollCurrentState: pollStates.waitForLive,
    };
    this.pollDocData = [];
    this.pollResultData = [];
    // console.log(props)
  }

  componentDidMount() {
    this.suscribeToPollAdmin();
  }

  componentWillUnmount() {
    this.unsuscribeToPollAdmin();
  }

  suscribeToPollAdmin = () => {
    if (this.removeListener) {
      this.removeListener();
    }

    this.removeListener = firestore
      .collection(this.props.PollAdmin_Col)
      .doc(this.props.PollAdmin_Doc)
      .onSnapshot(
        (doc) => {
          // console.log(doc.data());
          if (doc.data().showPoll) {
            console.log("ssshiss");
            this.getPolls();
            if (this.props.forceOpen) {
              this.props.forceOpen();
            }
            //   this.setState({
            //     pollCurrentState: pollStates.pollAnswer
            //   });
          } else if (doc.data().showResults) {
            this.getResult();
            // this.setState({
            //     pollCurrentState: pollStates.results
            // });
          } else {
            this.setState({
              pollCurrentState: pollStates.waitForLive,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  //call this on unmounting this component
  unsuscribeToPollAdmin = () => {
    if (this.removeListener) {
      this.removeListener();
    }
  };

  getPolls = async () => {
    try {
      this.pollDocData = [];
      const snapshots = await firestore.collection(this.props.Poll_Doc).get();
      if (snapshots.docs.length > 0) {
        const docs = snapshots.docs;
        docs.forEach((doc) => {
          if (!doc.data().disabled) this.pollDocData.push(doc);
        });
        this.setState({
          pollCurrentState: pollStates.pollAnswer,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  printOption = (docData) => {
    const options = docData.data().option;
    let optionValues = [];
    options.forEach((option) => {
      optionValues.push(
        <label className="poll-custom-radio">
          <input
            type="radio"
            name={`poll_${docData.id}`}
            value={`${options.indexOf(option)}`}
            onClick={(event) => {
              const parent = document.getElementById(docData.id);
              const inputArray = parent.querySelectorAll("input");
              inputArray.forEach((input) => {
                if (input.classList.contains("selectedAnswer")) {
                  input.classList.remove("selectedAnswer");
                }
              });

              event.target.classList.add("selectedAnswer");
            }}
          />
          <i className="icon-unchecked"></i>
          {`${option}`}
        </label>
      );
    });
    return optionValues;
  };

  printPoll = () => {
    if (this.pollDocData.length > 0) {
      let pollValues = [];

      this.pollDocData.forEach((docData) => {
        if (!docData.data().disabled) {
          pollValues.push(
            <div
              className={`poll-section__block poll-identifier`}
              id={`${docData.id}`}
              key={`${docData.id}`}
            >
              <h3 className="poll-section__title mg-b20">{`${
                docData.data().question
              }`}</h3>
              {this.printOption(docData)}
            </div>
          );
        }
      });

      pollValues.push(
        <div className="poll-section__block" key={"submitConainer"}>
          <div className="pd-t10 pd-b10">
            <button className="poll-btn btn-primary" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </div>
      );
      return pollValues;
    } else {
      return null;
    }
  };

  onSubmit = () => {
    const polls = document.querySelectorAll(".poll-identifier");
    polls.forEach((poll) => {
      if (poll.querySelector(".selectedAnswer")) {
        const value = poll.querySelector(".selectedAnswer").value;
        this.sendPollFeedback(poll.id, value);
        console.log("sent result");
      }
    });
    this.setState({
      pollCurrentState: pollStates.waitForResults,
    });
  };

  sendPollFeedback = (pollId, optionNumber) => {
    var pollDocRef = firestore.collection(this.props.Poll_Doc).doc(pollId);
    return firestore
      .runTransaction(function (transaction) {
        return transaction.get(pollDocRef).then(function (pollDoc) {
          if (!pollDoc.exists) {
            throw "Document does not exist!";
          }
          //inc total response
          var totalResponse = pollDoc.data().totalResponse;
          totalResponse += 1;

          //inc option number
          var scoreArray = pollDoc.data().optionResponse;
          scoreArray[optionNumber] += 1;

          if (scoreArray !== null) {
            transaction.update(pollDocRef, { totalResponse: totalResponse });
            transaction.update(pollDocRef, { optionResponse: scoreArray });

            return totalResponse;
          } else {
            return Promise.reject("Sorry! scoreArray is null");
          }
        });
      })
      .then(function (totalResponse) {
        console.log("total response :", totalResponse);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  getResult = async () => {
    this.pollResultData = [];
    try {
      const snapshots = await firestore.collection(this.props.Poll_Doc).get();
      var docs = snapshots.docs;
      docs.forEach((doc) => {
        this.pollResultData.push(doc);
      });
      this.setState({
        pollCurrentState: pollStates.results,
      });
    } catch (err) {
      console.log(err);
    }
  };

  printPollAnswer = (pollData) => {
    let pollAnswers = [];
    const options = pollData.option;
    const totalResponse = pollData.totalResponse;
    const optionResponse = pollData.optionResponse;

    options.forEach((option) => {
      let percentage = 0;
      if (pollData.totalResponse !== 0) {
        percentage = Math.floor(
          (
            (optionResponse[options.indexOf(option)] / totalResponse) *
            100
          ).toPrecision(2)
        );
      }
      pollAnswers.push(
        <div className="poll-custom-progress-box" key={options.indexOf(option)}>
          {`${option}`}
          <div className="poll-custom-progress-bar">
            <div
              className="poll-custom-progress-bar__front"
              style={{ width: `${percentage}%` }}
            ></div>
            <span className="poll-custom-progress-bar__percent">
              {" "}
              {`${percentage}%`}
            </span>
          </div>
        </div>
      );
    });

    return pollAnswers;
  };

  printPollResults = () => {
    if (this.pollResultData.length > 0) {
      let pollResults = [];

      this.pollResultData.forEach((doc) => {
        const docData = doc.data();
        if (!docData.disabled)
          pollResults.push(
            <div
              className="poll-section__block"
              id={`${doc.id}`}
              key={`${doc.id}`}
            >
              <h3 className="poll-section__title pd-b10">{`${docData.question}`}</h3>
              {this.printPollAnswer(docData)}
            </div>
          );
      });
      return pollResults;
    } else {
      return null;
    }
  };

  onHeadingClick(event) {
    this.props.onHeadingClick(event);
  }

  render() {
    return (
      <>
        <div className="second-level-nav">
          <h3
            className="second-level-nav__title has-icon"
            onClick={(event) => this.onHeadingClick(event)}
          >
            {/* <i className="second-level-nav__icon icon-angle-back"></i>  */}
            Public Poll
            <i className="icon-close"></i>
          </h3>
          <div className="poll-section scrollable-part">
            {this.state.pollCurrentState === pollStates.pollAnswer ? (
              <div className="poll-section__inner">{this.printPoll()}</div>
            ) : null}

            {this.state.pollCurrentState === pollStates.results ? (
              <div className="poll-section__inner">
                {this.printPollResults()}
              </div>
            ) : null}

            {this.state.pollCurrentState === pollStates.waitForResults ? (
              <div className="d-flex h-100 align-items-center justify-content-center">
                <p className="light-color" style={{ color: "#f57f28" }}>
                  Waiting for results
                </p>
              </div>
            ) : null}
            {this.state.pollCurrentState === pollStates.waitForLive ? (
              <div className="d-flex h-100 align-items-center justify-content-center">
                <p className="light-color" style={{ color: "#F57F28" }}>
                  Waiting for Poll To GO Live
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default PublicPoll;
