(this["webpackJsonppublic-chat"] = this["webpackJsonppublic-chat"] || []).push([
  [0],
  {
    169: function (e, t, a) {
      e.exports = a(346);
    },
    174: function (e, t, a) {},
    175: function (e, t, a) {},
    267: function (e, t) {},
    304: function (e, t) {},
    346: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        s = a.n(n),
        c = a(167),
        i = a.n(c),
        r = (a(174), a(53)),
        l = a(75),
        o = a(78),
        u = a(77),
        m = (a(175), a(76)),
        d = a(168),
        h = a.n(d),
        b = a(18),
        g = a.n(b);
      a(339), a(341), a(347), a(344);
      g.a.initializeApp({
        apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
        authDomain: "optum-cdcd7.firebaseapp.com",
        databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
        projectId: "optum-cdcd7",
        storageBucket: "optum-cdcd7.appspot.com",
        messagingSenderId: "33244416026",
        appId: "1:33244416026:web:cd039c460016444059a9a3",
        measurementId: "G-ZR8NLSNB91"
      });
      var v = g.a.auth(),
        f = g.a.firestore(),
        p =
          (g.a.storage(),
          g.a.database(),
          g.a.database,
          g.a.firestore.FieldValue),
        C = (function (e) {
          Object(o.a)(a, e);
          var t = Object(u.a)(a);
          function a(e) {
            var n;
            return (
              Object(r.a)(this, a),
              ((n = t.call(this, e)).state = {
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
                activeTab: "tab1",
                activeMember: null,
                searchText: "",
                chatuser: null,
                notifyEmail: "",
              }),
              (n.handleError = function (e) {
                console.error(e), n.setState({ error: "Could not load chat." });
              }),
              (n.setupChatClient = function (e) {
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
                      Object(m.a)(n);
                      n.setState({ isLoading: !1 }),
                        n.state.publicChannel.getMessages().then(function (e) {
                          return n.messagesLoaded(n.state.publicChannel, e, !0);
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
                  var c = s[e.sid][t.items.length - 1];
                  c.user.name == n.user.name
                    ? n.handleOnline(e, c, !0)
                    : n.handleOnline(e, c, !1);
                }
                a && n.activateChannel(e);
              }),
              (n.SaveForNotify = function (e) {
                f.collection("ChatNotification")
                  .doc(e)
                  .get()
                  .then(function (t) {
                    t.exists
                      ? f
                          .collection("ChatNotification")
                          .doc(e)
                          .update({ notify_to: e, date: Date.now() })
                      : f
                          .collection("ChatNotification")
                          .doc(e)
                          .set({ notify_to: e, date: Date.now() });
                  })
                  .catch(function (e) {
                    console.log("Error getting document:", e);
                  });
              }),
              (n.PublicMessageAddedInFirebase = function (e, t) {
                f.collection("PublicChatData")
                  .doc()
                  .set({ date: p.serverTimestamp(), message: e, sentby: t })
                  .then(function () {
                    console.log("Success updating document:");
                  })
                  .catch(function (e) {
                    console.log("Error updating document:", e);
                  });
              }),
              (n.PrivateMessageAddedInFirebase = function (e, t, a, n) {
                f.collection("PrivateChatData")
                  .doc()
                  .set({
                    date: p.serverTimestamp(),
                    message: e,
                    msgbetween: t,
                    reciever: a,
                    sender: n,
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
                  console.log(t),
                  console.log(e.sid),
                  a[e.sid] || (a[e.sid] = []),
                  a[e.sid].push(t),
                  console.log(a[e.sid]),
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
                  c = e.uniqueName.split(",").filter(function (e) {
                    return e != n.user.id;
                  })[0];
                1 == a ? delete s[c] : (s[c] = a), n.setState({ replied: s });
                var i = n.state.lastMessageTime;
                (i[c] = t.timestamp), n.setState({ lastMessageTime: i });
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
                  (n.message.current.value = ""),
                  n.setState({
                    activeMessages: n.state.messages[n.state.activeChannel.sid],
                  }));
              }),
              (n.onMemberClick = function (e) {
                var t = [e.id, n.user.id];
                t.sort();
                var a = t.join();
                null == n.state.channels[a]
                  ? n.setupChannel(n.client, a, e)
                  : (n.activateChannel(n.state.channels[a]),
                    n.setState({ activeMember: e }));
              }),
              (n.setupChannel = function (e, t, a) {
                (n.client = e),
                  n.client
                    .getChannelByUniqueName(t)
                    .then(function (e) {
                      return e;
                    })
                    .catch(function (e) {
                      if (50300 === e.body.code)
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
                        n.channel.invite(a.identity).catch(function (e) {
                          return console.log(e);
                        });
                      } catch (e) {}
                      n.subscribeChannel(n.channel),
                        n.setState({ activeMember: a });
                    })
                    .catch(n.handleError);
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
                console.log("scroll");
                var e =
                  n.messageDiv.current.scrollHeight -
                  n.messageDiv.current.clientHeight;
                n.messageDiv.current.scrollTop = e > 0 ? e : 0;
              }),
              (n.onSearchTextChange = function (e) {
                n.setState({ searchText: e });
              }),
              (n.user = {
                channelId: e.channel.id,
                channelName: e.channel.name,
                id: e.user.id,
                name: e.user.name,
              }),
              (n.message = s.a.createRef()),
              (n.messageDiv = s.a.createRef()),
              n
            );
          }
          return (
            Object(l.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  v.onAuthStateChanged(function (t) {
                    t
                      ? (console.log(t.uid),
                        e.setState({
                          chatuser: { email: t.email, name: t.displayName },
                        }))
                      : e.setState({
                          chatuser: {
                            email: "TestUser3@dd.com",
                            name: "TestUser3",
                          },
                        });
                  }),
                    fetch(
                      "https://twilio-chat-api-dot-virtualeventdemo.el.r.appspot.com/chat/token",
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
                        return h.a.create(e.token);
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
                      s.a.createElement("img", {
                        alt: "loader",
                        src: "/assets/images/Loader.gif",
                      })
                    );
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
                      });
                  return s.a.createElement(
                    s.a.Fragment,
                    null,
                    s.a.createElement(
                      "div",
                      { className: "wrapper h-100" },
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
                                    src: "assets/images/Profile-picture.png",
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
                                    return e.onSearchTextChange(t.target.value);
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
                                      key: t.id,
                                      onClick: function (a) {
                                        return e.onMemberClick(t);
                                      },
                                    },
                                    s.a.createElement(
                                      "div",
                                      { className: "user-block__pic" },
                                      s.a.createElement("img", {
                                        src: "assets/images/Profile-picture.png",
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
                                      t.name || t.id
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
                                            .uniqueName) == this.user.channelId
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
                                s.a.createElement(
                                  "div",
                                  { className: "user-block__pic" },
                                  s.a.createElement("img", {
                                    src: "assets/images/Profile-picture.png",
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
                                )
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
                                    this.state.activeMessages.map(function (t) {
                                      return s.a.createElement(
                                        "div",
                                        {
                                          className:
                                            "chat-section__message chat-section__message--".concat(
                                              e.user.id == t.user.id
                                                ? "sent"
                                                : "received"
                                            ),
                                          key: t.id,
                                        },
                                        e.user.id == t.user.id &&
                                          s.a.createElement(
                                            s.a.Fragment,
                                            null,
                                            " ",
                                            s.a.createElement(
                                              "span",
                                              {
                                                className: "chat-section__text",
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
                                                  src: "assets/images/Profile-picture-black.png",
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
                                                  src: "assets/images/Profile-picture-black.png",
                                                  alt: "",
                                                }),
                                                t.user.name
                                              )
                                            ),
                                            s.a.createElement(
                                              "span",
                                              {
                                                className: "chat-section__text",
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
                                            key: t.id,
                                            onClick: function (a) {
                                              return e.onMemberClick(t);
                                            },
                                          },
                                          s.a.createElement(
                                            "div",
                                            { className: "user-block__pic" },
                                            s.a.createElement("img", {
                                              src: "assets/images/Profile-picture-black.png",
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
                                            t.name || t.id
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
                  );
                },
              },
            ]),
            a
          );
        })(n.Component),
        E = (function (e) {
          Object(o.a)(a, e);
          var t = Object(u.a)(a);
          function a() {
            var e;
            Object(r.a)(this, a);
            for (var n = arguments.length, s = new Array(n), c = 0; c < n; c++)
              s[c] = arguments[c];
            return (
              ((e = t.call.apply(t, [this].concat(s))).state = { user: null }),
              e
            );
          }
          return (
            Object(l.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  v.onAuthStateChanged(function (t) {
                    t
                      ? (console.log(t.uid),
                        e.setState({
                          user: { id: t.email, name: t.displayName },
                        }))
                      : e.setState({
                          user: { id: "adminUser9@dd.com", name: "user" },
                        });
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    s.a.Fragment,
                    null,
                    null != this.state.user &&
                      s.a.createElement(
                        C,
                        {
                          channel: {
                            id: "R1rcmPublicChatRoomEvent",
                            name: "Public Chat",
                          },
                          user: {
                            id: this.state.user.id,
                            name: this.state.user.name,
                          },
                        },
                        " "
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
      i.a.render(
        s.a.createElement(s.a.StrictMode, null, s.a.createElement(E, null)),
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
  [[169, 1, 2]],
]);
//# sourceMappingURL=main.a932ee61.chunk.js.map
