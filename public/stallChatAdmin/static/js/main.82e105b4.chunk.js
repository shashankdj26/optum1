(this["webpackJsonpmy-app2"] = this["webpackJsonpmy-app2"] || []).push([
  [0],
  {
    25: function (e, t, a) {
      e.exports = a(42);
    },
    30: function (e, t, a) {},
    42: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(1),
        s = a.n(n),
        l = a(14),
        i = a.n(l),
        o = a(5),
        r = a(7),
        c = a(9),
        u = a(8),
        m = (a(30), a(12)),
        d = a(18),
        h = a.n(d),
        p = a(6),
        v = a.n(p);
      a(32), a(33), a(35), a(36);
      v.a.initializeApp({
        apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
        authDomain: "optum-cdcd7.firebaseapp.com",
        databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
        projectId: "optum-cdcd7",
        storageBucket: "optum-cdcd7.appspot.com",
        messagingSenderId: "33244416026",
        appId: "1:33244416026:web:cd039c460016444059a9a3",
        measurementId: "G-ZR8NLSNB91",
      });
      var g = v.a.auth(),
        f = v.a.firestore(),
        y = (v.a.storage(), v.a.database()),
        E = (v.a.database, a(15)),
        N = (function (e) {
          Object(c.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(o.a)(this, a),
              ((n = t.call(this, e)).state = {
                uid: n.props.uid,
                personId: n.props.person,
                notify: null,
              }),
              n
            );
          }
          return (
            Object(r.a)(a, [
              {
                key: "componentWillMount",
                value: function () {
                  var e = this;
                  E.database()
                    .ref()
                    .child("notification")
                    .child(this.state.uid)
                    .child(this.state.personId)
                    .child("count")
                    .on("value", function (t) {
                      e.setState({ notify: t.val() });
                      var a = document.getElementById(e.state.personId),
                        n = document.getElementById("my-all-user");
                      n.insertBefore(a, n.firstChild);
                    });
                },
              },
              {
                key: "render",
                value: function () {
                  return this.state.notify > 0
                    ? s.a.createElement(
                        "span",
                        { className: "notify" },
                        this.state.notify
                      )
                    : s.a.createElement("span", null);
                },
              },
            ]),
            a
          );
        })(n.Component),
        b = (function (e) {
          Object(c.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(o.a)(this, a),
              ((n = t.call(this, e)).closeNav = function () {
                var e = document.querySelector(".left__section"),
                  t = document.querySelector(".right__section"),
                  a = document.querySelector(".closeNav"),
                  n = document.querySelector(".openNav");
                (e.style.flex = "0"),
                  (a.style.display = "none"),
                  (n.style.display = "block"),
                  window.innerWidth <= 600 &&
                    ((e.style.minWidth = "0px"), (t.style.minWidth = "99%"));
              }),
              (n.openNav = function () {
                var e = document.querySelector(".left__section"),
                  t = document.querySelector(".right__section"),
                  a = document.querySelector(".closeNav"),
                  n = document.querySelector(".openNav");
                (e.style.flex = "1"),
                  (a.style.display = "block"),
                  (n.style.display = "none"),
                  window.innerWidth <= 600 &&
                    ((e.style.minWidth = "40%"), (t.style.minWidth = "59%"));
              }),
              (n.removeNotify = function (e) {
                E.database()
                  .ref("notification")
                  .child(n.props.uid)
                  .child(e)
                  .set({ count: 0 });
              }),
              (n.state = { noState: null }),
              n
            );
          }
          return (
            Object(r.a)(a, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return s.a.createElement(
                    "div",
                    null,
                    s.a.createElement(
                      "span",
                      { className: "openNav", onClick: this.openNav },
                      "\u2630"
                    ),
                    s.a.createElement(
                      "span",
                      { className: "closeNav", onClick: this.closeNav },
                      "\u2630"
                    ),
                    s.a.createElement(
                      "div",
                      { className: "userList" },
                      s.a.createElement(
                        "div",
                        { style: S, id: "my-all-user" },
                        this.props.usersList.map(function (t, a) {
                          return t.uid !== e.props.uid
                            ? s.a.createElement(
                                "a",
                                {
                                  onClick: function () {
                                    e.props.singleChat(t.uid),
                                      e.removeNotify(t.uid);
                                  },
                                  key: a,
                                  id: t.uid,
                                },
                                s.a.createElement(N, {
                                  uid: e.props.uid,
                                  person: t.uid,
                                }),
                                s.a.createElement("img", {
                                  src: t.img,
                                  alt: "avatar",
                                  width: "36",
                                  "data-toggle": "tooltip",
                                  "data-placement": "top",
                                  title: "Tooltip on top",
                                }),
                                s.a.createElement(
                                  "span",
                                  {
                                    "data-toggle": "tooltip",
                                    "data-placement": "top",
                                    title: "Tooltip on top",
                                  },
                                  t.name
                                )
                              )
                            : s.a.createElement("span", { key: a });
                        })
                      )
                    )
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        S = { display: "grid" },
        k = b,
        C = [
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
        j = "usersTable",
        w =
          "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
        L = "/user_status_stall_chat/",
        x = "Admin",
        O = "chatAdmin",
        _ = (function (e) {
          Object(c.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(o.a)(this, a),
              ((n = t.call(this, e)).getToolTipData = function (e) {
                console.log("Hello"), console.log(e.name);
              }),
              (n.singleChat = function (e) {
                if (e === n.state.currentChatUser) {
                  n.setState({ messages: [] });
                  var t = n.state.uid + "+" + e,
                    a = e + "+" + n.state.uid,
                    s = [];
                  n.setState({ dbName: t }),
                    y
                      .ref()
                      .child(n.state.stallName)
                      .child(t)
                      .on("child_added", function (t) {
                        console.log("A"),
                          console.log(t.val()),
                          e === n.state.currentChatUser &&
                            t.val() &&
                            (s.push({
                              uid: t.val().uid,
                              time: t.val().time,
                              name: t.val().stallName
                                ? t.val().stallName
                                : t.val().name,
                              msg: t.val().text,
                            }),
                            n.setState({ messages: s }));
                      }),
                    y
                      .ref()
                      .child(n.state.stallName)
                      .child(a)
                      .on("child_added", function (t) {
                        if ((console.log("B"), e !== n.state.currentChatUser))
                          return (
                            console.log(e),
                            void console.log(n.state.currentChatUser)
                          );
                        t.val() &&
                          (s.push({
                            uid: t.val().uid,
                            time: t.val().time,
                            name: t.val().name,
                            msg: t.val().text,
                          }),
                          n.setState({ messages: s }));
                      });
                }
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
              (n.pushMsg = function (e) {
                e.preventDefault();
                var t = n.state.uid,
                  a = n.state.stallName,
                  s = n.state.text,
                  l = n.state.dbName,
                  i = l.split("+");
                if (t !== i[1]) {
                  if ("" !== s.trim()) {
                    if ("chatRoom" !== l) {
                      var o = l.split("+"),
                        r = y.ref("notification").child(t).child(o[1]),
                        c = y.ref().child("notification").child(o[1]);
                      c.child(t).once("value", function (e) {
                        e.val()
                          ? c.child(t).set({ count: e.val().count + 1 })
                          : c.child(t).set({ count: 1 });
                      }),
                        r.set({ count: 0 });
                    }
                    y.ref().child(n.state.stallName).child(l).push().set({
                      uid: t,
                      time: Date.now(),
                      name: a,
                      stallName: n.state.externalName,
                      text: s,
                    }),
                      n.setState({ text: "" });
                  }
                } else console.log("Can not message to Me and Me");
              }),
              (n.getUserAvatarImageByID = function (e, t) {
                var a = y.ref(j),
                  s = w,
                  l = Object(m.a)(n);
                a.on("value", function (a) {
                  a.forEach(function (a) {
                    e === a.key &&
                      ((s = a.val().profile_picture),
                      0 === t
                        ? l.setState({ stallManagerAvatar: s })
                        : l.setState({
                            userAvatar: s,
                            userName: a.val().fullName,
                            userEmail: a.val().email,
                            userCompany: a.val().company,
                          }));
                  });
                }),
                  0 === t
                    ? l.setState({ stallManagerAvatar: s })
                    : n.setState({ userAvatar: s });
              }),
              (n.scrollToBottom = function () {
                var e = i.a.findDOMNode(n.messagesContainer);
                e && e.scroll(0, e.scrollHeight);
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
              (n.signout = function () {
                localStorage.setItem("loginKey", []), n.props.isLogout();
              }),
              (n.srotingMessageFromTime = function (e, t) {
                return e.time > t.time;
              }),
              (n.getUserData = function (e) {
                var t = Object(m.a)(n);
                y.ref()
                  .child(L)
                  .child(e)
                  .on("value", function (e) {
                    e.exists()
                      ? "offline" === e.val().State.StateMode
                        ? t.setState({ isUserIsOnline: !1 })
                        : t.setState({ isUserIsOnline: !0 })
                      : t.setState({ isUserIsOnline: !1 });
                  });
              }),
              (n.selectChatUser = function (e) {
                (n.state.currentChatUser = e),
                  n.setState({ currentChatUser: e }),
                  n.singleChat(e),
                  n.getUserAvatarImageByID(e, 1),
                  n.getUserData(e);
              }),
              (n.state = {
                uid: null,
                name: null,
                usersList: [],
                messages: [],
                text: "",
                emoji: C,
                currentChatUser: null,
                stallManagerAvatar: w,
                userAvatar: w,
                userName: "userName",
                userEmail: "email",
                userCompany: "",
                isUserIsOnline: !1,
                stallName: "Stall A",
              }),
              n
            );
          }
          return (
            Object(r.a)(a, [
              {
                key: "componentWillMount",
                value: function () {
                  try {
                    window.c = this;
                    var e = localStorage.getItem("loginKey");
                    if (e) {
                      var t = JSON.parse(e);
                      console.log(t);
                      var a = t.uid,
                        n = t.username,
                        s = t.stallName;
                      (this.state.uid = a),
                        (this.state.stallName = t.stallName),
                        this.setState({
                          uid: a,
                          name: n,
                          stallName: s,
                          externalName: t.externalName,
                        }),
                        this.getUserAvatarImageByID(this.state.uid, 0),
                        localStorage.removeItem("loginKey", []);
                    } else this.props.isLogout();
                    var l = this.state.usersList,
                      i = this;
                    y.ref()
                      .child(i.state.stallName)
                      .on("child_added", function (e) {
                        console.log(e.key.split("+")[1]);
                        var t = e.key.split("+");
                        y.ref()
                          .child(j)
                          .child(t[1])
                          .once("value")
                          .then(function (e) {
                            e.exists()
                              ? (console.log("Yes HE Chated with me"),
                                e.key != i.state.uid &&
                                  (l.push({
                                    uid: e.key,
                                    name: e.val().userName,
                                    img: e.val().profile_picture,
                                    company: e.val().company,
                                  }),
                                  i.setState({ usersList: l })))
                              : console.log("No HE Chated with me");
                          });
                      });
                  } catch (o) {
                    console.log(o);
                  }
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
                  return s.a.createElement(
                    "div",
                    null,
                    s.a.createElement(
                      "div",
                      { className: "main__container" },
                      s.a.createElement(
                        "div",
                        { className: "top-header" },
                        s.a.createElement("img", {
                          src: this.state.stallManagerAvatar,
                          alt: "avatar",
                          width: "36",
                        }),
                        s.a.createElement(
                          "div",
                          { className: "stallName" },
                          this.state.stallName
                        ),
                        s.a.createElement(
                          "button",
                          { className: "signout", onClick: this.signout },
                          " Signout "
                        )
                      ),
                      s.a.createElement(
                        "div",
                        { className: "wrapper" },
                        s.a.createElement(
                          "div",
                          { className: "left__section scrollbar-style" },
                          s.a.createElement(k, {
                            usersList: this.state.usersList,
                            uid: this.state.uid,
                            singleChat: this.selectChatUser.bind(this),
                            logout: this.props.isLogout,
                          })
                        ),
                        s.a.createElement(
                          "div",
                          { className: "right__section" },
                          null === this.state.currentChatUser
                            ? null
                            : s.a.createElement(
                                "div",
                                { className: "user-data-info" },
                                s.a.createElement(
                                  "div",
                                  null,
                                  " ",
                                  s.a.createElement("img", {
                                    src: this.state.userAvatar,
                                    alt: "avatar",
                                    className: "user-data-info-image",
                                  }),
                                  " "
                                ),
                                s.a.createElement(
                                  "span",
                                  { className: "user-data-info-text" },
                                  s.a.createElement(
                                    "strong",
                                    {
                                      style: {
                                        textTransform: "capitalize",
                                        color: "#000",
                                      },
                                    },
                                    this.state.userName
                                  )
                                ),
                                s.a.createElement(
                                  "span",
                                  { className: "user-data-info-text" },
                                  s.a.createElement(
                                    "strong",
                                    {
                                      style: {
                                        textTransform: "capitalize",
                                        color: "#000",
                                      },
                                    },
                                    this.state.userEmail
                                  )
                                ),
                                s.a.createElement(
                                  "span",
                                  { className: "user-data-info-text" },
                                  s.a.createElement(
                                    "strong",
                                    {
                                      style: {
                                        textTransform: "capitalize",
                                        color: "#000",
                                      },
                                    },
                                    this.state.userCompany
                                  )
                                ),
                                s.a.createElement(
                                  "span",
                                  { className: "user-data-info-text" },
                                  s.a.createElement(
                                    "strong",
                                    {
                                      className: this.state.isUserIsOnline
                                        ? "onlineUser"
                                        : "offlineUser",
                                    },
                                    this.state.isUserIsOnline
                                      ? "Online"
                                      : "Offline"
                                  )
                                )
                              ),
                          null === this.state.currentChatUser
                            ? s.a.createElement(
                                "div",
                                {
                                  style: {
                                    textAlign: "center",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                  },
                                },
                                "Plese select any user"
                              )
                            : s.a.createElement(
                                "div",
                                {
                                  className: "message__box scrollbar-style",
                                  ref: function (t) {
                                    e.messagesContainer = t;
                                  },
                                },
                                this.sortArrayElements(this.state.messages).map(
                                  function (t, a) {
                                    return t.uid === e.state.uid
                                      ? s.a.createElement(
                                          "div",
                                          { className: "msg__text", key: a },
                                          s.a.createElement(
                                            "div",
                                            null,
                                            " ",
                                            s.a.createElement("img", {
                                              src: e.state.stallManagerAvatar,
                                              alt: "avatar",
                                            }),
                                            " "
                                          ),
                                          s.a.createElement(
                                            "span",
                                            null,
                                            s.a.createElement(
                                              "strong",
                                              {
                                                style: {
                                                  textTransform: "capitalize",
                                                  color: "#9E9E9E",
                                                },
                                              },
                                              e.state.stallName
                                            ),
                                            s.a.createElement("br", null),
                                            t.msg,
                                            s.a.createElement("br", null),
                                            s.a.createElement(
                                              "small",
                                              { style: { color: "#9E9E9E" } },
                                              h()(t.time).fromNow()
                                            )
                                          )
                                        )
                                      : s.a.createElement(
                                          "div",
                                          {
                                            className: "msg__text__right",
                                            key: a,
                                          },
                                          s.a.createElement(
                                            "div",
                                            null,
                                            " ",
                                            s.a.createElement("img", {
                                              src: e.state.userAvatar,
                                              alt: "avatar",
                                            }),
                                            " "
                                          ),
                                          s.a.createElement(
                                            "span",
                                            null,
                                            s.a.createElement(
                                              "strong",
                                              {
                                                style: {
                                                  textTransform: "capitalize",
                                                  color: "#9E9E9E",
                                                },
                                              },
                                              t.name
                                            ),
                                            s.a.createElement("br", null),
                                            t.msg,
                                            s.a.createElement("br", null),
                                            s.a.createElement(
                                              "small",
                                              { style: { color: "#9E9E9E" } },
                                              h()(t.time).fromNow()
                                            )
                                          )
                                        );
                                  }
                                )
                              ),
                          null !== this.state.currentChatUser
                            ? s.a.createElement(
                                "form",
                                null,
                                s.a.createElement(
                                  "div",
                                  { className: "message__type__box" },
                                  s.a.createElement("input", {
                                    placeholder: "Type Your Message",
                                    onChange: function (t) {
                                      e.setState({ text: t.target.value });
                                    },
                                    value: this.state.text,
                                    require: "true",
                                    onFocus: this.openEmojiClose,
                                  }),
                                  s.a.createElement(
                                    "span",
                                    {
                                      className: "emojiIcon",
                                      onClick: this.openEmoji,
                                    },
                                    " \u263a "
                                  ),
                                  s.a.createElement(
                                    "button",
                                    { type: "submit", onClick: this.pushMsg },
                                    " ",
                                    s.a.createElement("i", {
                                      className: "glyphicon glyphicon-send",
                                    }),
                                    " "
                                  )
                                )
                              )
                            : null
                        )
                      ),
                      s.a.createElement(
                        "div",
                        { className: "emoji" },
                        this.state.emoji.map(function (t, a) {
                          return s.a.createElement(
                            "a",
                            {
                              key: a,
                              onClick: function () {
                                e.pickEmoji(t);
                              },
                            },
                            " ",
                            s.a.createElement("span", { role: "img" }, t),
                            " "
                          );
                        })
                      )
                    )
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        U = a(16),
        I = (function (e) {
          Object(c.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n, s;
            return (
              Object(o.a)(this, a),
              ((s = t.call(this, e)).loginWithGmail = function (e) {
                e.preventDefault(), console.log("Clicked On Login");
                var t = s.state,
                  a = t.email,
                  n = (t.password, "".concat(a, "123456"));
                g.signInWithEmailAndPassword(a, n)
                  .then(function (e) {
                    var t = y.ref().child(j).child(e.user.uid);
                    t.once("value", function (a) {
                      a.val()
                        ? e.user.photoURL
                          ? t.update({ profile_picture: e.user.photoURL })
                          : t.update({ profile_picture: w })
                        : s.addUserList(e);
                    });
                    var a = !1;
                    f.collection(x)
                      .doc(O)
                      .get()
                      .then(function (t) {
                        for (
                          var n = t.data(), l = 0;
                          l < n.AdminList.length;
                          l++
                        )
                          if (n.AdminList[l].adminUID === e.user.uid) {
                            (a = !0),
                              localStorage.setItem(
                                "loginKey",
                                JSON.stringify({
                                  uid: e.user.uid,
                                  username: e.user.displayName || "Admin",
                                  stallName: n.AdminList[l].stallName,
                                  externalName: n.AdminList[l].externalName,
                                })
                              ),
                              s.props.isLogin(),
                              console.log("Success Login");
                            break;
                          }
                        a ||
                          s.setState({
                            error:
                              "You have no permission to login in Stall Admin Area",
                          });
                      });
                  })
                  .catch(function (e) {
                    var t = e.message;
                    s.setState({ error: t });
                  });
              }),
              (s.addUserList = function (e) {
                var t = y.ref().child(j).child(e.user.uid),
                  a = "";
                (a = e.user.photoURL ? e.user.photoURL : w),
                  t.set({
                    userName: e.user.displayName,
                    profile_picture: a,
                    fullName: e.user.displayName,
                    email: e.user.email,
                  });
              }),
              (s.state =
                ((n = {
                  error: null,
                  display: "inline-block",
                  email: "",
                  password: "",
                }),
                Object(U.a)(n, "error", null),
                Object(U.a)(n, "alreaylogged", !1),
                n)),
              s
            );
          }
          return (
            Object(r.a)(a, [
              {
                key: "handleChange",
                value: function (e, t) {
                  this.handleStateChange([t], e.target.value);
                },
              },
              {
                key: "handleStateChange",
                value: function (e, t) {
                  this.setState(Object(U.a)({}, e, t));
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return s.a.createElement(
                    "div",
                    null,
                    s.a.createElement(
                      "div",
                      { className: "container" },
                      s.a.createElement(
                        "div",
                        { className: "row" },
                        s.a.createElement(
                          "div",
                          {
                            className:
                              "col-md-6 col-md-offset-3 outer-box-login",
                          },
                          // s.a.createElement("img", { src: "logo.png" }),
                          s.a.createElement("h3", null, "Admin Chat Login"),
                          s.a.createElement("br", null),
                          s.a.createElement(
                            "div",
                            { className: "login-area" },
                            s.a.createElement(
                              "div",
                              { className: "form-group" },
                              s.a.createElement("input", {
                                id: "email",
                                className: "form-control",
                                type: "text",
                                placeholder: "Enter your email ID",
                                onChange: function (t) {
                                  return e.handleChange(t, "email");
                                },
                                value: this.state.email,
                                required: !0,
                              })
                            ),
                            s.a.createElement(
                              "button",
                              {
                                type: "button",
                                className: "login-btn",
                                onClick: this.loginWithGmail,
                                style: { display: this.state.display },
                              },
                              "Login"
                            ),
                            s.a.createElement("br", null),
                            s.a.createElement("br", null),
                            this.state.error
                              ? s.a.createElement(
                                  "div",
                                  {
                                    className: "alert alert-danger",
                                    role: "alert",
                                  },
                                  this.state.error
                                )
                              : ""
                          )
                        )
                      )
                    )
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        A = (function (e) {
          Object(c.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(o.a)(this, a),
              ((n = t.call(this, e)).isLogin = function () {
                n.setState({ isLogin: !0 });
              }),
              (n.isLogout = function () {
                localStorage.removeItem("loginKey", []),
                  n.setState({ isLogin: !1 });
              }),
              (n.state = { isLogin: !1 }),
              n
            );
          }
          return (
            Object(r.a)(a, [
              {
                key: "componentWillMount",
                value: function () {
                  localStorage.getItem("loginKey") &&
                    this.setState({ isLogin: !0 });
                },
              },
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    null,
                    this.state.isLogin
                      ? s.a.createElement(_, { isLogout: this.isLogout })
                      : s.a.createElement(I, { isLogin: this.isLogin })
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        W = Boolean(
          "localhost" === window.location.hostname ||
            "[::1]" === window.location.hostname ||
            window.location.hostname.match(
              /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        );
      function M(e) {
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
      i.a.render(s.a.createElement(A, null), document.getElementById("root")),
        (function () {
          if ("serviceWorker" in navigator) {
            if (new URL("", window.location).origin !== window.location.origin)
              return;
            window.addEventListener("load", function () {
              var e = "".concat("", "/service-worker.js");
              W
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
                          : M(e);
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
                : M(e);
            });
          }
        })();
    },
  },
  [[25, 1, 2]],
]);
//# sourceMappingURL=main.82e105b4.chunk.js.map
