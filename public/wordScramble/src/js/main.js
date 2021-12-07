let currentUser = null;
auth.onAuthStateChanged(function (user) {
  if (user) {
    currentUser = user;
    console.log(user.email + " is logged");
  } else {
    currentUser = null;
    console.log("No user is logged in");
    login("shubham@dj.com", "shubham@dj.com12345");
  }
});

function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (cred) {
      console.log(cred.user.email + " is logged in right now");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("code: " + errorCode + " & ErrorMsg: " + errorMessage);
    });
}

const db = firebase.firestore();

function UpdateScrore(gamescore, docname) {
  if (!currentUser) {
    setTimeout(() => {
      UpdateScrore(gamescore, docname);
    }, 300);
    return;
  }

  gamescore = parseInt(gamescore);
  console.log(typeof gamescore);

  var gameDocRef = db.collection("wordScramble").doc(currentUser.uid);
  db.runTransaction(function (transaction) {
    return transaction.get(gameDocRef).then(function (gamedoc) {
      if (!gamedoc.exists) {
        transaction.set(gameDocRef, {
          name: currentUser.displayName
            ? currentUser.displayName
            : currentUser.email
            ? currentUser.email.split("@")[0]
            : currentUser.uid,
          score: gamescore,
          email: currentUser.email,
          id: currentUser.uid,
        });
        return gamescore;
      }
      //inc total response
      var totalscore = gamedoc.data().score;
      if (totalscore < gamescore) {
        totalscore = gamescore;
        console.log(typeof totalscore);
        transaction.update(gameDocRef, { score: totalscore });
      }
      return totalscore;
    });
  })
    .then(function (totalscore) {
      console.log("total response :", totalscore);
    })
    .catch(function (err) {
      console.error(err);
    });
}
