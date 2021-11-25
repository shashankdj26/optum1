(this["webpackJsonphelpdesk-chat"] =
  this["webpackJsonphelpdesk-chat"] || []).push([
  [0],
  {
    169: function (e, t, a) {
      e.exports = a(347);
    },
    174: function (e, t, a) {},
    176: function (e, t, a) {
      e.exports = a.p + "static/media/logo.ee7cd8ed.svg";
    },
    177: function (e, t, a) {},
    184: function (e, t, a) {},
    275: function (e, t) {},
    312: function (e, t) {},
    347: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(0),
        n = a.n(s),
        c = a(166),
        r = a.n(c),
        i = (a(174), a(7)),
        l = a.n(i),
        o = a(167),
        m = a(51),
        u = a(73),
        d = a(52),
        h = a(75),
        g = a(74),
        p = (a(176), a(177), a(44)),
        v = a.n(p);
      a(178), a(180);
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
        _ = (a(184), a(168)),
        E = a.n(_),
        k = new Date();
      k.setMonth(k.getMonth() - 12);
      var N = (function (e) {
          Object(h.a)(a, e);
          var t = Object(g.a)(a);
          function a(e) {
            var s;
            return (
              Object(m.a)(this, a),
              ((s = t.call(this, e)).state = {
                error: null,
                isLoading: !0,
                messages: {},
                channels: [],
                activeChannel: null,
                activeMessages: [],
                replied: {},
                searchText: "",
              }),
              (s.handleError = function (e) {
                console.error(e), s.setState({ error: "Could not load chat." });
              }),
              (s.page = function (e) {
                s.setState({ isLoading: !1 });
                var t = s.state.channels;
                (t = t.concat(e.items)),
                  s.setState({ channels: t }),
                  e.items.forEach(function (e) {
                    return s.subscribeChannelMessages(e);
                  }),
                  e.hasNextPage &&
                    e.nextPage().then(function (e) {
                      return s.page(e);
                    });
              }),
              (s.setupChatClient = function (e) {
                (s.client = e),
                  s.client.getSubscribedChannels().then(function (e) {
                    s.page(e);
                  }),
                  s.client.on("channelInvited", function (e) {
                    e.join();
                    var t = s.state.channels;
                    t.push(e),
                      s.setState({ channels: t }),
                      s.subscribeChannelMessages(e);
                  });
              }),
              (s.subscribeChannelMessages = function (e) {
                e.getMessages().then(function (t) {
                  return s.messagesLoaded(e, t);
                }),
                  e.on("messageAdded", function (t) {
                    return s.messageAdded(e, t);
                  });
              }),
              (s.twilioMessageToMessage = function (e) {
                return {
                  id: e.sid,
                  text: e.body,
                  user: e.attributes.user || {},
                  timestamp: e.timestamp,
                };
              }),
              (s.messagesLoaded = function (e, t) {
                var a = s.state.messages;
                ((a[e.sid] = t.items.map(s.twilioMessageToMessage)),
                s.setState({ messages: a }),
                t.items.length > 0) &&
                  (a[e.sid][t.items.length - 1].user.name == s.user.name
                    ? s.handleOnline(e, !0)
                    : s.handleOnline(e, !1));
              }),
              (s.messageAdded = function (e, t) {
                if (null == s.previousMessage) s.previousMessage = t;
                else if (s.previousMessage.sid == t.sid) return;
                s.previousMessage = t;
                var a = s.state.messages;
                (t = s.twilioMessageToMessage(t)),
                  a[e.sid] || (a[e.sid] = []),
                  a[e.sid].push(t),
                  s.setState({ messages: a }),
                  t.user.name == s.user.name
                    ? s.handleOnline(e, !0)
                    : s.handleOnline(e, !1),
                  e.sid ==
                    (s.state.activeChannel && s.state.activeChannel.sid) &&
                    s.scroll(),
                  setInterval(function () {
                    var e = s.state.channels.sort(function (e, t) {
                      return (
                        (t.lastMessage ? t.lastMessage.dateCreated : k) -
                        (e.lastMessage ? e.lastMessage.dateCreated : k)
                      );
                    });
                    s.setState({ channels: e });
                  }, 1e3);
              }),
              (s.handleOnline = function (e, t) {
                var a = s.state.replied;
                (a[e.sid] = t), s.setState({ replied: a });
              }),
              (s.sendMessage = function () {
                s.message.current.value &&
                  s.state.activeChannel &&
                  (s.state.activeChannel.sendMessage(s.message.current.value, {
                    user: s.user,
                  }),
                  s.handleOnline(s.state.activeChannel, !0),
                  (s.message.current.value = ""));
              }),
              (s.scroll = function () {
                var e =
                  s.messageDiv.current.scrollHeight -
                  s.messageDiv.current.clientHeight;
                s.messageDiv.current.scrollTop = e > 0 ? e : 0;
              }),
              (s.onChannelClick = function (e) {
                s.setState({ activeChannel: e }),
                  s.setState({ activeMessages: s.state.messages[e.sid] }),
                  setTimeout(s.scroll, 500);
              }),
              (s.onSearchTextChange = function (e) {
                s.setState({ searchText: e });
              }),
              (s.user = { id: e.user.id, name: e.user.name }),
              (s.message = n.a.createRef()),
              (s.messageDiv = n.a.createRef()),
              (s.search = n.a.createRef()),
              (window.desk = Object(d.a)(s)),
              s
            );
          }
          return (
            Object(u.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  fetch(
                    "https://twilio-chat-api-dot-virtualeventdemo.el.r.appspot.com/chat/token",
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      method: "POST",
                      body: "identity=".concat(
                        encodeURIComponent(this.user.id)
                      ),
                    }
                  )
                    .then(function (e) {
                      return e.json();
                    })
                    .then(function (e) {
                      return E.a.create(e.token);
                    })
                    .then(this.setupChatClient)
                    .catch(this.handleError);
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
                    return n.a.createElement("p", null, this.state.error);
                  if (this.state.isLoading)
                    return n.a.createElement("p", null, "Loading chat...");
                  var t = this.state.searchText,
                    a = this.state.channels
                      .filter(function (e) {
                        return (
                          "" == t ||
                          (e.friendlyName || "")
                            .toLocaleLowerCase()
                            .includes(t.toLocaleLowerCase())
                        );
                      })
                      .sort(function (e, t) {
                        return (
                          (t.lastMessage ? t.lastMessage.dateCreated : k) -
                          (e.lastMessage ? e.lastMessage.dateCreated : k)
                        );
                      });
                  return n.a.createElement(
                    n.a.Fragment,
                    null,
                    n.a.createElement(
                      "div",
                      { className: "wrapper h-100" },
                      n.a.createElement(
                        "div",
                        { className: "contentCntr" },
                        n.a.createElement(
                          "aside",
                          { className: "sidebar" },
                          n.a.createElement(
                            "div",
                            { className: "sidebar__header" },
                            n.a.createElement(
                              "div",
                              { className: "sidebar__user" },
                              n.a.createElement(
                                "div",
                                { className: "user-block" },
                                n.a.createElement(
                                  "div",
                                  { className: "user-block__pic" },
                                  n.a.createElement("img", {
                                    src: "assets/images/Profile-picture.png",
                                    alt: "",
                                  }),
                                  n.a.createElement("span", {
                                    className: "user-block__online",
                                  })
                                ),
                                n.a.createElement(
                                  "span",
                                  { className: "user-block__name" },
                                  "HelpDesk"
                                )
                              )
                            ),
                            n.a.createElement(
                              "a",
                              { href: "#", className: "sidebar__link" },
                              "Chat Room"
                            )
                          ),
                          n.a.createElement(
                            "div",
                            { className: "sidebar__body" },
                            n.a.createElement(
                              "div",
                              { className: "search-block" },
                              n.a.createElement(
                                "div",
                                { className: "search-block__form" },
                                n.a.createElement("input", {
                                  className: "search-block__input",
                                  type: "text",
                                  placeholder: "Search",
                                  ref: this.search,
                                  onChange: function (t) {
                                    return e.onSearchTextChange(t.target.value);
                                  },
                                }),
                                n.a.createElement(
                                  "button",
                                  { className: "search-block__btn" },
                                  n.a.createElement("i", {
                                    className: "icon-search",
                                  })
                                )
                              )
                            ),
                            n.a.createElement(
                              "div",
                              { className: "user-block-list" },
                              n.a.createElement(
                                "div",
                                null,
                                a.map(function (t) {
                                  return n.a.createElement(
                                    "div",
                                    {
                                      className: "user-block",
                                      key: t.sid,
                                      onClick: function (a) {
                                        return e.onChannelClick(t);
                                      },
                                    },
                                    n.a.createElement(
                                      "div",
                                      { className: "user-block__pic" },
                                      n.a.createElement("img", {
                                        src: "assets/images/Profile-picture.png",
                                        alt: "",
                                      }),
                                      n.a.createElement("span", {
                                        className:
                                          1 == e.state.replied[t.sid]
                                            ? "user-block__dnd"
                                            : "user-block__online",
                                      })
                                    ),
                                    n.a.createElement(
                                      "span",
                                      { className: "user-block__name" },
                                      t.friendlyName
                                    )
                                  );
                                })
                              )
                            )
                          )
                        ),
                        n.a.createElement(
                          "section",
                          { className: "chat-container" },
                          n.a.createElement(
                            "div",
                            { className: "chat-section" },
                            n.a.createElement(
                              "div",
                              { className: "chat-section__header" },
                              n.a.createElement(
                                "div",
                                { className: "user-block" },
                                n.a.createElement(
                                  "div",
                                  { className: "user-block__pic" },
                                  n.a.createElement("img", {
                                    src: "assets/images/Profile-picture.png",
                                    alt: "",
                                  })
                                ),
                                n.a.createElement(
                                  "span",
                                  { className: "user-block__name" },
                                  this.state.activeChannel &&
                                    this.state.activeChannel.attributes &&
                                    this.state.activeChannel.attributes.name
                                )
                              )
                            ),
                            n.a.createElement(
                              "div",
                              {
                                className: "chat-section__body",
                                ref: this.messageDiv,
                              },
                              this.state.activeMessages &&
                                this.state.activeMessages.map(function (t) {
                                  return n.a.createElement(
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
                                      n.a.createElement(
                                        n.a.Fragment,
                                        null,
                                        " ",
                                        n.a.createElement(
                                          "span",
                                          { className: "chat-section__text" },
                                          t.text
                                        ),
                                        n.a.createElement(
                                          "span",
                                          {
                                            className: "chat-section__profile",
                                          },
                                          n.a.createElement(
                                            "span",
                                            {
                                              className:
                                                "chat-section__profile__pic",
                                            },
                                            n.a.createElement("img", {
                                              src: "assets/images/Profile-picture-black.png",
                                              alt: "",
                                            })
                                          ),
                                          t.user.name
                                        )
                                      ),
                                    e.user.id != t.user.id &&
                                      n.a.createElement(
                                        n.a.Fragment,
                                        null,
                                        n.a.createElement(
                                          "span",
                                          {
                                            className: "chat-section__profile",
                                          },
                                          n.a.createElement(
                                            "span",
                                            {
                                              className:
                                                "chat-section__profile__pic",
                                            },
                                            n.a.createElement("img", {
                                              src: "assets/images/Profile-picture-black.png",
                                              alt: "",
                                            }),
                                            t.user.name
                                          )
                                        ),
                                        n.a.createElement(
                                          "span",
                                          { className: "chat-section__text" },
                                          t.text
                                        )
                                      )
                                  );
                                })
                            ),
                            n.a.createElement(
                              "div",
                              { className: "chat-section__footer" },
                              n.a.createElement(
                                "div",
                                { className: "chat-section__form" },
                                n.a.createElement("input", {
                                  ref: this.message,
                                  type: "text",
                                  className: "chat-section__input",
                                  placeholder: "Type a Message",
                                  onKeyPress: function (t) {
                                    return (
                                      "Enter" === t.key && e.sendMessage(t)
                                    );
                                  },
                                }),
                                n.a.createElement(
                                  "button",
                                  {
                                    onClick: function (t) {
                                      return e.sendMessage(t);
                                    },
                                    className: "chat-section__btn",
                                  },
                                  n.a.createElement("i", {
                                    className: "icon-send",
                                  })
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
        })(s.Component),
        C = (function (e) {
          Object(h.a)(a, e);
          var t = Object(g.a)(a);
          function a(e) {
            var s;
            return (
              Object(m.a)(this, a),
              ((s = t.call(this, e)).checkForAdminUser = (function () {
                var e = Object(o.a)(
                  l.a.mark(function e(t) {
                    var a;
                    return l.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                console.log(t),
                                (e.next = 4),
                                b
                                  .collection("helpdesk")
                                  .where("members", "array-contains", t)
                                  .get()
                              );
                            case 4:
                              void 0 !== (a = e.sent) &&
                                (a.empty
                                  ? (console.log("redirect"),
                                    console.log("not admin"))
                                  : (console.log("admin"),
                                    s.setState({ checking: !1 }))),
                                (e.next = 11);
                              break;
                            case 8:
                              (e.prev = 8),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
                            case 11:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 8]]
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (s.login = function () {
                f.signInWithEmailAndPassword(
                  "akumar113@r1rcm.com",
                  "akumar113@r1rcm.com123456"
                )
                  .then(function (e) {
                    console.log(e);
                  })
                  .catch(function (e) {
                    console.log(e);
                  });
              }),
              (s.redirect = function () {}),
              (s.state = { checking: !0 }),
              (window.bypass = Object(d.a)(s)),
              (s.canRedirect = !0),
              s
            );
          }
          return (
            Object(u.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this,
                    t = this;
                  this.listener = f.onAuthStateChanged(function (a) {
                    a
                      ? (console.log(a.email), t.checkForAdminUser(a.uid))
                      : (console.log("user not logged in--"), e.login());
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  return n.a.createElement(
                    n.a.Fragment,
                    null,
                    this.state.checking
                      ? n.a.createElement(
                          "div",
                          { className: "loaderB" },
                          n.a.createElement("img", {
                            src: "assets/images/loader.gif",
                            alt: "Loader",
                            width: "50",
                          })
                        )
                      : n.a.createElement(
                          N,
                          { user: { id: "HelpDesk-r1rcm", name: "HelpDesk" } },
                          " "
                        )
                  );
                },
              },
            ]),
            a
          );
        })(s.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      r.a.render(
        n.a.createElement(n.a.StrictMode, null, n.a.createElement(C, null)),
        document.getElementById("root")
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
//# sourceMappingURL=main.f546945e.chunk.js.map
