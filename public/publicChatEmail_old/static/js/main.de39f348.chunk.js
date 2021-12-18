(this.webpackJsonpilex_chat = this.webpackJsonpilex_chat || []).push([
  [0],
  {
    38: function (e, t, n) {},
    47: function (e, t, n) {},
    48: function (e, t, n) {},
    50: function (e, t, n) {},
    51: function (e, t, n) {},
    52: function (e, t, n) {
      "use strict";
      n.r(t);
      var c = n(3),
        a = n.n(c),
        r = n(14),
        s = n.n(r),
        i = (n(38), n(4)),
        o = n.n(i),
        l = n(6),
        u = n(8),
        d = n(7),
        p = n(13),
        f = n(17);
      n(39), n(54), n(41), n(53), n(55);
      f.a.initializeApp({
        apiKey: "AIzaSyCi_y6t63OqbHG1KJlxmzzLYVYgq-vqksI",
        authDomain: "herovirtual22.firebaseapp.com",
        projectId: "herovirtual22",
        storageBucket: "herovirtual22.appspot.com",
        messagingSenderId: "1094006397159",
        appId: "1:1094006397159:web:bf387462f37e9d9ff0ea42",
        measurementId: "G-2Y17CRXF3M",
      });
      var b = f.a,
        j = f.a.firestore(),
        h = f.a.database(),
        m = (f.a.analytics(), f.a.auth());
      var v = "usersTable",
        x =
          "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
        O = "user_status",
        g = "roomsList",
        y = "roomMessages",
        N = "roomMetadata",
        w = "userNotification",
        k = "roomTypingStatus",
        S = "IncallPresence",
        C = function (e) {
          var t = { StateMode: "online" },
            n = h.ref("/chat/" + O + "/" + e.uid);
          n.onDisconnect()
            .remove()
            .then(function () {
              var c;
              n.set(
                Object(u.a)(
                  Object(u.a)({}, t),
                  {},
                  {
                    name: null !== (c = e.displayName) && void 0 !== c ? c : "",
                    id: e.uid,
                  }
                )
              );
            });
        };
      function _(e) {
        return P.apply(this, arguments);
      }
      function P() {
        return (P = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt(
                      "return",
                      new Promise(function (e, n) {
                        var c = h.ref("/chat/".concat(v, "/").concat(t.uid));
                        c.once(
                          "value",
                          (function () {
                            var n = Object(l.a)(
                              o.a.mark(function n(a) {
                                var r;
                                return o.a.wrap(function (n) {
                                  for (;;)
                                    switch ((n.prev = n.next)) {
                                      case 0:
                                        return (
                                          (r = {
                                            userName: t.displayName,
                                            fullName: t.displayName,
                                            name: t.displayName,
                                            id: t.uid,
                                            email: t.email,
                                          }),
                                          (r = t.photoURL
                                            ? Object(u.a)(
                                                Object(u.a)({}, r),
                                                {},
                                                { profile_picture: t.photoURL }
                                              )
                                            : Object(u.a)(
                                                Object(u.a)({}, r),
                                                {},
                                                { profile_picture: x }
                                              )),
                                          (n.next = 4),
                                          c.set(r)
                                        );
                                      case 4:
                                        e();
                                      case 5:
                                      case "end":
                                        return n.stop();
                                    }
                                }, n);
                              })
                            );
                            return function (e) {
                              return n.apply(this, arguments);
                            };
                          })(),
                          function (e) {
                            console.log(e), n(e);
                          }
                        );
                      })
                    );
                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function I() {
        return (I = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    h.ref("/chat/".concat(O)).on(
                      "value",
                      (function () {
                        var e = Object(l.a)(
                          o.a.mark(function e(n) {
                            return o.a.wrap(function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    n.exists()
                                      ? t && t(n.val())
                                      : t && t([], { code: "NotFound" });
                                  case 1:
                                  case "end":
                                    return e.stop();
                                }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })(),
                      function (e) {
                        t && t([], e);
                      }
                    );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function R() {
        return (R = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    h.ref("/chat/".concat(v))
                      .orderByChild("email")
                      .on(
                        "value",
                        (function () {
                          var e = Object(l.a)(
                            o.a.mark(function e(n) {
                              var c, a;
                              return o.a.wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      n.exists()
                                        ? ((c = {}),
                                          (a = 1),
                                          n.forEach(function (e) {
                                            (c[
                                              "".concat(a, "-").concat(e.key)
                                            ] = e.val()),
                                              a++;
                                          }),
                                          t && t(c))
                                        : t && t([], { code: "NotFound" });
                                    case 1:
                                    case "end":
                                      return e.stop();
                                  }
                              }, e);
                            })
                          );
                          return function (t) {
                            return e.apply(this, arguments);
                          };
                        })(),
                        function (e) {
                          t && t([], e);
                        }
                      );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function A(e, t, n) {
        h.ref("/chat/".concat(k, "/").concat(e, "/")).update(
          Object(p.a)({}, t, n)
        );
      }
      var M = function (e, t, n) {
          var c = { StateMode: "online" },
            a = h.ref("/chat/".concat(S, "/").concat(t, "/").concat(e.uid)),
            r = a.onDisconnect();
          r.remove().then(function () {
            var t;
            a.set(
              Object(u.a)(
                Object(u.a)({}, c),
                {},
                {
                  name: null !== (t = e.displayName) && void 0 !== t ? t : "",
                  id: e.uid,
                }
              )
            );
          });
        },
        D = function (e, t) {
          h.ref("/chat/".concat(S, "/").concat(t, "/").concat(e.uid)).remove();
        },
        T = function (e, t, n) {
          var c = h.ref("/chat/".concat(S, "/").concat(e));
          c.on(
            "value",
            (function () {
              var e = Object(l.a)(
                o.a.mark(function e(t) {
                  return o.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          t.exists()
                            ? n && n(t.val())
                            : n &&
                              n([], {
                                code: "NotFound",
                                message: "No notification found",
                              });
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
            function (e) {
              n && n([], e);
            }
          );
        },
        F = (function () {
          var e =
              "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
            t = 0,
            n = [];
          return function () {
            var c = new Date().getTime(),
              a = c === t;
            t = c;
            for (var r = new Array(8), s = 7; s >= 0; s--)
              (r[s] = e.charAt(c % 64)), (c = Math.floor(c / 64));
            if (0 !== c)
              throw new Error("We should have converted the entire timestamp.");
            var i = r.join("");
            if (a) {
              for (s = 11; s >= 0 && 63 === n[s]; s--) n[s] = 0;
              n[s]++;
            } else
              for (s = 0; s < 12; s++) n[s] = Math.floor(64 * Math.random());
            for (s = 0; s < 12; s++) i += e.charAt(n[s]);
            if (20 != i.length) throw new Error("Length should be 20.");
            return i;
          };
        })();
      var L = ["user-profile__image--red", "user-profile__image--green", " "],
        X = ["chat-user-title--red", "chat-user-title--green", " "];
      function E(e) {
        var t = "",
          n = e.trim().split(" ");
        return (
          n.length > 0
            ? n.forEach(function (e) {
                t += e[0];
              })
            : (t = e[0]),
          t.toUpperCase()
        );
      }
      var B = function (e, t) {
          e.sort(function (e, n) {
            return n[t] - e[t];
          });
        },
        q = n(2),
        U = Object(c.createContext)();
      function W(e) {
        var t = Object(c.useState)(
            JSON.parse(localStorage.getItem("userAuth"))
          ),
          n = Object(d.a)(t, 2),
          a = n[0],
          r = n[1];
        return (
          Object(c.useEffect)(function () {
            (window.parent.loginUser = function (e, t) {
              !(function (e, t) {
                m.signInWithEmailAndPassword(e, t)
                  .then(function (e) {
                    console.log(e);
                  })
                  .catch(function (e) {
                    return console.log(e);
                  })
                  .finally(function (e) {
                    return console.log(e, "finaly");
                  });
              })(e, t);
            }),
              m.onAuthStateChanged(
                (function () {
                  var e = Object(l.a)(
                    o.a.mark(function e(t) {
                      return o.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!t) {
                                e.next = 9;
                                break;
                              }
                              return (
                                console.log(t.email, t.displayName),
                                localStorage.setItem(
                                  "userAuth",
                                  JSON.stringify(t)
                                ),
                                (e.next = 5),
                                _(t)
                              );
                            case 5:
                              C(t),
                                r(
                                  Object(u.a)(
                                    Object(u.a)({}, t),
                                    {},
                                    { isChecked: !0 }
                                  )
                                ),
                                (e.next = 11);
                              break;
                            case 9:
                              localStorage.removeItem("userAuth"), r(null);
                            case 11:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              );
          }, []),
          Object(q.jsx)(U.Provider, {
            value: { user: a },
            children: e.children,
          })
        );
      }
      var H = Object(c.createContext)(),
        V = 0,
        J = 1,
        z = 2,
        Q = 3,
        K = function (e) {
          Object(c.useContext)(U).user;
          var t = Object(c.useState)(V),
            n = Object(d.a)(t, 2),
            a = n[0],
            r = n[1],
            s = Object(c.useState)(!0),
            i = Object(d.a)(s, 2),
            o = i[0],
            l = i[1],
            u = Object(c.useState)(!1),
            p = Object(d.a)(u, 2),
            f = p[0],
            b = p[1],
            j = Object(c.useRef)(
              localStorage.getItem("participantColor")
                ? JSON.parse(localStorage.getItem("participantColor"))
                : {}
            );
          Object(c.useEffect)(function () {
            var e = new URLSearchParams(window.location.search);
            "true" === e.get("showPoll") && l(!1),
              "true" === e.get("pollAdmin") && b(!0);
          }, []);
          return Object(q.jsx)(H.Provider, {
            value: {
              activeMenu: a,
              setActiveMenu: r,
              hidePoll: o,
              isPollAdmin: f,
              getParticipantColorNumber: function (e) {
                var t = j.current;
                if (!t.hasOwnProperty(e)) {
                  var n = Math.floor(3 * Math.random());
                  (t[e] = n),
                    localStorage.setItem(
                      "participantColor",
                      JSON.stringify(j.current)
                    );
                }
                return t[e];
              },
            },
            children: e.children,
          });
        },
        G = Object(c.createContext)();
      function Z(e) {
        var t = Object(c.useContext)(U).user,
          n = Object(c.useState)({}),
          a = Object(d.a)(n, 2),
          r = a[0],
          s = a[1],
          i = Object(c.useState)({}),
          p = Object(d.a)(i, 2),
          f = p[0],
          b = p[1],
          j = Object(c.useState)(null),
          m = Object(d.a)(j, 2),
          v = m[0],
          x = m[1],
          O = Object(c.useState)({}),
          g = Object(d.a)(O, 2),
          y = g[0],
          k = g[1],
          S = Object(c.useState)(null),
          C = Object(d.a)(S, 2),
          _ = C[0],
          P = C[1],
          A = Object(c.useState)({ status: !1, data: null }),
          F = Object(d.a)(A, 2),
          L = F[0],
          X = F[1],
          E = Object(c.useState)({ status: !1, roomId: "", roomName: "" }),
          W = Object(d.a)(E, 2),
          V = W[0],
          J = W[1],
          z = Object(c.useState)(!1),
          Q = Object(d.a)(z, 2),
          K = Q[0],
          Z = Q[1],
          Y = Object(c.useState)("public-room-test"),
          $ = Object(d.a)(Y, 2),
          ee = $[0],
          te = $[1],
          ne = Object(c.useRef)(null),
          ce = Object(c.useRef)(null),
          ae = (Object(c.useRef)(null), Object(c.useRef)(null)),
          re = Object(c.useRef)(null),
          se = Object(c.useRef)(null),
          ie = Object(c.useState)({}),
          oe = Object(d.a)(ie, 2),
          le = oe[0],
          ue = oe[1],
          de = Object(c.useContext)(H).activeMenu,
          pe = Object(c.useRef)(0);
        Object(c.useEffect)(
          function () {
            pe.current = de;
          },
          [de]
        ),
          Object(c.useEffect)(
            function () {
              if (t) {
                window.parent.toggleIncallChat = function (e) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "test-incallChat",
                    c =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : "In Call Messages";
                  J({ status: e, roomId: n, roomName: c }),
                    e
                      ? ((se.current = n),
                        Z(!0),
                        T(n, re.current, function (e, t) {
                          if (t)
                            return (
                              console.error("Error in loading online users"),
                              void console.error(t)
                            );
                          console.log(e), ue(e);
                        }),
                        M(t, n, ae.current))
                      : (Z(!1),
                        re.current && re.current.off(),
                        ae.current && ae.current.cancel(),
                        se.current && (D(t, se.current), (se.current = null)),
                        ue({}));
                };
                var e = function (e) {
                    !(function (e, t, n) {
                      h.ref("/chat/".concat(N, "/").concat(t)).on(
                        "value",
                        (function () {
                          var e = Object(l.a)(
                            o.a.mark(function e(t) {
                              return o.a.wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      t.exists()
                                        ? n && n(t.val())
                                        : n &&
                                          n([], {
                                            code: "NotFound",
                                            message: "No Chat found",
                                          });
                                    case 1:
                                    case "end":
                                      return e.stop();
                                  }
                              }, e);
                            })
                          );
                          return function (t) {
                            return e.apply(this, arguments);
                          };
                        })(),
                        function (e) {
                          n && n([], e);
                        }
                      );
                    })(0, e, function (e, n) {
                      n
                        ? "NotFound" === n.code &&
                          (console.error(""), console.error(n))
                        : 1 !== pe.current &&
                          e.userId !== t.uid &&
                          (X({ status: !0, data: e }),
                          window.parent.notification &&
                            window.parent.notification({
                              type: "publicChat",
                              senderId: e.userId,
                              senderName: e.userName,
                              message: e.message,
                              room: e.room,
                            }));
                    });
                  },
                  n = new URLSearchParams(window.location.search).get(
                    "publicRoom"
                  );
                n ? (te(n), e(n)) : e(ee);
              }
              return function () {
                ae.current && ae.current.cancel();
              };
            },
            [t]
          ),
          Object(c.useEffect)(
            function () {
              var e, n;
              return (
                t &&
                  t.isChecked &&
                  (ne.current,
                  (e = t.uid),
                  (n = function (e, t) {
                    if (t) "NotFound" === t.code ? k({}) : console.error(t);
                    else if ((k(e), window.parent.notification)) {
                      var n = [];
                      if (
                        (Object.keys(e).forEach(function (t) {
                          n.push(
                            Object(u.a)(
                              Object(u.a)({}, e[t]),
                              {},
                              { userId: t }
                            )
                          );
                        }),
                        n.length > 0)
                      ) {
                        var c;
                        B(n, "createdAt");
                        var a = {
                          type: "privateChat",
                          senderId: n[0].userId,
                          senderName:
                            null !== (c = n[0].name) && void 0 !== c
                              ? c
                              : "Participant",
                          message: n[0].message,
                          room: n[0].roomId,
                          count: n[0].count,
                        };
                        window.parent.notification &&
                          window.parent.notification(a);
                      }
                    }
                  }),
                  h.ref("/chat/".concat(w, "/").concat(e)).on(
                    "value",
                    (function () {
                      var e = Object(l.a)(
                        o.a.mark(function e(t) {
                          return o.a.wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  t.exists()
                                    ? n && n(t.val())
                                    : n &&
                                      n([], {
                                        code: "NotFound",
                                        message: "No notification found",
                                      });
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function (t) {
                        return e.apply(this, arguments);
                      };
                    })(),
                    function (e) {
                      n && n([], e);
                    }
                  ),
                  (function (e, t, n) {
                    h.ref("/chat/".concat(N, "/").concat(t))
                      .orderByChild("createdAt")
                      .on(
                        "value",
                        (function () {
                          var e = Object(l.a)(
                            o.a.mark(function e(t) {
                              return o.a.wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      t.exists()
                                        ? n && n(t.val())
                                        : n &&
                                          n([], {
                                            code: "noStatus",
                                            message: "No Typing Status found",
                                          });
                                    case 1:
                                    case "end":
                                      return e.stop();
                                  }
                              }, e);
                            })
                          );
                          return function (t) {
                            return e.apply(this, arguments);
                          };
                        })(),
                        function (e) {
                          n && n([], e);
                        }
                      );
                  })(ce.current, t.uid, function (e, n) {
                    if (n) console.error(n);
                    else {
                      var c = [];
                      if (
                        (Object.keys(e).forEach(function (n) {
                          var a = e[n],
                            r = a.participants.filter(function (e) {
                              return e !== t.uid;
                            })[0];
                          if (r) {
                            var s = a[r];
                            c.push({
                              otherParticipant: { id: r, name: s },
                              createdAt: a.createdAt,
                              message: a.message,
                              senderName: a.name,
                              senderId: a.id,
                            });
                          }
                        }),
                        B(c, "createdAt"),
                        c.length > 5)
                      ) {
                        var a = [c[0], c[1], c[2], c[3], c[4]];
                        P(a);
                      } else P(c);
                    }
                  }),
                  (function (e) {
                    I.apply(this, arguments);
                  })(function (e, t) {
                    if (t)
                      return (
                        console.error("Error in loading online users"),
                        void console.error(t)
                      );
                    s(e);
                  }),
                  (function (e) {
                    R.apply(this, arguments);
                  })(function (e, t) {
                    if (t)
                      return (
                        console.error("Error in loading online users"),
                        void console.error(t)
                      );
                    b(e);
                  })),
                function () {
                  ne.current && ne.current.off();
                }
              );
            },
            [t]
          );
        var fe = (function () {
          var e = Object(l.a)(
            o.a.mark(function e(n) {
              return o.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (c = t.uid),
                        (a = n.id),
                        x({
                          roomId: c > a ? c + "+" + a : a + "+" + c,
                          participant: n,
                        });
                    case 2:
                    case "end":
                      return e.stop();
                  }
                var c, a;
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })();
        return Object(q.jsx)(G.Provider, {
          value: {
            onlineUserslist: r,
            openChatWithUser: fe,
            activeRoom: v,
            closePreviousChatRoom: function () {
              x(null);
            },
            unseenMessageMetaData: y,
            userLastInteractedRoom: _,
            allParticipantList: f,
            publicRoomName: ee,
            publicNotification: L,
            setPublicNotification: X,
            incallChatActive: V,
            showInCallChat: K,
            setShowInCallChat: Z,
            inCallRoomParticipantList: le,
          },
          children: e.children,
        });
      }
      function Y() {
        var e = Object(c.useContext)(H),
          t = e.activeMenu,
          n = e.setActiveMenu,
          a = e.hidePoll,
          r = e.isPollAdmin,
          s = Object(c.useContext)(G),
          i = s.publicNotification,
          o = s.setPublicNotification;
        return Object(q.jsxs)("ul", {
          className: "sidebar__tabs",
          children: [
            Object(q.jsx)("li", {
              onClick: function () {
                return n(V);
              },
              children: Object(q.jsxs)("a", {
                className: t === V ? "active" : "",
                href: "#",
                children: [
                  Object(q.jsx)("i", { className: "icon-people" }),
                  " Participants",
                ],
              }),
            }),
            Object(q.jsx)("li", {
              onClick: function () {
                o({ status: !1, data: null }), n(J);
              },
              children: Object(q.jsxs)("a", {
                className: "".concat(t === J ? "active" : ""),
                href: "#",
                children: [
                  Object(q.jsx)("i", {
                    className: "".concat(
                      i.status ? "menu-notification" : "",
                      " icon-chat"
                    ),
                  }),
                  " Public Chat",
                ],
              }),
            }),
            !a &&
              Object(q.jsx)("li", {
                onClick: function () {
                  return n(z);
                },
                children: Object(q.jsxs)("a", {
                  className: t === z ? "active" : "",
                  href: "#",
                  children: [
                    Object(q.jsx)("i", { className: "icon-polls" }),
                    " Polls",
                  ],
                }),
              }),
            !a &&
              r &&
              Object(q.jsx)("li", {
                onClick: function () {
                  return n(Q);
                },
                children: Object(q.jsxs)("a", {
                  className: t === Q ? "active" : "",
                  href: "#",
                  children: [
                    Object(q.jsx)("i", { className: "icon-polls" }),
                    " Notification",
                  ],
                }),
              }),
          ],
        });
      }
      var $ = n(16),
        ee = n(26),
        te = n(27),
        ne = n(33),
        ce = n(32),
        ae = function (e) {
          var t = e.name,
            n = e.message,
            a = e.userId,
            r = e.time,
            s = Object(c.useContext)(H).getParticipantColorNumber,
            i = Object(c.useRef)(s(a));
          return Object(q.jsx)("div", {
            className: "chat-section__text",
            children: Object(q.jsxs)("div", {
              className: "chat-section__text-body",
              children: [
                Object(q.jsx)("h3", {
                  className: "chat-user-title ".concat(X[i.current], " "),
                  children: t,
                }),
                Object(q.jsx)("p", { children: n }),
                Object(q.jsx)("p", {
                  className: "chat-time",
                  children: Object(q.jsx)("small", {
                    children:
                      r &&
                      new Date(r).toLocaleTimeString("en-US", {
                        timeStyle: "short",
                      }),
                  }),
                }),
              ],
            }),
          });
        },
        re = a.a.memo(function (e) {
          var t = e.name,
            n = e.message,
            c = e.userId,
            a = e.time;
          return Object(q.jsx)("div", {
            className: "chat-section__message chat-section__message--received",
            children: Object(q.jsx)(ae, {
              name: t,
              message: n,
              userId: c,
              time: a,
            }),
          });
        }),
        se = a.a.memo(function (e) {
          var t = e.name,
            n = e.message,
            c = e.userId,
            a = e.time;
          return Object(q.jsx)("div", {
            className: "chat-section__message chat-section__message--sent",
            children: Object(q.jsx)(ae, {
              name: t,
              message: n,
              userId: c,
              time: a,
            }),
          });
        }),
        // ie = n.p + "static/media/arrow.4ad046c7.svg",
        ie = "assets/images/arrow.svg",
        oe = (function (e) {
          Object(ne.a)(n, e);
          var t = Object(ce.a)(n);
          function n(e) {
            var c;
            return (
              Object(ee.a)(this, n),
              ((c = t.call(this, e)).state = {
                messages: [],
                listenerCounter: 0,
                scrollProgress: !1,
                allowScrolling: !1,
                pageSize: 500,
                pageNumber: 0,
                initialScrollDone: !1,
                shouldAutoScroll: !0,
                firstTime: !0,
                typedMessage: "",
              }),
              (c.inputRef = a.a.createRef()),
              (c.handleScroll = function () {
                c.messageDiv.current.scrollHeight -
                  c.messageDiv.current.scrollTop >
                2 * c.messageDiv.current.clientHeight
                  ? c.setState({ shouldAutoScroll: !1 })
                  : c.setState({ shouldAutoScroll: !0 }),
                  c.messageDiv.current &&
                    c.messageDiv.current.offsetTop >
                      c.messageDiv.current.scrollTop &&
                    c.state.allowScrolling &&
                    0 == c.state.scrollProgress &&
                    (c.setState({ scrollProgress: !0 }), c.loadMessages());
              }),
              (c.loadMessages = function () {
                (function (e, t) {
                  var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 20,
                    c =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : 0;
                  return new Promise(
                    (function () {
                      var a = Object(l.a)(
                        o.a.mark(function a(r, s) {
                          var i, l, u, d;
                          return o.a.wrap(
                            function (a) {
                              for (;;)
                                switch ((a.prev = a.next)) {
                                  case 0:
                                    return (
                                      (a.prev = 0),
                                      (i = "chat/"
                                        .concat(y, "/")
                                        .concat(e, "/")),
                                      (l = h
                                        .ref(i)
                                        .orderByChild("createdAt")
                                        .limitToLast(t * n + n)),
                                      (a.next = 5),
                                      l.once("value")
                                    );
                                  case 5:
                                    if ((u = a.sent).exists()) {
                                      a.next = 9;
                                      break;
                                    }
                                    throw {
                                      code: "NoMsg",
                                      message: "no message ",
                                    };
                                  case 9:
                                    (d = []),
                                      u.forEach(function (e) {
                                        d.push(e.val());
                                      }),
                                      (d = (d = (d = d.reverse()).slice(
                                        t * n + c,
                                        t * n + n + c
                                      )).reverse()),
                                      r(d),
                                      (a.next = 20);
                                    break;
                                  case 17:
                                    (a.prev = 17), (a.t0 = a.catch(0)), s(a.t0);
                                  case 20:
                                  case "end":
                                    return a.stop();
                                }
                            },
                            a,
                            null,
                            [[0, 17]]
                          );
                        })
                      );
                      return function (e, t) {
                        return a.apply(this, arguments);
                      };
                    })()
                  );
                })(
                  c.props.room.roomId,
                  c.state.pageNumber,
                  c.state.pageSize,
                  c.state.listenerCounter
                )
                  .then(function (e) {
                    var t = c.state.messages;
                    t.length >= 0 &&
                      e.length >= 0 &&
                      e[e.length - 1].id == t[0].id &&
                      e.pop();
                    var n = [].concat(Object($.a)(e), Object($.a)(t));
                    c.setState({ messages: n }),
                      e.length >= c.state.pageSize
                        ? (c.setState({ pageNumber: c.state.pageNumber + 1 }),
                          c.setState({ allowScrolling: !0 }))
                        : (c.setState({ allowScrolling: !1 }),
                          c.setState({ pageNumber: c.state.pageNumber - 1 })),
                      c.setState({ scrollProgress: !1 }),
                      c.scroll();
                  })
                  .catch(function (e) {
                    c.setState({ scrollProgress: !1 }), console.log(e);
                  });
              }),
              (c.uuid4 = function () {
                var e = new Uint8Array(16);
                crypto.getRandomValues(e),
                  (e[8] &= 63),
                  (e[8] |= 128),
                  (e[6] &= 15),
                  (e[6] |= 64);
                var t = 0;
                return "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX".replace(
                  /XX/g,
                  function () {
                    return e[t++].toString(16).padStart(2, "0");
                  }
                );
              }),
              (c.scroll = function () {
                setTimeout(function () {
                  if (
                    c.messageDiv &&
                    c.messageDiv.current &&
                    c.state.shouldAutoScroll
                  ) {
                    var e =
                      c.messageDiv.current.scrollHeight -
                      c.messageDiv.current.clientHeight;
                    c.messageDiv.current.scrollTop = e > 0 ? e : 0;
                  }
                }, 500);
              }),
              (c.onSendMessageClick = function (e) {
                e && e.preventDefault();
                var t,
                  n = {
                    id: c.uuid4(),
                    room: c.props.room.roomId,
                    userId: c.context.user.uid,
                    userName: c.context.user.displayName,
                    message: c.state.typedMessage,
                  };
                ((t = n),
                new Promise(
                  (function () {
                    var e = Object(l.a)(
                      o.a.mark(function e(n, c) {
                        var a, r, s;
                        return o.a.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.prev = 0),
                                    (a = F()),
                                    (r = Object(u.a)(
                                      Object(u.a)({}, t),
                                      {},
                                      {
                                        createdAt:
                                          b.database.ServerValue.TIMESTAMP,
                                        msgKey: a,
                                      }
                                    )),
                                    (s = h.ref(
                                      "chat/"
                                        .concat(y, "/")
                                        .concat(t.room, "/")
                                        .concat(a)
                                    )),
                                    (e.next = 6),
                                    s.set(r)
                                  );
                                case 6:
                                  h
                                    .ref("/chat/".concat(N, "/").concat(t.room))
                                    .update(r),
                                    n(),
                                    (e.next = 14);
                                  break;
                                case 11:
                                  (e.prev = 11), (e.t0 = e.catch(0)), c(e.t0);
                                case 14:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          null,
                          [[0, 11]]
                        );
                      })
                    );
                    return function (t, n) {
                      return e.apply(this, arguments);
                    };
                  })()
                ))
                  .then(function (e) {
                    c.scroll(), c.setState({ typedMessage: "" });
                  })
                  .catch(function (e) {
                    return console.log(e);
                  });
              }),
              (c.messageDiv = a.a.createRef()),
              c
            );
          }
          return (
            Object(te.a)(n, [
              {
                key: "componentWillUnmount",
                value: function () {
                  this.messageDiv.current.removeEventListener(
                    "scroll",
                    this.handleScroll
                  );
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  this.inputRef.current.focus(),
                    this.loadMessages(),
                    (function (e, t) {
                      try {
                        var n = "chat/".concat(y, "/").concat(e, "/");
                        h.ref(n)
                          .orderByChild("createdAt")
                          .limitToLast(1)
                          .on("child_added", function (e) {
                            t && t(null, e.val());
                          });
                      } catch (c) {
                        t && t(c);
                      }
                    })(this.props.room.roomId, function (t, n) {
                      if (null != n) {
                        var c = e.state.messages;
                        c.push(n),
                          e.setState({ messages: c }),
                          e.setState({
                            listenerCounter: e.state.listenerCounter + 1,
                          }),
                          e.scroll(),
                          e.props.showNotification &&
                            (n.userId != e.props.user.email
                              ? e.props.showNotification(!0)
                              : e.props.showNotification(!1));
                      }
                      e.scroll();
                    });
                },
              },
              {
                key: "componentWillReceiveProps",
                value: function (e, t) {
                  e.activeSideMenu && this.scroll();
                },
              },
              {
                key: "componentDidUpdate",
                value: function (e, t, n) {
                  this.state.initialScrollDone ||
                    (this.scroll(), this.setState({ initialScrollDone: !0 }));
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(q.jsx)("div", {
                    className: "sidebar__body",
                    children: Object(q.jsxs)("div", {
                      className: "chat-section",
                      children: [
                        this.props.showHeader ? this.props.children : null,
                        Object(q.jsx)("div", {
                          ref: this.messageDiv,
                          className: "chat-section__body",
                          children: this.state.messages.map(function (t) {
                            return t.userId === e.context.user.uid
                              ? Object(q.jsx)(se, {
                                  userId: t.userId,
                                  time: t.createdAt,
                                  name: t.userName,
                                  message: t.message,
                                })
                              : Object(q.jsx)(re, {
                                  userId: t.userId,
                                  time: t.createdAt,
                                  name: t.userName,
                                  message: t.message,
                                });
                          }),
                        }),
                        Object(q.jsx)("div", {
                          className: "chat-section__footer",
                          children: Object(q.jsx)("div", {
                            className: "chat-section__form",
                            children: Object(q.jsxs)("form", {
                              onSubmit: this.onSendMessageClick,
                              children: [
                                Object(q.jsx)("input", {
                                  type: "text",
                                  className: "chat-section__input",
                                  placeholder: "Write here",
                                  value: this.state.typedMessage,
                                  onChange: function (t) {
                                    return e.setState({
                                      typedMessage: t.target.value,
                                    });
                                  },
                                  ref: this.inputRef,
                                }),
                                Object(q.jsx)("button", {
                                  type: "submit",
                                  className: "chat-section__btn ",
                                  disabled:
                                    0 === this.state.typedMessage.length,
                                  children: Object(q.jsx)("i", {
                                    className: "icon-send",
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            n
          );
        })(c.Component);
      oe.contextType = U;
      var le = oe,
        ue = n(31),
        de =
          (n(46),
          function (e) {
            var t = Object(c.useContext)(G),
              n =
                (t.incallChatActive,
                t.setShowInCallChat,
                t.inCallRoomParticipantList),
              a = Object(c.useMemo)(
                function () {
                  return Object.keys(n).length;
                },
                [n]
              ),
              r = Object(c.useContext)(H).getParticipantColorNumber;
            return Object(q.jsxs)("div", {
              className: "chat-header",
              onClick: e.onbackClick,
              children: [
                Object(q.jsx)("img", { src: ie, alt: "arrowSvg" }),
                Object(q.jsx)("div", {
                  className: "user-profile",
                  children: Object(q.jsxs)("span", {
                    className: "user-profile__title",
                    children: [
                      e.roomName,
                      Object(q.jsx)("small", {
                        children: a > 0 && "".concat(a, " active"),
                      }),
                    ],
                  }),
                }),
                Object(q.jsx)("div", {
                  className: "headerMemberList-container",
                  children: Object.values(n).map(function (e) {
                    return Object(q.jsx)(ue.a, {
                      id: "listMemberTooltip",
                      placement: "bottom",
                      trigger: ["hover"],
                      overlay: Object(q.jsx)("span", {
                        children: e.name.toLowerCase(),
                      }),
                      children: Object(q.jsx)("span", {
                        className: "user-profile__image ".concat(
                          L[r(e.id)],
                          " headerMemberList"
                        ),
                        children: E(e.name),
                      }),
                    });
                  }),
                }),
              ],
            });
          });
      function pe() {
        var e = Object(c.useContext)(G),
          t = e.incallChatActive,
          n = e.setShowInCallChat;
        e.inCallRoomParticipantList;
        return Object(q.jsx)(le, {
          room: { roomId: t.roomId },
          showHeader: !0,
          children: Object(q.jsx)(de, {
            roomName: t.roomName,
            onbackClick: function (e) {
              e && e.preventDefault(), n(!1);
            },
          }),
        });
      }
      n(47);
      function fe() {
        return Object(q.jsx)("div", {
          className: "sidebar__body loaderContainer",
          children: Object(q.jsx)("div", { className: "lds-dual-ring" }),
        });
      }
      var be = function (e) {
          var t = e.user,
            n = e.role,
            a = e.notification,
            r = Object(c.useContext)(G),
            s = r.openChatWithUser,
            i = r.onlineUserslist,
            o = Object(c.useContext)(H).getParticipantColorNumber,
            l = Object(c.useRef)(E(t.name)),
            u = Object(c.useRef)(o(t.id));
          return Object(q.jsxs)("div", {
            className: "user-profile",
            onClick: function () {
              return s(t);
            },
            children: [
              Object(q.jsx)("span", {
                className: "user-profile__image  "
                  .concat(
                    a
                      ? "user-notification"
                      : i.hasOwnProperty(t.id)
                      ? "user-notification user-online-dot"
                      : "user-notification user-offline-dot",
                    " "
                  )
                  .concat(L[u.current]),
                children: l.current,
              }),
              Object(q.jsxs)("span", {
                className: "user-profile__title",
                children: [
                  Object(q.jsxs)("b", {
                    children: [" ", t.name.toLowerCase()],
                  }),
                  Object(q.jsx)("small", {
                    children: null !== n && void 0 !== n ? n : "Participant",
                  }),
                ],
              }),
              a &&
                Object(q.jsx)("span", {
                  className: "notification_count ".concat(L[u.current]),
                  children: a.count,
                }),
            ],
          });
        },
        je = function (e) {
          var t = e.heading,
            n = e.role,
            a = e.userList,
            r = Object(c.useContext)(U).user,
            s = Object(c.useContext)(G).unseenMessageMetaData;
          return Object(q.jsxs)(q.Fragment, {
            children: [
              t &&
                Object(q.jsx)("h2", {
                  className: "sidebar__title",
                  children: t,
                }),
              Object(q.jsx)("ul", {
                className: "sidebar__menu",
                children: Object.keys(a).map(function (e) {
                  return a[e].id !== r.uid && a[e].name
                    ? Object(q.jsx)(
                        "li",
                        {
                          children: Object(q.jsx)(
                            be,
                            { user: a[e], role: n, notification: s[e] },
                            a[e].id
                          ),
                        },
                        a[e].id + "--li"
                      )
                    : null;
                }),
              }),
            ],
          });
        };
      function he(e, t, n, c) {
        var a =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 40;
        if (!c) return "";
        var r = "";
        return (
          (r = e === n ? "me: " : t.toLowerCase() + ": "),
          c.length > a ? (r += c.substr(0, a) + "...") : (r += c),
          r
        );
      }
      var me = function (e) {
        var t = e.heading,
          n = (e.role, e.recentList),
          a = Object(c.useContext)(U).user,
          r = Object(c.useContext)(G).unseenMessageMetaData;
        return Object(q.jsxs)(q.Fragment, {
          children: [
            t &&
              Object(q.jsx)("h2", { className: "sidebar__title", children: t }),
            Object(q.jsx)("ul", {
              className: "sidebar__menu",
              children: n.map(function (e) {
                return Object(q.jsx)(q.Fragment, {
                  children:
                    e.otherParticipant.id &&
                    e.otherParticipant.name &&
                    Object(q.jsx)(
                      "li",
                      {
                        children: Object(q.jsx)(
                          be,
                          {
                            user: e.otherParticipant,
                            role: he(
                              e.senderId,
                              e.senderName,
                              a.uid,
                              e.message
                            ),
                            notification: r[e.otherParticipant.id],
                          },
                          e.otherParticipant.id + "recent"
                        ),
                      },
                      e.otherParticipant.id + "recent--li"
                    ),
                });
              }),
            }),
          ],
        });
      };
      function ve() {
        var e = Object(c.useContext)(G),
          t = e.onlineUserslist,
          n = e.userLastInteractedRoom,
          a = e.allParticipantList,
          r = e.incallChatActive,
          s = e.showInCallChat,
          i = e.setShowInCallChat;
        return Object(q.jsxs)(q.Fragment, {
          children: [
            s && r.status && r.roomId && Object(q.jsx)(pe, {}),
            !s &&
              Object(q.jsxs)("div", {
                className: "sidebar__body",
                children: [
                  r.status &&
                    r.roomId &&
                    Object(q.jsxs)("div", {
                      className: "chat-header",
                      onClick: function () {
                        return i(!0);
                      },
                      children: [
                        Object(q.jsx)("div", {
                          className: "user-profile",
                          children: Object(q.jsx)("span", {
                            className: "user-profile__title",
                            children: "In Call Messages",
                          }),
                        }),
                        Object(q.jsx)("img", {
                          className: "enterArrow",
                          src: ie,
                          alt: "arrowSvg",
                        }),
                      ],
                    }),
                  n &&
                    Object(q.jsx)(me, {
                      heading: "Recent",
                      role: "Participant",
                      recentList: n,
                    }),
                  Object.keys(t).length > 1
                    ? Object(q.jsx)(je, {
                        heading: t ? "Online" : "",
                        role: "Participant",
                        userList: t,
                      })
                    : null,
                  Object.keys(a).length > 0 &&
                    Object(q.jsx)(je, {
                      heading: a ? "All Participants" : "",
                      role: "Participant",
                      userList: a,
                    }),
                ],
              }),
          ],
        });
      }
      n(48);
      function xe() {
        var e = Object(c.useContext)(U).user,
          t = Object(c.useContext)(G),
          n = t.activeRoom,
          a = t.closePreviousChatRoom,
          r = Object(c.useContext)(H).getParticipantColorNumber,
          s = Object(c.useState)(""),
          i = Object(d.a)(s, 2),
          u = i[0],
          f = i[1],
          j = Object(c.useState)(!1),
          m = Object(d.a)(j, 2),
          v = m[0],
          x = m[1],
          O = Object(c.useState)(null),
          S = Object(d.a)(O, 2),
          C = S[0],
          _ = S[1],
          P = Object(c.useRef)(null),
          I = Object(c.useRef)(!1),
          R = Object(c.useRef)(E(n.participant.name)),
          M = Object(c.useRef)(r(n.participant.id)),
          D = Object(c.useRef)(null),
          T = Object(c.useRef)(null),
          F = Object(c.useRef)(null),
          X = Object(c.useRef)(null);
        Object(c.useEffect)(function () {
          var t, c, a;
          X.current.focus(),
            (function () {
              var t = h.ref("/chat/".concat(y, "/").concat(n.roomId));
              (D.current = t),
                t.on(
                  "value",
                  (function () {
                    var t = Object(l.a)(
                      o.a.mark(function t(c) {
                        var a;
                        return o.a.wrap(function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                c.exists() &&
                                  ((a = c.val()),
                                  _(a),
                                  (r = e.uid),
                                  (s = n.participant.id),
                                  h
                                    .ref(
                                      "/chat/"
                                        .concat(w, "/")
                                        .concat(r, "/")
                                        .concat(s)
                                    )
                                    .remove());
                              case 1:
                              case "end":
                                return t.stop();
                            }
                          var r, s;
                        }, t);
                      })
                    );
                    return function (e) {
                      return t.apply(this, arguments);
                    };
                  })(),
                  function (e) {
                    console.error(e);
                  }
                );
            })(),
            (t = n.roomId),
            (c = n.participant.id),
            T.current,
            (a = function (e, t) {
              if (t)
                return (
                  console.error(t),
                  void ("noStatus" === t.code ? x(!1) : console.error(t))
                );
              x(e);
            }),
            h.ref("/chat/".concat(k, "/").concat(t, "/").concat(c)).on(
              "value",
              (function () {
                var e = Object(l.a)(
                  o.a.mark(function e(t) {
                    return o.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            t.exists()
                              ? a && a(t.val())
                              : a &&
                                a([], {
                                  code: "noStatus",
                                  message: "No Typing Status found",
                                });
                          case 1:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              function (e) {
                a && a([], e);
              }
            ),
            (function (e, t, n) {
              h.ref("/chat/".concat(k, "/").concat(t, "/"))
                .onDisconnect()
                .update(Object(p.a)({}, n, !1));
            })(F.current, n.roomId, e.uid),
            X.current.addEventListener("focusin", function () {
              A(n.roomId, e.uid, !0);
            }),
            X.current.addEventListener("focusout", function () {
              A(n.roomId, e.uid, !1);
            });
          var r = P.current.getBoundingClientRect().height;
          return (
            P.current.addEventListener("scroll", function (e) {
              P.current.scrollTop < r - 0.4 * r
                ? (I.current = !0)
                : (I.current = !1);
            }),
            function () {
              D.current && D.current.off(),
                T.current && T.current.off(),
                F.current && F.current.cancel();
            }
          );
        }, []),
          Object(c.useEffect)(
            function () {
              P.current &&
                !I.current &&
                P.current.scrollTo(0, P.current.scrollHeight);
            },
            [C]
          );
        return Object(q.jsx)("div", {
          className: "sidebar__body",
          children: Object(q.jsxs)("div", {
            className: "chat-section",
            children: [
              Object(q.jsxs)("div", {
                className: "chat-header",
                onClick: a,
                children: [
                  Object(q.jsx)("img", { src: ie, alt: "arrowSvg" }),
                  Object(q.jsxs)("div", {
                    className: "user-profile",
                    children: [
                      Object(q.jsx)("span", {
                        className: "user-profile__image ".concat(L[M.current]),
                        children: R.current,
                      }),
                      Object(q.jsxs)("span", {
                        className: "user-profile__title",
                        children: [
                          n.participant.name.toLowerCase(),
                          Object(q.jsx)("small", {
                            children: v ? "typing..." : "Participant",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              Object(q.jsx)("div", {
                className: "chat-section__body",
                ref: P,
                children:
                  C &&
                  Object.values(C).map(function (t) {
                    return t.id !== e.uid
                      ? Object(q.jsx)(
                          re,
                          {
                            userId: t.id,
                            time: t.createdAt,
                            name: t.name,
                            message: t.message,
                          },
                          t.createdAt + "+" + t.id
                        )
                      : Object(q.jsx)(
                          se,
                          {
                            userId: t.id,
                            time: t.createdAt,
                            name: t.name,
                            message: t.message,
                          },
                          t.createdAt + "+" + t.id
                        );
                  }),
              }),
              n &&
                Object(q.jsx)("div", {
                  className: "chat-section__footer",
                  children: Object(q.jsx)("div", {
                    className: "chat-section__form",
                    children: Object(q.jsxs)("form", {
                      onSubmit: function (t) {
                        t && t.preventDefault(),
                          (function (e, t, n, c, a, r) {
                            var s;
                            h
                              .ref("/chat/".concat(g, "/").concat(t))
                              .update(Object(p.a)({}, a, !0)),
                              h
                                .ref("/chat/".concat(y, "/").concat(a))
                                .push()
                                .set({
                                  name: e,
                                  id: t,
                                  createdAt: b.database.ServerValue.TIMESTAMP,
                                  message: r,
                                  room: a,
                                });
                            var i =
                              ((s = {
                                message: r,
                                room: a,
                                createdAt: b.database.ServerValue.TIMESTAMP,
                                name: e,
                                id: t,
                              }),
                              Object(p.a)(s, t, e),
                              Object(p.a)(s, n, c),
                              Object(p.a)(s, "participants", [t, n]),
                              s);
                            h
                              .ref(
                                "/chat/".concat(N, "/").concat(t, "/").concat(a)
                              )
                              .update(i),
                              h
                                .ref(
                                  "/chat/"
                                    .concat(N, "/")
                                    .concat(n, "/")
                                    .concat(a)
                                )
                                .update(i),
                              h
                                .ref(
                                  "/chat/"
                                    .concat(w, "/")
                                    .concat(t, "/")
                                    .concat(n)
                                )
                                .remove(),
                              h
                                .ref(
                                  "/chat/"
                                    .concat(w, "/")
                                    .concat(n, "/")
                                    .concat(t)
                                )
                                .update({
                                  count: b.database.ServerValue.increment(1),
                                  message: r,
                                  roomId: a,
                                  createdAt: b.database.ServerValue.TIMESTAMP,
                                  name: e,
                                  id: t,
                                });
                          })(
                            e.displayName
                              ? e.displayName
                              : e.email.split("@")[0],
                            e.uid,
                            n.participant.id,
                            n.participant.name,
                            n.roomId,
                            u
                          ),
                          P.current.scrollTo(0, P.current.scrollHeight),
                          f("");
                      },
                      children: [
                        Object(q.jsx)("input", {
                          type: "text",
                          className: "chat-section__input",
                          placeholder: "Write here",
                          value: u,
                          onChange: function (e) {
                            return f(e.target.value);
                          },
                          ref: X,
                        }),
                        Object(q.jsx)("button", {
                          type: "submit",
                          className: "chat-section__btn ",
                          disabled: 0 === u.length,
                          children: Object(q.jsx)("i", {
                            className: "icon-send",
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
            ],
          }),
        });
      }
      function Oe() {
        var e = Object(c.useContext)(G).activeRoom;
        return Object(q.jsx)(q.Fragment, {
          children: e ? Object(q.jsx)(xe, {}) : Object(q.jsx)(ve, {}),
        });
      }
      var ge = "hide",
        ye = "showQuestion",
        Ne = "showResult";
      function we(e) {
        var t = e.index,
          n = e.data,
          c = n.question,
          a = n.options,
          r = (n.index, n.totalResponse);
        return (
          a.sort(function (e, t) {
            return e.id - t.id;
          }),
          Object(q.jsxs)("div", {
            className: "pollBox__question",
            children: [
              Object(q.jsx)("h3", {
                className: "pollBox__title",
                children: "Q".concat(t + 1, ". ").concat(c),
              }),
              Object(q.jsx)("ul", {
                className: "pollBox__options",
                children: a.map(function (e) {
                  return Object(q.jsx)("li", {
                    children: Object(q.jsxs)("div", {
                      className: "custom-slider",
                      children: [
                        Object(q.jsx)("span", {
                          className: "custom-slider__text",
                          children: e.value,
                        }),
                        Object(q.jsxs)("div", {
                          className: "custom-slider__bar",
                          children: [
                            Object(q.jsx)("span", {
                              className: "custom-slider__mark",
                              children: "".concat(
                                r > 0 ? (e.response / r) * 100 : 0,
                                "%"
                              ),
                            }),
                            Object(q.jsx)("div", {
                              className: "custom-slider__bar-inner",
                              style: {
                                width: "".concat(
                                  r > 0 ? (e.response / r) * 100 : 0,
                                  "%"
                                ),
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                  });
                }),
              }),
            ],
          })
        );
      }
      function ke(e) {
        var t = e.handleSubmit,
          n = e.checkIfAlreadyAnswered,
          a = e.index,
          r = e.data,
          s = r.question,
          i = r.options,
          o = r.feedbacks,
          l = (r.index, r.id);
        r.eventId;
        null === i ||
          void 0 === i ||
          i.sort(function (e, t) {
            return e.id - t.id;
          });
        var u = Object(c.useState)(n),
          p = Object(d.a)(u, 2),
          f = p[0],
          b = p[1],
          j = Object(c.useState)(!1),
          h = Object(d.a)(j, 2),
          m = h[0],
          v = h[1],
          x = Object(c.useState)(!1),
          O = Object(d.a)(x, 2),
          g = O[0],
          y = O[1],
          N = Object(c.useState)(""),
          w = Object(d.a)(N, 2),
          k = w[0],
          S = w[1];
        Object(c.useEffect)(
          function () {
            n && b(n);
          },
          [n]
        );
        return Object(q.jsxs)("div", {
          className: "pollBox__question",
          children: [
            i &&
              Object(q.jsxs)("form", {
                onSubmit: function (e) {
                  e.preventDefault(), f ? (v(!1), t(l, f, "multiple")) : v(!0);
                },
                children: [
                  Object(q.jsx)("h3", {
                    className: "pollBox__title",
                    children: "Q".concat(a + 1, ". ").concat(s),
                  }),
                  Object(q.jsx)("ul", {
                    className: "pollBox__options",
                    children: i.map(function (e, t) {
                      return Object(q.jsx)(
                        "li",
                        {
                          children: Object(q.jsxs)(
                            "label",
                            {
                              className: "custom-checkbox",
                              children: [
                                "0".concat(t + 1, ".  ").concat(e.value),
                                Object(q.jsx)("input", {
                                  type: "radio",
                                  name: e.id,
                                  checked: !!f && e.id === f.id,
                                  onChange: function (t) {
                                    v(!1), b(e);
                                  },
                                  disabled: null !== n,
                                }),
                                Object(q.jsx)("span", {
                                  className:
                                    "custom-checkbox__icon icon-unchecked2",
                                }),
                              ],
                            },
                            "checkbox-".concat(e.id)
                          ),
                        },
                        "option-".concat(e.id)
                      );
                    }),
                  }),
                  m &&
                    Object(q.jsxs)(q.Fragment, {
                      children: [
                        Object(q.jsx)("div", {
                          style: { color: "red", marginBottom: "0rem" },
                          children:
                            "* Please give some response first, to submit.",
                        }),
                        Object(q.jsx)("br", {}),
                      ],
                    }),
                  Object(q.jsx)("div", {
                    style: { textAlign: "center" },
                    children: Object(q.jsx)("button", {
                      type: "submit",
                      className: "btn btn-secondary",
                      disabled: null !== n,
                      children: "".concat(null === n ? "Submit" : "Answered"),
                    }),
                  }),
                ],
              }),
            o &&
              Object(q.jsx)("form", {
                onSubmit: function (e) {
                  e.preventDefault(),
                    k ? (v(!1), t(l, k, "feedback"), y(!0), S("")) : v(!0);
                },
                children: g
                  ? Object(q.jsxs)("div", {
                      style: { textAlign: "center", position: "relative" },
                      children: [
                        Object(q.jsx)("div", {
                          className: "success-positioning d-flex",
                          children: Object(q.jsxs)("div", {
                            className: "success-icon",
                            children: [
                              Object(q.jsx)("div", {
                                className: "success-icon__tip",
                              }),
                              Object(q.jsx)("div", {
                                className: "success-icon__long",
                              }),
                            ],
                          }),
                        }),
                        Object(q.jsx)("h4", {
                          children: "Feedback Submit Successfully",
                        }),
                        Object(q.jsx)("div", {
                          onClick: function () {
                            y(!g);
                          },
                          className: "feedback-modal-cls-btn",
                          children: Object(q.jsx)("img", {
                            src: "assets/images/icons/close.svg",
                            alt: "",
                            height: "25px",
                          }),
                        }),
                      ],
                    })
                  : Object(q.jsxs)("div", {
                      children: [
                        Object(q.jsx)("h3", {
                          className: "pollBox__title",
                          children: "Q".concat(a + 1, ". ").concat(s),
                        }),
                        Object(q.jsx)("ul", {
                          className: "pollBox__options",
                          children: Object(q.jsx)("input", {
                            type: "text",
                            placeholder: "Write text here...",
                            value: k,
                            onChange: function (e) {
                              v(!1), S(e.target.value);
                            },
                          }),
                        }),
                        m &&
                          Object(q.jsxs)(q.Fragment, {
                            children: [
                              Object(q.jsx)("div", {
                                style: { color: "red", marginBottom: "0rem" },
                                children:
                                  "* Please give some response first, to submit.",
                              }),
                              Object(q.jsx)("br", {}),
                            ],
                          }),
                        Object(q.jsx)("div", {
                          style: { textAlign: "center" },
                          children: Object(q.jsx)("button", {
                            type: "submit",
                            className: "btn btn-secondary",
                            children: "Submit",
                          }),
                        }),
                      ],
                    }),
              }),
          ],
        });
      }
      function Se(e) {
        var t = e.visiblePollData,
          n = e.submitResponse,
          c = e.pollAnswerredData;
        return Object(q.jsx)("div", {
          className: "sidebar__body",
          children: Object(q.jsx)("div", {
            className: "",
            children: Object(q.jsxs)("div", {
              className: "pollBox__body",
              children: [
                t &&
                  0 === t.length &&
                  Object(q.jsx)("div", {
                    className: "noVisiblePoll",
                    style: { textAlign: "center", marginTop: "1rem" },
                    children: Object(q.jsxs)("p", {
                      children: [
                        "As soon as a poll is posted ",
                        Object(q.jsx)("br", {}),
                        "you will be able to express your opinion.",
                      ],
                    }),
                  }),
                t &&
                  t.map(function (e, t) {
                    return Object(q.jsxs)(
                      "div",
                      {
                        className: "pollBox",
                        style: { overflow: "hidden" },
                        children: [
                          e.state === ye &&
                            Object(q.jsx)(ke, {
                              data: e,
                              handleSubmit: n,
                              checkIfAlreadyAnswered: c[e.id],
                              index: t,
                            }),
                          e.state === Ne &&
                            Object(q.jsx)(we, { data: e, index: t }),
                        ],
                      },
                      e.id
                    );
                  }),
              ],
            }),
          }),
        });
      }
      var Ce = "poll",
        _e = "pollResponse",
        Pe = "backStage",
        Ie = n(49),
        Re = null,
        Ae = function (e, t, n) {
          return new Promise(
            (function () {
              var c = Object(l.a)(
                o.a.mark(function c(a, r) {
                  var s, i;
                  return o.a.wrap(
                    function (c) {
                      for (;;)
                        switch ((c.prev = c.next)) {
                          case 0:
                            if (
                              ((c.prev = 0),
                              (s = j.collection(Ce).doc()),
                              (i = []),
                              t.option1 &&
                                i.push({
                                  id: 0,
                                  value: t.option1,
                                  response: 0,
                                }),
                              t.option2 &&
                                i.push({
                                  id: 1,
                                  value: t.option2,
                                  response: 0,
                                }),
                              t.option3 &&
                                i.push({
                                  id: 2,
                                  value: t.option3,
                                  response: 0,
                                }),
                              t.option4 &&
                                i.push({
                                  id: 3,
                                  value: t.option4,
                                  response: 0,
                                }),
                              "feedback" !== e)
                            ) {
                              c.next = 10;
                              break;
                            }
                            return (
                              (c.next = 10),
                              s.set({
                                feedbacks: [],
                                question: t.question,
                                eventId: n,
                                state: ge,
                                totalResponse: 0,
                                timestamp: b.firestore.Timestamp.now(),
                              })
                            );
                          case 10:
                            if ("multiple" !== e) {
                              c.next = 13;
                              break;
                            }
                            return (
                              (c.next = 13),
                              s.set({
                                options: i,
                                question: t.question,
                                eventId: n,
                                state: ge,
                                totalResponse: 0,
                                timestamp: b.firestore.Timestamp.now(),
                              })
                            );
                          case 13:
                            a(), (c.next = 19);
                            break;
                          case 16:
                            (c.prev = 16), (c.t0 = c.catch(0)), r(c.t0);
                          case 19:
                          case "end":
                            return c.stop();
                        }
                    },
                    c,
                    null,
                    [[0, 16]]
                  );
                })
              );
              return function (e, t) {
                return c.apply(this, arguments);
              };
            })()
          );
        },
        Me = function (e) {
          return new Promise(
            (function () {
              var t = Object(l.a)(
                o.a.mark(function t(n, c) {
                  var a;
                  return o.a.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.prev = 0),
                              (a = j.collection(Ce)),
                              (t.next = 4),
                              a.doc(e).delete()
                            );
                          case 4:
                            n("success"), (t.next = 10);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0)), c(t.t0);
                          case 10:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function (e, n) {
                return t.apply(this, arguments);
              };
            })()
          );
        },
        De = function (e, t) {
          return new Promise(
            (function () {
              var n = Object(l.a)(
                o.a.mark(function n(c, a) {
                  var r;
                  return o.a.wrap(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              (n.prev = 0),
                              (r = j.collection(Ce)),
                              (n.next = 4),
                              r.doc(e).update(t)
                            );
                          case 4:
                            c("success"), (n.next = 10);
                            break;
                          case 7:
                            (n.prev = 7), (n.t0 = n.catch(0)), a(n.t0);
                          case 10:
                          case "end":
                            return n.stop();
                        }
                    },
                    n,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function (e, t) {
                return n.apply(this, arguments);
              };
            })()
          );
        },
        Te = function (e, t) {
          return new Promise(
            (function () {
              var n = Object(l.a)(
                o.a.mark(function n(c, a) {
                  var r, s;
                  return o.a.wrap(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              (n.prev = 0),
                              (r = j
                                .collection(_e)
                                .doc("".concat(t, "+").concat(e))),
                              (n.next = 4),
                              r.get()
                            );
                          case 4:
                            (s = n.sent).exists ? c(s.data().option) : c(null),
                              (n.next = 11);
                            break;
                          case 8:
                            (n.prev = 8), (n.t0 = n.catch(0)), a(n.t0);
                          case 11:
                          case "end":
                            return n.stop();
                        }
                    },
                    n,
                    null,
                    [[0, 8]]
                  );
                })
              );
              return function (e, t) {
                return n.apply(this, arguments);
              };
            })()
          );
        },
        Fe = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return console.log("noFunFound");
                  },
            n = j.collection(Ce).where("eventId", "==", e);
          Re = n.onSnapshot(
            function (e) {
              e.empty && t([]);
              var n = e.docs.map(function (e) {
                return Object(u.a)({ id: e.id }, e.data());
              });
              t(n);
            },
            function (e) {
              t(null, e);
            }
          );
        },
        Le = function () {
          Re && Re();
        },
        Xe = function (e, t, n, c, a, r) {
          return new Promise(
            (function () {
              var s = Object(l.a)(
                o.a.mark(function s(i, d) {
                  var p, f, h;
                  return o.a.wrap(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            return (
                              (s.prev = 0),
                              (p = j.collection(Ce).doc(t)),
                              (f = j
                                .collection(_e)
                                .doc("".concat(n, "+").concat(t))),
                              (h = Ie("response-")),
                              (s.next = 6),
                              j.runTransaction(
                                (function () {
                                  var s = Object(l.a)(
                                    o.a.mark(function s(i) {
                                      var l, d, j, m, v;
                                      return o.a.wrap(function (s) {
                                        for (;;)
                                          switch ((s.prev = s.next)) {
                                            case 0:
                                              return (s.next = 2), i.get(p);
                                            case 2:
                                              return (
                                                (l = s.sent),
                                                (s.next = 5),
                                                i.get(f)
                                              );
                                            case 5:
                                              if (!s.sent.exists) {
                                                s.next = 9;
                                                break;
                                              }
                                              throw {
                                                code: "AlreadyResponded",
                                                message:
                                                  "Already responded to the current poll.",
                                              };
                                            case 9:
                                              if (l.exists) {
                                                s.next = 12;
                                                break;
                                              }
                                              throw {
                                                code: "NotValidId",
                                                message: "No Poll Found",
                                              };
                                            case 12:
                                              "feedback" === r &&
                                                ((d = {
                                                  userId: n,
                                                  userName: c,
                                                  date: new Date().getTime(),
                                                  feedback: a,
                                                }),
                                                (j = l.data().feedbacks).push(
                                                  d
                                                ),
                                                i.update(p, {
                                                  feedbacks: j,
                                                  totalResponse:
                                                    b.firestore.FieldValue.increment(
                                                      1
                                                    ),
                                                })),
                                                "multiple" === r &&
                                                  (delete (m = Object(u.a)(
                                                    {},
                                                    a
                                                  )).response,
                                                  i.set(f, {
                                                    id: h,
                                                    targetId: t,
                                                    user: n,
                                                    userName: c,
                                                    eventId: e,
                                                    timeStamp:
                                                      b.firestore.FieldValue.serverTimestamp(),
                                                    date: new Date().getTime(),
                                                    option: m,
                                                  }),
                                                  ((v = l.data().options)[
                                                    a.id
                                                  ] = Object(u.a)(
                                                    Object(u.a)({}, v[a.id]),
                                                    {},
                                                    {
                                                      response:
                                                        parseInt(
                                                          v[a.id].response
                                                        ) + 1,
                                                    }
                                                  )),
                                                  i.update(p, {
                                                    options: v,
                                                    totalResponse:
                                                      b.firestore.FieldValue.increment(
                                                        1
                                                      ),
                                                  }));
                                            case 14:
                                            case "end":
                                              return s.stop();
                                          }
                                      }, s);
                                    })
                                  );
                                  return function (e) {
                                    return s.apply(this, arguments);
                                  };
                                })()
                              )
                            );
                          case 6:
                            i(), (s.next = 12);
                            break;
                          case 9:
                            (s.prev = 9), (s.t0 = s.catch(0)), d(s.t0);
                          case 12:
                          case "end":
                            return s.stop();
                        }
                    },
                    s,
                    null,
                    [[0, 9]]
                  );
                })
              );
              return function (e, t) {
                return s.apply(this, arguments);
              };
            })()
          );
        };
      n(50);
      function Ee(e) {
        var t = e.id,
          n = e.isPollUser,
          a = (e.pollAnalytics, Object(c.useContext)(U).user),
          r = Object(c.useState)({}),
          s = Object(d.a)(r, 2),
          i = s[0],
          f = s[1],
          b = Object(c.useState)(null),
          j = Object(d.a)(b, 2),
          h = j[0],
          m = j[1],
          v = Object(c.useState)([]),
          x = Object(d.a)(v, 2),
          O = x[0],
          g = x[1],
          y = Object(c.useState)(!1),
          N = Object(d.a)(y, 2),
          w = N[0],
          k = N[1],
          S = Object(c.useState)(),
          C = Object(d.a)(S, 2),
          _ = C[0],
          P = C[1],
          I = Object(c.useState)([]),
          R = Object(d.a)(I, 2),
          A = R[0],
          M = R[1],
          D = Object(c.useState)(!1),
          T = Object(d.a)(D, 2),
          F = T[0],
          L = T[1],
          X = Object(c.useState)(!1),
          E = Object(d.a)(X, 2),
          B = E[0],
          W = E[1],
          H = Object(c.useState)(!1),
          V = Object(d.a)(H, 2),
          J = V[0],
          z = V[1],
          Q = Object(c.useState)({ open: !1, id: null, type: "" }),
          K = Object(d.a)(Q, 2),
          G = K[0],
          Z = K[1];
        Object(c.useEffect)(function () {
          return (
            ne(),
            function () {
              Le();
            }
          );
        }, []);
        var Y = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(t) {
                var n, c, a;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!(t.length > 0)) {
                          e.next = 12;
                          break;
                        }
                        (n = {}), (c = 0);
                      case 3:
                        if (!(c < t.length)) {
                          e.next = 11;
                          break;
                        }
                        return (e.next = 6), ee(t[c].id);
                      case 6:
                        (a = e.sent),
                          (n = Object(u.a)(
                            Object(u.a)({}, n),
                            {},
                            Object(p.a)({}, t[c].id, a)
                          ));
                      case 8:
                        c++, (e.next = 3);
                        break;
                      case 11:
                        f(n);
                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          ee = function (e) {
            return new Promise(
              (function () {
                var t = Object(l.a)(
                  o.a.mark(function t(n, c) {
                    var r, s;
                    return o.a.wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (t.prev = 0),
                                -1 !== (r = Object.keys(i)).indexOf(e) &&
                                  n(r[e]),
                                (t.next = 5),
                                Te(
                                  e,
                                  null === a || void 0 === a ? void 0 : a.uid
                                )
                              );
                            case 5:
                              (s = t.sent), n(s || null), (t.next = 12);
                              break;
                            case 9:
                              (t.prev = 9), (t.t0 = t.catch(0)), c(t.t0);
                            case 12:
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
                return function (e, n) {
                  return t.apply(this, arguments);
                };
              })()
            );
          },
          te = null;
        h &&
          (te = h.filter(function (e) {
            return e.state !== ge;
          }));
        var ne = function () {
            z(!0),
              Fe(t, function (e, t) {
                t || (m(oe(e)), Y(e)), z(!1);
              });
          },
          ce = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(n, c, a) {
                var r, s, i, u, d;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if ("save" !== n) {
                          e.next = 6;
                          break;
                        }
                        if (
                          (r = O.filter(function (e, t) {
                            return t === c;
                          }))[0].question
                        ) {
                          e.next = 4;
                          break;
                        }
                        return e.abrupt("return");
                      case 4:
                        return (
                          O.length <= 1 && k(!1),
                          e.abrupt(
                            "return",
                            new Promise(
                              (function () {
                                var e = Object(l.a)(
                                  o.a.mark(function e(n, a) {
                                    var s;
                                    return o.a.wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.prev = 0),
                                                (e.next = 3),
                                                Ae("multiple", r[0], t)
                                              );
                                            case 3:
                                              ne(),
                                                (s = O.filter(function (e, t) {
                                                  return t !== c;
                                                })),
                                                g(s),
                                                n(),
                                                (e.next = 13);
                                              break;
                                            case 9:
                                              (e.prev = 9),
                                                (e.t0 = e.catch(0)),
                                                k(!0),
                                                a(e.t0);
                                            case 13:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 9]]
                                    );
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            )
                          )
                        );
                      case 6:
                        if ("publish" !== n) {
                          e.next = 11;
                          break;
                        }
                        return (e.next = 9), De(c, { state: a });
                      case 9:
                        "success" === e.sent &&
                          ((s = h.filter(function (e) {
                            return e.id !== c;
                          })),
                          ((i = h.filter(function (e) {
                            return e.id === c;
                          }))[0].state = a),
                          s.push(i[0]),
                          m(oe(s)));
                      case 11:
                        if ("showResult" !== n) {
                          e.next = 16;
                          break;
                        }
                        return (e.next = 14), De(c, { state: a });
                      case 14:
                        "success" === e.sent &&
                          ((u = h.filter(function (e) {
                            return e.id !== c;
                          })),
                          ((d = h.filter(function (e) {
                            return e.id === c;
                          }))[0].state = a),
                          u.push(d[0]),
                          m(oe(u)));
                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, c) {
              return e.apply(this, arguments);
            };
          })(),
          ae = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(t, n) {
                var c, a;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ("unpublish" === t &&
                            (A.length > 1
                              ? ((c = A.filter(function (e, t) {
                                  return t !== n;
                                })),
                                M(c))
                              : M([])),
                          "publish" !== t)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return (e.next = 4), Me(n);
                      case 4:
                        "success" === e.sent &&
                          ((a = A.filter(function (e) {
                            return e.id !== n;
                          })),
                          m(oe(a)));
                      case 6:
                        Z({ open: !1, id: null, type: "" });
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n) {
              return e.apply(this, arguments);
            };
          })(),
          re = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(n, c, a) {
                var r, s, i, u, d;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if ("save" !== n) {
                          e.next = 6;
                          break;
                        }
                        if (
                          (r = A.filter(function (e, t) {
                            return t === c;
                          }))[0].question
                        ) {
                          e.next = 4;
                          break;
                        }
                        return e.abrupt("return");
                      case 4:
                        return (
                          A.length <= 1 && L(!1),
                          e.abrupt(
                            "return",
                            new Promise(
                              (function () {
                                var e = Object(l.a)(
                                  o.a.mark(function e(n, a) {
                                    var s;
                                    return o.a.wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.prev = 0),
                                                (e.next = 3),
                                                Ae("feedback", r[0], t)
                                              );
                                            case 3:
                                              ne(),
                                                (s = A.filter(function (e, t) {
                                                  return t !== c;
                                                })),
                                                M(s),
                                                n(),
                                                (e.next = 13);
                                              break;
                                            case 9:
                                              (e.prev = 9),
                                                (e.t0 = e.catch(0)),
                                                L(!0),
                                                a(e.t0);
                                            case 13:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 9]]
                                    );
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            )
                          )
                        );
                      case 6:
                        if ("publish" !== n) {
                          e.next = 11;
                          break;
                        }
                        return (e.next = 9), De(c, { state: a });
                      case 9:
                        "success" === e.sent &&
                          ((s = h.filter(function (e) {
                            return e.id !== c;
                          })),
                          ((i = h.filter(function (e) {
                            return e.id === c;
                          }))[0].state = a),
                          s.push(i[0]),
                          m(oe(s)));
                      case 11:
                        if ("showResult" !== n) {
                          e.next = 16;
                          break;
                        }
                        return (e.next = 14), De(c, { state: a });
                      case 14:
                        "success" === e.sent &&
                          ((u = h.filter(function (e) {
                            return e.id !== c;
                          })),
                          ((d = h.filter(function (e) {
                            return e.id === c;
                          }))[0].state = a),
                          u.push(d[0]),
                          m(oe(u)));
                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, c) {
              return e.apply(this, arguments);
            };
          })(),
          se = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(t, n) {
                var c, a;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ("unpublish" === t &&
                            (O.length > 1
                              ? ((c = O.filter(function (e, t) {
                                  return t !== n;
                                })),
                                g(c))
                              : g([])),
                          "publish" !== t)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return (e.next = 4), Me(n);
                      case 4:
                        "success" === e.sent &&
                          ((a = h.filter(function (e) {
                            return e.id !== n;
                          })),
                          m(oe(a)));
                      case 6:
                        Z({ open: !1, id: null, type: "" });
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n) {
              return e.apply(this, arguments);
            };
          })(),
          ie = function (e, t, n, c) {
            if ("multiple" === e) {
              var a = O[t];
              (a[n] = c),
                -1 === t
                  ? console.log("no match")
                  : g(
                      [].concat(
                        Object($.a)(O.slice(0, t)),
                        [a],
                        Object($.a)(O.slice(t + 1))
                      )
                    );
            }
            if ("feedback" === e) {
              var r = A[t];
              (r[n] = c),
                -1 === t
                  ? console.log("no match")
                  : M(
                      [].concat(
                        Object($.a)(A.slice(0, t)),
                        [r],
                        Object($.a)(A.slice(t + 1))
                      )
                    );
            }
          },
          oe = function (e) {
            return e.sort(function (e, t) {
              return e.timestamp >= t.timestamp ? -1 : 1;
            });
          };
        return Object(q.jsx)(q.Fragment, {
          children: n
            ? Object(q.jsx)(Se, {
                visiblePollData: te,
                submitResponse: function (e, n, c) {
                  return new Promise(
                    (function () {
                      var r = Object(l.a)(
                        o.a.mark(function r(s, l) {
                          return o.a.wrap(
                            function (r) {
                              for (;;)
                                switch ((r.prev = r.next)) {
                                  case 0:
                                    return (
                                      (r.prev = 0),
                                      (r.next = 3),
                                      Xe(t, e, a.uid, a.displayName, n, c)
                                    );
                                  case 3:
                                    f(
                                      Object(u.a)(
                                        Object(u.a)({}, i),
                                        {},
                                        Object(p.a)({}, e, n)
                                      )
                                    ),
                                      s(),
                                      (r.next = 10);
                                    break;
                                  case 7:
                                    (r.prev = 7), (r.t0 = r.catch(0)), l(r.t0);
                                  case 10:
                                  case "end":
                                    return r.stop();
                                }
                            },
                            r,
                            null,
                            [[0, 7]]
                          );
                        })
                      );
                      return function (e, t) {
                        return r.apply(this, arguments);
                      };
                    })()
                  );
                },
                pollAnswerredData: i,
              })
            : Object(q.jsxs)("div", {
                className: "communityBox__body",
                children: [
                  Object(q.jsxs)("div", {
                    className: "poll-form-container",
                    children: [
                      Object(q.jsxs)("div", {
                        style: { position: "relative" },
                        children: [
                          Object(q.jsx)("button", {
                            className: "poll-btn ".concat(B && "pbh"),
                            onClick: function () {
                              return W(!B);
                            },
                            children: "+ Create new Poll",
                          }),
                          B &&
                            Object(q.jsxs)("div", {
                              className: "create-new-btn-optns",
                              children: [
                                Object(q.jsx)("div", {
                                  onClick: function () {
                                    return (
                                      g(
                                        [
                                          {
                                            question: "",
                                            option1: "",
                                            option2: "",
                                            option3: "",
                                            option4: "",
                                          },
                                        ].concat(Object($.a)(O))
                                      ),
                                      k(!0),
                                      void W(!1)
                                    );
                                  },
                                  children: "Multiple Choice",
                                }),
                                Object(q.jsx)("div", {
                                  onClick: function () {
                                    return (
                                      M(
                                        [{ question: "" }].concat(
                                          Object($.a)(A)
                                        )
                                      ),
                                      L(!0),
                                      void W(!1)
                                    );
                                  },
                                  children: "Feedback",
                                }),
                              ],
                            }),
                        ],
                      }),
                      w &&
                        (null === O || void 0 === O
                          ? void 0
                          : O.map(function (e, t) {
                              return Object(q.jsxs)(
                                "div",
                                {
                                  className: "poll-form",
                                  children: [
                                    Object(q.jsxs)("button", {
                                      className: "poll-btn",
                                      onClick: function () {
                                        return Z({
                                          open: !0,
                                          id: t,
                                          type: "unpublish",
                                          formType: "multiple",
                                        });
                                      },
                                      style: {
                                        border: "1px solid black",
                                        alignSelf: "flex-end",
                                      },
                                      children: [
                                        Object(q.jsx)("img", {
                                          src: "assets/images/icons/delete.svg",
                                          alt: "delete",
                                          height: "10px",
                                          style: {
                                            display: "inline-block",
                                            paddingRight: "5px",
                                          },
                                        }),
                                        "Delete Poll",
                                      ],
                                    }),
                                    Object(q.jsx)("input", {
                                      autoFocus: !0,
                                      type: "text",
                                      placeholder: "Add question text",
                                      value: e.question,
                                      onChange: function (e) {
                                        return ie(
                                          "multiple",
                                          t,
                                          "question",
                                          e.target.value
                                        );
                                      },
                                      required: !0,
                                    }),
                                    Object(q.jsx)("input", {
                                      type: "text",
                                      placeholder: "Option 1",
                                      value: e.option1,
                                      onChange: function (e) {
                                        return ie(
                                          "multiple",
                                          t,
                                          "option1",
                                          e.target.value
                                        );
                                      },
                                    }),
                                    Object(q.jsx)("input", {
                                      type: "text",
                                      placeholder: "Option 2",
                                      value: e.option2,
                                      onChange: function (e) {
                                        return ie(
                                          "multiple",
                                          t,
                                          "option2",
                                          e.target.value
                                        );
                                      },
                                    }),
                                    Object(q.jsx)("input", {
                                      type: "text",
                                      placeholder: "Option 3",
                                      value: e.option3,
                                      onChange: function (e) {
                                        return ie(
                                          "multiple",
                                          t,
                                          "option3",
                                          e.target.value
                                        );
                                      },
                                    }),
                                    Object(q.jsx)("input", {
                                      type: "text",
                                      placeholder: "Option 4",
                                      value: e.option4,
                                      onChange: function (e) {
                                        return ie(
                                          "multiple",
                                          t,
                                          "option4",
                                          e.target.value
                                        );
                                      },
                                    }),
                                    Object(q.jsx)("button", {
                                      className: "poll-btn",
                                      onClick: function () {
                                        return ce("save", t);
                                      },
                                      style: {
                                        border: "1px solid black",
                                        alignSelf: "center",
                                      },
                                      children: "Save Poll",
                                    }),
                                  ],
                                },
                                t
                              );
                            })),
                      F &&
                        (null === A || void 0 === A
                          ? void 0
                          : A.map(function (e, t) {
                              return Object(q.jsxs)(
                                "div",
                                {
                                  className: "poll-form",
                                  children: [
                                    Object(q.jsxs)("button", {
                                      className: "poll-btn",
                                      onClick: function () {
                                        return Z({
                                          open: !0,
                                          id: t,
                                          type: "unpublish",
                                          formType: "feedback",
                                        });
                                      },
                                      style: {
                                        border: "1px solid black",
                                        alignSelf: "flex-end",
                                      },
                                      children: [
                                        Object(q.jsx)("img", {
                                          src: "assets/images/icons/delete.svg",
                                          alt: "delete",
                                          height: "10px",
                                          style: {
                                            display: "inline-block",
                                            paddingRight: "5px",
                                          },
                                        }),
                                        "Delete Poll",
                                      ],
                                    }),
                                    Object(q.jsx)("input", {
                                      autoFocus: !0,
                                      type: "text",
                                      placeholder: "Add question text",
                                      value: e.question,
                                      onChange: function (e) {
                                        return ie(
                                          "feedback",
                                          t,
                                          "question",
                                          e.target.value
                                        );
                                      },
                                      required: !0,
                                    }),
                                    Object(q.jsx)("button", {
                                      className: "poll-btn",
                                      onClick: function () {
                                        return re("save", t);
                                      },
                                      style: {
                                        border: "1px solid black",
                                        alignSelf: "center",
                                      },
                                      children: "Save Poll",
                                    }),
                                  ],
                                },
                                t
                              );
                            })),
                    ],
                  }),
                  J &&
                    Object(q.jsx)("div", {
                      style: { marginTop: "1rem" },
                      children: "Please wait...",
                    }),
                  h &&
                    h.map(function (e, t) {
                      var n, c, a;
                      return Object(q.jsxs)(
                        "div",
                        {
                          className: "poll-form poll-form-data",
                          children: [
                            Object(q.jsxs)("div", {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignSelf: e.state === ge && "flex-end",
                              },
                              children: [
                                e.state !== ge &&
                                  Object(q.jsxs)("div", {
                                    className: "live-text",
                                    style: { fontWeight: 600 },
                                    children: [
                                      Object(q.jsx)("div", {
                                        className: "live-mark",
                                      }),
                                      "LIVE NOW",
                                    ],
                                  }),
                                Object(q.jsxs)("button", {
                                  className: "poll-btn",
                                  onClick: function () {
                                    return Z({
                                      open: !0,
                                      id: e.id,
                                      type: "publish",
                                      formType: "multiple",
                                    });
                                  },
                                  style: { border: "1px solid black" },
                                  children: [
                                    Object(q.jsx)("img", {
                                      src: "assets/images/icons/delete.svg",
                                      alt: "delete",
                                      height: "10px",
                                      style: {
                                        display: "inline-block",
                                        paddingRight: "5px",
                                      },
                                    }),
                                    "Delete Poll",
                                  ],
                                }),
                              ],
                            }),
                            Object(q.jsxs)("p", {
                              style: {
                                paddingTop: "10px",
                                marginBottom: "25px",
                                fontWeight: 600,
                              },
                              children: [
                                "Q"
                                  .concat(h.length - t, ". ")
                                  .concat(e.question),
                                e.feedbacks &&
                                  Object(q.jsx)("span", {
                                    style: {
                                      float: "right",
                                      cursor: "pointer",
                                    },
                                    onClick: function () {
                                      return P(_ ? "" : h.length - t);
                                    },
                                    children: _
                                      ? Object(q.jsx)("img", {
                                          src: "assets/images/icons/chevronup.svg",
                                          alt: "down",
                                          height: "15px",
                                        })
                                      : Object(q.jsx)("img", {
                                          src: "assets/images/icons/chevrondown.svg",
                                          alt: "down",
                                          height: "15px",
                                        }),
                                  }),
                              ],
                            }),
                            Object(q.jsxs)("div", {
                              style: { maxHeight: "200px", overflow: "auto" },
                              children: [
                                0 ===
                                  (null === e ||
                                  void 0 === e ||
                                  null === (n = e.feedbacks) ||
                                  void 0 === n
                                    ? void 0
                                    : n.length) &&
                                  Object(q.jsx)("div", {
                                    style: {
                                      display:
                                        _ === h.length - t ? "block" : "none",
                                      textAlign: "center",
                                    },
                                    children: "No feedback",
                                  }),
                                null === e ||
                                void 0 === e ||
                                null === (c = e.feedbacks) ||
                                void 0 === c
                                  ? void 0
                                  : c.map(function (e) {
                                      return Object(q.jsx)(
                                        "li",
                                        {
                                          className: "poll-ans-list",
                                          style: {
                                            display:
                                              _ === h.length - t
                                                ? "list-item"
                                                : "none",
                                          },
                                          children: e.feedback,
                                        },
                                        e.date
                                      );
                                    }),
                              ],
                            }),
                            null === e ||
                            void 0 === e ||
                            null === (a = e.options) ||
                            void 0 === a
                              ? void 0
                              : a.map(function (t, n) {
                                  return Object(q.jsxs)(
                                    "div",
                                    {
                                      className: "poll-ans-list",
                                      children: [
                                        Object(q.jsx)("span", {
                                          children: "0".concat(n + 1, ". "),
                                        }),
                                        " ",
                                        t.value,
                                        e.state === Ne &&
                                          Object(q.jsx)("div", {
                                            className: "custom-slider",
                                            style: { padingLeft: "6%" },
                                            children: Object(q.jsxs)("div", {
                                              className: "custom-slider__bar",
                                              children: [
                                                Object(q.jsx)("span", {
                                                  className:
                                                    "custom-slider__mark",
                                                  children: "".concat(
                                                    e.totalResponse > 0
                                                      ? (t.response /
                                                          e.totalResponse) *
                                                          100
                                                      : 0,
                                                    "%"
                                                  ),
                                                }),
                                                Object(q.jsx)("div", {
                                                  className:
                                                    "custom-slider__bar-inner",
                                                  style: {
                                                    width: "".concat(
                                                      e.totalResponse > 0
                                                        ? (t.response /
                                                            e.totalResponse) *
                                                            100
                                                        : 0,
                                                      "%"
                                                    ),
                                                  },
                                                }),
                                              ],
                                            }),
                                          }),
                                      ],
                                    },
                                    n
                                  );
                                }),
                            Object(q.jsxs)("div", {
                              style: {
                                display: "flex",
                                justifyContent:
                                  e.state !== ge ? "space-between" : "center",
                              },
                              children: [
                                Object(q.jsx)("button", {
                                  className: "poll-btn",
                                  onClick: function () {
                                    return ce(
                                      "publish",
                                      e.id,
                                      e.state !== ge ? ge : ye
                                    );
                                  },
                                  style: {
                                    border: "1px solid black",
                                    fontWeight: "700",
                                  },
                                  children:
                                    e.state !== ge
                                      ? "Unpublish"
                                      : "Publish Poll",
                                }),
                                e.state !== ge &&
                                  !e.feedbacks &&
                                  Object(q.jsx)("button", {
                                    className: "poll-btn",
                                    onClick: function () {
                                      return ce(
                                        "showResult",
                                        e.id,
                                        e.state === Ne ? ye : Ne
                                      );
                                    },
                                    style: {
                                      border: "1px solid black",
                                      fontWeight: "700",
                                    },
                                    children:
                                      e.state === ye
                                        ? "Show Result"
                                        : "Hide Result",
                                  }),
                              ],
                            }),
                          ],
                        },
                        e.id
                      );
                    }),
                  G.open &&
                    Object(q.jsx)(Be, {
                      type: G.type,
                      id: G.id,
                      formType: G.formType,
                      handleDeletePoll: se,
                      handleDeleteFeedbackPoll: ae,
                      setShowDeleteModal: Z,
                    }),
                ],
              }),
        });
      }
      var Be = function (e) {
          var t = e.handleDeletePoll,
            n = e.type,
            c = e.id,
            a = e.formType,
            r = e.handleDeleteFeedbackPoll,
            s = e.setShowDeleteModal;
          return Object(q.jsx)("div", {
            className: "dlt-mdl",
            children: Object(q.jsxs)("div", {
              className: "dlt-mdl-bdy",
              children: [
                Object(q.jsx)("div", {
                  style: { fontWeight: 700 },
                  children:
                    "By deleting this poll you will loose all associated data and results.",
                }),
                Object(q.jsxs)("div", {
                  style: { display: "flex", justifyContent: "space-around" },
                  children: [
                    Object(q.jsx)("button", {
                      className: "poll-btn",
                      onClick: function () {
                        return s({ open: !1, id: null, type: "" });
                      },
                      style: { border: "1px solid black" },
                      children: "Not Now",
                    }),
                    Object(q.jsx)("button", {
                      className: "poll-btn",
                      onClick: function () {
                        return "feedback" === a
                          ? r(n, c)
                          : "multiple" === a
                          ? t(n, c)
                          : null;
                      },
                      style: { border: "1px solid black" },
                      children: "Delete Poll",
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        qe = function (e, t, n) {
          return new Promise(
            (function () {
              var c = Object(l.a)(
                o.a.mark(function c(a, r) {
                  var s;
                  return o.a.wrap(
                    function (c) {
                      for (;;)
                        switch ((c.prev = c.next)) {
                          case 0:
                            return (
                              (c.prev = 0),
                              (s = j.collection(Pe).doc("notification")),
                              (c.next = 4),
                              s.set(
                                Object(u.a)(
                                  Object(u.a)({}, e),
                                  {},
                                  {
                                    eventId: t,
                                    userId: n,
                                    timestamp: b.firestore.Timestamp.now(),
                                  }
                                )
                              )
                            );
                          case 4:
                            a(), (c.next = 10);
                            break;
                          case 7:
                            (c.prev = 7), (c.t0 = c.catch(0)), r(c.t0);
                          case 10:
                          case "end":
                            return c.stop();
                        }
                    },
                    c,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function (e, t) {
                return c.apply(this, arguments);
              };
            })()
          );
        },
        Ue = function (e, t) {
          return new Promise(
            (function () {
              var n = Object(l.a)(
                o.a.mark(function n(c, a) {
                  var r;
                  return o.a.wrap(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              (n.prev = 0),
                              (r = j.collection(Pe)),
                              (n.next = 4),
                              r.doc(e).update(t)
                            );
                          case 4:
                            c("success"), (n.next = 10);
                            break;
                          case 7:
                            (n.prev = 7), (n.t0 = n.catch(0)), a(n.t0);
                          case 10:
                          case "end":
                            return n.stop();
                        }
                    },
                    n,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function (e, t) {
                return n.apply(this, arguments);
              };
            })()
          );
        },
        We = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return console.log("noFunFound");
                  },
            n = j.collection(Pe).where("eventId", "==", e);
          n.onSnapshot(
            function (e) {
              e.empty && t([]);
              var n = e.docs.map(function (e) {
                return Object(u.a)({ id: e.id }, e.data());
              });
              t(n);
            },
            function (e) {
              t(null, e);
            }
          );
        };
      function He(e) {
        var t = e.id,
          n = e.isPollUser,
          a = Object(c.useContext)(U).user,
          r = Object(c.useState)({}),
          s = Object(d.a)(r, 2),
          i = s[0],
          p = s[1],
          f = Object(c.useState)({ notification: "", published: !1 }),
          b = Object(d.a)(f, 2),
          j = b[0],
          h = b[1],
          m = Object(c.useState)(!1),
          v = Object(d.a)(m, 2),
          x = v[0],
          O = v[1];
        Object(c.useEffect)(function () {
          g();
        }, []);
        var g = function () {
            O(!0),
              We(t, function (e, t) {
                t || p(e[0]), O(!1);
              });
          },
          y = (function () {
            var e = Object(l.a)(
              o.a.mark(function e(n, c, r) {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if ("save" !== n) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt(
                          "return",
                          new Promise(
                            (function () {
                              var e = Object(l.a)(
                                o.a.mark(function e(n, c) {
                                  return o.a.wrap(
                                    function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.prev = 0),
                                              (e.next = 3),
                                              qe(j, t, a.uid)
                                            );
                                          case 3:
                                            g(),
                                              p({
                                                notification: "",
                                                published: !1,
                                              }),
                                              n(),
                                              (e.next = 11);
                                            break;
                                          case 8:
                                            (e.prev = 8),
                                              (e.t0 = e.catch(0)),
                                              c(e.t0);
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
                              return function (t, n) {
                                return e.apply(this, arguments);
                              };
                            })()
                          )
                        );
                      case 2:
                        if ("publish" !== n) {
                          e.next = 7;
                          break;
                        }
                        return (e.next = 5), Ue(c, { published: r });
                      case 5:
                        "success" === e.sent &&
                          p(
                            Object(u.a)(
                              Object(u.a)({}, i),
                              {},
                              { published: r }
                            )
                          );
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, c) {
              return e.apply(this, arguments);
            };
          })();
        return Object(q.jsx)(q.Fragment, {
          children:
            !n &&
            Object(q.jsxs)("div", {
              className: "communityBox__body",
              children: [
                Object(q.jsx)("div", {
                  className: "poll-form-container",
                  children: Object(q.jsxs)("div", {
                    className: "poll-form",
                    children: [
                      Object(q.jsx)("input", {
                        autoFocus: !0,
                        type: "text",
                        placeholder: "Write text here...",
                        value: j.notification,
                        onChange: function (e) {
                          return h({
                            notification: e.target.value,
                            published: !1,
                          });
                        },
                        required: !0,
                      }),
                      Object(q.jsx)("button", {
                        className: "poll-btn",
                        onClick: function () {
                          return y("save");
                        },
                        style: {
                          border: "1px solid black",
                          alignSelf: "center",
                        },
                        children: "Save",
                      }),
                    ],
                  }),
                }),
                x &&
                  Object(q.jsx)("div", {
                    style: { marginTop: "1rem" },
                    children: "Please wait...",
                  }),
                Object(q.jsxs)("div", {
                  className: "poll-form poll-form-data",
                  children: [
                    Object(q.jsx)("p", {
                      style: {
                        paddingTop: "10px",
                        marginBottom: "25px",
                        fontWeight: 600,
                      },
                      children:
                        null === i || void 0 === i ? void 0 : i.notification,
                    }),
                    Object(q.jsx)("div", {
                      style: { display: "flex", justifyContent: "center" },
                      children: Object(q.jsx)("button", {
                        className: "poll-btn",
                        onClick: function () {
                          return y(
                            "publish",
                            null === i || void 0 === i ? void 0 : i.id,
                            !(null === i || void 0 === i ? void 0 : i.published)
                          );
                        },
                        style: { border: "1px solid black", fontWeight: "700" },
                        children: (
                          null === i || void 0 === i ? void 0 : i.published
                        )
                          ? "Unpublish"
                          : "Publish",
                      }),
                    }),
                  ],
                }),
              ],
            }),
        });
      }
      function Ve() {
        var e = Object(c.useContext)(H),
          t = e.activeMenu,
          n = e.isPollAdmin,
          a = Object(c.useContext)(G).publicRoomName,
          r = Object(c.useContext)(U).user;
        return Object(q.jsx)("div", {
          className: "wrapper",
          children: Object(q.jsxs)("aside", {
            className: "sidebar active",
            children: [
              Object(q.jsx)("header", {
                className: "headerBox",
                children: Object(q.jsx)(Y, {}),
              }),
              r && r.isChecked
                ? Object(q.jsxs)(q.Fragment, {
                    children: [
                      t === V && Object(q.jsx)(Oe, {}),
                      t === J && Object(q.jsx)(le, { room: { roomId: a } }),
                      t === z && Object(q.jsx)(Ee, { id: a, isPollUser: !n }),
                      t === Q && Object(q.jsx)(He, { id: a, isPollUser: !n }),
                    ],
                  })
                : Object(q.jsx)(q.Fragment, {
                    children: Object(q.jsx)(fe, {}),
                  }),
            ],
          }),
        });
      }
      n(51);
      var Je = function () {
          return Object(q.jsx)(q.Fragment, {
            children: Object(q.jsx)(K, {
              children: Object(q.jsx)(Z, { children: Object(q.jsx)(Ve, {}) }),
            }),
          });
        },
        ze = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 56))
              .then(function (t) {
                var n = t.getCLS,
                  c = t.getFID,
                  a = t.getFCP,
                  r = t.getLCP,
                  s = t.getTTFB;
                n(e), c(e), a(e), r(e), s(e);
              });
        };
      s.a.render(
        Object(q.jsx)(a.a.StrictMode, {
          children: Object(q.jsx)(W, { children: Object(q.jsx)(Je, {}) }),
        }),
        document.getElementById("root")
      ),
        ze();
    },
  },
  [[52, 1, 2]],
]);
//# sourceMappingURL=main.de39f348.chunk.js.map
