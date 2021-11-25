(this["webpackJsonpzoom-sdk-react"] =
  this["webpackJsonpzoom-sdk-react"] || []).push([
  [0],
  {
    115: function (e, t, n) {
      "use strict";
      (function (e) {
        var c = n(15),
          a = n(5),
          o = n(20),
          i = n(116),
          s = n(18),
          r = n(118),
          u = n(4);
        t.a = function () {
          var t = Object(a.useState)(""),
            l = Object(c.a)(t, 2),
            f = l[0],
            m = l[1],
            b = Object(a.useState)("Tp3phWY0QFiQdAW66pMGfg"),
            j = Object(c.a)(b, 2),
            d = j[0],
            g =
              (j[1],
              Object(a.useState)("vUvAeJiTw8UgyEGAXq30Gcd39JAKnmtw5MWz")),
            h = Object(c.a)(g, 2),
            p = h[0],
            O = (h[1], Object(a.useState)([])),
            v = Object(c.a)(O, 2),
            x = v[0],
            w = v[1],
            N = Object(a.useContext)(o.a).user,
            S = s.a.firestore().collection("Meetings");
          Object(a.useEffect)(function () {
            console.log("in effect"),
              S.onSnapshot(function (e) {
                var t = [];
                e.forEach(function (e) {
                  t.push(e.data());
                }),
                  w(t);
              });
          }, []),
            Object(a.useEffect)(
              function () {
                0 !== x.length &&
                  (function (t, n, c, a) {
                    return new Promise(function (o, i) {
                      try {
                        var s = new Date().getTime() - 3e4,
                          r = e
                            .from(t + "".concat(c) + "".concat(s) + a)
                            .toString("base64"),
                          u = E.createHmac("sha256", n.toString())
                            .update(r)
                            .digest("base64");
                        o(
                          e
                            .from(
                              ""
                                .concat(t, ".")
                                .concat(c, ".")
                                .concat(s, ".")
                                .concat(a, ".")
                                .concat(u)
                            )
                            .toString("base64")
                        );
                      } catch (l) {
                        console.log(l);
                      }
                    });
                  })(d, p, x[0].MeetingID, 0).then(function (e) {
                    m(e), console.log(f);
                  });
              },
              [x]
            );
          var E = n(131);
          return (
            Object(a.useEffect)(
              function () {
                console.log(N), N && console.log(N.email);
              },
              [N]
            ),
            Object(u.jsx)(u.Fragment, {
              children:
                null !== N && 0 !== f.length
                  ? Object(u.jsx)(i.a, {
                      signature: f,
                      meetingNumber: x[0].MeetingID,
                      password: x[0].password,
                      apiKey: d,
                      user: N.email,
                    })
                  : Object(u.jsx)(r.a, {}),
            })
          );
        };
      }.call(this, n(8).Buffer));
    },
    116: function (e, t, n) {
      "use strict";
      var c = n(5),
        a = n(18),
        o = n(20),
        i = n(4);
      t.a = function (e) {
        var t = Object(c.useContext)(o.a).showMeeting;
        return (
          Object(c.useLayoutEffect)(function () {}),
          Object(i.jsx)("div", {
            className: "zoom-div",
            children: t
              ? Object(i.jsx)("iframe", {
                  src: "/CDN/meeting.html?name="
                    .concat(e.user, "&mn=")
                    .concat(e.meetingNumber, "&email=")
                    .concat(e.user, "&pwd=")
                    .concat(e.password, "&role=0&lang=en-US&signature=")
                    .concat(e.signature, "&china=0&apiKey=")
                    .concat(e.apiKey),
                  className: "iframe",
                  id: "iframe",
                })
              : Object(i.jsx)("div", {
                  className: "mian_login_cont",
                  children: Object(i.jsxs)("div", {
                    className: "center_login_cont",
                    children: [
                      Object(i.jsx)("h1", {
                        className: "heading",
                        children: "Logout and Login again to Join Meeting",
                      }),
                      Object(i.jsx)("button", {
                        onClick: function () {
                          var e = document.getElementById("iframe");
                          e && (e.style.display = "none"), a.a.auth().signOut();
                        },
                        className: "logout-btn myBtn",
                        children: "Logout",
                      }),
                    ],
                  }),
                }),
          })
        );
      };
    },
    118: function (e, t, n) {
      "use strict";
      var c = n(62),
        a = n.n(c),
        o = n(117),
        i = n(15),
        s = n(5),
        r = n(18),
        u = n.p + "static/media/zoom.01c24159.png",
        l = n(20),
        f = n(4);
      t.a = function () {
        var e = Object(s.useState)(""),
          t = Object(i.a)(e, 2),
          n = t[0],
          c = t[1],
          m = Object(s.useState)(""),
          b = Object(i.a)(m, 2),
          j = b[0],
          d = b[1],
          g = Object(s.useContext)(l.a).setShowMeeting,
          h = (function () {
            var e = Object(o.a)(
              a.a.mark(function e(t) {
                return a.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            t.preventDefault(),
                            (e.prev = 1),
                            (e.next = 4),
                            r.a
                              .auth()
                              .signInWithEmailAndPassword(
                                (n + "@gmail.com").trim().toLocaleLowerCase(),
                                n + "@gmail.com123456"
                              )
                          );
                        case 4:
                          g(!0), (e.next = 21);
                          break;
                        case 7:
                          if (
                            ((e.prev = 7),
                            (e.t0 = e.catch(1)),
                            "auth/user-not-found" !== e.t0.code)
                          ) {
                            e.next = 21;
                            break;
                          }
                          return (
                            (e.prev = 10),
                            console.log("in"),
                            (e.next = 14),
                            r.a
                              .auth()
                              .createUserWithEmailAndPassword(
                                (n + "@gmail.com").trim().toLocaleLowerCase(),
                                n + "@gmail.com123456"
                              )
                          );
                        case 14:
                          return g(!0), e.abrupt("return");
                        case 18:
                          (e.prev = 18), (e.t1 = e.catch(10)), e.t1.code;
                        case 21:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [
                    [1, 7],
                    [10, 18],
                  ]
                );
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })();
        return Object(f.jsx)("div", {
          className: "mian_login_cont",
          children: Object(f.jsxs)("div", {
            className: "center_login_cont",
            children: [
              Object(f.jsx)("img", { src: u, alt: "", className: "img" }),
              Object(f.jsxs)("form", {
                action: "",
                className: "form",
                children: [
                  Object(f.jsx)("input", {
                    value: n,
                    className: "input",
                    type: "text",
                    onChange: function (e) {
                      return c(e.target.value);
                    },
                    placeholder: "ENTER YOUR NAME",
                  }),
                  Object(f.jsx)("input", {
                    value: j,
                    className: "input",
                    type: "number",
                    onChange: function (e) {
                      return d(e.target.value.substring(0, 10));
                    },
                    placeholder: "ENTER YOUR MOBILE",
                  }),
                  Object(f.jsx)("button", {
                    className: "myBtn",
                    onClick: h,
                    children: "Login",
                  }),
                ],
              }),
            ],
          }),
        });
      };
    },
    123: function (e, t, n) {},
    124: function (e, t, n) {},
    133: function (e, t) {},
    135: function (e, t) {},
    146: function (e, t) {},
    148: function (e, t) {},
    175: function (e, t) {},
    177: function (e, t) {},
    178: function (e, t) {},
    18: function (e, t, n) {
      "use strict";
      var c = n(113),
        a =
          (n(125),
          n(223),
          c.a.initializeApp({
            apiKey: "AIzaSyCQQx4uV9rQTwEluckwWLm6DsbbzWt8VoA",
            authDomain: "zoom-demo-c7f6f.firebaseapp.com",
            projectId: "zoom-demo-c7f6f",
            storageBucket: "zoom-demo-c7f6f.appspot.com",
            messagingSenderId: "317824783999",
            appId: "1:317824783999:web:3d699ef0abea7002b4514a",
          }));
      t.a = a;
    },
    183: function (e, t) {},
    185: function (e, t) {},
    20: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return s;
      }),
        n.d(t, "b", function () {
          return r;
        });
      var c = n(15),
        a = n(5),
        o = n(18),
        i = n(4),
        s = Object(a.createContext)(),
        r = function (e) {
          var t = Object(a.useState)(null),
            n = Object(c.a)(t, 2),
            r = n[0],
            u = n[1],
            l = Object(a.useState)(!1),
            f = Object(c.a)(l, 2),
            m = f[0],
            b = f[1];
          return (
            Object(a.useEffect)(function () {
              o.a.auth().onAuthStateChanged(function (e) {
                u(e);
              });
            }, []),
            Object(i.jsx)(s.Provider, {
              value: { user: r, showMeeting: m, setShowMeeting: b },
              children: e.children,
            })
          );
        };
    },
    204: function (e, t) {},
    216: function (e, t) {},
    219: function (e, t) {},
    222: function (e, t, n) {
      "use strict";
      n.r(t);
      var c = n(5),
        a = n.n(c),
        o = n(112),
        i = n.n(o),
        s = (n(123), n(124), n(20)),
        r = n(115),
        u = n(4);
      var l = function () {
        return Object(u.jsx)(s.b, { children: Object(u.jsx)(r.a, {}) });
      };
      i.a.render(
        Object(u.jsx)(a.a.StrictMode, { children: Object(u.jsx)(l, {}) }),
        document.getElementById("root")
      );
    },
  },
  [[222, 1, 2]],
]);
//# sourceMappingURL=main.2c6a0e2a.chunk.js.map
