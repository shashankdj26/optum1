const agenda = document.getElementById("agenda");
const show = document.getElementById("show");
const message = document.getElementById("message");
const time = document.getElementById("time");
const timer = document.getElementById("timer");
const link = document.getElementById("link");
const updated = document.getElementById("updated");
const error = document.getElementById("error");
const updatedlink = document.getElementById("updatedlink");
const linkerror = document.getElementById("linkerror");

updated.style.display = "none";
error.style.display = "none";
updatedlink.style.display = "none";
linkerror.style.display = "none";

message.addEventListener("focus", () => {
  updated.style.display = "none";
  error.style.display = "none";
  updatedlink.style.display = "none";
  linkerror.style.display = "none";
});
timer.addEventListener("focus", () => {
  updated.style.display = "none";
  error.style.display = "none";
  updatedlink.style.display = "none";
  linkerror.style.display = "none";
});

link.addEventListener("focus", () => {
  updated.style.display = "none";
  error.style.display = "none";
  updatedlink.style.display = "none";
  linkerror.style.display = "none";
});
const getData = () => {
  return new Promise((resolve, reject) => {
    app
      .firestore()
      .collection("backStage")
      .doc("notifications")
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject({ message: "Something went wrong" });
        }
      });
  });
};
const getAudiLink = () => {
  return new Promise((resolve, reject) => {
    app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject({ message: "Something went wrong" });
        }
      });
  });
};
let data = {};
getData().then((res) => {
  data = res;
  show.checked = data.show;
  getAudiLink().then((result) => {
    data = { ...data, link: result.AudiData.link };
    console.log(data);
  });
});

const validateData = (agenda, show, message, time, timer) => {
  if (message.value === "") {
    return false;
  }
  if (time.value === "") {
    return false;
  }
  if (timer.value === "") {
    return false;
  }
  return true;
};

document.getElementById("update").addEventListener("mouseup", () => {
  let showAgenda = false;
  let showNotification = false;
  if (agenda.checked) {
    showAgenda = true;
  }
  if (show.checked) {
    showNotification = true;
  }
  //   const canContinue = validateData(agenda, show, message, time, timer);
  const canContinue = true;
  if (canContinue) {
    document.getElementById("update").disabled = true;
    app
      .firestore()
      .collection("backStage")
      .doc("notifications")
      .update({
        message: message.value === "" ? data.message : message.value,
        time: timer.value === "" ? data.timer : parseInt(timer.value),
      })
      .then(() => {
        getData().then((res) => {
          data = res;
          getAudiLink().then((result) => {
            data = { ...data, link: result.AudiData.link };
          });
          updated.style.display = "block";
          console.log(data);
          document.getElementById("update").disabled = false;
        });
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("update").disabled = false;
        error.style.display = "block";
      });
  } else {
    console.log("cant");
  }
});
show.addEventListener("change", () => {
  if (!show.checked) {
    show.disabled = true;
    app
      .firestore()
      .collection("backStage")
      .doc("notifications")
      .update({ show: false })
      .then(() => {
        console.log("done");
        show.disabled = false;
      })
      .catch(() => {
        show.disabled = false;
      });
  } else {
    show.disabled = true;
    app
      .firestore()
      .collection("backStage")
      .doc("notifications")
      .update({ show: true })
      .then(() => {
        console.log("done");
        show.disabled = false;
      })
      .catch(() => {
        show.disabled = false;
      });
  }
});
document.getElementById("updateLink").addEventListener("mouseup", () => {
  document.getElementById("updateLink").disabled = true;
  app
    .firestore()
    .collection("backStage")
    .doc("staticData")
    .update({
      AudiData: {
        link: link.value === "" ? data.link : link.value,
        testlink: link.value === "" ? data.link : link.value,
      },
    })
    .then(() => {
      getData().then((res) => {
        data = res;
        getAudiLink().then((result) => {
          data = { ...data, link: result.AudiData.link };
          console.log(data);
          document.getElementById("updateLink").disabled = false;
          updatedlink.style.display = "block";
        });
      });
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("updateLink").disabled = false;
      linkerror.style.display = "block";
    });
});
