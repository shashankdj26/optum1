(this["webpackJsonpbd-project"] = this["webpackJsonpbd-project"] || []).push([
  [0],
  {
    27: function (e, t, n) {},
    36: function (e, t, n) {},
    37: function (e, t, n) {
      "use strict";
      n.r(t);
      var i = {};
      n.r(i),
        n.d(i, "InfoHotspots", function () {
          return v;
        }),
        n.d(i, "AudiData", function () {
          return I;
        }),
        n.d(i, "TeamsData", function () {
          return B;
        }),
        n.d(i, "LobbyHotspots", function () {
          return C;
        }),
        n.d(i, "NetworkingLounge", function () {
          return A;
        });
      var a = {};
      n.r(a),
        n.d(a, "VideoPlayerData", function () {
          return x;
        });
      var o = n(4),
        s = n(12),
        r = n.n(s),
        c = n(20),
        d = n.n(c),
        l = (n(27), n(13)),
        m = n(14),
        p = n(16),
        u = n(15),
        g = n(10),
        b = n(9),
        h = (n(3), n(6), n(5)),
        O = (n(29), n(31), n(33), n(38), n(39), "transition"),
        y = "iframe",
        f = 1,
        k = "named",
        j = [
          { id: 1, name: "Lobby", class: "icon-Lobby" },
          {
            id: 2,
            name: "Auditorium",
            class: "icon-Auditorium",
            subMenus: [
              { id: 1, name: "Q&A", class: "icon-QA" },
              { id: 2, name: "Poll", class: "icon-Poll" },
            ],
          },
          { id: 3, name: "Team Building Zone", class: "icon-Teambuidling" },
          {
            id: 4,
            name: "Networking Lounge",
            class: "icon-Networking",
            subMenus: [
              {
                id: 1,
                name: "Connect",
                class: "icon-Connect",
                leaderboardPoint: "NetworkingConnect",
              },
              {
                id: 2,
                name: "Speaker Profile",
                class: "icon-Speaker",
                leaderboardPoint: "NetworkingSpeakerProfile",
              },
              {
                id: 3,
                name: "Sessions",
                class: "icon-Sessions",
                leaderboardPoint: "NetworkingSession",
              },
              {
                id: 4,
                name: "Chat",
                class: "icon-Chat",
                leaderboardPoint: "NetworkingChat",
              },
            ],
          },
          { id: 5, name: "Profile", class: "icon-MyProfile" },
        ],
        T = "/3dAssets/videos/",
        L = {
          LOBBYLOOP: T + "Lobby_Loop.mp4",
          LOOBYTOINFO: T + "ToInfoBooth.mp4",
          LOBBYTOAudi: T + "ToAuditorium.mp4",
          LOOBYTOPRODUCTSTALL: T + "ToProductStall.mp4",
          LOBBYTOBREAKOUT: T + "breakout.mp4",
          BREAKOUTLOOP: T + "breakoutLoop.mp4",
          AUDITORIUM: T + "Auditorium.mp4",
        },
        w = "/3dAssets/UI/",
        v = {
          "pdf-1": {
            id: "Agenda",
            enabled: !0,
            name: "Agenda",
            style: { margin: "-6% -10.8%" },
            hotspotType: "pdf",
            buttonType: k,
            link: "/web/viewer.html?file=%2Fassets%2Fcontent%2FAgenda.pdf",
          },
          helpdesk: {
            id: "HelpdeskChat",
            enabled: !0,
            name: "Helpdesk",
            style: { margin: "-6% 6.5%" },
            hotspotType: "chatbot",
            buttonType: k,
          },
        },
        I = {
          introVideo: L.AUDITORIUM,
          link: "https://vimeo.com/event/473964",
          placementStyle: {
            margin: "12.8% 34%",
            width: "31%",
            height: "40.6%",
          },
        },
        B = {
          "pdf-1": {
            id: "pdf=1",
            name: "ABOUT THE ACTIVITY",
            description: "",
            link: "/assets/content/TeamBuildingInfo.pdf",
            button: "READ MORE",
          },
          link1: {
            id: "link1",
            name: "Team Leadership",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODFmOTI3MTUtZTFmNy00NTgwLWExMzItOTI2MzkyNmFmYTlk%40thread.v2/0?context=%7b%22Tid%22%3a%2225c1df4b-00ea-4e39-98bd-5f1143c5c5df%22%2c%22Oid%22%3a%22abcb8352-f7bf-475a-82d7-cb6c48c7d70f%22%7d",
          },
          link2: {
            id: "link2",
            name: "Team Mindset",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link3: {
            id: "link3",
            name: "Team Values",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link4: {
            id: "link4",
            name: "Team Rising",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link5: {
            id: "link5",
            name: "Team Leadership",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link6: {
            id: "link6",
            name: "Team Mindset",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link7: {
            id: "link7",
            name: "Team Values",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link8: {
            id: "link8",
            name: "Team Rising",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link9: {
            id: "link9",
            name: "Team Values",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
          link10: {
            id: "link10",
            name: "Team Rising",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            link: "https://www.r1rcm.com/",
          },
        },
        C = {
          PhotoBooth: {
            id: "PhotoBooth",
            enabled: !0,
            style: { margin: "-5% -45.5%" },
            hotspotType: y,
            link: "/photobooth/index.html",
            leaderboardPoint: "Photobooth",
          },
          TeamBuilding: {
            id: "TeamBuilding",
            enabled: !0,
            style: { margin: "-5.5% -31%" },
            hotspotType: O,
            transitionVideo: null,
            transitionType: 2,
            newItem: j[2],
          },
          Audi: {
            id: "Audi",
            enabled: !0,
            style: { margin: "-5.5% -4%" },
            hotspotType: O,
            transitionVideo: L.LOBBYTOAudi,
            transitionType: f,
            newItem: j[1],
          },
          Networking: {
            id: "Networking",
            enabled: !0,
            style: { margin: "-5.5% 23.5%" },
            hotspotType: O,
            transitionVideo: L.LOBBYTOBREAKOUT,
            transitionType: f,
            newItem: j[3],
          },
          Product: {
            id: "Game",
            enabled: !0,
            style: { margin: "-6% 39.5%" },
            hotspotType: y,
            link: "/game/index.html",
            leaderboardPoint: "Game",
          },
          Infodesk: {
            id: "Infodesk",
            enabled: !0,
            style: { margin: "6% -3.5%" },
            hotspotType: O,
            transitionVideo: L.LOOBYTOINFO,
            transitionType: 0,
            newItem: {
              LOGOR1: "/assets/images/R1Logo.png",
              LOGOKOA: "/assets/images/koaLogo.png",
              LOGO: "/assets/images/logo.png",
              LOGOLG: "/assets/images/logo-lg.png",
              LoginScreen: "/assets/images/login/Login.jpg",
              LOGINSCREENSIDELOGO: "/assets/images/logo.png",
              MENULOGO: "/assets/images/logo.png",
              LOBBYLOOP: "/3dAssets/images/Lobby.jpg",
              Infodesk: "/3dAssets/images/Info.jpg",
              ProductStall: "/3dAssets/images/Product-Stall.jpg",
              Breakout: "/3dAssets/images/breakout.jpg",
              WELCOMEBACKGROUND: "assets/images/bg/all-stages.jpg",
              RIPPLE: "/3dAssets/gifs/Ripple-2.4s-128px.svg",
              BACKBUTTON: w + "backButton.png",
              CLOSEBUTTON: w + "closeButton.png",
              BUMPERPRIZEHEADER: "assets/images/banner-header.jpg",
              PDFLOGO: w + "pdfIcon.png",
              INFOBUTTON: w + "info/information.png",
            }.Infodesk,
            hotspot: v,
            name: "Infodesk",
            leaderboardPoint: "InfoDesk",
          },
        },
        A = {
          speakerPdf:
            "/web/viewer.html?file=%2Fassets%2Fcontent%2FSpeakers.pdf",
        },
        x = {
          Holding: {
            enabled: !0,
            type: "youtube",
            id: "Holding",
            link: "https://youtu.be/VoeUTFTXrOk",
            name: "ComingSoon",
            videoCode: "VoeUTFTXrOk",
            description: "",
          },
          Video1: {
            enabled: !1,
            type: "vimeo",
            id: "Video1",
            link: "https://vimeo.com/334905384",
            name: "Neymar",
            videoCode: "781333669",
            description:
              "All content is copy right of R1RCM, strictly non-shareable on any medium. We would request all participants to support the same.\n        In case you need any Get Connected related content reach out to R1 India's communication team.",
          },
        };
      h.a.initializeApp({
        apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
        authDomain: "optum-cdcd7.firebaseapp.com",
        databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
        projectId: "optum-cdcd7",
        storageBucket: "optum-cdcd7.appspot.com",
        messagingSenderId: "33244416026",
        appId: "1:33244416026:web:cd039c460016444059a9a3",
        measurementId: "G-ZR8NLSNB91",
      }),
        (window.firebaseInstance = h.a);
      h.a, h.a.auth(), h.a.firestore();
      var P = h.a.database();
      h.a.analytics(), h.a.storage();
      (function () {
        var e =
            "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
          t = 0,
          n = [];
      })(),
        n(36);
      var N = "online",
        R = (function (e) {
          Object(p.a)(n, e);
          var t = Object(u.a)(n);
          function n() {
            var e;
            Object(l.a)(this, n);
            for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
              a[o] = arguments[o];
            return (
              ((e = t.call.apply(t, [this].concat(a))).state = {
                usersData: null,
                data: null,
              }),
              e
            );
          }
          return (
            Object(m.a)(n, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  P.ref("loggedInUser_VCC").on("value", function (t) {
                    if (t.exists()) {
                      var n = t.val(),
                        i = {},
                        a = {};
                      Object.keys(n).forEach(function (e) {
                        n[e].state === N &&
                          (i.hasOwnProperty(n[e].location)
                            ? i[n[e].location].push(e)
                            : (i = Object(b.a)(
                                Object(b.a)({}, i),
                                {},
                                Object(g.a)({}, n[e].location, [e])
                              )),
                          (a = Object(b.a)(
                            Object(b.a)({}, a),
                            {},
                            Object(g.a)({}, e, n[e])
                          )));
                      }),
                        console.log(a),
                        console.log(i),
                        e.setState({ usersData: a, data: i });
                    }
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.state,
                    t = e.data,
                    n = e.usersData;
                  return Object(o.jsxs)(o.Fragment, {
                    children: [
                      !t &&
                        Object(o.jsx)(o.Fragment, {
                          children: Object(o.jsx)("div", {
                            className: "LiveCountContainerParent",
                            children: Object(o.jsx)("div", {
                              className: "LiveCountContainer",
                              style: {
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                              },
                              children: "Loading....",
                            }),
                          }),
                        }),
                      t &&
                        Object(o.jsx)(o.Fragment, {
                          children: Object(o.jsxs)("div", {
                            className: "LiveCountContainerParent",
                            children: [
                              Object(o.jsx)("div", {
                                className: "LiveCountContainerHeader",
                                children: "LiveCount",
                              }),
                              Object(o.jsx)("div", {
                                className: "LiveCountContainer",
                                children: Object.keys(t).map(function (e) {
                                  return Object(o.jsxs)("div", {
                                    className: "locationContainer",
                                    children: [
                                      Object(o.jsxs)("h2", {
                                        children: [e, ": ", t[e].length],
                                      }),
                                      Object(o.jsx)("div", {
                                        className: "locationUserContainer",
                                        children: t[e].map(function (e) {
                                          return Object(o.jsx)("div", {
                                            className: "connect-card",
                                            children: Object(o.jsxs)("div", {
                                              className: "connect-card-head",
                                              children: [
                                                Object(o.jsx)("div", {
                                                  className:
                                                    "connect-card-head-image",
                                                  style: {
                                                    backgroundImage:
                                                      "url(".concat(
                                                        n[e].profile_image,
                                                        ")"
                                                      ),
                                                    backgroundPosition:
                                                      "center",
                                                    backgroundSize: "contain",
                                                    backgroundRepeat:
                                                      "no-repeat",
                                                  },
                                                }),
                                                Object(o.jsxs)("div", {
                                                  className:
                                                    "connect-card-head-details",
                                                  children: [
                                                    Object(o.jsx)("div", {
                                                      className:
                                                        "connect-card-name",
                                                      children: n[e].name
                                                        ? n[e].name
                                                        : "",
                                                    }),
                                                    // Object(o.jsx)("div", {
                                                    //   className:
                                                    //     "connect-card-title",
                                                    //   children: ""
                                                    //     .concat(
                                                    //       n[e].designation? n[e].designation:'',
                                                    //       ", "
                                                    //     )
                                                    //     .concat(n[e].company? n[e].company:''),
                                                    // }),
                                                    Object(o.jsx)("div", {
                                                      className:
                                                        "connect-card-email",
                                                      children: n[e].email,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          });
                                        }),
                                      }),
                                    ],
                                  });
                                }),
                              }),
                            ],
                          }),
                        }),
                    ],
                  });
                },
              },
            ]),
            n
          );
        })(s.Component),
        S = (function (e) {
          Object(p.a)(n, e);
          var t = Object(u.a)(n);
          function n() {
            return Object(l.a)(this, n), t.apply(this, arguments);
          }
          return (
            Object(m.a)(n, [
              {
                key: "render",
                value: function () {
                  return Object(o.jsx)(R, {});
                },
              },
            ]),
            n
          );
        })(s.Component),
        U = (function (e) {
          Object(p.a)(n, e);
          var t = Object(u.a)(n);
          function n(e) {
            var i;
            return (
              Object(l.a)(this, n), ((i = t.call(this, e)).userClaims = null), i
            );
          }
          return (
            Object(m.a)(n, [
              {
                key: "render",
                value: function () {
                  return Object(o.jsx)(S, {});
                },
              },
            ]),
            n
          );
        })(r.a.Component),
        E = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 40))
              .then(function (t) {
                var n = t.getCLS,
                  i = t.getFID,
                  a = t.getFCP,
                  o = t.getLCP,
                  s = t.getTTFB;
                n(e), i(e), a(e), o(e), s(e);
              });
        };
      d.a.render(
        Object(o.jsx)(r.a.StrictMode, { children: Object(o.jsx)(U, {}) }),
        document.getElementById("root")
      ),
        E();
    },
  },
  [[37, 1, 2]],
]);
//# sourceMappingURL=main.93e3b990.chunk.js.map
