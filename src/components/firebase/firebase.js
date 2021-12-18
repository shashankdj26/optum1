import firebase, { apps, database } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";
import "firebase/storage";
import { AppString } from "./AppString";
import * as projectData from "../../data/Lobby/hotspots";
import * as realTimeData from "../../data/Lobby/realtimeData";
import { PointType, PointValues } from "../../const/fixed/Types";
import { object } from "prop-types";

let firebaseConfig = {
  apiKey: "AIzaSyCi_y6t63OqbHG1KJlxmzzLYVYgq-vqksI",
  authDomain: "herovirtual22.firebaseapp.com",
  projectId: "herovirtual22",
  storageBucket: "herovirtual22.appspot.com",
  messagingSenderId: "1094006397159",
  appId: "1:1094006397159:web:bf387462f37e9d9ff0ea42",
  measurementId: "G-2Y17CRXF3M",
};

firebase.initializeApp(firebaseConfig);

window.firebaseInstance = firebase;

export const firebaseApp = firebase;

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const realDB = firebase.database();

export const analytics = firebase.analytics();

export const storage = firebase.storage();

export const signInWithId = (email, password) => {
  return new Promise(async (res, rej) => {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      console.log(cred.user.email + " is logged in right now");
      res();
    } catch (error) {
      rej(error);
    }
  });
};
const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/djfarmademo.appspot.com/o/profileimages%2Fblank-avatar.png?alt=media&token=2af15226-9bd7-47ce-bc72-f3c1a12a0780";

export const signUpWithId = (email, password, name, url) => {
  return new Promise(async (res, rej) => {
    try {
      console.log("going in");
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response.user.email + " is signedUp in right now");
      await response.user.updateProfile({
        displayName: name,
        photoURL: url ? url : defaultImageUrl,
      });
      console.log("done");
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const loadUser = async (
  email,
  password,
  name,
  forceCreateNew = true
) => {
  return new Promise(async (res, rej) => {
    try {
      await signInWithId(email, password);
      res();
    } catch (err) {
      if (err.code === "auth/user-not-found" && forceCreateNew) {
        try {
          // window.userData = await getUserDetails(email);
          window.userData = {
            email: email,
            name: name,
          };
          await signUpWithId(
            email,
            password,
            name,
            window.userData.profile_image
          );
          console.log("done");
          return;
        } catch (error) {
          console.log(error);
          if (error.code === "NoUserFound") {
            rej(error);
          }
        }
      }
      rej({
        code: err.code,
        message: err.message,
      });
    }
  });
};
export const signOut = (noRefresh) => {
  auth.signOut().then(function () {
    // window.open("https://" + document.domain, "_self");
    if (!noRefresh) {
      window.location.reload();
      window.location.href = "/";
    }
  });
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const generatePushID = (function () {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  var PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  var lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // "incremented" by one.
  var lastRandChars = [];

  return function () {
    var now = new Date().getTime();
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0)
      throw new Error("We should have converted the entire timestamp.");

    var id = timeStampChars.join("");

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length != 20) throw new Error("Length should be 20.");

    return id;
  };
})();

export const youtube_parser = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

// R1Rcm
export const getUserDetails = (email) => {
  console.log("are we in");
  return new Promise(async (resolve, reject) => {
    try {
      let path = "/users";
      var dbref = realDB.ref(path).orderByChild("email").equalTo(email);
      // var dbref = realDB.ref(path).orderByChild('email').startAt(email.toUpperCase()).endAt(email.toLowerCase()+'\uf8ff');
      const query = await dbref.once("value");
      if (query.exists()) {
        let key = Object.keys(query.val())[0];
        resolve(query.val()[key]);
      } else {
        reject({
          code: "NoUserFound",
          message: "No Such User Is Registered",
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getUniCode = (email, unicode) => {
  console.log("unicode cheking");
  return new Promise(async (resolve, reject) => {
    try {
      let path = "/users";
      var dbref = realDB.ref(path).orderByChild("email").equalTo(email);
      // var dbref = realDB.ref(path).orderByChild('email').startAt(email.toUpperCase()).endAt(email.toLowerCase()+'\uf8ff');
      const query = await dbref.once("value");
      if (query.exists()) {
        // console.log(query);
        let key = Object.keys(query.val())[0];
        let uni = "penny2021";
        uni = uni.toLowerCase().trim();
        // console.log(query.val()[key]);
        console.log(unicode, uni);
        if (unicode && unicode !== uni) {
          reject({
            code: "wrongUniqueCode",
            message: "Please enter the correct code!",
          });
        }
        resolve(query.val()[key]);
      } else {
        reject({
          code: "NoUserFound",
          message: "No Such User Is Registered",
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getProjectRealTimeData = () => {
  return new Promise(async (res, rej) => {
    try {
      console.log("//////");
      const doc = await firestore
        .collection(AppString.BACKSTAGE)
        .doc(AppString.BACKSTAGEREALTIMEDATA)
        .get();
      if (!doc.exists) {
        rej({
          code: "NoDataFound",
          message: "no such document exists.",
        });
      }
      const docData = doc.data();
      Object.keys(docData).forEach((key) => {
        let ItemObject = docData[key];
        Object.keys(ItemObject).forEach((itmeKey) => {
          if (realTimeData[`${key}`].hasOwnProperty(itmeKey)) {
            if (typeof realTimeData[`${key}`][itmeKey] !== "object") {
              realTimeData[`${key}`][itmeKey] = ItemObject[itmeKey];
            } else {
              realTimeData[`${key}`][itmeKey] = {
                ...realTimeData[`${key}`][itmeKey],
                ...ItemObject[itmeKey],
              };
            }
          } else {
            if (typeof ItemObject[itmeKey] !== "object") {
              realTimeData[`${key}`][itmeKey] = ItemObject[itmeKey];
            } else {
              realTimeData[`${key}`][itmeKey] = {
                ...ItemObject[itmeKey],
              };
            }
          }
        });
      });
      res(docData);
    } catch (error) {
      rej(error);
    }
  });
};

export const getProjectData = () => {
  return new Promise(async (res, rej) => {
    try {
      const doc = await firestore
        .collection(AppString.BACKSTAGE)
        .doc(AppString.BACKSTAGELINK)
        .get();
      if (!doc.exists) {
        rej({
          code: "NoDataFound",
          message: "no such document exists.",
        });
      }
      console.log(projectData);
      const docData = doc.data();
      Object.keys(docData).forEach((key) => {
        let ItemObject = docData[key];
        Object.keys(ItemObject).forEach((itmeKey) => {
          if (projectData[`${key}`].hasOwnProperty(itmeKey)) {
            if (typeof projectData[`${key}`][itmeKey] !== "object") {
              projectData[`${key}`][itmeKey] = ItemObject[itmeKey];
            } else {
              projectData[`${key}`][itmeKey] = {
                ...projectData[`${key}`][itmeKey],
                ...ItemObject[itmeKey],
              };
            }
          } else {
            if (typeof ItemObject[itmeKey] !== "object") {
              projectData[`${key}`][itmeKey] = ItemObject[itmeKey];
            } else {
              projectData[`${key}`][itmeKey] = {
                ...ItemObject[itmeKey],
              };
            }
          }
        });
      });
      console.log(projectData);
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const turnOnUserCard = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let path = "/users";
      var dbref = realDB
        .ref(path)
        .orderByChild("email")
        .equalTo(email)
        .limitToFirst(1);
      // var dbref = realDB.ref(path).orderByChild('email').startAt(email.toUpperCase()).endAt(email.toLowerCase()+'\uf8ff').limitToFirst(1);
      const query = await dbref.once("value");
      if (query.exists()) {
        let key = Object.keys(query.val())[0];
        console.log(query.val()[key]);
        if (!query.val()[key].enabled) {
          realDB.ref(`/users/${key}`).update({
            enabled: true,
          });
        }
        resolve();
      } else {
        reject({
          code: "NoCardUserFound",
          message: "No Such User Is Registered",
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const attachConnectProfilesListener = (callback) => {
  let path = "/users";
  window.dbref = realDB.ref(path).orderByChild("enabled").equalTo(true);
  window.connectListener = window.dbref.on(
    "value",
    (query) => {
      if (query.exists()) {
        callback(false, query.val());
      } else {
        callback(true, {
          code: "NoUserFound",
          message: "NoUserIsFoundForConnect",
        });
      }
    },
    (err) => {
      callback(true, err);
    }
  );
};

export const removeConnectProfilesListener = () => {
  window.dbref.off("value", window.connectListener);
};

//#region Login analytics

const getUserIdForAnalytics = (user, getEmail = true) => {
  return new Promise((resolve, reject) => {
    try {
      if (user.email) {
        let Id = "";
        Id = !getEmail ? user.email.split("@")[0] : user.email;
        Id = Id.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, "");
        Id = Id.toLowerCase();
        resolve(Id);
      } else {
        let err = {
          code: "NoEmailFound",
          message: "Please pass a valid User Object",
        };
        throw err;
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkForTimeStampAvailable = () => {
  return new Promise(async (res, rej) => {
    try {
      if (
        window.todaysDateTimestamp === undefined ||
        window.todaysDateTimestamp === null
      ) {
        const result = await getCurrentTimeStampV2();
        window.todaysDateTimestamp = result.todaysDateTimestamp;
        res();
        return;
      }
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const getCurrentTimeStampV2 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("https://dj-timeserver.glitch.me");
      const result = await res.json();
      var currDateWeb = new Date(result.epoch);
      var currDateLocal = new Date();
      var webTimeDiff = currDateWeb.getTime() - currDateLocal.getTime();
      let todaysDateTimestamp = `${currDateWeb.getFullYear()}-${
        currDateWeb.getMonth() + 1
      }-${currDateWeb.getDate()}`;
      resolve({ currDateWeb, webTimeDiff, todaysDateTimestamp });
    } catch (err) {
      reject(err);
    }
  });
};

export const addLoginAnalytics = (user) => {
  return new Promise(async (res, rej) => {
    try {
      await checkForTimeStampAvailable();
      let Id = await getUserIdForAnalytics(user);

      let path = `analytics/${window.todaysDateTimestamp}/${Id}`;
      const reference = realDB.ref(path);

      const snapShot = await reference.once("value");

      var details = {
        email: user.email,
        name: user.displayName,
      };

      if (window.userData) {
        details = {
          ...details,
          ...window.userData,
        };
      }

      if (snapShot.exists()) {
        if (
          snapShot.val().email === undefined ||
          snapShot.val().email === null ||
          snapShot.val().name === undefined ||
          snapShot.val().name === null
        ) {
          await reference.update({
            email: user.email ? user.email : window.userData.email,
            name: user.displayName ? user.displayName : window.userData.name,
            passcode: `${window.jry ? "optjry" : "optstu"}`,
            lastLoginTime: firebase.database.ServerValue.TIMESTAMP,
          });
        } else {
          await reference.update({
            passcode: `${window.jry ? "optjry" : "optstu"}`,
            lastLoginTime: firebase.database.ServerValue.TIMESTAMP,
          });
        }
      } else {
        await reference.set({
          email: user.email ? user.email : window.userData.email,
          name: user.displayName ? user.displayName : window.userData.name,
          passcode: `${window.jry ? "optjry" : "optstu"}`,
          firstLoginTime: firebase.database.ServerValue.TIMESTAMP,
          lastLoginTime: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      res();
    } catch (error) {
      console.log(error);
      if (error === "TypeError: Failed to fetch") {
        window.alert(
          "Please check your internet conenect and refresh the page."
        );
      }
      rej(error);
    }
  });
};

let diconnectReference = null;
export const addDisconnectListener = (user) => {
  return new Promise(async (res, rej) => {
    try {
      await checkForTimeStampAvailable();
      let Id = await getUserIdForAnalytics(user);
      let path = `analytics/${window.todaysDateTimestamp}/${Id}`;
      const reference = realDB.ref(path);
      diconnectReference = reference.onDisconnect();
      await diconnectReference.update({
        lastLogoutTime: firebase.database.ServerValue.TIMESTAMP,
      });
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const addLogoutAnalytics = (user) => {
  return new Promise(async (res, rej) => {
    try {
      await checkForTimeStampAvailable();
      let Id = await getUserIdForAnalytics(user);
      let path = `analytics/${window.todaysDateTimestamp}/${Id}`;
      const reference = realDB.ref(path);

      await reference.update({
        lastLogoutTime: firebase.database.ServerValue.TIMESTAMP,
      });

      if (diconnectReference) {
        diconnectReference.cancel();
      }

      res();
    } catch (error) {
      rej(error);
    }
  });
};

var sessionId = null;

export const updateUserStatus = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (sessionId == null) {
        sessionId = userId + "_" + new Date().getTime();
      }
      var userCheck = realDB.ref("loggedInUser/" + sessionId);
      var details = {};
      if (window.userData) {
        details = {
          ...details,
          ...window.userData,
        };
      }
      await userCheck.update({
        ...details,
        state: "online",
        lastChange: firebase.database.ServerValue.TIMESTAMP,
        location: "lobby",
      });
      let disconnectRef = await userCheck.onDisconnect();
      // await disconnectRef.update({
      //   ...details,
      //   state: "offline",
      //   lastChange: firebase.database.ServerValue.TIMESTAMP,
      // });
      await disconnectRef.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

//#endregion

//#region Analytics
export const updateUserLocation = (user, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = await getUserIdForAnalytics(user);
      if (sessionId == null) {
        sessionId = userId + "_" + new Date().getTime();
      }
      var userCheck = realDB.ref("loggedInUser/" + sessionId);
      let details = {};
      if (window.userData) {
        details = {
          ...details,
          ...window.userData,
        };
      }
      await userCheck.update({
        ...details,
        location: location,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const addRealtimeHotspotAnalytics = (
  user,
  hotspotName,
  stallHotspots = false
) => {
  return new Promise(async (res, rej) => {
    try {
      await checkForTimeStampAvailable();

      let Id = await getUserIdForAnalytics(user);
      let path = stallHotspots
        ? `analytics/${window.todaysDateTimestamp}/${Id}/hotspots`
        : `analytics/${window.todaysDateTimestamp}/${Id}`;

      const reference = realDB.ref(path);
      await reference.update({
        [hotspotName]: firebase.database.ServerValue.increment(1),
      });
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const addCustomRealtimeHotspotAnalytics = (user, details) => {
  return new Promise(async (res, rej) => {
    try {
      await checkForTimeStampAvailable();

      let Id = await getUserIdForAnalytics(user);
      let path = `${details.path}/analytics/${window.todaysDateTimestamp}/${Id}`;
      const reference = realDB.ref(path);

      let userDetails = {};
      if (window.userData) {
        userDetails = {
          ...userDetails,
          ...window.userData,
        };
      }

      await reference.update({
        ...userDetails,
        [details.id]: firebase.database.ServerValue.increment(1),
      });
      res();
    } catch (error) {
      rej(error);
    }
  });
};

//#endregion

//#region leaderBoard
export const addScore = (user, pointName) => {
  return new Promise(async (res, rej) => {
    try {
      let Id = user.email;
      Id = Id.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, "");
      Id = Id.toLowerCase();

      let userScorePath = "/usersScore/" + Id;
      let leaderboradPath = "/leaderboard/" + Id;

      const userScoreRef = realDB.ref(userScorePath);
      const leaderboardScoreRef = realDB.ref(leaderboradPath);
      const userSocreSnapShot = await userScoreRef.once("value");
      if (userSocreSnapShot.exists()) {
        //seconf time
        let scoreData = userSocreSnapShot.val();
        console.log(scoreData);
        if (scoreData.hasOwnProperty(pointName)) {
          scoreData[pointName] += 1;
        } else {
          scoreData[pointName] = 1;
        }
        if (scoreData.score) delete scoreData.score;
        let finalScore = getScore(scoreData);
        console.log(scoreData);
        console.log(finalScore);
        await userScoreRef.update({
          ...scoreData,
          score: finalScore,
        });
        await leaderboardScoreRef.update({
          name: user.displayName,
          email: user.email,
          score: finalScore,
        });
      } else {
        let scoreData = {
          [`${pointName}`]: 1,
        };
        let finalScore = getScore(scoreData);
        await userScoreRef.set({
          [`${pointName}`]: 1,
          score: finalScore,
        });
        await leaderboardScoreRef.set({
          name: user.displayName,
          email: user.email,
          score: finalScore,
        });
      }
      res();
    } catch (error) {
      rej(error);
    }
  });
};
export const getUserScore = (user) => {
  return new Promise(async (res, rej) => {
    try {
      let Id = user.email;
      Id = Id.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, "");
      Id = Id.toLowerCase();
      let leaderboradPath = "/leaderboard/" + Id;
      const ref = realDB.ref(leaderboradPath);
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        res(snapshot.val().score);
      } else {
        res(0);
      }
    } catch (error) {
      rej(error);
    }
  });
};
const getScore = (data) => {
  let finalScore = 0;
  Object.keys(data).forEach((key) => {
    if (!PointValues[key].oneTime) {
      finalScore += data[key] * PointValues[key].value;
      console.log(key, data[key], PointValues[key].value, finalScore);
    } else {
      finalScore += PointValues[key].value;
      console.log(key, 1, PointValues[key].value, finalScore);
    }
  });
  return finalScore;
};
const reverseObject = (object) => {
  var newObject = {};
  var keys = [];
  for (var key in object) {
    keys.push(key);
  }
  for (var i = keys.length - 1; i >= 0; i--) {
    var value = object[keys[i]];
    newObject[keys[i]] = value;
  }
  return newObject;
};
export const getLeaderboard = (callback) => {
  realDB
    .ref()
    .child("leaderboard")
    .orderByChild("score")
    .limitToLast(10)
    .on(
      "value",
      function (snapshot) {
        if (snapshot.exists()) {
          let arr = [];
          snapshot.forEach(function (child) {
            arr.push(child.val());
          });
          arr = arr.reverse();
          callback(false, arr);
        } else {
          callback({
            code: "noUserFound",
            message: "noUserFound",
          });
        }
      },
      function (errorObject) {
        callback(errorObject);
      }
    );

  // let path = '/leaderboard'
  // window.leaderboardListener = realDB.ref(path).orderByChild('score')//.limitToLast(10);
  // window.leaderboardListener.on('value', (snapShot) => {
  //     if (!snapShot.exists()) {
  //         callback({
  //             code: 'noUserFound', message: 'noUserFound'
  //         })
  //         return;
  //     }
  //     var data = snapShot.val();
  //     const sortedData = reverseObject({...data})
  //     console.log(data)
  //     console.log(sortedData)
  //     callback(false, sortedData);
  // }, err => {
  //     console.log(err)
  //     callback(err);
  // })
};
export const removeLeaderboardListener = () => {
  if (window.leaderboardListener) window.leaderboardListener.off();
};

export const getUserRank = (user) => {
  return new Promise(async (res, rej) => {
    try {
      let Id = user.email;
      Id = Id.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, "");
      Id = Id.toLowerCase();
      let leaderboradPath = "/leaderboard/";
      const ref = realDB.ref(leaderboradPath).orderByChild("score");
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        let data = snapshot.val();
        let leaderboardKeys = Object.keys(data);
        let maxCount = leaderboardKeys.length;
        let index = leaderboardKeys.indexOf(Id);
        console.log(index, maxCount);
        if (index !== -1) {
          res(maxCount - index);
        } else {
          res(maxCount + 1);
        }
      } else {
        res(0);
      }
    } catch (error) {
      rej(error);
    }
  });
};
//#endregion

//#region dailyco functions

export const checkForDailycoAdmin = (userToken) => {
  return new Promise(async (res, rej) => {
    try {
      const videoCallDocs = await firestore
        .collection(AppString.Dailyco_Col)
        .where("admin", "array-contains", userToken.uid)
        .get();
      if (videoCallDocs.empty) {
        rej({
          code: "NoAdmin",
          messsage: "this user is not a admin",
        });
      }
      const docData = videoCallDocs.docs[0].data();
      delete docData.users;
      delete docData.admin;
      delete docData.callStarted;
      res(docData);
    } catch (error) {
      rej(error);
    }
  });
};

export const getDailycoRoomDetails = () => {
  return new Promise(async (res, rej) => {
    try {
      const videoCallDocs = await firestore
        .collection(AppString.Dailyco_Col)
        .get();
      if (videoCallDocs.empty) {
        rej({
          code: "NoVideoRoom",
          messsage: "NoVideoRoomFound",
        });
      }
      let data = {};
      videoCallDocs.forEach((doc) => {
        const docData = doc.data();
        data[`${docData.docName}`] = {
          docName: docData.docName,
          publicRoomName: docData.publicRoomName,
          roomName: docData.roomName,
        };
      });
      res(data);
    } catch (error) {
      rej(error);
    }
  });
};

export const checkDailycoRoomStatus = (room) => {
  return new Promise(async (res, rej) => {
    try {
      const videoCallDoc = await firestore
        .collection(AppString.Dailyco_Col)
        .doc(room)
        .get();
      if (!videoCallDoc.exists) {
        rej({
          code: "NoVideoRoom",
          messsage: "NoVideoRoomFound",
        });
      }
      console.log(videoCallDoc.data());
      res(videoCallDoc.data().callStarted);
    } catch (error) {
      rej(error);
    }
  });
};

//#endregion

//#region video call room
export const getAvailableTwilioVideoCallRoom = (user, stallId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = user.email;
      const userName = user.displayName
        ? user.displayName
        : user.email.split("@")[0];

      const docRef = firestore.collection(AppString.MEETINGROOM).doc(stallId);

      const result = await firestore.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          let err = {
            code: "NoRoomFound",
            message: "No videoCall room found for the event.",
          };
          throw err;
        }
        let slots = doc.data().slots;
        var availableSlot = { found: false };
        for (let index = 0; index < slots.length; index++) {
          let slot = slots[index];
          if (slot.adminID.indexOf(userId) !== -1) {
            console.log("..");
            availableSlot.found = true;
            availableSlot.slot = slot;
            availableSlot.index = index;
            availableSlot.isAdmin = true;
            break;
          }
          if (slot.available) {
            if (!availableSlot.found) {
              availableSlot.found = true;
              availableSlot.slot = slot;
              availableSlot.index = index;
            }
          } else {
            //not breaking loop after finding avaliable spot because user migth have got disconnected and might want to comeback
            if (slot.userId === userId) {
              availableSlot.found = true;
              availableSlot.slot = slot;
              availableSlot.index = index;
            }
          }
        }
        if (!availableSlot.found) {
          let err = {
            code: "NoRoomAvaliable",
            message:
              "All videocall rooms are occupied. Please come back later, Thanks.",
          };
          throw err;
        }
        if (!availableSlot.isAdmin) {
          availableSlot.slot.available = false;
          availableSlot.slot.userId = userId;
          availableSlot.slot.userName = userName;
          availableSlot.slot.isAdmin = false;
        } else {
          availableSlot.slot.adminJoined = true;
          // availableSlot.slot.isAdmin = true;
        }
        console.log({ ...availableSlot.slot });
        slots[availableSlot.index] = availableSlot.slot;
        console.log(slots);
        transaction.update(docRef, {
          slots: slots,
        });
        return { ...availableSlot.slot, isAdmin: availableSlot.isAdmin };
      });
      console.log(result);
      resolve(result);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const clearTwilioVideoCallRoom = (slotId, userId, stallId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(slotId, userId, stallId);
      const docRef = firestore.collection(AppString.MEETINGROOM).doc(stallId);
      const result = await firestore.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          let err = {
            code: "NoRoomFound",
            message: "No videoCall room found for the event.",
          };
          throw err;
        }
        let slots = doc.data().slots;
        let neededSlot = { found: false };
        for (let index = 0; index < slots.length; index++) {
          let slot = slots[index];
          if (slot.id === slotId) {
            if (slot.adminID.indexOf(userId) !== -1) {
              neededSlot.found = true;
              neededSlot.slot = slot;
              neededSlot.index = index;
              neededSlot.isAdmin = true;
              break;
            }
            neededSlot.found = true;
            neededSlot.index = index;
            neededSlot.slot = slot;
            break;
          }
        }

        if (!neededSlot.found) {
          let err = {
            code: "NoSuchSlotFound",
            message: "No such slot found to be cleared.",
          };
          throw err;
        }
        if (!neededSlot.isAdmin) {
          neededSlot.slot.available = true;
          neededSlot.slot.userId = "";
          neededSlot.slot.userName = "";
        } else {
          neededSlot.slot.adminJoined = false;
        }

        delete neededSlot.slot.isAdmin;
        console.log(neededSlot);
        slots[neededSlot.index] = neededSlot.slot;
        transaction.update(docRef, {
          slots: slots,
        });
        return neededSlot.slot;
      });
      console.log(result);
      resolve(result);
    } catch (err) {
      console.log(slotId, userId, stallId);
      console.log(err);
      reject(err);
    }
  });
};

export const addTwilioVideoCalRoomListener = (slotId, stallId, callback) => {
  const docRef = firestore.collection(AppString.MEETINGROOM).doc(stallId);
  docRef.onSnapshot(
    (doc) => {
      if (doc.exists) {
        console.log("Current data: ", doc.data());
        let slots = doc.data().slots;
        let requeredSlot = null;
        slots.forEach((slot) => {
          if (slot.id === slotId) {
            requeredSlot = slot;
          }
        });
        console.log(requeredSlot);
        if (callback) {
          callback(null, requeredSlot);
        }
      }
    },
    (err) => {
      if (callback) {
        callback(err);
      }
    }
  );
};
//#endregion

export const getBreakoutRoomListener = (callback) => {
  window.breakoutRoomListener = firestore
    .collection(AppString.BACKSATGE)
    .doc(AppString.BACKSTAGELINK)
    .onSnapshot(
      (doc) => {
        if (!doc.exists) {
          callback({
            code: "NoDataFound",
            message: "no such document exists.",
          });
        }
        let data = doc.data().BreakoutRoomsHotspot;
        callback(null, data);
      },
      (err) => {
        callback(err);
      }
    );
};

export const getLinkListener = (callback) => {
  window.audiListener = firestore
    .collection(AppString.BACKSATGE)
    .doc(AppString.BACKSTAGELINK)
    .onSnapshot(
      (doc) => {
        if (!doc.exists) {
          callback({
            code: "NoDataFound",
            message: "no such document exists.",
          });
        }
        callback(null, doc.data());
      },
      (err) => {
        callback(err);
      }
    );
};

export const getCommonListener = (callback) => {
  window.audiListener = firestore
    .collection(AppString.BACKSATGE)
    .doc(AppString.BACKSTAGECOMMON)
    .onSnapshot(
      (doc) => {
        if (!doc.exists) {
          callback({
            code: "NoDataFound",
            message: "no such document exists.",
          });
        }
        callback(null, doc.data());
      },
      (err) => {
        callback(err);
      }
    );
};

//Live count function section

const UserState = {
  online: "online",
  offline: "offline",
};

export const liveCountListener = (callback) => {
  realDB.ref("loggedInUser").on(
    "value",
    (query) => {
      if (query.exists() && callback) {
        const data = query.val();
        let locationCount = {
          online: 0,
          lobby: 0,
          audi: 0,
          networking: 0,
          speakers: 0,
          rencen: 0,
          exibooth: 0,
        };

        Object.keys(data).forEach((userId) => {
          if (data[userId].state === UserState.online) {
            locationCount[data[userId].location] += 1;
            locationCount.online += 1;
          }
        });

        callback(locationCount);
      }
    },
    (err) => {
      if (callback) {
        callback(null, err);
      }
    }
  );
};

//---------------------------

export const checkForSpeaker = (userEmail) => {
  return new Promise(async (res, rej) => {
    try {
      const doc = await firestore
        .collection(AppString.ADMIN)
        .doc(AppString.SPEAKERS)
        .get();
      if (doc.exists) {
        let ids = doc.data().ids;
        if (ids.indexOf(userEmail) !== -1) {
          res(true);
        } else {
          res(false);
        }
      }
    } catch (error) {
      rej(error);
    }
  });
};

export const checkForSpecialUser = async (user, callback) => {
  const ref = firestore
    .collection(AppString.BACKSATGE)
    .doc(AppString.SPECIALUSER);
  const docRef = await ref.get();
  if (!docRef.exists) {
    callback({ code: "NoDocFound", message: "noDocFound" });
  }
  const data = docRef.data();
  // if (data.userUid) {
  //     if (data.userUid.indexOf(user.uid) !== -1) {
  //         callback(null, data.link);
  //     } else {
  //         callback({ code: 'notAdmin', message: 'simpleUser' })
  //     }
  // } else {
  //     callback({ code: 'notAdmin', message: 'simpleUser' })
  // }
  if (window.jry) {
    callback(null, data.link);
  } else {
    callback({ code: "notAdmin", message: "simpleUser" });
  }
};
