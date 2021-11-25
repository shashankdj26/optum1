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

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const rdb = firebase.database();

var currentUser;
var analyticsName = "";
//----------check----------------//
auth.onAuthStateChanged(function (user) {
  if (user) {
    currentUser = user;
    console.log(user.email + " Signed In");
    analyticsName = user.uid;
    console.log(analyticsName);
  } else {
    console.log("Nobody is Signed In");
  }
});

function AttachLisenters() {
  console.log("asd");
  var actionButtons = document.querySelectorAll(".actionButton");
  actionButtons.forEach((btn) => {
    const searchRegExp = /%20/g;
    const replaceWith = "";
    var url = "";
    if (btn.href != undefined) {
      url = btn.href;
    } else {
      url = btn.getAttribute("url");
    }
    var filename = url.substring(url.lastIndexOf("/") + 1);

    filename = filename.replace(searchRegExp, replaceWith);
    var res = filename.split(".");
    filename = res[0];

    console.log(filename);
    btn.addEventListener("click", function () {
      console.log("clicked");
      // addDownloadAnalytics(filename)
    });
  });
}

function addDownloadAnalytics(stallName) {
  analytics.logEvent(stallName);
  console.log(stallName + "add to ana", analyticsName);
  var userData = rdb.ref("userData/" + analyticsName + "/downloads");
  userData.once("value").then(function (snapshot) {
    // console.log(snapshot.val())
    if (snapshot.exists()) {
      var previousValue = 0;
      var found = false;
      //getData
      var obj = snapshot.val();
      Object.keys(obj).forEach((key) => {
        if (key === stallName) {
          previousValue = obj[key];
          found = true;
        }
      });
      if (found) {
        previousValue += 1;
        //update data
        userData.update(
          {
            [stallName]: previousValue,
          },
          function (error) {
            if (error) {
              console.log(
                "error occurred while updating analytics for: ",
                stallName
              );
            } else {
              // console.log("Data saved successfully for: ", stallName);
            }
          }
        );
      } else {
        userData.update(
          {
            [stallName]: 1,
          },
          function (error) {
            if (error) {
              console.log(
                "error occurred while updating analytics for: ",
                stallName
              );
            } else {
              // console.log("Data included successfully!");
            }
          }
        );
      }
    } else {
      userData.set(
        {
          [stallName]: 1,
        },
        function (error) {
          if (error) {
            console.log("error occurred");
          } else {
            // console.log("Data saved successfully! for first time");
          }
        }
      );
    }
  });
}
