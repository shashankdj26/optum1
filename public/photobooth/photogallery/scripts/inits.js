var firebaseConfig = {
  apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
  authDomain: "optum-cdcd7.firebaseapp.com",
  databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
  projectId: "optum-cdcd7",
  storageBucket: "optum-cdcd7.appspot.com",
  messagingSenderId: "33244416026",
  appId: "1:33244416026:web:cd039c460016444059a9a3",
  measurementId: "G-ZR8NLSNB91",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
var userAvailable = false;
var current = 0;
var myuser = null;
var likedImgs = null;
auth.onAuthStateChanged((user) => {
  console.log("ASD");
  if (user) {
    myuser = user;
    userAvailable = true;
    updateUserLikes();
    console.log(user.email + " is logged");

    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!keepLoading) return;

        keepLoading = false;
        console.log("loading via scroll");
        // you're at the bottom of the page
        var og = document.getElementById("ogDiv");
        window.scrollTo(0, window.innerHeight - og.innerHeight);
        fetchImages(og.innerHeight);
      }
    };
  } else {
    userAvailable = false;
    //login("puneet@dj.com", "dj@flipkart", "Puneet");
    window.alert("No user is logged in");
    console.log("No user is logged in");
  }
});

function updateUserLikes() {
  var docRef = firestore.collection("userData").doc(myuser.email);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        likedImgs = doc.data().liked;

        console.log("Document data:", likedImgs);
      } else {
        console.log("No such document!");
      }
      fetchImagesInit();
      snapshotImage();
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

var keepLoading = true;
var lastVisible = null;
async function fetchImagesInit() {
  var ref = firestore
    .collection("photobooth")
    .orderBy("timestamp", "desc")
    .limit(1);
  var query = await ref.get().then((documentSnapshots) => {
    // Get the last visible document
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);

    let myID = "";
    let og = document.getElementById("ogDiv");
    if (documentSnapshots.empty) {
      return;
    }
    let link = documentSnapshots.docs[0].data().link;
    let id = documentSnapshots.docs[0].data().id;
    og.children[0].children[0].src = link;

    og.children[0].children[1].children[0].onclick = () =>
      likeBtnPress(myID, id);
    if (likedImgs) {
      if (likedImgs.includes(id)) {
        og.children[0].children[1].children[0].setAttribute(
          "data-status",
          "pressed"
        );
        og.children[0].children[1].children[0].src =
          "./textures/likePressed.png";
      }
    }

    og.children[0].children[0].onclick = () => viewBtnPress(link);
    og.children[0].children[1].children[1].onclick = () => viewBtnPress(link);
    fetchImages();
  });
  current = 1;
}

async function fetchImages(height) {
  if (lastVisible == null) return;

  var ref = firestore
    .collection("photobooth")
    .orderBy("timestamp", "desc")
    .startAfter(lastVisible)
    .limit(10);

  var query = await ref.get().then((documentSnapshots) => {
    // Get the last visible document
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("**in");
    if (documentSnapshots.docs.length < 10) {
      document.getElementById("loader").style.display = "none";
      keepLoading = false;
    } else keepLoading = true;

    var og = document.getElementById("ogDiv");
    for (var i = 0; i < documentSnapshots.docs.length; i++) {
      let cln = og.cloneNode(true);
      // Append the cloned <li> element to <ul> with id="myList1"
      document.getElementById("divs").appendChild(cln);
      let myID = current + i;
      cln.id = "ogDiv" + myID;

      let link = documentSnapshots.docs[i].data().link;
      let id = documentSnapshots.docs[i].data().id;
      cln.children[0].children[0].src = link;
      cln.children[0].children[1].children[0].onclick = () =>
        likeBtnPress(myID, id);
      cln.children[0].children[1].children[0].setAttribute(
        "data-status",
        "idle"
      );
      cln.children[0].children[1].children[0].src = "./textures/likeBtn.png";
      if (likedImgs) {
        if (likedImgs.includes(id)) {
          cln.children[0].children[1].children[0].setAttribute(
            "data-status",
            "pressed"
          );
          cln.children[0].children[1].children[0].src =
            "./textures/likePressed.png";
        }
      }

      cln.children[0].children[0].onclick = () => viewBtnPress(link);
      cln.children[0].children[1].children[1].onclick = () =>
        viewBtnPress(link);
      // if(i%2==1)
      //     window.scrollTo(0,window.innerHeight-height);
    }
    current += documentSnapshots.docs.length;
  });
}

function likeBtnPress(objID, id) {
  var og = document.getElementById("ogDiv" + objID);
  var obj = og.children[0].children[1].children[0];
  if (obj.getAttribute("data-status") == "pressed") {
    obj.setAttribute("data-status", "idle");
    obj.src = "./textures/likeBtn.png";
    removeFromPhotobooth(id);
    removeFromUserData(id);
  } else {
    obj.setAttribute("data-status", "pressed");
    obj.src = "./textures/likePressed.png";
    addToPhotobooth(id);
    addToUserData(id);
  }
}

function viewBtnPress(link) {
  if (window.parent) window.parent.viewImg1(link);
  console.log(link);
}

function addToPhotobooth(id) {
  firestore
    .collection("photobooth")
    .doc(id)
    .update({
      liked: firebase.firestore.FieldValue.arrayUnion(myuser.email),
    })
    .then(() => {
      console.log("Document written to Photobooth");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function removeFromPhotobooth(id) {
  firestore
    .collection("photobooth")
    .doc(id)
    .update({
      liked: firebase.firestore.FieldValue.arrayRemove(myuser.email),
    })
    .then(() => {
      console.log("Document removed from Photobooth");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

async function addToUserData(id) {
  const ref = firestore.collection("userData").doc(myuser.email);
  await firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    if (doc.exists) {
      transaction.update(ref, {
        liked: firebase.firestore.FieldValue.arrayUnion(id),
      });
    } else {
      transaction.set(ref, {
        liked: firebase.firestore.FieldValue.arrayUnion(id),
      });
    }
  });
}

async function removeFromUserData(id) {
  const ref = firestore.collection("userData").doc(myuser.email);
  await firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    if (doc.exists) {
      transaction.update(ref, {
        liked: firebase.firestore.FieldValue.arrayRemove(id),
      });
    } else {
      transaction.set(ref, {
        liked: firebase.firestore.FieldValue.arrayRemove(id),
      });
    }
  });
}

var firstTime = true;
function snapshotImage() {
  firestore.collection("photobooth").onSnapshot((query) => {
    if (firstTime) {
      firstTime = false;
      return;
    }

    query.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New : ", change.doc.data());

        current++;
        let og = document.getElementById("ogDiv");
        let cln = og.cloneNode(true);
        // Append the cloned <li> element to <ul> with id="myList1"
        document.getElementById("divs").prepend(cln);
        cln.id = "ogDiv" + current;
        let myID = current;
        let link = change.doc.data().link;
        let id = change.doc.data().id;
        cln.children[0].children[0].src = link;
        cln.children[0].children[1].children[0].onclick = () =>
          likeBtnPress(myID, id);
        cln.children[0].children[1].children[0].setAttribute(
          "data-status",
          "idle"
        );
        cln.children[0].children[1].children[0].src = "./textures/likeBtn.png";
        if (likedImgs) {
          if (likedImgs.includes(id)) {
            cln.children[0].children[1].children[0].setAttribute(
              "data-status",
              "pressed"
            );
            cln.children[0].children[1].children[0].src =
              "./textures/likePressed.png";
          }
        }
        cln.children[0].children[0].onclick = () => viewBtnPress(link);
        cln.children[0].children[1].children[1].onclick = () =>
          viewBtnPress(link);
      }
      if (change.type === "modified") {
        console.log("Modified : ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed : ", change.doc.data());
      }
    });
  });
}

function addMessage(text) {
  firestore
    .collection("messageData")
    .add({
      message: "" + text,
      email: myuser.email,
      author: myuser.displayName,
      uid: myuser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function login(email, password, myname) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (cred) {
      console.log(cred.user.email + " is logged in right now");
      let user = cred.user;
      user
        .updateProfile({
          displayName: myname,
        })
        .then(function () {
          console.log("name Updated:" + myname + "!!");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
        });

      // fadeThisIn("#welcomeScreen");

      // document.getElementById("lobbyIframe").src = "/lobby/index.html";
      // var element1 = document.getElementById("loginScreen");
      // element1.parentNode.removeChild(element1);
      // fadeThisIn("#photoVerification");
      // document.getElementById("photoVerify").src = isMobile() ? "/uploadPhoto/index.html" : "/uploadPhoto-PC/index.html";
      // document.getElementById("photoVerify").src = "/photobooth/index.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        signupWithEmail(email, password, myname);
        return;
      } else document.getElementById("sendOtp").style.display = "block";
      var errorMessage = error.message;
      console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
    });
}

function logout() {
  auth
    .signOut()
    .then(function () {
      console.log("user signed out");
      //window.location.href = "/login/index.html";//uncomment for final build
    })
    .catch(function (error) {
      console.log("error happened while signing out");
    });
}

function signupWithEmail(email, password, myname) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      console.log(response.user.email + " is logged in right now");
      //  fadeThisIn("#photoVerification");
      // document.getElementById("photoVerify").src = isMobile()||is_touch_enabled() ? "/uploadPhoto/index.html" : "/uploadPhoto-PC/index.html";
      response.user
        .updateProfile({
          displayName: myname,
        })
        .then(function () {
          console.log("name Updated:" + myname + "!!");
        });
    })
    .catch(function (error) {
      document.getElementById("sendOtp").style.display = "block";
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
    });
}
