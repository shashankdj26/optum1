import React, { useEffect, useState } from 'react'
import { firestore } from '../../firebase/firebase'
import './chatNotification.css'

const collection = 'PrivateChatData'
let chatListner = null;
let firstTime = true;
let timerRef = null;
const notificationTimer = 10000;

function setChatMessageListener(userEmail, callback) {
    try {
        const queryRef = firestore.collection(collection)
            .where('reciever', '==', userEmail)
            .orderBy('date', 'desc')
            .limit(2)
        chatListner = queryRef.onSnapshot(snapshot => {
            if (firstTime) {
                firstTime = false;
                return;
            }
            snapshot.docChanges().forEach((change) => {
                // console.log('xxxxxxxxxxxxxxxxxxxxxllllllllllll', change, change.doc.data())
                if (change.type === "added") {
                    if (callback)
                        callback(change.doc.data())
                }
            });
        })
    } catch (error) {
        if (callback) { callback(null, error) }
    }
}

function removeChatMessageListener() {
    if (chatListner) {
        chatListner();
    }
}

function ChatNotification(props) {

    const [visible, setVisble] = useState(false)

    useEffect(() => {
        // console.log(props.userEmail, '////////////////////')
        setChatMessageListener(props.userEmail, (data, err) => {
            if (err) {
                console.log(err)
                return
            }
            // console.log("New Message is here!!!", data)
            if (props.canBeVisible) {
                setVisble(true)
                timerRef = setTimeout(() => {
                    setVisble(false)
                }, notificationTimer)
            }
        })
        return () => {
            // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            // removeChatMessageListener()
        }
    }, [])

    const closeNotification = () => {
        setVisble(false)
        if (timerRef) {
            clearTimeout(timerRef);
        }
    }

    return (
        <>
            {
                // visible &&
                <div className={`chatNotificationContainer ${visible && props.canBeVisible ? 'chatNotificationContainer-visible' : ''}`}>
                    <div className="chatNotification">
                        <div className="closeButton-chatNotification" onClick={closeNotification}></div>
                        You have received a new message in your private chat.
                    </div>
                </div>
            }
        </>
    )
}

export default ChatNotification
