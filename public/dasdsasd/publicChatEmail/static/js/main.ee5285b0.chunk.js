(this["webpackJsonppublic-chat"] = this["webpackJsonppublic-chat"] || []).push([
  [0],
  {
    178: function (e, t, a) {
      e.exports = a.p + "static/media/spinner.cb8f814a.gif";
    },
    180: function (e, t, a) {
      e.exports = a(364);
    },
    185: function (e, t, a) {},
    186: function (e, t, a) {},
    187: function (e, t, a) {},
    279: function (e, t) {},
    316: function (e, t) {},
    363: function (e, t, a) {
      e.exports = a.p + "static/media/chat.28c92bee.png";
    },
    364: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(1),
        s = a.n(n),
        i = a(176),
        c = a.n(i),
        r = (a(185), a(57)),
        l = a(79),
        o = a(81),
        u = a(80),
        m = (a(186), a(113)),
        h = a(58),
        d = (a(187), a(177)),
        g = a.n(d),
        p = a(22),
        v = a.n(p);
      a(351), a(352), a(354), a(355);
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
      var f = v.a.auth(),
        b = v.a.firestore(),
        C = (v.a.storage(), v.a.database()),
        E = (v.a.database, v.a.firestore.FieldValue),
        _ = a(179),
        N = (a(356), a(112)),
        y = a.n(N),
        M = a(178),
        k = a.n(M),
        S = [],
        w = (function (e) {
          Object(o.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(r.a)(this, a),
              ((n = t.call(this, e)).state = {
                emailFeature: !0,
                loading: !1,
                sendable: !1,
                error: null,
                isLoading: !0,
                messages: {},
                channels: {},
                replied: {},
                lastMessageTime: {},
                activeMessages: [],
                publicChannelMembers: [],
                publicChannel: null,
                activeChannel: null,
                activeTab: n.props.type !== T.privateChat ? "tab1" : "tab2",
                activeMember: null,
                searchText: "",
                chatuser: null,
                notifyEmail: "",
                type: n.props.type,
                sender_data: {
                  email: "",
                  company: "",
                  designation: "",
                  name: "",
                },
                reciever_data: {
                  email: "",
                  company: "",
                  designation: "",
                  name: "",
                },
              }),
              (n.getUserData = function (e, t) {
                if (!e) return "";
                for (var a = 0; a < S.length; a++)
                  if (e.id === S[a].email) return S[a][t] ? S[a][t] : "";
                return "New User";
              }),
              (n.getUserDataFromChat = function (e, t) {
                return "";
              }),
              (n.getUserAvatarImage = function (e, t) {
                return "assets/images/Profile-picture.png";
              }),
              (n.getUserAvatarImageForPrivChat = function (e) {
                return "assets/images/Profile-picture.png";
              }),
              (n.handleError = function (e) {
                console.error(e), n.setState({ error: "Could not load chat." });
              }),
              (n.setupChatClient = function (e) {
                console.log(n.user.channelId),
                  (n.client = e),
                  n.client
                    .getChannelByUniqueName(n.user.channelId)
                    .then(function (e) {
                      return e;
                    })
                    .catch(function (e) {
                      if (50300 === e.body.code)
                        return n.client.createChannel({
                          uniqueName: n.user.channelId,
                          friendlyName: n.user.channelName,
                          isPrivate: !1,
                        });
                      n.handleError(e);
                    })
                    .then(function (e) {
                      return (
                        n.setState({ publicChannel: e }),
                        n.state.publicChannel.join().catch(function () {})
                      );
                    })
                    .then(function () {
                      Object(h.a)(n);
                      n.setState({ isLoading: !1 }),
                        n.state.publicChannel.getMessages().then(function (e) {
                          n.props.type !== T.privateChat &&
                            n.messagesLoaded(n.state.publicChannel, e, !0);
                        }),
                        n.state.publicChannel.on("messageAdded", function (e) {
                          return n.messageAdded(n.state.publicChannel, e);
                        }),
                        setInterval(function () {
                          n.state.publicChannel
                            .getMembers()
                            .then(n.membersLoaded);
                        }, 1e3);
                    })
                    .catch(n.handleError),
                  n.client.on("channelInvited", function (e) {
                    e.join(), n.subscribeChannel(e);
                  }),
                  n.client.getSubscribedChannels().then(function (e) {
                    e.items.forEach(function (e) {
                      n.subscribeChannel(e);
                    });
                  });
              }),
              (n.subscribeChannelMessages = function (e) {
                e.getMessages().then(function (t) {
                  return n.messagesLoaded(e, t, !1);
                }),
                  e.on("messageAdded", function (t) {
                    return n.messageAdded(e, t);
                  });
              }),
              (n.twilioMessageToMessage = function (e) {
                return {
                  id: e.sid,
                  text: e.body,
                  user: e.attributes.user || {},
                  timestamp: e.dateCreated,
                };
              }),
              (n.setCurrentTab = function (e) {
                n.setState({ activeTab: e }),
                  "tab1" == e
                    ? n.onPublicChanelClick()
                    : "tab2" == e && n.setState({ activeChannel: null });
              }),
              (n.membersLoaded = function (e) {
                var t = e
                  .map(function (e) {
                    return n.toMember(e.identity);
                  })
                  .filter(function (e) {
                    return e.id != n.user.id;
                  });
                n.setState({ publicChannelMembers: t });
              }),
              (n.toMember = function (e) {
                var t = e.split(",");
                return { id: t[0], name: t[1], identity: e };
              }),
              (n.messagesLoaded = function (e, t, a) {
                var s = n.state.messages;
                if (
                  ((s[e.sid] = t.items.map(n.twilioMessageToMessage)),
                  n.setState({ messages: s }),
                  t.items.length > 0)
                ) {
                  var i = s[e.sid][t.items.length - 1];
                  i.user.name == n.user.name
                    ? n.handleOnline(e, i, !0)
                    : n.handleOnline(e, i, !1);
                }
                a && n.activateChannel(e);
              }),
              (n.SaveForNotify = function (e) {
                b.collection("ChatNotification")
                  .doc(e)
                  .get()
                  .then(function (t) {
                    t.exists
                      ? b
                          .collection("ChatNotification")
                          .doc(e)
                          .update({ notify_to: e, date: Date.now() })
                      : b
                          .collection("ChatNotification")
                          .doc(e)
                          .set({ notify_to: e, date: Date.now() });
                  })
                  .catch(function (e) {
                    console.log("Error getting document:", e);
                  });
              }),
              (n.PublicMessageAddedInFirebase = function (e, t) {
                b.collection("PublicChatData")
                  .doc()
                  .set({ date: E.serverTimestamp(), message: e, sentby: t })
                  .then(function () {
                    console.log("Success updating document:");
                  })
                  .catch(function (e) {
                    console.log("Error updating document:", e);
                  });
              }),
              (n.PrivateMessageAddedInFirebase = function (e, t, a, s) {
                Object(h.a)(n);
                b.collection("PrivateChatData")
                  .doc()
                  .set({
                    date: E.serverTimestamp(),
                    message: e,
                    msgbetween: t,
                    reciever: a,
                    sender: s,
                  })
                  .then(function () {
                    console.log("Success updating document:");
                  })
                  .catch(function (e) {
                    console.log("Error updating document:", e);
                  });
              }),
              (n.messageAdded = function (e, t) {
                if (null == n.previousMessage) n.previousMessage = t;
                else if (n.previousMessage.sid == t.sid) return;
                n.previousMessage = t;
                var a = n.state.messages;
                (t = n.twilioMessageToMessage(t)),
                  a[e.sid] || (a[e.sid] = []),
                  a[e.sid].push(t),
                  n.setState({ messages: a }),
                  t.user.name == n.user.name
                    ? n.handleOnline(e, t, !0)
                    : n.handleOnline(e, t, !1),
                  e.sid ==
                    (n.state.activeChannel && n.state.activeChannel.sid) &&
                    n.scroll();
              }),
              (n.handleOnline = function (e, t, a) {
                var s = n.state.replied,
                  i = e.uniqueName.split(",").filter(function (e) {
                    return e != n.user.id;
                  })[0];
                1 == a ? delete s[i] : (s[i] = a), n.setState({ replied: s });
                var c = n.state.lastMessageTime;
                (c[i] = t.timestamp), n.setState({ lastMessageTime: c });
              }),
              (n.sendMessage = function (e) {
                n.message.current.value &&
                  (n.state.activeChannel.sendMessage(n.message.current.value, {
                    user: n.user,
                  }),
                  "tab1" == n.state.activeTab &&
                    n.PublicMessageAddedInFirebase(
                      n.message.current.value,
                      n.state.chatuser.email
                    ),
                  "tab2" == n.state.activeTab &&
                    (n.PrivateMessageAddedInFirebase(
                      n.message.current.value,
                      n.state.activeChannel.uniqueName,
                      n.state.activeMember.id,
                      n.state.chatuser.email
                    ),
                    n.SaveForNotify(n.state.activeMember.id)),
                  (n.message.current.value = ""));
              }),
              (n.onMemberClick = function (e) {
                var t = [e.id, n.user.id];
                t.sort();
                var a = t.join();
                null == n.state.channels[a]
                  ? n.setupChannel(n.client, a, e)
                  : (n.activateChannel(n.state.channels[a]),
                    n.setState({ activeMember: e })),
                  b
                    .collection("user-invite")
                    .doc(n.user.id + "+" + e.id)
                    .get()
                    .then(function (e) {
                      e.exists
                        ? n.setState({ sendable: !1 })
                        : n.setState({ sendable: !0 });
                    }),
                  n.setState(function () {
                    return {
                      sender_data: {
                        name: n.user.name,
                        email: n.user.id,
                        company: n.getUserDataFromChat(n.user, "company"),
                        designation: n.getUserDataFromChat(
                          n.user,
                          "designation"
                        ),
                      },
                      reciever_data: {
                        name: e.name,
                        email: e.id,
                        company: n.getUserDataFromChat(e, "company"),
                        designation: n.getUserDataFromChat(e, "company"),
                      },
                    };
                  });
              }),
              (n.setupChannel = function (e, t, a) {
                n.setState({ loading: !0 }),
                  (n.client = e),
                  n.client
                    .getChannelByUniqueName(t)
                    .then(function (e) {
                      return e;
                    })
                    .catch(function (e) {
                      if ((console.log(e), 50300 === e.body.code))
                        return n.client.createChannel({
                          uniqueName: t,
                          isPrivate: !0,
                        });
                      n.handleError(e);
                    })
                    .then(function (e) {
                      return (
                        (n.channel = e), n.channel.join().catch(function () {})
                      );
                    })
                    .then(function () {
                      try {
                        n.channel
                          .invite(a.identity)
                          .then(function () {
                            console.log("//////////////////"),
                              n.subscribeChannel(n.channel),
                              n.setState({ activeMember: a }),
                              n.setState({ loading: !1 });
                          })
                          .catch(function (e) {
                            return console.log(e);
                          });
                      } catch (e) {}
                    })
                    .catch(n.handleError);
              }),
              (n.sendMail = function () {
                y()({
                  title: "Send Invite",
                  text: "",
                  icon: "info",
                  buttons: !0,
                  dangerMode: !0,
                }).then(function (e) {
                  if (e) {
                    n.setState({ loading: !0 });
                    var t = Object(h.a)(n);
                    fetch(
                      "https://vc-chat-mailserver-dot-vc-circle-cd367.el.r.appspot.com/sendChatMail/",
                      {
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          "X-AUTH-TOKEN": "12901cb8edbcd4fff903e48585403839",
                        },
                        method: "POST",
                        body: JSON.stringify({
                          sender: Object(m.a)({}, n.state.sender_data),
                          reciver: Object(m.a)({}, n.state.reciever_data),
                        }),
                      }
                    )
                      .then(function (e) {
                        b.collection("user-invite")
                          .doc(
                            ""
                              .concat(t.state.sender_data.email, "+")
                              .concat(t.state.reciever_data.email)
                          )
                          .set({
                            sender: t.state.sender_data.email,
                            receiver: t.state.reciever_data.email,
                            sent: !0,
                            timestamp: E.serverTimestamp(),
                          })
                          .then(function () {
                            t.setState({ sendable: !1, loading: !1 }),
                              y()("Sent", { icon: "success" });
                          });
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  }
                });
              }),
              (n.activateChannel = function (e) {
                n.setState({ activeChannel: e }),
                  n.setState({ activeMessages: n.state.messages[e.sid] }),
                  n.scroll();
              }),
              (n.onPublicChanelClick = function () {
                n.activateChannel(n.state.publicChannel),
                  setTimeout(n.scroll, 100);
              }),
              (n.scroll = function () {
                if (n.messageDiv.current) {
                  var e =
                    n.messageDiv.current.scrollHeight -
                    n.messageDiv.current.clientHeight;
                  n.messageDiv.current.scrollTop = e > 0 ? e : 0;
                }
              }),
              (n.onSearchTextChange = function (e) {
                n.setState({ searchText: e });
              }),
              (n.showUserImage = function () {
                return "assets/images/Profile-picture.png";
              }),
              (n.RetunKey = function (e) {
                return e + "" + Math.floor(1e5 * Math.random());
              }),
              (n.user = {
                channelId: e.channel.id,
                channelName: e.channel.name,
                id: e.user.id,
                name: e.user.name,
                uimage: e.user.uimage,
              }),
              (null == e.user.uimage || e.user.uimage) &&
                ((n.uimage = "assets/images/Profile-picture.png"),
                n.setState({ uimage: "assets/images/Profile-picture.png" })),
              (n.message = s.a.createRef()),
              (n.messageDiv = s.a.createRef()),
              n
            );
          }
          return (
            Object(l.a)(a, [
              {
                key: "componentWillMount",
                value: function () {
                  this.state.stallID;
                  (window.c = this),
                    C.ref("/users").on("value", function (e) {
                      if (e.exists()) {
                        var t = e.val();
                        Object.keys(t).forEach(function (e) {
                          S.push(t[e]);
                        });
                      } else console.error("No User data found");
                    });
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  f.onAuthStateChanged(function (t) {
                    t
                      ? (e.setState({
                          chatuser: {
                            email: t.email,
                            name: t.displayName,
                            photoURL: t.photoURL,
                          },
                        }),
                        console.log("Chat User " + t.email))
                      : (e.setState({
                          chatuser: {
                            email: "shubham@dj.com",
                            name: "Shubham",
                          },
                        }),
                        console.log("Chat User not Loaded shubham@dj.com"));
                  }),
                    fetch(
                      "https://chat.photoboothassetmanagement.co.in/chat/token",
                      {
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        method: "POST",
                        body: "identity=".concat(
                          encodeURIComponent(
                            this.user.id + "," + this.user.name
                          )
                        ),
                      }
                    )
                      .then(function (e) {
                        return e.json();
                      })
                      .then(function (e) {
                        return g.a.create(e.token);
                      })
                      .then(this.setupChatClient)
                      .catch(this.handleError);
                },
              },
              {
                key: "subscribeChannel",
                value: function (e) {
                  var t = this.state.channels;
                  (t[e.uniqueName] = e),
                    this.setState({ channels: t }),
                    this.subscribeChannelMessages(e);
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  this.client.shutdown();
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  if (this.state.error)
                    return s.a.createElement(
                      "div",
                      { className: "fullScr" },
                      this.state.error
                    );
                  if (this.state.isLoading)
                    return s.a.createElement(
                      "div",
                      { className: "fullScr" },
                      "Loading Chat..."
                    );
                  for (
                    var t = this.state.searchText,
                      a = this.state.publicChannelMembers
                        .filter(function (e) {
                          return (
                            "" == t ||
                            (e.name || "")
                              .toLocaleLowerCase()
                              .includes(t.toLocaleLowerCase())
                          );
                        })
                        .sort(function (t, a) {
                          var n = e.state.lastMessageTime[t.id]
                            ? e.state.lastMessageTime[t.id]
                            : new Date(
                                new Date().setFullYear(
                                  new Date().getFullYear() - 1
                                )
                              );
                          return (
                            (e.state.lastMessageTime[a.id]
                              ? e.state.lastMessageTime[a.id]
                              : new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() - 1
                                  )
                                )) - n
                          );
                        }),
                      n = [],
                      i = 0;
                    i < a.length;
                    i++
                  ) {
                    var c = a[i].name;
                    "null" != c && null != c && n.push(a[i]);
                  }
                  return (
                    (a = n),
                    s.a.createElement(
                      s.a.Fragment,
                      null,
                      this.state.loading
                        ? s.a.createElement(
                            "div",
                            { className: "loading" },
                            s.a.createElement("img", {
                              src: k.a,
                              alt: "",
                              className: "loader",
                            })
                          )
                        : "",
                      s.a.createElement(
                        "div",
                        { className: "wrapper h-100" },
                        s.a.createElement(
                          "header",
                          { className: "header" },
                          s.a.createElement(
                            "a",
                            { href: "#", className: "header__logo" },
                            s.a.createElement("img", {
                              src: "assets/images/logo.png",
                              alt: "",
                            })
                          )
                        ),
                        s.a.createElement(
                          "div",
                          { className: "contentCntr" },
                          s.a.createElement(
                            "aside",
                            { className: "sidebar show-on-desktop" },
                            s.a.createElement(
                              "div",
                              { className: "sidebar__header" },
                              s.a.createElement(
                                "div",
                                { className: "sidebar__user" },
                                s.a.createElement(
                                  "div",
                                  { className: "user-block" },
                                  s.a.createElement(
                                    "div",
                                    { className: "user-block__pic" },
                                    s.a.createElement("img", {
                                      src: this.showUserImage(),
                                      alt: "",
                                    })
                                  ),
                                  s.a.createElement(
                                    "span",
                                    { className: "user-block__name" },
                                    this.user.name
                                  )
                                )
                              ),
                              s.a.createElement(
                                "a",
                                {
                                  className: "sidebar__link",
                                  onClick: function (t) {
                                    return e.onPublicChanelClick();
                                  },
                                },
                                this.user.channelName
                              ),
                              s.a.createElement(
                                "a",
                                { className: "sidebar__link" },
                                "Chat (",
                                a.length,
                                ")"
                              )
                            ),
                            s.a.createElement(
                              "div",
                              { className: "sidebar__body" },
                              s.a.createElement(
                                "div",
                                { className: "search-block" },
                                s.a.createElement(
                                  "div",
                                  { className: "search-block__form" },
                                  s.a.createElement("input", {
                                    className: "search-block__input",
                                    type: "text",
                                    placeholder: "Search",
                                    ref: this.search,
                                    onChange: function (t) {
                                      return e.onSearchTextChange(
                                        t.target.value
                                      );
                                    },
                                  }),
                                  s.a.createElement(
                                    "button",
                                    { className: "search-block__btn" },
                                    s.a.createElement("i", {
                                      className: "icon-search",
                                    })
                                  )
                                )
                              ),
                              s.a.createElement(
                                "div",
                                { className: "user-block-list" },
                                s.a.createElement(
                                  "div",
                                  null,
                                  a.map(function (t) {
                                    return s.a.createElement(
                                      "div",
                                      {
                                        className: "user-block",
                                        key: t.identity,
                                        onClick: function (a) {
                                          return e.onMemberClick(t);
                                        },
                                      },
                                      s.a.createElement(
                                        "div",
                                        { className: "user-block__pic" },
                                        s.a.createElement("img", {
                                          src: e.user.uimage,
                                          alt: "",
                                        }),
                                        s.a.createElement("span", {
                                          className:
                                            1 == e.state.replied[t.id]
                                              ? ""
                                              : "user-block__dnd",
                                        })
                                      ),
                                      s.a.createElement(
                                        "span",
                                        { className: "user-block__name" },
                                        "null" === t.name ? t.id : t.name
                                      )
                                    );
                                  })
                                )
                              )
                            )
                          ),
                          s.a.createElement(
                            "section",
                            { className: "chat-container" },
                            s.a.createElement(
                              "div",
                              { className: "chat-section" },
                              this.props.type === T.Both &&
                                s.a.createElement(
                                  s.a.Fragment,
                                  null,
                                  s.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "chat-section__header chat-section__tabs hide-on-desktop",
                                    },
                                    s.a.createElement(
                                      "ul",
                                      null,
                                      s.a.createElement(
                                        "li",
                                        {
                                          onClick: function (t) {
                                            return e.setCurrentTab("tab1");
                                          },
                                        },
                                        s.a.createElement(
                                          "a",
                                          {
                                            className:
                                              (this.state.activeChannel &&
                                                this.state.activeChannel
                                                  .uniqueName) ==
                                              this.user.channelId
                                                ? "active"
                                                : "",
                                          },
                                          this.user.channelName
                                        )
                                      ),
                                      s.a.createElement(
                                        "li",
                                        {
                                          onClick: function (t) {
                                            return e.setCurrentTab("tab2");
                                          },
                                        },
                                        s.a.createElement(
                                          "a",
                                          {
                                            className:
                                              "tab2" == this.state.activeTab
                                                ? "active"
                                                : "",
                                          },
                                          "ALL PARTICIPANTS (",
                                          a.length,
                                          ")"
                                        )
                                      )
                                    )
                                  )
                                ),
                              s.a.createElement(
                                "div",
                                {
                                  className: "chat-section__header",
                                  style: {
                                    display: this.state.activeChannel
                                      ? ""
                                      : "none",
                                  },
                                },
                                s.a.createElement(
                                  "div",
                                  { className: "user-block" },
                                  "tab1" !== this.state.activeTab &&
                                    s.a.createElement(
                                      "div",
                                      {
                                        onClick: function () {
                                          return e.setState({
                                            activeChannel: null,
                                          });
                                        },
                                        style: { marginRight: "0.5rem" },
                                      },
                                      s.a.createElement("img", {
                                        style: { width: "1.5rem" },
                                        src: "./assets/images/back.png",
                                        alt: "<",
                                      })
                                    ),
                                  s.a.createElement(
                                    "div",
                                    { className: "user-block__pic" },
                                    s.a.createElement("img", {
                                      src:
                                        this.state.activeChannel &&
                                        this.state.activeChannel.friendlyName
                                          ? "assets/images/groupChatIcon.png"
                                          : this.getUserAvatarImage(
                                              this.state.activeMember,
                                              "profile_picture"
                                            ),
                                      alt: "",
                                    })
                                  ),
                                  s.a.createElement(
                                    "span",
                                    { className: "user-block__name" },
                                    (this.state.activeChannel &&
                                      this.state.activeChannel.friendlyName) ||
                                      (this.state.activeMember &&
                                        this.state.activeMember.name)
                                  ),
                                  this.state.emailFeature
                                    ? s.a.createElement(_.a, {
                                        className: "mail "
                                          .concat(
                                            this.state.activeMember
                                              ? ""
                                              : "d-none",
                                            " "
                                          )
                                          .concat(
                                            "tab1" === this.state.activeTab
                                              ? "d-none"
                                              : "",
                                            " "
                                          )
                                          .concat(
                                            this.state.sendable ? "" : "faded"
                                          ),
                                        size: "2rem",
                                        onClick: this.sendMail,
                                      })
                                    : ""
                                )
                              ),
                              s.a.createElement(
                                "div",
                                {
                                  className:
                                    "chat-section__body chat-section__body--list",
                                },
                                s.a.createElement(
                                  "div",
                                  {
                                    className: "chat-section",
                                    style: {
                                      display: this.state.activeChannel
                                        ? ""
                                        : "none",
                                    },
                                  },
                                  s.a.createElement(
                                    "div",
                                    {
                                      className: "chat-section__body",
                                      ref: this.messageDiv,
                                    },
                                    this.state.activeMessages &&
                                      this.state.activeMessages.map(function (
                                        t
                                      ) {
                                        return s.a.createElement(
                                          "div",
                                          {
                                            className:
                                              "chat-section__message chat-section__message--".concat(
                                                e.user.id == t.user.id
                                                  ? "sent"
                                                  : "received"
                                              ),
                                            key: e.RetunKey(t.identity),
                                          },
                                          e.user.id == t.user.id &&
                                            s.a.createElement(
                                              s.a.Fragment,
                                              null,
                                              " ",
                                              s.a.createElement(
                                                "span",
                                                {
                                                  className:
                                                    "chat-section__text",
                                                },
                                                t.text
                                              ),
                                              s.a.createElement(
                                                "span",
                                                {
                                                  className:
                                                    "chat-section__profile",
                                                },
                                                s.a.createElement(
                                                  "span",
                                                  {
                                                    className:
                                                      "chat-section__profile__pic",
                                                  },
                                                  s.a.createElement("img", {
                                                    src:
                                                      null == e.user.uimage
                                                        ? "assets/images/Profile-picture.png"
                                                        : e.user.uimage,
                                                    alt: "",
                                                  })
                                                ),
                                                t.user.name
                                              )
                                            ),
                                          e.user.id != t.user.id &&
                                            s.a.createElement(
                                              s.a.Fragment,
                                              null,
                                              s.a.createElement(
                                                "span",
                                                {
                                                  className:
                                                    "chat-section__profile",
                                                },
                                                s.a.createElement(
                                                  "span",
                                                  {
                                                    className:
                                                      "chat-section__profile__pic",
                                                  },
                                                  s.a.createElement("img", {
                                                    src: e.getUserAvatarImage(
                                                      t.user,
                                                      "profile_picture"
                                                    ),
                                                    alt: "",
                                                  }),
                                                  t.user.name
                                                )
                                              ),
                                              s.a.createElement(
                                                "span",
                                                {
                                                  className:
                                                    "chat-section__text",
                                                },
                                                t.text
                                              )
                                            )
                                        );
                                      })
                                  ),
                                  this.state.activeChannel &&
                                    s.a.createElement(
                                      "div",
                                      { className: "chat-section__footer" },
                                      s.a.createElement(
                                        "div",
                                        { className: "chat-section__form" },
                                        s.a.createElement("input", {
                                          ref: this.message,
                                          type: "text",
                                          className: "chat-section__input",
                                          placeholder: "Type a Message",
                                          onKeyPress: function (t) {
                                            return (
                                              "Enter" === t.key &&
                                              e.sendMessage(t)
                                            );
                                          },
                                        }),
                                        s.a.createElement(
                                          "button",
                                          {
                                            onClick: function (t) {
                                              return e.sendMessage(t);
                                            },
                                            className: "chat-section__btn",
                                          },
                                          s.a.createElement("i", {
                                            className: "icon-send",
                                          })
                                        )
                                      )
                                    )
                                ),
                                s.a.createElement(
                                  "div",
                                  {
                                    className: "sidebar__body",
                                    style: {
                                      display:
                                        null == this.state.activeChannel &&
                                        "tab1" != this.state.activeTab
                                          ? ""
                                          : "none",
                                    },
                                  },
                                  s.a.createElement(
                                    "div",
                                    { className: "sidebar__body" },
                                    s.a.createElement(
                                      "div",
                                      { className: "search-block" },
                                      s.a.createElement(
                                        "div",
                                        { className: "search-block__form" },
                                        s.a.createElement("input", {
                                          className: "search-block__input",
                                          type: "text",
                                          placeholder: "Search",
                                          ref: this.search,
                                          onChange: function (t) {
                                            return e.onSearchTextChange(
                                              t.target.value
                                            );
                                          },
                                        }),
                                        s.a.createElement(
                                          "button",
                                          { className: "search-block__btn" },
                                          s.a.createElement("i", {
                                            className: "icon-search",
                                          })
                                        )
                                      )
                                    ),
                                    s.a.createElement(
                                      "div",
                                      { className: "user-block-list" },
                                      s.a.createElement(
                                        "div",
                                        null,
                                        a.map(function (t) {
                                          return s.a.createElement(
                                            "div",
                                            {
                                              className: "user-block",
                                              key: t.identity,
                                              onClick: function (a) {
                                                return e.onMemberClick(t);
                                              },
                                            },
                                            s.a.createElement(
                                              "div",
                                              { className: "user-block__pic" },
                                              s.a.createElement("img", {
                                                src: e.getUserAvatarImage(
                                                  t,
                                                  "profile_picture"
                                                ),
                                                alt: "",
                                              }),
                                              null != e.state.replied[t.id] &&
                                                s.a.createElement("span", {
                                                  className:
                                                    1 == e.state.replied[t.id]
                                                      ? ""
                                                      : "user-block__dnd",
                                                })
                                            ),
                                            s.a.createElement(
                                              "span",
                                              { className: "user-block__name" },
                                              "null" === t.name ? t.id : t.name
                                            ),
                                            s.a.createElement("br", null),
                                            s.a.createElement("br", null),
                                            s.a.createElement(
                                              "div",
                                              {
                                                className: "blocks font-sm-12",
                                              },
                                              ""
                                            )
                                          );
                                        })
                                      )
                                    )
                                  )
                                )
                              )
                            )
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
        T = (a(363), { Both: 0, publicChat: 1, privateChat: 2 }),
        U = (function (e) {
          Object(o.a)(a, e);
          var t = Object(u.a)(a);
          function a() {
            var e;
            Object(r.a)(this, a);
            for (var n = arguments.length, s = new Array(n), i = 0; i < n; i++)
              s[i] = arguments[i];
            return (
              ((e = t.call.apply(t, [this].concat(s))).state = {
                user: null,
                type: T.Both,
                user_Name: "",
                email: "",
                canEnter: !0,
              }),
              (e.getURLPARAM = function () {
                var t = window.location.href.split("?")[1];
                if (t)
                  switch (t) {
                    case "public":
                      e.setState({ type: T.publicChat });
                      break;
                    case "private":
                      e.setState({ type: T.privateChat });
                      break;
                    default:
                      e.setState({ type: T.Both });
                  }
              }),
              e
            );
          }
          return (
            Object(l.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  f.onAuthStateChanged(function (t) {
                    t
                      ? (e.getURLPARAM(),
                        console.log(t.uid),
                        e.setState({
                          user: {
                            id: t.email,
                            name: t.displayName,
                            photoURL: t.photoURL,
                          },
                        }))
                      : (e.getURLPARAM(),
                        f.signInWithEmailAndPassword(
                          "anant@dj.com",
                          "anant@dj.com123456"
                        ));
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  return (
                    console.log("chat-techcircle-antzy", this.state.user),
                    s.a.createElement(
                      s.a.Fragment,
                      null,
                      this.state.canEnter
                        ? null !== this.state.user &&
                            s.a.createElement(
                              w,
                              {
                                channel: {
                                  id: "chat-techcircle-antzy",
                                  name: "Public Chat Room",
                                },
                                user: {
                                  id: this.state.user.id,
                                  name: this.state.user.name,
                                  uimage: this.state.user.photoURL,
                                },
                                type: this.state.type,
                              },
                              " "
                            )
                        : s.a.createElement(s.a.Fragment, null)
                    )
                  );
                },
              },
            ]),
            a
          );
        })(n.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      c.a.render(
        s.a.createElement(s.a.StrictMode, null, s.a.createElement(U, null)),
        document.getElementById("rootchat")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
  },
  [[180, 1, 2]],
]);
//# sourceMappingURL=main.ee5285b0.chunk.js.map
