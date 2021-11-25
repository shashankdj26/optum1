(this["webpackJsonpmy-app2"] = this["webpackJsonpmy-app2"] || []).push([
  [0],
  {
    19: function (e, t, a) {
      e.exports = a(34);
    },
    25: function (e, t, a) {},
    34: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        l = a.n(n),
        i = a(9),
        s = a.n(i),
        o = a(7),
        r = a.n(o),
        c = a(15),
        m = a(4),
        u = a(10),
        d = a(12),
        h = a(11),
        f = (a(25), a(1)),
        g = a.n(f);
      a(26), a(28), a(35), a(31);
      g.a.initializeApp({
        apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
        authDomain: "optum-cdcd7.firebaseapp.com",
        databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
        projectId: "optum-cdcd7",
        storageBucket: "optum-cdcd7.appspot.com",
        messagingSenderId: "33244416026",
        appId: "1:33244416026:web:cd039c460016444059a9a3",
        measurementId: "G-ZR8NLSNB91",
      });
      var v = g.a.auth(),
        p = g.a.firestore(),
        A = (g.a.storage(), g.a.database()),
        E = (g.a.database, a(6)),
        y = a(16),
        N = a.n(y),
        S = {
          USERS_DOC: "usersTable",
          DEFAULT_AVATAR:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          ADMIN_DOC: "Admin",
          ADMIN_TABLE: "chatAdmin",
          STALLID: "Helpdesk",
          STALL_ONLINE: "/user_status_stall_chat/",
          DEFULT_MESSAGE: "Hello, how can I help you today?",
        },
        L = [
          "\ud83d\ude04",
          "\ud83d\ude03",
          "\ud83d\ude00",
          "\ud83d\ude0a",
          "\ud83d\ude09",
          "\ud83d\ude0d",
          "\ud83d\ude18",
          "\ud83d\ude1a",
          "\ud83d\ude17",
          "\ud83d\ude19",
          "\ud83d\ude1c",
          "\ud83d\ude1d",
          "\ud83d\ude1b",
          "\ud83d\ude33",
          "\ud83d\ude01",
          "\ud83d\ude14",
          "\ud83d\ude0c",
          "\ud83d\ude12",
          "\ud83d\ude1e",
          "\ud83d\ude23",
          "\ud83d\ude22",
          "\ud83d\ude02",
          "\ud83d\ude2d",
          "\ud83d\ude2a",
          "\ud83d\ude25",
          "\ud83d\ude30",
          "\ud83d\ude05",
          "\ud83d\ude13",
          "\ud83d\ude29",
          "\ud83d\ude2b",
          "\ud83d\ude28",
          "\ud83d\ude31",
          "\ud83d\ude20",
          "\ud83d\ude21",
          "\ud83d\ude24",
          "\ud83d\ude16",
          "\ud83d\ude06",
          "\ud83d\ude0b",
          "\ud83d\ude37",
          "\ud83d\ude0e",
          "\ud83d\ude34",
          "\ud83d\ude35",
          "\ud83d\ude32",
          "\ud83d\ude1f",
          "\ud83d\ude26",
          "\ud83d\ude27",
          "\ud83d\udc7f",
          "\ud83d\ude2e",
          "\ud83d\ude2c",
          "\ud83d\ude10",
          "\ud83d\ude15",
          "\ud83d\ude2f",
          "\ud83d\ude0f",
          "\ud83d\ude11",
          "\ud83d\udc72",
          "\ud83d\udc73",
          "\ud83d\udc6e",
          "\ud83d\udc77",
          "\ud83d\udc82",
          "\ud83d\udc76",
          "\ud83d\udc66",
          "\ud83d\udc67",
          "\ud83d\udc68",
          "\ud83d\udc69",
          "\ud83d\udc74",
          "\ud83d\udc75",
          "\ud83d\udc71",
          "\ud83d\udc7c",
          "\ud83d\udc78",
          "\ud83d\ude3a",
          "\ud83d\ude38",
          "\ud83d\ude3b",
          "\ud83d\ude3d",
          "\ud83d\ude3c",
          "\ud83d\ude40",
          "\ud83d\ude3f",
          "\ud83d\ude39",
          "\ud83d\ude3e",
          "\ud83d\udc79",
          "\ud83d\udc7a",
          "\ud83d\ude48",
          "\ud83d\ude49",
          "\ud83d\ude4a",
          "\ud83d\udc80",
          "\ud83d\udc7d",
          "\ud83d\udca9",
          "\ud83d\udd25",
          "\u2728",
          "\ud83c\udf1f",
          "\ud83d\udcab",
          "\ud83d\udca5",
          "\ud83d\udca2",
          "\ud83d\udca6",
          "\ud83d\udca7",
          "\ud83d\udca4",
          "\ud83d\udca8",
          "\ud83d\udc42",
          "\ud83d\udc40",
          "\ud83d\udc43",
          "\ud83d\udc45",
          "\ud83d\udc44",
          "\ud83d\udc4d",
          "\ud83d\udc4e",
          "\ud83d\udc4c",
          "\ud83d\udc4a",
          "\u270a",
          "\ud83d\udc4b",
          "\u270b",
          "\ud83d\udc50",
          "\ud83d\udc46",
          "\ud83d\udc47",
          "\ud83d\udc49",
          "\ud83d\udc48",
          "\ud83d\ude4c",
          "\ud83d\ude4f",
          "\ud83d\udc4f",
          "\ud83d\udcaa",
          "\ud83d\udeb6",
          "\ud83c\udfc3",
          "\ud83d\udc83",
          "\ud83d\udc6b",
          "\ud83d\udc6a",
          "\ud83d\udc8f",
          "\ud83d\udc91",
          "\ud83d\udc6f",
          "\ud83d\ude46",
          "\ud83d\ude45",
          "\ud83d\udc81",
          "\ud83d\ude4b",
          "\ud83d\udc86",
          "\ud83d\udc87",
          "\ud83d\udc85",
          "\ud83d\udc70",
          "\ud83d\ude4e",
          "\ud83d\ude4d",
          "\ud83d\ude47",
          "\ud83c\udfa9",
          "\ud83d\udc51",
          "\ud83d\udc52",
          "\ud83d\udc5f",
          "\ud83d\udc5e",
          "\ud83d\udc61",
          "\ud83d\udc60",
          "\ud83d\udc62",
          "\ud83d\udc55",
          "\ud83d\udc54",
          "\ud83d\udc5a",
          "\ud83d\udc57",
          "\ud83c\udfbd",
          "\ud83d\udc56",
          "\ud83d\udc58",
          "\ud83d\udc59",
          "\ud83d\udcbc",
          "\ud83d\udc5c",
          "\ud83d\udc5d",
          "\ud83d\udc5b",
          "\ud83d\udc53",
          "\ud83c\udf80",
          "\ud83c\udf02",
          "\ud83d\udc84",
          "\ud83d\udc9b",
          "\ud83d\udc99",
          "\ud83d\udc9c",
          "\ud83d\udc9a",
          "\ud83d\udc94",
          "\ud83d\udc97",
          "\ud83d\udc93",
          "\ud83d\udc95",
          "\ud83d\udc96",
          "\ud83d\udc9e",
          "\ud83d\udc98",
          "\ud83d\udc8c",
          "\ud83d\udc8b",
          "\ud83d\udc8d",
          "\ud83d\udc8e",
          "\ud83d\udc64",
          "\ud83d\udcac",
          "\ud83d\udc63",
        ],
        b = (function (e) {
          Object(d.a)(a, e);
          var t = Object(h.a)(a);
          function a(e) {
            var n;
            return (
              Object(m.a)(this, a),
              ((n = t.call(this, e)).chatWithStallManager = function (e) {
                for (
                  var t = n.state.allStallAdmin.AdminList.length, a = 0;
                  t;
                  a++
                )
                  if (n.state.allStallAdmin.AdminList[a].stallName == e) {
                    n.setState({
                      stallExternalName: n.state.allStallAdmin.AdminList[a]
                        .externalName
                        ? n.state.allStallAdmin.AdminList[a].externalName
                        : n.state.allStallAdmin.AdminList[a].stallName,
                    }),
                      n.setState({
                        stallName: n.state.allStallAdmin.AdminList[a].stallName,
                      }),
                      n.singleChat(n.state.allStallAdmin.AdminList[a].adminUID);
                    break;
                  }
              }),
              (n.singleChat = function (e) {
                n.getUserAvatarImageByID(n.state.uid, 0),
                  n.getUserAvatarImageByID(e, 1),
                  n.setState({ messages: [] });
                var t = n.state.uid + "+" + e,
                  a = e + "+" + n.state.uid;
                n.setState({ dbName: t }), n.setState({ stallUserID: e });
                var l = [];
                A.ref()
                  .child(n.state.stallName)
                  .child(t)
                  .on("child_added", function (e) {
                    e.val() &&
                      (l.push({
                        uid: e.val().uid,
                        time: e.val().time,
                        name: e.val().name,
                        msg: e.val().text,
                      }),
                      n.setState({ messages: l })),
                      console.log(l.length);
                  });
                var i = [];
                A.ref()
                  .child(n.state.stallName)
                  .child(a)
                  .on("child_added", function (e) {
                    e.val() &&
                      (l.push({
                        uid: e.val().uid,
                        time: e.val().time,
                        name: e.val().name,
                        msg: e.val().text,
                      }),
                      i.push(e.val().uid),
                      n.setState({ messages: l }));
                  }),
                  A.ref()
                    .child(n.state.stallName)
                    .child(a)
                    .once("value", function (t) {
                      t.exists()
                        ? console.log("found")
                        : A.ref().child(n.state.stallName).child(a).push().set({
                            uid: e,
                            time: Date.now(),
                            name: n.state.stallName,
                            text: S.DEFULT_MESSAGE,
                          });
                    });
              }),
              (n.sortArrayElements = function (e) {
                for (var t = 0; t < e.length; t++)
                  for (var a = t + 1; a < e.length; a++)
                    if (e[t].time > e[a].time) {
                      var n = e[t];
                      (e[t] = e[a]), (e[a] = n);
                    }
                return e;
              }),
              (n.getUserAvatarImageByID = function (e, t) {
                var a = A.ref("usersTable"),
                  l = S.DEFAULT_AVATAR,
                  i = Object(E.a)(n);
                a.on("value", function (a) {
                  a.forEach(function (a) {
                    e === a.key &&
                      ((l = a.val().profile_picture),
                      0 === t
                        ? i.setState({ userAvatar: l })
                        : i.setState({ stallManagerAvatar: l }));
                  });
                }),
                  0 === t
                    ? i.setState({ userAvatar: l })
                    : n.setState({ stallManagerAvatar: l });
              }),
              (n.pushMsg = function (e) {
                e.preventDefault();
                var t = n.state.uid,
                  a = n.state.name,
                  l = n.state.text,
                  i = n.state.dbName;
                if ("" !== l.trim()) {
                  if ("chatRoom" !== i) {
                    var s = i.split("+"),
                      o = A.ref("notification").child(t).child(s[1]),
                      r = A.ref().child("notification").child(s[1]);
                    r.child(t).once("value", function (e) {
                      e.val()
                        ? r.child(t).set({ count: e.val().count + 1 })
                        : r.child(t).set({ count: 1 });
                    }),
                      o.set({ count: 0 });
                  }
                  A.ref()
                    .child(n.state.stallName)
                    .child(i)
                    .push()
                    .set({ uid: t, time: Date.now(), name: a, text: l }),
                    n.setState({ text: "" });
                }
              }),
              (n.scrollToBottom = function () {
                var e = s.a.findDOMNode(n.messagesContainer);
                e.scroll(0, e.scrollHeight);
              }),
              (n.openEmoji = function () {
                var e = document.querySelector(".emoji");
                "block" === e.style.display
                  ? (e.style.display = "none")
                  : (e.style.display = "block");
              }),
              (n.openEmojiClose = function () {
                var e = document.querySelector(".emoji");
                "block" === e.style.display && (e.style.display = "none");
              }),
              (n.pickEmoji = function (e) {
                var t = n.state.text;
                n.setState({ text: t + e });
              }),
              (n.srotingMessageFromTime = function (e, t) {
                return e.time > t.time;
              }),
              (n.signout = function () {
                localStorage.setItem("loginKey", []), n.props.isLogout();
              }),
              (n.state = {
                uid: null,
                name: null,
                messages: [],
                text: "",
                emoji: L,
                stallID: "",
                allStallAdmin: [],
                stallManagerAvatar: S.DEFAULT_AVATAR,
                userAvatar: S.DEFAULT_AVATAR,
                stallName: "",
                stallExternalName: "",
                stallUserID: "",
              }),
              (window.ReactStallManager = Object(E.a)(n)),
              n
            );
          }
          return (
            Object(u.a)(a, [
              {
                key: "componentWillMount",
                value: function () {
                  var e = this,
                    t = localStorage.getItem("loginKey");
                  if (t) {
                    var a = JSON.parse(t),
                      n = a.uid,
                      l = a.username,
                      i = a.stallID;
                    (this.state.stallID = i),
                      this.setState({ uid: n, name: l, stallID: i }),
                      localStorage.removeItem("loginKey");
                  } else
                    localStorage.removeItem("loginKey"), this.props.isLogout();
                  var s = this.state.stallID;
                  p.collection(S.ADMIN_DOC)
                    .doc(S.ADMIN_TABLE)
                    .get()
                    .then(function (t) {
                      var a = t.data();
                      e.state.allStallAdmin = a;
                      for (var n = 0; n < a.AdminList.length; n++)
                        if (a.AdminList[n].stallName == s) {
                          console.log(a.AdminList[n]),
                            e.setState({
                              stallExternalName: a.AdminList[n].externalName
                                ? a.AdminList[n].externalName
                                : a.AdminList[n].stallName,
                            }),
                            e.setState({ stallName: a.AdminList[n].stallName }),
                            e.singleChat(a.AdminList[n].adminUID);
                          break;
                        }
                    });
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.scrollToBottom();
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return l.a.createElement(
                    "div",
                    { className: "main__container" },
                    l.a.createElement(
                      "div",
                      { className: "chat_header" },
                      // l.a.createElement("img", {
                      //   src: this.state.stallManagerAvatar,
                      //   alt: "avatar",
                      //   width: "36",
                      // }),
                      l.a.createElement(
                        "div",
                        { className: "stallName" },
                        this.state.stallExternalName
                      )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "wrapper" },
                      l.a.createElement(
                        "div",
                        { className: "right__section" },
                        l.a.createElement(
                          "div",
                          {
                            className: "message__box",
                            ref: function (t) {
                              e.messagesContainer = t;
                            },
                          },
                          this.sortArrayElements(this.state.messages).map(
                            function (t, a) {
                              return t.uid === e.state.uid
                                ? l.a.createElement(
                                    "div",
                                    { className: "msg__text", key: a },
                                    l.a.createElement(
                                      "div",
                                      null,
                                      " ",
                                      l.a.createElement("img", {
                                        src: e.state.userAvatar,
                                        alt: "avatar",
                                      }),
                                      " "
                                    ),
                                    l.a.createElement(
                                      "span",
                                      null,
                                      l.a.createElement(
                                        "strong",
                                        {
                                          style: {
                                            textTransform: "capitalize",
                                            color: "#9E9E9E",
                                          },
                                        },
                                        t.name
                                      ),
                                      l.a.createElement("br", null),
                                      t.msg,
                                      l.a.createElement("br", null),
                                      l.a.createElement(
                                        "small",
                                        { style: { color: "#9E9E9E" } },
                                        N()(t.time).fromNow()
                                      )
                                    )
                                  )
                                : l.a.createElement(
                                    "div",
                                    { className: "msg__text__right", key: a },
                                    l.a.createElement(
                                      "div",
                                      null,
                                      " ",
                                      l.a.createElement("img", {
                                        src: e.state.stallManagerAvatar,
                                        alt: "avatar",
                                      }),
                                      " "
                                    ),
                                    l.a.createElement(
                                      "span",
                                      null,
                                      l.a.createElement(
                                        "strong",
                                        {
                                          style: {
                                            textTransform: "capitalize",
                                            color: "#000",
                                          },
                                        },
                                        t.name
                                      ),
                                      l.a.createElement("br", null),
                                      t.msg,
                                      l.a.createElement("br", null),
                                      l.a.createElement(
                                        "small",
                                        { style: { color: "#000" } },
                                        N()(t.time).fromNow()
                                      )
                                    )
                                  );
                            }
                          )
                        ),
                        l.a.createElement(
                          "form",
                          null,
                          l.a.createElement(
                            "div",
                            { className: "message__type__box" },
                            l.a.createElement("input", {
                              placeholder: "Type Your Message",
                              onChange: function (t) {
                                e.setState({ text: t.target.value });
                              },
                              value: this.state.text,
                              require: "true",
                              onFocus: this.openEmojiClose,
                            }),
                            l.a.createElement(
                              "span",
                              {
                                className: "emojiIcon",
                                onClick: this.openEmoji,
                              },
                              " \u263a "
                            ),
                            l.a.createElement(
                              "button",
                              { type: "submit", onClick: this.pushMsg },
                              " ",
                              l.a.createElement("i", {
                                className: "glyphicon glyphicon-send",
                              }),
                              " "
                            )
                          )
                        )
                      )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "emoji" },
                      this.state.emoji.map(function (t, a) {
                        return l.a.createElement(
                          "a",
                          {
                            key: a,
                            onClick: function () {
                              e.pickEmoji(t);
                            },
                          },
                          " ",
                          l.a.createElement("span", { role: "img" }, t),
                          " "
                        );
                      })
                    )
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        _ = (function (e) {
          Object(d.a)(a, e);
          var t = Object(h.a)(a);
          function a(e) {
            var n;
            return (
              Object(m.a)(this, a),
              ((n = t.call(this, e)).state = { user: null }),
              (n.getUserDetails = function (e) {
                return new Promise(
                  (function () {
                    var t = Object(c.a)(
                      r.a.mark(function t(a, n) {
                        var l, i, s;
                        return r.a.wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    "/users",
                                    (l = A.ref("/users")
                                      .orderByChild("email")
                                      .equalTo(e)),
                                    (t.next = 5),
                                    l.once("value")
                                  );
                                case 5:
                                  (i = t.sent).exists()
                                    ? ((s = Object.keys(i.val())[0]),
                                      a(i.val()[s]))
                                    : n({
                                        code: "NoUserFound",
                                        message: "No Such User Is Registered",
                                      }),
                                    (t.next = 13);
                                  break;
                                case 9:
                                  (t.prev = 9),
                                    (t.t0 = t.catch(0)),
                                    console.log(t.t0),
                                    n(t.t0);
                                case 13:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 9]]
                        );
                      })
                    );
                    return function (e, a) {
                      return t.apply(this, arguments);
                    };
                  })()
                );
              }),
              (n.user_ActiveStatus = function (e) {
                var t = e,
                  a = A.ref(S.STALL_ONLINE + t + "/State/"),
                  n = { StateMode: "offline" },
                  l = { StateMode: "online" };
                A.ref(".info/connected").on("value", function (e) {
                  0 != e.val() &&
                    a
                      .onDisconnect()
                      .set(n)
                      .then(function () {
                        a.set(l);
                      });
                });
              }),
              (n.addUserList = function (e) {
                var t = A.ref().child(S.USERS_DOC).child(e.uid),
                  a = "";
                (a = e.photoURL ? e.photoURL : S.DEFAULT_AVATAR),
                  e.company
                    ? t.set({
                        userName: e.displayName
                          ? e.displayName
                          : e.email.split("@")[0],
                        profile_picture: a,
                        fullName: e.displayName
                          ? e.displayName
                          : e.email.split("@")[0],
                        email: e.email,
                        company: e.company,
                      })
                    : t.set({
                        userName: e.displayName
                          ? e.displayName
                          : e.email.split("@")[0],
                        profile_picture: a,
                        fullName: e.displayName
                          ? e.displayName
                          : e.email.split("@")[0],
                        email: e.email,
                      });
              }),
              (n.isLogin = function () {
                n.setState({ isLogin: !0 });
              }),
              (n.isLogout = function () {
                n.setState({ isLogin: !1 });
              }),
              (n.loginWithGmail = function (e, t) {
                v.signInWithEmailAndPassword(e, t)
                  .then(function (e) {
                    console.log(
                      "Don't user this only for testing use this login"
                    );
                  })
                  .catch(function (e) {
                    var t = e.message;
                    console.log(t);
                  });
              }),
              (n.state = { isLogin: !1 }),
              n
            );
          }
          return (
            Object(u.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  v.onAuthStateChanged(
                    (function () {
                      var t = Object(c.a)(
                        r.a.mark(function t(a) {
                          var n, l;
                          return r.a.wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  a
                                    ? ((n =
                                        window.location.href.split("?")[1]) &&
                                        (S.STALLID = n),
                                      console.log(S),
                                      console.log(a.uid),
                                      !1,
                                      e.user_ActiveStatus(a.uid),
                                      e.setState({
                                        user: {
                                          id: a.email,
                                          name: a.displayName,
                                        },
                                      }),
                                      (l = A.ref()
                                        .child(S.USERS_DOC)
                                        .child(a.uid)).once(
                                        "value",
                                        function (t) {
                                          t.val()
                                            ? a.photoURL
                                              ? l.update({
                                                  profile_picture: a.photoURL,
                                                })
                                              : l.update({
                                                  profile_picture:
                                                    S.DEFAULT_AVATAR,
                                                })
                                            : e.addUserList(a),
                                            console.log(S),
                                            localStorage.setItem(
                                              "loginKey",
                                              JSON.stringify({
                                                uid: a.uid,
                                                username: a.displayName,
                                                stallID: S.STALLID,
                                              })
                                            ),
                                            e.isLogin(),
                                            console.log("1st This");
                                        }
                                      ))
                                    : (localStorage.removeItem("loginKey"),
                                      console.log("No user is signed in"),
                                      e.loginWithGmail(
                                        "shubham@dj.com",
                                        "shubham@dj.com123456"
                                      ));
                                case 1:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        })
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })()
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  return l.a.createElement(
                    l.a.Fragment,
                    null,
                    this.state.isLogin
                      ? l.a.createElement(b, { isLogout: this.isLogout })
                      : null
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        D = Boolean(
          "localhost" === window.location.hostname ||
            "[::1]" === window.location.hostname ||
            window.location.hostname.match(
              /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        );
      function I(e) {
        navigator.serviceWorker
          .register(e)
          .then(function (e) {
            e.onupdatefound = function () {
              var t = e.installing;
              t.onstatechange = function () {
                "installed" === t.state &&
                  (navigator.serviceWorker.controller
                    ? console.log("New content is available; please refresh.")
                    : console.log("Content is cached for offline use."));
              };
            };
          })
          .catch(function (e) {
            console.error("Error during service worker registration:", e);
          });
      }
      s.a.render(l.a.createElement(_, null), document.getElementById("root")),
        (function () {
          if ("serviceWorker" in navigator) {
            if (new URL("", window.location).origin !== window.location.origin)
              return;
            window.addEventListener("load", function () {
              var e = "".concat("", "/service-worker.js");
              D
                ? (!(function (e) {
                    fetch(e)
                      .then(function (t) {
                        404 === t.status ||
                        -1 ===
                          t.headers.get("content-type").indexOf("javascript")
                          ? navigator.serviceWorker.ready.then(function (e) {
                              e.unregister().then(function () {
                                window.location.reload();
                              });
                            })
                          : I(e);
                      })
                      .catch(function () {
                        console.log(
                          "No internet connection found. App is running in offline mode."
                        );
                      });
                  })(e),
                  navigator.serviceWorker.ready.then(function () {
                    console.log(
                      "This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ"
                    );
                  }))
                : I(e);
            });
          }
        })();
    },
  },
  [[19, 1, 2]],
]);
//# sourceMappingURL=main.2ddd482c.chunk.js.map
