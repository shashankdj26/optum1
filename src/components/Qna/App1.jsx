import React from "react";
import QABox from "./QABox";

class QNA extends React.Component {

  onHeadingClick(event) {
    this.props.onHeadingClick(event);
  }

  render() {
    const { QNACollection, QNAReplyCollection, canReply, moderated, headerName } = this.props
    return (
      <div className="second-level-nav">
        <h3 className="second-level-nav__title has-icon" onClick={event => this.onHeadingClick(event)}>
          {/* <i className="second-level-nav__icon icon-angle-back"></i>  */}
          {headerName ? headerName : 'Q&A'}
          <i className="icon-close"></i>
        </h3>
        <QABox QNACollection={QNACollection} QNAReplyCollection={QNAReplyCollection} canReply={canReply} moderated={moderated} /></div>
    )
  }
}

export default QNA;
