import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";
import Note from "./Note";
import CreateArea from "./CreateArea";

export default class QABox extends React.Component {
  state = {
    notes: null
  }

  componentDidMount() {
    firestore.collection(this.props.QNACollection).orderBy('timestamp', 'desc').where('status', '==', '1').onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        const newNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        this.setState({
          notes: newNotes
        })
      }
    })
  }

  render() {
    const { QNACollection, QNAReplyCollection, canReply, moderated } = this.props
    const { notes } = this.state;
    return (
      <div className="qa-section scrollable-part">
        <div className="qa-section__inner pd-b70 ">
          {notes && notes.map(note =>
            (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                time={(note.time2)}
                QNACollection={QNACollection}
                QNAReplyCollection={QNAReplyCollection}
                canReply={canReply}
              />
            ))}
        </div>
        <CreateArea
          QNACollection={QNACollection}
          QNAReplyCollection={QNAReplyCollection}
          moderated={moderated}
        />
      </div>
    )
  }
}