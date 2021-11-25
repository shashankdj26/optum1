// const video = document.querySelector('.player');
// const canvas = document.querySelector('.photo');
let imageUrl = "";
let imageUploadState = false;
function isMobile() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isAndroid || isiOS;
}

const video = document.querySelector(".player");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");
video.setAttribute("playsinline", "");

var interval = null;
const canvas = document.querySelector(".photo");

const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
const mobile = isMobile();
//const alphaNumber = document.querySelector('.alphaContainer input');
var ratio = window.devicePixelRatio || 1;
var Pause;
var frame = new Image();
// uncomment if want frame image
frame.src = "./img/1920x1080.png";
let midPanel = document.getElementById("body");
var Retake = document.getElementById("Retake");
Retake.style.display = "none";
var Save = document.getElementById("Save");
Save.style.display = "none";
var ShareOption = document.getElementById("share-options");
ShareOption.style.display = "none";
var Share = document.getElementById("Share");
Share.style.display = "none";
var Capture = document.getElementById("Capture");
Capture.style.display = "block";
var eid = "cipla-inspire-2020";
var counter = 0;
var current = 4;
//add constraints object
var constraints = {
  audio: true,
  video: true,
};

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
const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

var name = "cipla";
var userAvailable = false;
var myuser = null;
//----------check----------------//
auth.onAuthStateChanged(function (user) {
  if (user) {
    myuser = user;
    name = user.displayName;
    userAvailable = true;
    console.log(user.displayName + " Signed In");
    // current = randomNumber(1, 5);
    // frame.src = "./img/" + current + ".png";
    getVideo();

    // firebase.firestore().collection('mastercontrol').doc(day).get()
    //   .then(function(doc){
    //     if (doc.exists) {
    //         console.log("Document data exists!");
    //         if(doc.data().currentState!=whereAmI){
    //               window.location.href = "/"+doc.data().currentState+"/index.html";
    //         }
    //       }
    //     }).catch(function(error){
    //       console.log(error);
    // });
  } else {
    userAvailable = false;
    window.alert("No user is logged in");
    console.log("No user is logged in");
  }
});
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function viewImg1(link) {
  if (window.parent) window.parent.viewImg(link);
}
function openIframe() {
  var og = document.getElementById("pgBtn");
  og.onclick = () => closeIframe();
  if (window.parent.toggleCloseMediaModal) {
    window.parent.toggleCloseMediaModal(false);
  }
  if (window.parent.reduceZindex) {
    window.parent.reduceZindex(0);
  }
  og.classList.add("pgBtnOpen");

  var iframe = document.getElementById("photogallery");
  iframe.classList.add("openIframe");
}

function closeIframe() {
  var og = document.getElementById("pgBtn");
  og.onclick = () => openIframe();
  if (window.parent.reduceZindex) {
    window.parent.reduceZindex(3);
  }
  if (window.parent.toggleCloseMediaModal) {
    window.parent.toggleCloseMediaModal(true);
  }
  og.classList.remove("pgBtnOpen");

  var iframe = document.getElementById("photogallery");
  iframe.classList.remove("openIframe");
}
document.getElementById("facebookShare").addEventListener("click", (e) => {
  // window.open(
  //   "http://www.facebook.com/sharer.php?u=" +
  //     encodeURIComponent(u) +
  //     "&t=" +
  //     encodeURIComponent(t),
  //   "sharer",
  //   "toolbar=0,status=0,width=626,height=436"
  // );
  if (imageUploadState) {
    e.target.setAttribute(
      "href",
      "http://www.facebook.com/sharer.php?display=popup&u=" +
        encodeURIComponent(imageUrl)
    );
    e.target.click();
  } else {
    document
      .querySelector("body > div > div.photo-frame-area > canvas")
      .toBlob(function (blob) {
        UploadImage(blob, true, (link) => {
          e.target.setAttribute(
            "href",
            "http://www.facebook.com/sharer.php?display=popup&u=" +
              encodeURIComponent(link)
          );
          e.target.click();
        });
      });
  }
});
document.getElementById("linkedInShare").addEventListener("click", (e) => {
  if (imageUploadState) {
    e.target.setAttribute(
      "href",
      `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        imageUrl
      )}`
    );
    e.target.click();
  } else {
    document
      .querySelector("body > div > div.photo-frame-area > canvas")
      .toBlob(function (blob) {
        UploadImage(blob, true, (link) => {
          e.target.setAttribute(
            "href",
            `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
              link
            )}`
          );
          e.target.click();
        });
      });
  }
});
document.getElementById("emailShare").addEventListener("click", (e) => {
  if (imageUploadState) {
    e.target.setAttribute(
      "href",
      `mailto:?Subject=Subject!&Body=Image description! ${encodeURIComponent(
        imageUrl
      )}`
    );
    e.target.click();
  } else {
    document
      .querySelector("body > div > div.photo-frame-area > canvas")
      .toBlob(function (blob) {
        UploadImage(blob, true, (link) => {
          e.target.setAttribute(
            "href",
            `mailto:?Subject=Subject!&Body=Image description! ${encodeURIComponent(
              link
            )}`
          );
          e.target.click();
        });
      });
  }
});
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "user",
        // Only setting the video to a specified size in order to accommodate a
        // point cloud, so on mobile devices accept the default size.
        width: mobile ? undefined : VIDEO_WIDTH,
        height: mobile ? undefined : VIDEO_HEIGHT,

        //  width: mobile ? VIDEO_WIDTH : VIDEO_WIDTH,
        //  height: mobile ? VIDEO_HEIGHT : VIDEO_HEIGHT
        // width: mobile ? screen.width*ratio :VIDEO_WIDTH,
        // height: mobile ? screen.height*ratio :VIDEO_HEIGHT
        // width: mobile ? midPanel.width : VIDEO_WIDTH,
        // height: mobile ? midPanel.height : VIDEO_HEIGHT
      },
      audio: false,
    })
    .then((localMediaStream) => {
      console.log(localMediaStream);

      //  DEPRECIATION :
      //       The following has been depreceated by major browsers as of Chrome and Firefox.
      //       video.src = window.URL.createObjectURL(localMediaStream);
      //       Please refer to these:
      //       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      if ("srcObject" in video) {
        try {
          video.srcObject = localMediaStream;
        } catch (err) {
          if (err.name != "TypeError") {
            throw err;
          }
          // Even if they do, they may only support MediaStream
          video.src = URL.createObjectURL(localMediaStream);
        }
      } else {
        // Avoid using this in new browsers, as it is going away.
        video.src = URL.createObjectURL(localMediaStream);
      }
      video.addEventListener("loadedmetadata", () =>
        paintToCanvas("loadMetaData")
      );
      video.load();
      // video.srcObject = localMediaStream;
      video.play();
      fadeThisIn("#buttons");
      // if(mobile)
      // {
      //   frame.src="img/FrameP.png";
      // }
      // else{
      //   frame.src="img/frame.png";
      // }
    })
    .catch((err) => {
      window.alert(
        "Please check for your browser camera permissions, then reopen the photobooth or refresh your page."
      );
      console.error(`OH NO!!!`, err);
    });

  //  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  //         video.srcObject = stream;
  //         video.play();
  //     });
  //   }
}

$(window).resize(function () {
  //getVideo();
  //this.location.reload();
  //resizeFunc();
  this.console.log("Resize");
});

window.addEventListener("orientationchange", function () {
  this.location.reload();
});

function paintToCanvas() {
  if (!userAvailable) return;
  const width = video.videoWidth;
  const height = video.videoHeight;
  var webCam_Width = width;
  var webCam_Height = height;

  console.log(width + "X" + height);
  // alert(width + "X" + height);
  let w = 0,
    h = 0;

  if (width > height) {
    console.log("PC");
  } else if (width < height) {
    console.log("Mobile");
  } else {
    console.log("Other");
  }

  let reObj = calculateAspectRatioFit(width, height, 731, 472);
  console.log(reObj);
  // canvas.width = w;
  // canvas.height = h;

  canvas.width = 1920;
  canvas.height = 1080;

  console.log(canvas.width);
  return (interval = setInterval(() => {
    if (!Pause) {
      //console.log("This is working");
      ctx.scale(-1, 1);
      // let findExtaW = (43 - reObj.width) / 2;
      // let findExtaH = (472 - reObj.height) / 2;
      // ctx.fillRect(0, 0, 1920, 1080);
      // var aspectRatio = webCam_Width / webCam_Height;
      // var camPosX = 0;
      // var camPosY = 0;
      // if (aspectRatio > 1) {
      //   w = 1920;
      //   h = w / aspectRatio;
      //   camPosY = 1080 / 2 - h / 2;
      // } else {
      //   h = 1080;
      //   w = h * aspectRatio;
      //   camPosX = 1920 / 2 - w / 2;
      // }
      // // context.drawImage(video, pos_x, pos_y, w/2, h/2);
      // ctx.drawImage(video, -350, 110, 1593, 900);
      ctx.drawImage(frame, 0, 0, frame.width, frame.height);

      // ctx.fillRect(569, 256, 732, 473);

      // ctx.beginPath();
      // ctx.arc(500, 500, 250, 0, 2 * Math.PI);
      // ctx.stroke();
      // ctx.drawImage(video, 350 + findExtaW, 147 + findExtaH, reObj.width*1.2, reObj.height*1.2);
      // 515 285
      var pos_x = 155;
      var pos_y = 112;
      radius = 430;
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos_x + radius, pos_y + radius, radius, 0, Math.PI * 2, true);
      // ctx.stroke();
      ctx.clip();
      let canvasRatio = 1;
      let imageRatio = video.videoWidth / video.videoHeight;
      let targetWidth = 0;
      let targetHeight = 0;

      if (imageRatio > canvasRatio) {
        targetHeight = radius * 2;
        targetWidth = radius * 2 * imageRatio;
      } else {
        targetWidth = radius * 2;
        targetHeight = (radius * 2) / imageRatio;
      }
      ctx.drawImage(
        video,
        pos_x + radius - targetWidth / 2 + -125,
        pos_y + radius - targetHeight / 2,
        targetWidth,
        targetHeight
      );
      ctx.closePath();
      ctx.restore();
    }
  }, 16));
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return {
    width: srcWidth * ratio,
    height: srcHeight * ratio,
  };
}

var working = false;
function arrowLeft() {
  if (working) return;
  working = true;

  current--;

  if (current < 1) current = 4;

  var blackflash = document.getElementById("blackFlash");
  if (blackflash) blackflash.style.display = "block";
  frame.src = "./img/" + current + ".png";
  setTimeout(() => {
    blackflash.classList.add("blacked");
    setTimeout(() => {
      working = false;
      blackflash.classList.remove("blacked");
      blackflash.style.display = "none";
    }, 600);
  }, 200);
}
function arrowRight() {
  if (working) return;
  working = true;

  current++;

  if (current > 4) current = 1;

  var blackflash = document.getElementById("blackFlash");
  if (blackflash) blackflash.style.display = "block";
  frame.src = "./img/" + current + ".png";
  setTimeout(() => {
    blackflash.classList.add("blacked");
    setTimeout(() => {
      working = false;
      if (blackflash) {
        blackflash.classList.remove("blacked");
        blackflash.style.display = "none";
      }
    }, 600);
  }, 200);
}

function addImageToCollection(link, fromShare, callback) {
  var id = generatePushID();
  firestore
    .collection("photobooth")
    .doc(id)
    .set({
      id,
      link,
      userName: myuser.displayName,
      userId: myuser.uid,
      userEmail: myuser.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document successfully written!");
      if (fromShare && callback) {
        callback(link);
      } else {
        saveAs(blob_store, "img.png");
      }
      fadeThisIn("#buttons");
      // location.reload();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function resetit() {
  Pause = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(interval);
  video.removeEventListener("canplay", paintToCanvas);
  video = null;
  if (videoStream != null) {
    videoStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}

function takePhoto() {
  if (!userAvailable) return;
  var flash = document.getElementById("flash");
  if (flash) flash.style.display = "block";
  setTimeout(() => {
    if (flash) flash.style.background = "rgb(255, 255, 255,0)";
  }, 200);
  // played the sound
  snap.currentTime = 0;
  snap.play();
  console.log("This is Working");
  Capture.style.display = "none";
  Save.style.display = "block";
  Retake.style.display = "block";
  Share.style.display = "block";
  Pause = true;
  // take the data out of the canvas
  // const data = canvas.toDataURL('image/jpeg');
  // const link = document.createElement('a');
  // link.href = data;
  // link.setAttribute('download','awesome');
  // link.innerHTML = `<img src="${data}" alt="Awesome photo" />`;
  // strip.insertBefore(link, strip.firstChild);
  // var img    = canvas.toDataURL("image/png");
  // document.write('<img src="'+img+'"/>');
}

function limit() {
  if (counter < 3) {
    document.getElementById("a").innerHTML += " ";
    console.log(counter);
    counter++;
  } else {
    console.log(counter);
    document.getElementById("id").disabled = true;
  }
}

function UploadImage(file, fromShare, callback) {
  var date = new Date();
  var timestamp = date.getTime();

  var storageRef = storage.ref(
    "phootobooth/" + name + "_" + timestamp + ".jpeg"
  );

  var task = storageRef.put(file);

  task.on(
    "state_changed",
    function progress(snapshot) {},
    function error(er) {
      console.log(er.code);
      location.reload();
    },
    function complete() {
      console.log("complete");
      task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        imageUploadState = true;
        imageUrl = downloadURL;
        if (callback && fromShare) {
          addImageToCollection(downloadURL, fromShare, callback);
        } else {
          addImageToCollection(downloadURL);
        }
      });
    }
  );
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: contentType,
  });
  return blob;
}

// getVideo();

var blob_store = null;
video.addEventListener("canplay", paintToCanvas);
$("#Save").click(function () {
  canvas.toBlob(function (blob) {
    fadeThisOut("#buttons");
    UploadImage(blob);
    blob_store = blob;
  });
});
$("#Share").click(function () {
  ShareOption.style.display = "block";
  if (window.parent.toggleCloseMediaModal) {
    window.parent.toggleCloseMediaModal(false);
  }
});
$("#closeSharePopUp").click(function () {
  ShareOption.style.display = "none";
  if (window.parent.toggleCloseMediaModal) {
    window.parent.toggleCloseMediaModal(true);
  }
});
var immaout = false;
$("#Retake").click(function () {
  if (!immaout) {
    immaout = true;
    fadeThisOut("#buttons");
    setTimeout(function () {
      window.location.href = window.location.href;
    }, 750);
  }
});
//////////////////////////////////////
// FileSaver scripts
//////////////////////////////////////

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2014-08-29
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs =
  saveAs ||
  // IE 10+ (native saveAs)
  (typeof navigator !== "undefined" &&
    navigator.msSaveOrOpenBlob &&
    navigator.msSaveOrOpenBlob.bind(navigator)) ||
  // Everyone else
  (function (view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (
      typeof navigator !== "undefined" &&
      /MSIE [1-9]\./.test(navigator.userAgent)
    ) {
      return;
    }
    var doc = view.document,
      // only get URL when necessary in case Blob.js hasn't overridden it yet
      get_URL = function () {
        return view.URL || view.webkitURL || view;
      },
      save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      can_use_save_link = "download" in save_link,
      click = function (node) {
        var event = doc.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          view,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        node.dispatchEvent(event);
      },
      webkit_req_fs = view.webkitRequestFileSystem,
      req_fs =
        view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
      throw_outside = function (ex) {
        (view.setImmediate || view.setTimeout)(function () {
          throw ex;
        }, 0);
      },
      force_saveable_type = "application/octet-stream",
      fs_min_size = 0,
      // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 for
      // the reasoning behind the timeout and revocation flow
      arbitrary_revoke_timeout = 10,
      revoke = function (file) {
        var revoker = function () {
          if (typeof file === "string") {
            // file is an object URL
            get_URL().revokeObjectURL(file);
          } else {
            // file is a File
            file.remove();
          }
        };
        if (view.chrome) {
          revoker();
        } else {
          setTimeout(revoker, arbitrary_revoke_timeout);
        }
      },
      dispatch = function (filesaver, event_types, event) {
        event_types = [].concat(event_types);
        var i = event_types.length;
        while (i--) {
          var listener = filesaver["on" + event_types[i]];
          if (typeof listener === "function") {
            try {
              listener.call(filesaver, event || filesaver);
            } catch (ex) {
              throw_outside(ex);
            }
          }
        }
      },
      FileSaver = function (blob, name) {
        // First try a.download, then web filesystem, then object URLs
        var filesaver = this,
          type = blob.type,
          blob_changed = false,
          object_url,
          target_view,
          dispatch_all = function () {
            dispatch(
              filesaver,
              "writestart progress write writeend".split(" ")
            );
          },
          // on any filesys errors revert to saving with object URLs
          fs_error = function () {
            // don't create more object URLs than needed
            if (blob_changed || !object_url) {
              object_url = get_URL().createObjectURL(blob);
            }
            if (target_view) {
              target_view.location.href = object_url;
            } else {
              var new_tab = view.open(object_url, "_blank");
              if (new_tab == undefined && typeof safari !== "undefined") {
                //Apple do not allow window.open, see http://bit.ly/1kZffRI
                view.location.href = object_url;
              }
            }
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
            revoke(object_url);
          },
          abortable = function (func) {
            return function () {
              if (filesaver.readyState !== filesaver.DONE) {
                return func.apply(this, arguments);
              }
            };
          },
          create_if_not_found = {
            create: true,
            exclusive: false,
          },
          slice;
        filesaver.readyState = filesaver.INIT;
        if (!name) {
          name = "download";
        }
        if (can_use_save_link) {
          object_url = get_URL().createObjectURL(blob);
          save_link.href = object_url;
          save_link.download = name;
          click(save_link);
          filesaver.readyState = filesaver.DONE;
          dispatch_all();
          revoke(object_url);
          return;
        }
        // Object and web filesystem URLs have a problem saving in Google Chrome when
        // viewed in a tab, so I force save with application/octet-stream
        // http://code.google.com/p/chromium/issues/detail?id=91158
        // Update: Google errantly closed 91158, I submitted it again:
        // https://code.google.com/p/chromium/issues/detail?id=389642
        if (view.chrome && type && type !== force_saveable_type) {
          slice = blob.slice || blob.webkitSlice;
          blob = slice.call(blob, 0, blob.size, force_saveable_type);
          blob_changed = true;
        }
        // Since I can't be sure that the guessed media type will trigger a download
        // in WebKit, I append .download to the filename.
        // https://bugs.webkit.org/show_bug.cgi?id=65440
        if (webkit_req_fs && name !== "download") {
          name += ".download";
        }
        if (type === force_saveable_type || webkit_req_fs) {
          target_view = view;
        }
        if (!req_fs) {
          fs_error();
          return;
        }
        fs_min_size += blob.size;
        req_fs(
          view.TEMPORARY,
          fs_min_size,
          abortable(function (fs) {
            fs.root.getDirectory(
              "saved",
              create_if_not_found,
              abortable(function (dir) {
                var save = function () {
                  dir.getFile(
                    name,
                    create_if_not_found,
                    abortable(function (file) {
                      file.createWriter(
                        abortable(function (writer) {
                          writer.onwriteend = function (event) {
                            target_view.location.href = file.toURL();
                            filesaver.readyState = filesaver.DONE;
                            dispatch(filesaver, "writeend", event);
                            revoke(file);
                          };
                          writer.onerror = function () {
                            var error = writer.error;
                            if (error.code !== error.ABORT_ERR) {
                              fs_error();
                            }
                          };
                          "writestart progress write abort"
                            .split(" ")
                            .forEach(function (event) {
                              writer["on" + event] = filesaver["on" + event];
                            });
                          writer.write(blob);
                          filesaver.abort = function () {
                            writer.abort();
                            filesaver.readyState = filesaver.DONE;
                          };
                          filesaver.readyState = filesaver.WRITING;
                        }),
                        fs_error
                      );
                    }),
                    fs_error
                  );
                };
                dir.getFile(
                  name,
                  {
                    create: false,
                  },
                  abortable(function (file) {
                    // delete file if it already exists
                    file.remove();
                    save();
                  }),
                  abortable(function (ex) {
                    if (ex.code === ex.NOT_FOUND_ERR) {
                      save();
                    } else {
                      fs_error();
                    }
                  })
                );
              }),
              fs_error
            );
          }),
          fs_error
        );
      },
      FS_proto = FileSaver.prototype,
      saveAs = function (blob, name) {
        return new FileSaver(blob, name);
      };
    FS_proto.abort = function () {
      var filesaver = this;
      filesaver.readyState = filesaver.DONE;
      dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
      FS_proto.onwritestart =
      FS_proto.onprogress =
      FS_proto.onwrite =
      FS_proto.onabort =
      FS_proto.onerror =
      FS_proto.onwriteend =
        null;

    return saveAs;
  })(
    (typeof self !== "undefined" && self) ||
      (typeof window !== "undefined" && window) ||
      this.content
  );
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if (
  typeof define !== "undefined" &&
  define !== null &&
  define.amd != null
) {
  define([], function () {
    return saveAs;
  });
}

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2013-12-27
 *
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
              plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function (view) {
  "use strict";
  var Uint8Array = view.Uint8Array,
    HTMLCanvasElement = view.HTMLCanvasElement,
    canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
    is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
    to_data_url = "toDataURL",
    base64_ranks,
    decode_base64 = function (base64) {
      var len = base64.length,
        buffer = new Uint8Array(((len / 4) * 3) | 0),
        i = 0,
        outptr = 0,
        last = [0, 0],
        state = 0,
        save = 0,
        rank,
        code,
        undef;
      while (len--) {
        code = base64.charCodeAt(i++);
        rank = base64_ranks[code - 43];
        if (rank !== 255 && rank !== undef) {
          last[1] = last[0];
          last[0] = code;
          save = (save << 6) | rank;
          state++;
          if (state === 4) {
            buffer[outptr++] = save >>> 16;
            if (last[1] !== 61 /* padding character */) {
              buffer[outptr++] = save >>> 8;
            }
            if (last[0] !== 61 /* padding character */) {
              buffer[outptr++] = save;
            }
            state = 0;
          }
        }
      }
      // 2/3 chance there's going to be some null bytes at the end, but that
      // doesn't really matter with most image formats.
      // If it somehow matters for you, truncate the buffer up outptr.
      return buffer;
    };
  if (Uint8Array) {
    base64_ranks = new Uint8Array([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0,
      -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51,
    ]);
  }
  if (HTMLCanvasElement && !canvas_proto.toBlob) {
    canvas_proto.toBlob = function (callback, type /*, ..args*/) {
      if (!type) {
        type = "image/png";
      }
      if (this.mozGetAsFile) {
        callback(this.mozGetAsFile("canvas", type));
        return;
      }
      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
        callback(this.msToBlob());
        return;
      }

      var args = Array.prototype.slice.call(arguments, 1),
        dataURI = this[to_data_url].apply(this, args),
        header_end = dataURI.indexOf(","),
        data = dataURI.substring(header_end + 1),
        is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
        blob;
      if (Blob.fake) {
        // no reason to decode a data: URI that's just going to become a data URI again
        blob = new Blob();
        if (is_base64) {
          blob.encoding = "base64";
        } else {
          blob.encoding = "URI";
        }
        blob.data = data;
        blob.size = data.length;
      } else if (Uint8Array) {
        if (is_base64) {
          blob = new Blob([decode_base64(data)], {
            type: type,
          });
        } else {
          blob = new Blob([decodeURIComponent(data)], {
            type: type,
          });
        }
      }
      callback(blob);
    };

    if (canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = "toDataURLHD";
        var blob = this.toBlob();
        to_data_url = "toDataURL";
        return blob;
      };
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob;
    }
  }
})(
  (typeof self !== "undefined" && self) ||
    (typeof window !== "undefined" && window) ||
    this.content ||
    this
);

$(document).ready(function () {});

$(function () {
  fadeThisIn = function (name) {
    $(name).fadeIn();
  };
  fadeThisOut = function (name) {
    $(name).fadeOut();
  };
  fadeToggle = function (name) {
    $(name).fadeToggle();
  };
  removeDiv = function (name) {
    $(name).remove();
  };
});

const generatePushID = (function () {
  // Modeled after base64 web-safe chars, but ordered by ASCII.

  var PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.

  var lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the

  // timestamp to prevent collisions with other clients. We store the last characters we

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
