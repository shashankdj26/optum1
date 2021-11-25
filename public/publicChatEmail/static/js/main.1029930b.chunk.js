(this.webpackJsonpilex_chat = this.webpackJsonpilex_chat || []).push([
  [0],
  {
    42: function (e, t, n) {},
    51: function (e, t, n) {},
    52: function (e, t, n) {},
    55: function (e, t, n) {},
    56: function (e, t, n) {},
    57: function (e, t, n) {
      "use strict";
      n.r(t);
      var c = n(3),
        a = n.n(c),
        r = n(17),
        s = n.n(r),
        i = (n(42), n(4)),
        o = n.n(i),
        l = n(7),
        u = n(8),
        d = n(6),
        p = n(16),
        b = n(21);
      n(43), n(59), n(45), n(58), n(60);
      b.a.initializeApp({
        apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
        authDomain: "optum-cdcd7.firebaseapp.com",
        databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
        projectId: "optum-cdcd7",
        storageBucket: "optum-cdcd7.appspot.com",
        messagingSenderId: "33244416026",
        appId: "1:33244416026:web:cd039c460016444059a9a3",
        measurementId: "G-ZR8NLSNB91",
      });
      var f = b.a,
        j = b.a.firestore(),
        h = b.a.database(),
        m = (b.a.analytics(), b.a.auth()),
        v = b.a.firestore.FieldValue;
      var O = "usersTable",
        x =
          "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
        g = "user_status",
        y = "roomsList",
        w = "roomMessages",
        N = "roomMetadata",
        k = "userNotification",
        S = "roomTypingStatus",
        C = "IncallPresence",
        _ = function (e) {
          var t = { StateMode: "online" },
            n = h.ref("/chat/" + g + "/" + e.uid);
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
                    email: e.email,
                    designation: e.designation ? e.designation : "",
                    company: e.company ? e.company : "",
                  }
                )
              );
            });
        };
      function P(e) {
        return I.apply(this, arguments);
      }
      function I() {
        return (I = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt(
                      "return",
                      new Promise(function (e, n) {
                        var c = t.email;
                        (c = (c = c.replace(
                          /[&\/\\#,+$~%.'":*?<>{}]/g,
                          ""
                        )).toLowerCase()),
                          h.ref("/users/".concat(c)).once(
                            "value",
                            (function () {
                              var t = Object(l.a)(
                                o.a.mark(function t(n) {
                                  return o.a.wrap(function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          if (!n.exists()) {
                                            t.next = 4;
                                            break;
                                          }
                                          e(n.val()), (t.next = 5);
                                          break;
                                        case 4:
                                          throw {
                                            code: "NotFound",
                                            message: "",
                                          };
                                        case 5:
                                        case "end":
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                              return function (e) {
                                return t.apply(this, arguments);
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
      function A(e) {
        return R.apply(this, arguments);
      }
      function R() {
        return (R = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      console.log(t),
                      e.abrupt(
                        "return",
                        new Promise(function (e, n) {
                          var c = h.ref("/chat/".concat(O, "/").concat(t.uid));
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
                                              designation: t.designation
                                                ? t.designation
                                                : "",
                                              company: t.company
                                                ? t.company
                                                : "",
                                            }),
                                            (r = t.photoURL
                                              ? Object(u.a)(
                                                  Object(u.a)({}, r),
                                                  {},
                                                  {
                                                    profile_picture: t.photoURL,
                                                  }
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
                      )
                    );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function T() {
        return (T = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    h.ref("/chat/".concat(g)).on(
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
      function D() {
        return (D = Object(l.a)(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    h.ref("/chat/".concat(O))
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
                                          t &&
                                            t({ result: c, rawData: n.val() }))
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
      function M(e, t, n) {
        h.ref("/chat/".concat(S, "/").concat(e, "/")).update(
          Object(p.a)({}, t, n)
        );
      }
      var F = function (e, t, n) {
          var c = { StateMode: "online" },
            a = h.ref("/chat/".concat(C, "/").concat(t, "/").concat(e.uid)),
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
        L = function (e, t) {
          h.ref("/chat/".concat(C, "/").concat(t, "/").concat(e.uid)).remove();
        },
        X = function (e, t, n) {
          var c = h.ref("/chat/".concat(C, "/").concat(e));
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
        E = (function () {
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
      var U = ["user-profile__image--red", "user-profile__image--green", " "],
        B = ["chat-user-title--red", "chat-user-title--green", " "];
      function q(e) {
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
      var W = function (e, t) {
          e.sort(function (e, n) {
            return n[t] - e[t];
          });
        },
        H = n(2),
        V = Object(c.createContext)();
      function J(e) {
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
                      var n;
                      return o.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!t) {
                                e.next = 12;
                                break;
                              }
                              return (
                                console.log(t.email, t.displayName),
                                localStorage.setItem(
                                  "userAuth",
                                  JSON.stringify(t)
                                ),
                                (e.next = 5),
                                P(t)
                              );
                            case 5:
                              return (
                                (n = e.sent),
                                (e.next = 8),
                                A(Object(u.a)(Object(u.a)({}, t), n))
                              );
                            case 8:
                              _(Object(u.a)(Object(u.a)({}, t), n)),
                                r(
                                  Object(u.a)(
                                    Object(u.a)({}, t),
                                    {},
                                    { isChecked: !0 }
                                  )
                                ),
                                (e.next = 14);
                              break;
                            case 12:
                              localStorage.removeItem("userAuth"), r(null);
                            case 14:
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
          Object(H.jsx)(V.Provider, {
            value: { user: a },
            children: e.children,
          })
        );
      }
      var z = Object(c.createContext)(),
        Q = 0,
        K = 1,
        G = 2,
        Z = 3,
        Y = 4,
        $ = function (e) {
          Object(c.useContext)(V).user;
          var t = Object(c.useState)(Q),
            n = Object(d.a)(t, 2),
            a = n[0],
            r = n[1],
            s = Object(c.useState)(!0),
            i = Object(d.a)(s, 2),
            o = i[0],
            l = i[1],
            u = Object(c.useState)(!1),
            p = Object(d.a)(u, 2),
            b = p[0],
            f = p[1],
            j = Object(c.useRef)(
              localStorage.getItem("participantColor")
                ? JSON.parse(localStorage.getItem("participantColor"))
                : {}
            );
          Object(c.useEffect)(function () {
            var e = new URLSearchParams(window.location.search);
            "true" === e.get("showPoll") && l(!1),
              "true" === e.get("pollAdmin") && f(!0);
          }, []);
          return Object(H.jsx)(z.Provider, {
            value: {
              activeMenu: a,
              setActiveMenu: r,
              hidePoll: o,
              isPollAdmin: b,
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
        ee = Object(c.createContext)();
      function te(e) {
        var t = Object(c.useContext)(V).user,
          n = Object(c.useState)({}),
          a = Object(d.a)(n, 2),
          r = a[0],
          s = a[1],
          i = Object(c.useState)({}),
          p = Object(d.a)(i, 2),
          b = p[0],
          f = p[1],
          j = Object(c.useState)(null),
          m = Object(d.a)(j, 2),
          v = m[0],
          O = m[1],
          x = Object(c.useState)({}),
          g = Object(d.a)(x, 2),
          y = g[0],
          w = g[1],
          S = Object(c.useState)(null),
          C = Object(d.a)(S, 2),
          _ = C[0],
          P = C[1],
          I = Object(c.useState)({ status: !1, data: null }),
          A = Object(d.a)(I, 2),
          R = A[0],
          M = A[1],
          E = Object(c.useState)({ status: !1, roomId: "", roomName: "" }),
          U = Object(d.a)(E, 2),
          B = U[0],
          q = U[1],
          J = Object(c.useState)(!1),
          Q = Object(d.a)(J, 2),
          K = Q[0],
          G = Q[1],
          Z = Object(c.useState)("public-room-test"),
          Y = Object(d.a)(Z, 2),
          $ = Y[0],
          te = Y[1],
          ne = Object(c.useState)({}),
          ce = Object(d.a)(ne, 2),
          ae = ce[0],
          re = ce[1],
          se = Object(c.useRef)(null),
          ie = Object(c.useRef)(null),
          oe = (Object(c.useRef)(null), Object(c.useRef)(null)),
          le = Object(c.useRef)(null),
          ue = Object(c.useRef)(null),
          de = Object(c.useState)({}),
          pe = Object(d.a)(de, 2),
          be = pe[0],
          fe = pe[1],
          je = Object(c.useContext)(z).activeMenu,
          he = Object(c.useRef)(0);
        Object(c.useEffect)(
          function () {
            he.current = je;
          },
          [je]
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
                  q({ status: e, roomId: n, roomName: c }),
                    e
                      ? ((ue.current = n),
                        G(!0),
                        X(n, le.current, function (e, t) {
                          if (t)
                            return (
                              console.error("Error in loading online users"),
                              void console.error(t)
                            );
                          console.log(e), fe(e);
                        }),
                        F(t, n, oe.current))
                      : (G(!1),
                        le.current && le.current.off(),
                        oe.current && oe.current.cancel(),
                        ue.current && (L(t, ue.current), (ue.current = null)),
                        fe({}));
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
                        : 1 !== he.current &&
                          e.userId !== t.uid &&
                          (M({ status: !0, data: e }),
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
                n ? (te(n), e(n)) : e($);
              }
              return function () {
                oe.current && oe.current.cancel();
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
                  (se.current,
                  (e = t.uid),
                  (n = function (e, t) {
                    if (t) "NotFound" === t.code ? w({}) : console.error(t);
                    else if ((w(e), window.parent.notification)) {
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
                        W(n, "createdAt");
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
                  h.ref("/chat/".concat(k, "/").concat(e)).on(
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
                  })(ie.current, t.uid, function (e, n) {
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
                        W(c, "createdAt"),
                        c.length > 5)
                      ) {
                        var a = [c[0], c[1], c[2], c[3], c[4]];
                        P(a);
                      } else P(c);
                    }
                  }),
                  (function (e) {
                    T.apply(this, arguments);
                  })(function (e, t) {
                    if (t)
                      return (
                        console.error("Error in loading online users"),
                        void console.error(t)
                      );
                    console.log(e), s(e);
                  }),
                  (function (e) {
                    D.apply(this, arguments);
                  })(function (e, t) {
                    if (t)
                      return (
                        console.error("Error in loading online users"),
                        void console.error(t)
                      );
                    f(e.result), re(e.rawData);
                  })),
                function () {
                  se.current && se.current.off();
                }
              );
            },
            [t]
          );
        var me = (function () {
          var e = Object(l.a)(
            o.a.mark(function e(n) {
              return o.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (c = t.uid),
                        (a = n.id),
                        O({
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
        return Object(H.jsx)(ee.Provider, {
          value: {
            onlineUserslist: r,
            openChatWithUser: me,
            activeRoom: v,
            closePreviousChatRoom: function () {
              O(null);
            },
            unseenMessageMetaData: y,
            userLastInteractedRoom: _,
            allParticipantList: b,
            publicRoomName: $,
            publicNotification: R,
            setPublicNotification: M,
            incallChatActive: B,
            showInCallChat: K,
            setShowInCallChat: G,
            inCallRoomParticipantList: be,
            rawUserData: ae,
          },
          children: e.children,
        });
      }
      function ne() {
        var e = Object(c.useContext)(z),
          t = e.activeMenu,
          n = e.setActiveMenu,
          a = e.hidePoll,
          r = e.isPollAdmin,
          s = Object(c.useContext)(ee),
          i = s.publicNotification,
          o = s.setPublicNotification;
        return Object(H.jsxs)("ul", {
          className: "sidebar__tabs",
          children: [
            Object(H.jsx)("li", {
              onClick: function () {
                return n(Y);
              },
              children: Object(H.jsxs)("a", {
                className: t === Y ? "active" : "",
                href: "#",
                children: [
                  Object(H.jsx)("i", { className: "icon-phone" }),
                  " Online",
                ],
              }),
            }),
            Object(H.jsx)("li", {
              onClick: function () {
                return n(Q);
              },
              children: Object(H.jsxs)("a", {
                className: t === Q ? "active" : "",
                href: "#",
                children: [
                  Object(H.jsx)("i", { className: "icon-people" }),
                  " Participants",
                ],
              }),
            }),
            Object(H.jsx)("li", {
              onClick: function () {
                o({ status: !1, data: null }), n(K);
              },
              children: Object(H.jsxs)("a", {
                className: "".concat(t === K ? "active" : ""),
                href: "#",
                children: [
                  Object(H.jsx)("i", {
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
              Object(H.jsx)("li", {
                onClick: function () {
                  return n(G);
                },
                children: Object(H.jsxs)("a", {
                  className: t === G ? "active" : "",
                  href: "#",
                  children: [
                    Object(H.jsx)("i", { className: "icon-polls" }),
                    " Polls",
                  ],
                }),
              }),
            !a &&
              r &&
              Object(H.jsx)("li", {
                onClick: function () {
                  return n(Z);
                },
                children: Object(H.jsxs)("a", {
                  className: t === Z ? "active" : "",
                  href: "#",
                  children: [
                    Object(H.jsx)("i", { className: "icon-polls" }),
                    " Notification",
                  ],
                }),
              }),
          ],
        });
      }
      var ce = n(11),
        ae = n(14),
        re = n(15),
        se = n(19),
        ie = n(18),
        oe = function (e) {
          var t = e.name,
            n = e.message,
            a = e.userId,
            r = e.time,
            s = e.userSubTitle,
            i = Object(c.useContext)(z).getParticipantColorNumber,
            o = Object(c.useRef)(i(a));
          return Object(H.jsx)("div", {
            className: "chat-section__text",
            children: Object(H.jsxs)("div", {
              className: "chat-section__text-body",
              children: [
                Object(H.jsx)("h3", {
                  className: "chat-user-title ".concat(B[o.current], " "),
                  children: t,
                }),
                Object(H.jsx)("h4", { children: s || "" }),
                Object(H.jsx)("p", { children: n }),
                Object(H.jsx)("p", {
                  className: "chat-time",
                  children: Object(H.jsx)("small", {
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
        le = a.a.memo(function (e) {
          var t = e.name,
            n = e.message,
            c = e.userId,
            a = e.time,
            r = e.userSubTitle;
          return Object(H.jsx)("div", {
            className: "chat-section__message chat-section__message--received",
            children: Object(H.jsx)(oe, {
              name: t,
              message: n,
              userId: c,
              time: a,
              userSubTitle: r,
            }),
          });
        }),
        ue = a.a.memo(function (e) {
          var t = e.name,
            n = e.message,
            c = e.userId,
            a = e.time,
            r = e.userSubTitle;
          return Object(H.jsx)("div", {
            className: "chat-section__message chat-section__message--sent",
            children: Object(H.jsx)(oe, {
              name: t,
              message: n,
              userId: c,
              time: a,
              userSubTitle: r,
            }),
          });
        }),
        // de = n.p + "static/media/arrow.4ad046c7.svg",
        de = "assets/images/arrow.svg",
        pe = (function (e) {
          Object(se.a)(n, e);
          var t = Object(ie.a)(n);
          function n(e) {
            var c;
            return (
              Object(ae.a)(this, n),
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
                                        .concat(w, "/")
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
                    var n = [].concat(Object(ce.a)(e), Object(ce.a)(t));
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
                                    (a = E()),
                                    (r = Object(u.a)(
                                      Object(u.a)({}, t),
                                      {},
                                      {
                                        createdAt:
                                          f.database.ServerValue.TIMESTAMP,
                                        msgKey: a,
                                      }
                                    )),
                                    (s = h.ref(
                                      "chat/"
                                        .concat(w, "/")
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
            Object(re.a)(n, [
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
                        var n = "chat/".concat(w, "/").concat(e, "/");
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
                  return Object(H.jsx)("div", {
                    className: "sidebar__body",
                    children: Object(H.jsxs)("div", {
                      className: "chat-section",
                      children: [
                        this.props.showHeader ? this.props.children : null,
                        Object(H.jsx)("div", {
                          ref: this.messageDiv,
                          className: "chat-section__body",
                          children: this.state.messages.map(function (t, n) {
                            return t.userId === e.context.user.uid
                              ? Object(H.jsx)(
                                  ue,
                                  {
                                    userSubTitle: "",
                                    userId: t.userId,
                                    time: t.createdAt,
                                    name: t.userName,
                                    message: t.message,
                                  },
                                  n
                                )
                              : Object(H.jsx)(
                                  le,
                                  {
                                    userSubTitle: ""
                                      .concat(
                                        e.props.rawUserData[t.userId]
                                          .designation,
                                        ", "
                                      )
                                      .concat(
                                        e.props.rawUserData[t.userId].company
                                      ),
                                    userId: t.userId,
                                    time: t.createdAt,
                                    name: t.userName,
                                    message: t.message,
                                  },
                                  n
                                );
                          }),
                        }),
                        Object(H.jsx)("div", {
                          className: "chat-section__footer",
                          children: Object(H.jsx)("div", {
                            className: "chat-section__form",
                            children: Object(H.jsxs)("form", {
                              onSubmit: this.onSendMessageClick,
                              children: [
                                Object(H.jsx)("input", {
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
                                Object(H.jsx)("button", {
                                  type: "submit",
                                  className: "chat-section__btn ",
                                  disabled:
                                    0 === this.state.typedMessage.length,
                                  children: Object(H.jsx)("i", {
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
      pe.contextType = V;
      var be = pe,
        fe = n(36),
        je =
          (n(50),
          function (e) {
            var t = Object(c.useContext)(ee),
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
              r = Object(c.useContext)(z).getParticipantColorNumber;
            return Object(H.jsxs)("div", {
              className: "chat-header",
              onClick: e.onbackClick,
              children: [
                Object(H.jsx)("img", { src: de, alt: "arrowSvg" }),
                Object(H.jsx)("div", {
                  className: "user-profile",
                  children: Object(H.jsxs)("span", {
                    className: "user-profile__title",
                    children: [
                      e.roomName,
                      Object(H.jsx)("small", {
                        children: a > 0 && "".concat(a, " active"),
                      }),
                    ],
                  }),
                }),
                Object(H.jsx)("div", {
                  className: "headerMemberList-container",
                  children: Object.values(n).map(function (e) {
                    return Object(H.jsx)(fe.a, {
                      id: "listMemberTooltip",
                      placement: "bottom",
                      trigger: ["hover"],
                      overlay: Object(H.jsx)("span", {
                        children: e.name.toLowerCase(),
                      }),
                      children: Object(H.jsx)("span", {
                        className: "user-profile__image ".concat(
                          U[r(e.id)],
                          " headerMemberList"
                        ),
                        children: q(e.name),
                      }),
                    });
                  }),
                }),
              ],
            });
          });
      function he() {
        var e = Object(c.useContext)(ee),
          t = e.incallChatActive,
          n = e.setShowInCallChat;
        e.inCallRoomParticipantList;
        return Object(H.jsx)(be, {
          room: { roomId: t.roomId },
          showHeader: !0,
          children: Object(H.jsx)(je, {
            roomName: t.roomName,
            onbackClick: function (e) {
              e && e.preventDefault(), n(!1);
            },
          }),
        });
      }
      n(51);
      function me() {
        return Object(H.jsx)("div", {
          className: "sidebar__body loaderContainer",
          children: Object(H.jsx)("div", { className: "lds-dual-ring" }),
        });
      }
      var ve = n(35),
        Oe = function (e) {
          var t = e.user,
            n = (e.role, e.notification),
            a = Object(c.useContext)(ee),
            r = a.openChatWithUser,
            s = a.onlineUserslist,
            i = Object(c.useContext)(z).getParticipantColorNumber,
            o = Object(c.useRef)(q(t.name)),
            l = Object(c.useRef)(i(t.id));
          return Object(H.jsxs)("div", {
            className: "user-profile",
            onClick: function () {
              r(t);
            },
            children: [
              Object(H.jsx)("span", {
                className: "user-profile__image  "
                  .concat(
                    n
                      ? "user-notification"
                      : s.hasOwnProperty(t.id)
                      ? "user-notification user-online-dot"
                      : "user-notification user-offline-dot",
                    " "
                  )
                  .concat(U[l.current]),
                children: o.current,
              }),
              Object(H.jsx)("span", {
                className: "user-profile__title",
                children: Object(H.jsxs)("b", {
                  children: [" ", t.name.toLowerCase()],
                }),
              }),
              n &&
                Object(H.jsx)("span", {
                  className: "notification_count ".concat(U[l.current]),
                  children: n.count,
                }),
            ],
          });
        },
        xe = function (e) {
          var t = e.heading,
            n = e.role,
            a = e.userList,
            r = Object(c.useContext)(V).user,
            s = Object(c.useContext)(ee).unseenMessageMetaData,
            i = Object(c.useState)(""),
            o = Object(d.a)(i, 2),
            l = o[0],
            u = o[1],
            p = [];
          for (var b in a)
            p.push({
              id: b,
              name: a[b].name,
              company: a[b].company ? a[b].company : "",
              designation: a[b].designation ? a[b].designation : "",
              email: a[b].email,
            });
          console.log(p);
          var f = new ve.a(p, {
            threshold: 0.4,
            includeMatches: !1,
            findAllMatches: !1,
            includeScore: !0,
            keys: ["name", "company", "designation", "email"],
          }).search(l);
          console.log("result", f);
          var j = l
            ? f.map(function (e) {
                return e.item;
              })
            : a;
          return Object(H.jsx)(H.Fragment, {
            children: Object(H.jsxs)("div", {
              style: { display: "flex", flexDirection: "column" },
              children: [
                Object(H.jsx)("input", {
                  type: "text",
                  style: {
                    width: "100%",
                    margin: "2% 0% 0% 2%",
                    border: "none",
                    borderRadius: "0.6rem",
                    boxShadow: "0px 4px 14px rgb(0 0 0 / 35%)",
                    padding: "1rem 1.25rem",
                  },
                  value: l,
                  onChange: function (e) {
                    var t = e.currentTarget,
                      n = (void 0 === t ? {} : t).value;
                    u(n);
                  },
                  placeholder: "Search Participant",
                }),
                t &&
                  Object(H.jsx)("h2", {
                    className: "sidebar__title",
                    children: t,
                  }),
                Object(H.jsx)("ul", {
                  className: "sidebar__menu",
                  children: Object.keys(j).map(function (e) {
                    return j[e].id !== r.uid && j[e].name
                      ? Object(H.jsx)(
                          "li",
                          {
                            children: Object(H.jsx)(
                              Oe,
                              { user: j[e], role: n, notification: s[e] },
                              j[e].id
                            ),
                          },
                          j[e].id + "--li"
                        )
                      : null;
                  }),
                }),
              ],
            }),
          });
        };
      function ge(e, t, n, c) {
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
      var ye = function (e) {
        var t = e.heading,
          n = (e.role, e.recentList),
          a = Object(c.useContext)(V).user,
          r = Object(c.useContext)(ee),
          s = r.unseenMessageMetaData,
          i = r.rawUserData;
        return Object(H.jsxs)(H.Fragment, {
          children: [
            t &&
              Object(H.jsx)("h2", { className: "sidebar__title", children: t }),
            Object(H.jsx)("ul", {
              className: "sidebar__menu",
              children: n.map(function (e) {
                return Object(H.jsx)(H.Fragment, {
                  children:
                    e.otherParticipant.id &&
                    e.otherParticipant.name &&
                    Object(H.jsx)(
                      "li",
                      {
                        children: Object(H.jsx)(
                          Oe,
                          {
                            user: i[e.otherParticipant.id]
                              ? i[e.otherParticipant.id]
                              : e.otherParticipant,
                            role: ge(
                              e.senderId,
                              e.senderName,
                              a.uid,
                              e.message
                            ),
                            notification: s[e.otherParticipant.id],
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
      function we() {
        var e = Object(c.useContext)(ee),
          t = e.onlineUserslist,
          n = e.userLastInteractedRoom,
          a = e.allParticipantList,
          r = e.incallChatActive,
          s = e.showInCallChat,
          i = e.setShowInCallChat,
          o = Object(c.useContext)(z).activeMenu;
        return (
          console.log(o),
          Object(H.jsxs)(H.Fragment, {
            children: [
              s && r.status && r.roomId && Object(H.jsx)(he, {}),
              !s &&
                Object(H.jsxs)("div", {
                  className: "sidebar__body",
                  style: {
                    padding: "0 1rem",
                    overflow: "auto",
                    height: "90%",
                    marginTop: "6em",
                  },
                  children: [
                    r.status &&
                      r.roomId &&
                      Object(H.jsxs)("div", {
                        className: "chat-header",
                        onClick: function () {
                          return i(!0);
                        },
                        children: [
                          Object(H.jsx)("div", {
                            className: "user-profile",
                            children: Object(H.jsx)("span", {
                              className: "user-profile__title",
                              children: "In Call Messages",
                            }),
                          }),
                          Object(H.jsx)("img", {
                            className: "enterArrow",
                            src: de,
                            alt: "arrowSvg",
                          }),
                        ],
                      }),
                    n &&
                      o === Y &&
                      Object(H.jsx)(ye, {
                        heading: "Recent (".concat(n.length, ")"),
                        role: "Participant",
                        recentList: n,
                      }),
                    o === Y && Object.keys(t).length > 1
                      ? Object(H.jsx)(xe, {
                          heading: t
                            ? "Online  (".concat(Object.keys(t).length - 1, ")")
                            : "",
                          role: "Participant",
                          userList: t,
                        })
                      : null,
                    o === Q &&
                      Object.keys(a).length > 0 &&
                      Object(H.jsx)(xe, {
                        heading: "",
                        role: "Participant",
                        userList: a,
                      }),
                  ],
                }),
            ],
          })
        );
      }
      n(52);
      var Ne = n(37),
        ke = n(28),
        Se = n.n(ke);
      function Ce() {
        var e = Object(c.useContext)(V).user,
          t = Object(c.useContext)(ee),
          n = t.activeRoom,
          a = t.closePreviousChatRoom,
          r = t.allParticipantList,
          s = Object(c.useContext)(z).getParticipantColorNumber,
          i = Object(c.useState)(""),
          b = Object(d.a)(i, 2),
          m = b[0],
          O = b[1],
          x = Object(c.useState)(!1),
          g = Object(d.a)(x, 2),
          C = (g[0], g[1]),
          _ = Object(c.useState)(!1),
          P = Object(d.a)(_, 2),
          I = (P[0], P[1]),
          A = Object(c.useState)({}),
          R = Object(d.a)(A, 2),
          T = R[0],
          D = (R[1], Object(c.useState)(!0)),
          F = Object(d.a)(D, 2),
          L = F[0],
          X = (F[1], Object(c.useState)(!0)),
          E = Object(d.a)(X, 2),
          B = E[0],
          W = E[1],
          J = Object(c.useState)(!0),
          Q = Object(d.a)(J, 2),
          K = Q[0],
          G = (Q[1], Object(c.useState)({})),
          Z = Object(d.a)(G, 2),
          Y = (Z[0], Z[1], Object(c.useState)(!1)),
          $ = Object(d.a)(Y, 2),
          te = $[0],
          ne = $[1],
          ce = Object(c.useState)(null),
          ae = Object(d.a)(ce, 2),
          re = ae[0],
          se = ae[1],
          ie = Object(c.useRef)(null),
          oe = Object(c.useRef)(!1),
          pe = Object(c.useRef)(q(n.participant.name)),
          be = Object(c.useRef)(s(n.participant.id)),
          fe = Object(c.useRef)(null),
          je = Object(c.useRef)(null),
          he = Object(c.useRef)(null),
          me = Object(c.useRef)(null);
        Object(c.useEffect)(function () {
          var t, c, a;
          j
            .collection("user-invite")
            .doc("".concat(e.email, "+").concat(n.participant.email))
            .get()
            .then(function (e) {
              e.exists ? ne(!0) : ne(!1);
            }),
            me.current.focus(),
            (function () {
              var t = h.ref("/chat/".concat(w, "/").concat(n.roomId));
              (fe.current = t),
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
                                  se(a),
                                  (r = e.uid),
                                  (s = n.participant.id),
                                  h
                                    .ref(
                                      "/chat/"
                                        .concat(k, "/")
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
            je.current,
            (a = function (e, t) {
              if (t)
                return (
                  console.error(t),
                  void ("noStatus" === t.code ? C(!1) : console.error(t))
                );
              C(e);
            }),
            h.ref("/chat/".concat(S, "/").concat(t, "/").concat(c)).on(
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
              h.ref("/chat/".concat(S, "/").concat(t, "/"))
                .onDisconnect()
                .update(Object(p.a)({}, n, !1));
            })(he.current, n.roomId, e.uid),
            me.current.addEventListener("focusin", function () {
              M(n.roomId, e.uid, !0);
            }),
            me.current.addEventListener("focusout", function () {
              M(n.roomId, e.uid, !1);
            });
          var r = ie.current.getBoundingClientRect().height;
          return (
            ie.current.addEventListener("scroll", function (e) {
              ie.current.scrollTop < r - 0.4 * r
                ? (oe.current = !0)
                : (oe.current = !1);
            }),
            function () {
              fe.current && fe.current.off(),
                je.current && je.current.off(),
                he.current && he.current.cancel();
            }
          );
        }, []),
          Object(c.useEffect)(
            function () {
              ie.current &&
                !oe.current &&
                ie.current.scrollTo(0, ie.current.scrollHeight);
            },
            [re]
          );
        var ve = (function (e, t) {
          var n;
          return (
            Object.entries(e).forEach(function (e) {
              var c = Object(d.a)(e, 2),
                a = (c[0], c[1]);
              a.id == t && (n = a);
            }),
            n
          );
        })(r, e.uid);
        return Object(H.jsx)("div", {
          className: "sidebar__body",
          children: Object(H.jsxs)("div", {
            className: "chat-section",
            children: [
              Object(H.jsxs)("div", {
                className: "chat-header",
                onClick: a,
                style: { position: "relative" },
                children: [
                  Object(H.jsx)("img", { src: de, alt: "arrowSvg" }),
                  Object(H.jsxs)("div", {
                    className: "user-profile",
                    children: [
                      Object(H.jsx)("span", {
                        className: "user-profile__image ".concat(U[be.current]),
                        children: pe.current,
                      }),
                      Object(H.jsx)("span", {
                        className: "user-profile__title",
                        children: n.participant.name.toLowerCase(),
                      }),
                    ],
                  }),
                  K
                    ? Object(H.jsx)(Ne.a, {
                        style: {
                          position: "absolute",
                          right: "2rem",
                          pointerEvents: te ? "all" : "all",
                          opacity: te ? "0.5" : "1",
                        },
                        className: "mail "
                          .concat(T ? "" : "d-none", " ")
                          .concat("tab1" === L ? "d-none" : "", " ")
                          .concat(B ? "" : "faded"),
                        size: "2rem",
                        onClick: function (t) {
                          t.stopPropagation(),
                            Se()({
                              title: "Send Invite",
                              text: "",
                              icon: "info",
                              buttons: !0,
                              dangerMode: !0,
                            }).then(function (t) {
                              t &&
                                (I(!0),
                                console.log(ve, n),
                                fetch(
                                  "https://mailsender-dot-peter-alexander-f1f90.as.r.appspot.com/sendPeterChatMail/",
                                  {
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                      "X-AUTH-TOKEN":
                                        "12901cb8edbcd4fff903e48585403839",
                                    },
                                    method: "POST",
                                    body: JSON.stringify({
                                      sender: Object(u.a)({}, ve),
                                      reciver: Object(u.a)({}, n.participant),
                                    }),
                                  }
                                )
                                  .then(function (t) {
                                    j.collection("user-invite")
                                      .doc(
                                        ""
                                          .concat(e.email, "+")
                                          .concat(n.participant.email)
                                      )
                                      .set({
                                        sender: e.email,
                                        receiver: n.participant.email,
                                        sent: !0,
                                        timestamp: v.serverTimestamp(),
                                      })
                                      .then(function () {
                                        W(!1),
                                          I(!1),
                                          ne(!0),
                                          Se()("Sent", { icon: "success" });
                                      });
                                  })
                                  .catch(function (e) {
                                    console.log(e);
                                  }));
                            });
                        },
                      })
                    : "",
                ],
              }),
              Object(H.jsx)("div", {
                className: "chat-section__body",
                ref: ie,
                children:
                  re &&
                  Object.values(re).map(function (t) {
                    return t.id !== e.uid
                      ? Object(H.jsx)(
                          le,
                          {
                            userId: t.id,
                            time: t.createdAt,
                            name: t.name,
                            message: t.message,
                          },
                          t.createdAt + "+" + t.id
                        )
                      : Object(H.jsx)(
                          ue,
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
                Object(H.jsx)("div", {
                  className: "chat-section__footer",
                  children: Object(H.jsx)("div", {
                    className: "chat-section__form",
                    children: Object(H.jsxs)("form", {
                      onSubmit: function (t) {
                        t && t.preventDefault(),
                          (function (e, t, n, c, a, r) {
                            var s;
                            h
                              .ref("/chat/".concat(y, "/").concat(t))
                              .update(Object(p.a)({}, a, !0)),
                              h
                                .ref("/chat/".concat(w, "/").concat(a))
                                .push()
                                .set({
                                  name: e,
                                  id: t,
                                  createdAt: f.database.ServerValue.TIMESTAMP,
                                  message: r,
                                  room: a,
                                });
                            var i =
                              ((s = {
                                message: r,
                                room: a,
                                createdAt: f.database.ServerValue.TIMESTAMP,
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
                                    .concat(k, "/")
                                    .concat(t, "/")
                                    .concat(n)
                                )
                                .remove(),
                              h
                                .ref(
                                  "/chat/"
                                    .concat(k, "/")
                                    .concat(n, "/")
                                    .concat(t)
                                )
                                .update({
                                  count: f.database.ServerValue.increment(1),
                                  message: r,
                                  roomId: a,
                                  createdAt: f.database.ServerValue.TIMESTAMP,
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
                            m
                          ),
                          ie.current.scrollTo(0, ie.current.scrollHeight),
                          O("");
                      },
                      children: [
                        Object(H.jsx)("input", {
                          type: "text",
                          className: "chat-section__input",
                          placeholder: "Write here",
                          value: m,
                          onChange: function (e) {
                            return O(e.target.value);
                          },
                          ref: me,
                        }),
                        Object(H.jsx)("button", {
                          type: "submit",
                          className: "chat-section__btn ",
                          disabled: 0 === m.length,
                          children: Object(H.jsx)("i", {
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
      function _e() {
        var e = Object(c.useContext)(ee).activeRoom;
        return Object(H.jsx)(H.Fragment, {
          children: e ? Object(H.jsx)(Ce, {}) : Object(H.jsx)(we, {}),
        });
      }
      var Pe = "hide",
        Ie = "showQuestion",
        Ae = "showResult";
      function Re(e) {
        var t = e.index,
          n = e.data,
          c = n.question,
          a = n.options,
          r = (n.index, n.totalResponse);
        return (
          a.sort(function (e, t) {
            return e.id - t.id;
          }),
          Object(H.jsxs)("div", {
            className: "pollBox__question",
            children: [
              Object(H.jsx)("h3", {
                className: "pollBox__title",
                children: "Q".concat(t + 1, ". ").concat(c),
              }),
              Object(H.jsx)("ul", {
                className: "pollBox__options",
                children: a.map(function (e) {
                  return Object(H.jsx)("li", {
                    children: Object(H.jsxs)("div", {
                      className: "custom-slider",
                      children: [
                        Object(H.jsx)("span", {
                          className: "custom-slider__text",
                          children: e.value,
                        }),
                        Object(H.jsxs)("div", {
                          className: "custom-slider__bar",
                          children: [
                            Object(H.jsx)("span", {
                              className: "custom-slider__mark",
                              children: "".concat(
                                r > 0 ? (e.response / r) * 100 : 0,
                                "%"
                              ),
                            }),
                            Object(H.jsx)("div", {
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
      function Te(e) {
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
          b = p[0],
          f = p[1],
          j = Object(c.useState)(!1),
          h = Object(d.a)(j, 2),
          m = h[0],
          v = h[1],
          O = Object(c.useState)(!1),
          x = Object(d.a)(O, 2),
          g = x[0],
          y = x[1],
          w = Object(c.useState)(""),
          N = Object(d.a)(w, 2),
          k = N[0],
          S = N[1];
        Object(c.useEffect)(
          function () {
            n && f(n);
          },
          [n]
        );
        return Object(H.jsxs)("div", {
          className: "pollBox__question",
          children: [
            i &&
              Object(H.jsxs)("form", {
                onSubmit: function (e) {
                  e.preventDefault(), b ? (v(!1), t(l, b, "multiple")) : v(!0);
                },
                children: [
                  Object(H.jsx)("h3", {
                    className: "pollBox__title",
                    children: "Q".concat(a + 1, ". ").concat(s),
                  }),
                  Object(H.jsx)("ul", {
                    className: "pollBox__options",
                    children: i.map(function (e, t) {
                      return Object(H.jsx)(
                        "li",
                        {
                          children: Object(H.jsxs)(
                            "label",
                            {
                              className: "custom-checkbox",
                              children: [
                                "0".concat(t + 1, ".  ").concat(e.value),
                                Object(H.jsx)("input", {
                                  type: "radio",
                                  name: e.id,
                                  checked: !!b && e.id === b.id,
                                  onChange: function (t) {
                                    v(!1), f(e);
                                  },
                                  disabled: null !== n,
                                }),
                                Object(H.jsx)("span", {
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
                    Object(H.jsxs)(H.Fragment, {
                      children: [
                        Object(H.jsx)("div", {
                          style: { color: "red", marginBottom: "0rem" },
                          children:
                            "* Please give some response first, to submit.",
                        }),
                        Object(H.jsx)("br", {}),
                      ],
                    }),
                  Object(H.jsx)("div", {
                    style: { textAlign: "center" },
                    children: Object(H.jsx)("button", {
                      type: "submit",
                      className: "btn btn-secondary",
                      disabled: null !== n,
                      children: "".concat(null === n ? "Submit" : "Answered"),
                    }),
                  }),
                ],
              }),
            o &&
              Object(H.jsx)("form", {
                onSubmit: function (e) {
                  e.preventDefault(),
                    k ? (v(!1), t(l, k, "feedback"), y(!0), S("")) : v(!0);
                },
                children: g
                  ? Object(H.jsxs)("div", {
                      style: { textAlign: "center", position: "relative" },
                      children: [
                        Object(H.jsx)("div", {
                          className: "success-positioning d-flex",
                          children: Object(H.jsxs)("div", {
                            className: "success-icon",
                            children: [
                              Object(H.jsx)("div", {
                                className: "success-icon__tip",
                              }),
                              Object(H.jsx)("div", {
                                className: "success-icon__long",
                              }),
                            ],
                          }),
                        }),
                        Object(H.jsx)("h4", {
                          children: "Feedback Submit Successfully",
                        }),
                        Object(H.jsx)("div", {
                          onClick: function () {
                            y(!g);
                          },
                          className: "feedback-modal-cls-btn",
                          children: Object(H.jsx)("img", {
                            src: "assets/images/icons/close.svg",
                            alt: "",
                            height: "25px",
                          }),
                        }),
                      ],
                    })
                  : Object(H.jsxs)("div", {
                      children: [
                        Object(H.jsx)("h3", {
                          className: "pollBox__title",
                          children: "Q".concat(a + 1, ". ").concat(s),
                        }),
                        Object(H.jsx)("ul", {
                          className: "pollBox__options",
                          children: Object(H.jsx)("input", {
                            type: "text",
                            placeholder: "Write text here...",
                            value: k,
                            onChange: function (e) {
                              v(!1), S(e.target.value);
                            },
                          }),
                        }),
                        m &&
                          Object(H.jsxs)(H.Fragment, {
                            children: [
                              Object(H.jsx)("div", {
                                style: { color: "red", marginBottom: "0rem" },
                                children:
                                  "* Please give some response first, to submit.",
                              }),
                              Object(H.jsx)("br", {}),
                            ],
                          }),
                        Object(H.jsx)("div", {
                          style: { textAlign: "center" },
                          children: Object(H.jsx)("button", {
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
      function De(e) {
        var t = e.visiblePollData,
          n = e.submitResponse,
          c = e.pollAnswerredData;
        return Object(H.jsx)("div", {
          className: "sidebar__body",
          children: Object(H.jsx)("div", {
            className: "",
            children: Object(H.jsxs)("div", {
              className: "pollBox__body",
              children: [
                t &&
                  0 === t.length &&
                  Object(H.jsx)("div", {
                    className: "noVisiblePoll",
                    style: { textAlign: "center", marginTop: "1rem" },
                    children: Object(H.jsxs)("p", {
                      children: [
                        "As soon as a poll is posted ",
                        Object(H.jsx)("br", {}),
                        "you will be able to express your opinion.",
                      ],
                    }),
                  }),
                t &&
                  t.map(function (e, t) {
                    return Object(H.jsxs)(
                      "div",
                      {
                        className: "pollBox",
                        style: { overflow: "hidden" },
                        children: [
                          e.state === Ie &&
                            Object(H.jsx)(Te, {
                              data: e,
                              handleSubmit: n,
                              checkIfAlreadyAnswered: c[e.id],
                              index: t,
                            }),
                          e.state === Ae &&
                            Object(H.jsx)(Re, { data: e, index: t }),
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
      var Me = "poll",
        Fe = "pollResponse",
        Le = "backStage",
        Xe = n(54),
        Ee = null,
        Ue = function (e, t, n) {
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
                              (s = j.collection(Me).doc()),
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
                                state: Pe,
                                totalResponse: 0,
                                timestamp: f.firestore.Timestamp.now(),
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
                                state: Pe,
                                totalResponse: 0,
                                timestamp: f.firestore.Timestamp.now(),
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
        Be = function (e) {
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
                              (a = j.collection(Me)),
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
        qe = function (e, t) {
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
                              (r = j.collection(Me)),
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
        We = function (e, t) {
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
                                .collection(Fe)
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
        He = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return console.log("noFunFound");
                  },
            n = j.collection(Me).where("eventId", "==", e);
          Ee = n.onSnapshot(
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
        Ve = function () {
          Ee && Ee();
        },
        Je = function (e, t, n, c, a, r) {
          return new Promise(
            (function () {
              var s = Object(l.a)(
                o.a.mark(function s(i, d) {
                  var p, b, h;
                  return o.a.wrap(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            return (
                              (s.prev = 0),
                              (p = j.collection(Me).doc(t)),
                              (b = j
                                .collection(Fe)
                                .doc("".concat(n, "+").concat(t))),
                              (h = Xe("response-")),
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
                                                i.get(b)
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
                                                    f.firestore.FieldValue.increment(
                                                      1
                                                    ),
                                                })),
                                                "multiple" === r &&
                                                  (delete (m = Object(u.a)(
                                                    {},
                                                    a
                                                  )).response,
                                                  i.set(b, {
                                                    id: h,
                                                    targetId: t,
                                                    user: n,
                                                    userName: c,
                                                    eventId: e,
                                                    timeStamp:
                                                      f.firestore.FieldValue.serverTimestamp(),
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
                                                      f.firestore.FieldValue.increment(
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
      n(55);
      function ze(e) {
        var t = e.id,
          n = e.isPollUser,
          a = (e.pollAnalytics, Object(c.useContext)(V).user),
          r = Object(c.useState)({}),
          s = Object(d.a)(r, 2),
          i = s[0],
          b = s[1],
          f = Object(c.useState)(null),
          j = Object(d.a)(f, 2),
          h = j[0],
          m = j[1],
          v = Object(c.useState)([]),
          O = Object(d.a)(v, 2),
          x = O[0],
          g = O[1],
          y = Object(c.useState)(!1),
          w = Object(d.a)(y, 2),
          N = w[0],
          k = w[1],
          S = Object(c.useState)(),
          C = Object(d.a)(S, 2),
          _ = C[0],
          P = C[1],
          I = Object(c.useState)([]),
          A = Object(d.a)(I, 2),
          R = A[0],
          T = A[1],
          D = Object(c.useState)(!1),
          M = Object(d.a)(D, 2),
          F = M[0],
          L = M[1],
          X = Object(c.useState)(!1),
          E = Object(d.a)(X, 2),
          U = E[0],
          B = E[1],
          q = Object(c.useState)(!1),
          W = Object(d.a)(q, 2),
          J = W[0],
          z = W[1],
          Q = Object(c.useState)({ open: !1, id: null, type: "" }),
          K = Object(d.a)(Q, 2),
          G = K[0],
          Z = K[1];
        Object(c.useEffect)(function () {
          return (
            te(),
            function () {
              Ve();
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
                        return (e.next = 6), $(t[c].id);
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
                        b(n);
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
          $ = function (e) {
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
                                We(
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
          ee = null;
        h &&
          (ee = h.filter(function (e) {
            return e.state !== Pe;
          }));
        var te = function () {
            z(!0),
              He(t, function (e, t) {
                t || (m(oe(e)), Y(e)), z(!1);
              });
          },
          ne = (function () {
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
                          (r = x.filter(function (e, t) {
                            return t === c;
                          }))[0].question
                        ) {
                          e.next = 4;
                          break;
                        }
                        return e.abrupt("return");
                      case 4:
                        return (
                          x.length <= 1 && k(!1),
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
                                                Ue("multiple", r[0], t)
                                              );
                                            case 3:
                                              te(),
                                                (s = x.filter(function (e, t) {
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
                        return (e.next = 9), qe(c, { state: a });
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
                        return (e.next = 14), qe(c, { state: a });
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
                            (R.length > 1
                              ? ((c = R.filter(function (e, t) {
                                  return t !== n;
                                })),
                                T(c))
                              : T([])),
                          "publish" !== t)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return (e.next = 4), Be(n);
                      case 4:
                        "success" === e.sent &&
                          ((a = R.filter(function (e) {
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
                          (r = R.filter(function (e, t) {
                            return t === c;
                          }))[0].question
                        ) {
                          e.next = 4;
                          break;
                        }
                        return e.abrupt("return");
                      case 4:
                        return (
                          R.length <= 1 && L(!1),
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
                                                Ue("feedback", r[0], t)
                                              );
                                            case 3:
                                              te(),
                                                (s = R.filter(function (e, t) {
                                                  return t !== c;
                                                })),
                                                T(s),
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
                        return (e.next = 9), qe(c, { state: a });
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
                        return (e.next = 14), qe(c, { state: a });
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
                            (x.length > 1
                              ? ((c = x.filter(function (e, t) {
                                  return t !== n;
                                })),
                                g(c))
                              : g([])),
                          "publish" !== t)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return (e.next = 4), Be(n);
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
              var a = x[t];
              (a[n] = c),
                -1 === t
                  ? console.log("no match")
                  : g(
                      [].concat(
                        Object(ce.a)(x.slice(0, t)),
                        [a],
                        Object(ce.a)(x.slice(t + 1))
                      )
                    );
            }
            if ("feedback" === e) {
              var r = R[t];
              (r[n] = c),
                -1 === t
                  ? console.log("no match")
                  : T(
                      [].concat(
                        Object(ce.a)(R.slice(0, t)),
                        [r],
                        Object(ce.a)(R.slice(t + 1))
                      )
                    );
            }
          },
          oe = function (e) {
            return e.sort(function (e, t) {
              return e.timestamp >= t.timestamp ? -1 : 1;
            });
          };
        return Object(H.jsx)(H.Fragment, {
          children: n
            ? Object(H.jsx)(De, {
                visiblePollData: ee,
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
                                      Je(t, e, a.uid, a.displayName, n, c)
                                    );
                                  case 3:
                                    b(
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
            : Object(H.jsxs)("div", {
                className: "communityBox__body",
                children: [
                  Object(H.jsxs)("div", {
                    className: "poll-form-container",
                    children: [
                      Object(H.jsxs)("div", {
                        style: { position: "relative" },
                        children: [
                          Object(H.jsx)("button", {
                            className: "poll-btn ".concat(U && "pbh"),
                            onClick: function () {
                              return B(!U);
                            },
                            children: "+ Create new Poll",
                          }),
                          U &&
                            Object(H.jsxs)("div", {
                              className: "create-new-btn-optns",
                              children: [
                                Object(H.jsx)("div", {
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
                                        ].concat(Object(ce.a)(x))
                                      ),
                                      k(!0),
                                      void B(!1)
                                    );
                                  },
                                  children: "Multiple Choice",
                                }),
                                Object(H.jsx)("div", {
                                  onClick: function () {
                                    return (
                                      T(
                                        [{ question: "" }].concat(
                                          Object(ce.a)(R)
                                        )
                                      ),
                                      L(!0),
                                      void B(!1)
                                    );
                                  },
                                  children: "Feedback",
                                }),
                              ],
                            }),
                        ],
                      }),
                      N &&
                        (null === x || void 0 === x
                          ? void 0
                          : x.map(function (e, t) {
                              return Object(H.jsxs)(
                                "div",
                                {
                                  className: "poll-form",
                                  children: [
                                    Object(H.jsxs)("button", {
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
                                        Object(H.jsx)("img", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("button", {
                                      className: "poll-btn",
                                      onClick: function () {
                                        return ne("save", t);
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
                        (null === R || void 0 === R
                          ? void 0
                          : R.map(function (e, t) {
                              return Object(H.jsxs)(
                                "div",
                                {
                                  className: "poll-form",
                                  children: [
                                    Object(H.jsxs)("button", {
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
                                        Object(H.jsx)("img", {
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
                                    Object(H.jsx)("input", {
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
                                    Object(H.jsx)("button", {
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
                    Object(H.jsx)("div", {
                      style: { marginTop: "1rem" },
                      children: "Please wait...",
                    }),
                  h &&
                    h.map(function (e, t) {
                      var n, c, a;
                      return Object(H.jsxs)(
                        "div",
                        {
                          className: "poll-form poll-form-data",
                          children: [
                            Object(H.jsxs)("div", {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignSelf: e.state === Pe && "flex-end",
                              },
                              children: [
                                e.state !== Pe &&
                                  Object(H.jsxs)("div", {
                                    className: "live-text",
                                    style: { fontWeight: 600 },
                                    children: [
                                      Object(H.jsx)("div", {
                                        className: "live-mark",
                                      }),
                                      "LIVE NOW",
                                    ],
                                  }),
                                Object(H.jsxs)("button", {
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
                                    Object(H.jsx)("img", {
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
                            Object(H.jsxs)("p", {
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
                                  Object(H.jsx)("span", {
                                    style: {
                                      float: "right",
                                      cursor: "pointer",
                                    },
                                    onClick: function () {
                                      return P(_ ? "" : h.length - t);
                                    },
                                    children: _
                                      ? Object(H.jsx)("img", {
                                          src: "assets/images/icons/chevronup.svg",
                                          alt: "down",
                                          height: "15px",
                                        })
                                      : Object(H.jsx)("img", {
                                          src: "assets/images/icons/chevrondown.svg",
                                          alt: "down",
                                          height: "15px",
                                        }),
                                  }),
                              ],
                            }),
                            Object(H.jsxs)("div", {
                              style: { maxHeight: "200px", overflow: "auto" },
                              children: [
                                0 ===
                                  (null === e ||
                                  void 0 === e ||
                                  null === (n = e.feedbacks) ||
                                  void 0 === n
                                    ? void 0
                                    : n.length) &&
                                  Object(H.jsx)("div", {
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
                                      return Object(H.jsx)(
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
                                  return Object(H.jsxs)(
                                    "div",
                                    {
                                      className: "poll-ans-list",
                                      children: [
                                        Object(H.jsx)("span", {
                                          children: "0".concat(n + 1, ". "),
                                        }),
                                        " ",
                                        t.value,
                                        e.state === Ae &&
                                          Object(H.jsx)("div", {
                                            className: "custom-slider",
                                            style: { padingLeft: "6%" },
                                            children: Object(H.jsxs)("div", {
                                              className: "custom-slider__bar",
                                              children: [
                                                Object(H.jsx)("span", {
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
                                                Object(H.jsx)("div", {
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
                            Object(H.jsxs)("div", {
                              style: {
                                display: "flex",
                                justifyContent:
                                  e.state !== Pe ? "space-between" : "center",
                              },
                              children: [
                                Object(H.jsx)("button", {
                                  className: "poll-btn",
                                  onClick: function () {
                                    return ne(
                                      "publish",
                                      e.id,
                                      e.state !== Pe ? Pe : Ie
                                    );
                                  },
                                  style: {
                                    border: "1px solid black",
                                    fontWeight: "700",
                                  },
                                  children:
                                    e.state !== Pe
                                      ? "Unpublish"
                                      : "Publish Poll",
                                }),
                                e.state !== Pe &&
                                  !e.feedbacks &&
                                  Object(H.jsx)("button", {
                                    className: "poll-btn",
                                    onClick: function () {
                                      return ne(
                                        "showResult",
                                        e.id,
                                        e.state === Ae ? Ie : Ae
                                      );
                                    },
                                    style: {
                                      border: "1px solid black",
                                      fontWeight: "700",
                                    },
                                    children:
                                      e.state === Ie
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
                    Object(H.jsx)(Qe, {
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
      var Qe = function (e) {
          var t = e.handleDeletePoll,
            n = e.type,
            c = e.id,
            a = e.formType,
            r = e.handleDeleteFeedbackPoll,
            s = e.setShowDeleteModal;
          return Object(H.jsx)("div", {
            className: "dlt-mdl",
            children: Object(H.jsxs)("div", {
              className: "dlt-mdl-bdy",
              children: [
                Object(H.jsx)("div", {
                  style: { fontWeight: 700 },
                  children:
                    "By deleting this poll you will loose all associated data and results.",
                }),
                Object(H.jsxs)("div", {
                  style: { display: "flex", justifyContent: "space-around" },
                  children: [
                    Object(H.jsx)("button", {
                      className: "poll-btn",
                      onClick: function () {
                        return s({ open: !1, id: null, type: "" });
                      },
                      style: { border: "1px solid black" },
                      children: "Not Now",
                    }),
                    Object(H.jsx)("button", {
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
        Ke = function (e, t, n) {
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
                              (s = j.collection(Le).doc("notification")),
                              (c.next = 4),
                              s.set(
                                Object(u.a)(
                                  Object(u.a)({}, e),
                                  {},
                                  {
                                    eventId: t,
                                    userId: n,
                                    timestamp: f.firestore.Timestamp.now(),
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
        Ge = function (e, t) {
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
                              (r = j.collection(Le)),
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
        Ze = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return console.log("noFunFound");
                  },
            n = j.collection(Le).where("eventId", "==", e);
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
      function Ye(e) {
        var t = e.id,
          n = e.isPollUser,
          a = Object(c.useContext)(V).user,
          r = Object(c.useState)({}),
          s = Object(d.a)(r, 2),
          i = s[0],
          p = s[1],
          b = Object(c.useState)({ notification: "", published: !1 }),
          f = Object(d.a)(b, 2),
          j = f[0],
          h = f[1],
          m = Object(c.useState)(!1),
          v = Object(d.a)(m, 2),
          O = v[0],
          x = v[1];
        Object(c.useEffect)(function () {
          g();
        }, []);
        var g = function () {
            x(!0),
              Ze(t, function (e, t) {
                t || p(e[0]), x(!1);
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
                                              Ke(j, t, a.uid)
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
                        return (e.next = 5), Ge(c, { published: r });
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
        return Object(H.jsx)(H.Fragment, {
          children:
            !n &&
            Object(H.jsxs)("div", {
              className: "communityBox__body",
              children: [
                Object(H.jsx)("div", {
                  className: "poll-form-container",
                  children: Object(H.jsxs)("div", {
                    className: "poll-form",
                    children: [
                      Object(H.jsx)("input", {
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
                      Object(H.jsx)("button", {
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
                O &&
                  Object(H.jsx)("div", {
                    style: { marginTop: "1rem" },
                    children: "Please wait...",
                  }),
                Object(H.jsxs)("div", {
                  className: "poll-form poll-form-data",
                  children: [
                    Object(H.jsx)("p", {
                      style: {
                        paddingTop: "10px",
                        marginBottom: "25px",
                        fontWeight: 600,
                      },
                      children:
                        null === i || void 0 === i ? void 0 : i.notification,
                    }),
                    Object(H.jsx)("div", {
                      style: { display: "flex", justifyContent: "center" },
                      children: Object(H.jsx)("button", {
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
      function $e() {
        var e = Object(c.useContext)(z),
          t = e.activeMenu,
          n = e.isPollAdmin,
          a = Object(c.useContext)(ee),
          r = a.publicRoomName,
          s = a.rawUserData,
          i = Object(c.useContext)(V).user;
        return Object(H.jsx)("div", {
          className: "wrapper",
          children: Object(H.jsxs)("aside", {
            className: "sidebar active",
            children: [
              Object(H.jsx)("header", {
                className: "headerBox",
                children: Object(H.jsx)(ne, {}),
              }),
              i && i.isChecked
                ? Object(H.jsxs)(H.Fragment, {
                    children: [
                      (t === Q || t === Y) && Object(H.jsx)(_e, {}),
                      t === K &&
                        Object(H.jsx)(be, {
                          room: { roomId: r },
                          rawUserData: s,
                        }),
                      t === G && Object(H.jsx)(ze, { id: r, isPollUser: !n }),
                      t === Z && Object(H.jsx)(Ye, { id: r, isPollUser: !n }),
                    ],
                  })
                : Object(H.jsx)(H.Fragment, {
                    children: Object(H.jsx)(me, {}),
                  }),
            ],
          }),
        });
      }
      n(56);
      var et = function () {
          return Object(H.jsx)(H.Fragment, {
            children: Object(H.jsx)($, {
              children: Object(H.jsx)(te, { children: Object(H.jsx)($e, {}) }),
            }),
          });
        },
        tt = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 61))
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
        Object(H.jsx)(a.a.StrictMode, {
          children: Object(H.jsx)(J, { children: Object(H.jsx)(et, {}) }),
        }),
        document.getElementById("root")
      ),
        tt();
    },
  },
  [[57, 1, 2]],
]);
//# sourceMappingURL=main.1029930b.chunk.js.map
