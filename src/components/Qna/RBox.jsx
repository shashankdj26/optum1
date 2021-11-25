import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import { firestore } from "../firebase/firebase";
import { AppString } from "../firebase/AppString";

const RBox = (props) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    firestore.collection(props.QNAReplyCollection).orderBy('timestamp', 'desc').where('replytoid', '==', props.id).onSnapshot((snapshot) => {
      console.log(snapshot)
      if (!snapshot.empty) {
        const newNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(newNotes);
        setNotes(newNotes)
      }
    })
  }, [])

  return (

    <div>
      {notes.map((note) => {
        return (
          <Reply
            key={note.id}
            id={note.id}
            replyby={note.replyby}
            rcontent={note.rcontent}
            time={(note.time2)}
          />
        );
      })}
    </div>

  );
}

export default RBox;
