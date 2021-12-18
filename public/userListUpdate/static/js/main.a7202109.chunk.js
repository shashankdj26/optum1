(this.webpackJsonpexcel_extract = this.webpackJsonpexcel_extract || []).push([
  [0],
  {
    26: function (e, t) {},
    34: function (e, t, n) {},
    35: function (e, t, n) {},
    41: function (e, t) {},
    42: function (e, t) {},
    49: function (e, t, n) {},
    51: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(11),
        r = n.n(a),
        c = n(28),
        s = n.n(c),
        o = (n(34), n.p, n(35), n(5)),
        i = n.n(o),
        l = n(9),
        u = n(14),
        d = n(15),
        p = n(17),
        f = n(16),
        h = n(18),
        m = n.n(h),
        b = n(19);
      n(43), n(54), n(45), n(52), n(53);
      b.a.initializeApp({
        apiKey: "AIzaSyCi_y6t63OqbHG1KJlxmzzLYVYgq-vqksI",
        authDomain: "herovirtual22.firebaseapp.com",
        projectId: "herovirtual22",
        storageBucket: "herovirtual22.appspot.com",
        messagingSenderId: "1094006397159",
        appId: "1:1094006397159:web:bf387462f37e9d9ff0ea42",
        measurementId: "G-2Y17CRXF3M",
      }),
        (window.firebaseInstance = b.a);
      b.a.auth();
      var g = b.a.database();
      b.a.app();
      function v(e, t) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = Object(l.a)(
          i.a.mark(function e(t, n) {
            var a;
            return i.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    a = 0;
                  case 1:
                    if (!(a < t.length)) {
                      e.next = 7;
                      break;
                    }
                    return (e.next = 4), n(t[a], a, t);
                  case 4:
                    a++, (e.next = 1);
                    break;
                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      var x = (function () {
          var e = Object(l.a)(
            i.a.mark(function e(t, n) {
              var a;
              return i.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (a = []),
                        console.log(t),
                        (e.next = 4),
                        v(
                          t,
                          (function () {
                            var e = Object(l.a)(
                              i.a.mark(function e(t) {
                                var n, r, c;
                                return i.a.wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        try {
                                          console.log(t),
                                            (n = t.email.toLowerCase()),
                                            t.unicode.toLowerCase().trim(),
                                            (r = n.replace(
                                              /[&\/\\#,+$~%.'":*?<>{}]/g,
                                              ""
                                            )),
                                            (c = {
                                              email: n,
                                              id: r,
                                              name: t.name,
                                              unicode: t.unicode,
                                              profile_image:
                                                "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                                            }),
                                            g.ref("users/".concat(r)).set(c),
                                            a.push(r);
                                        } catch (s) {
                                          console.log(s), a.push(s);
                                        }
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
                          })()
                        )
                      );
                    case 4:
                      console.log(a), n && n();
                    case 6:
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
        w = n(13),
        C = n.n(w),
        O = (n(49), n(4)),
        y = (function (e) {
          Object(p.a)(n, e);
          var t = Object(f.a)(n);
          function n(e) {
            var a;
            return (
              Object(u.a)(this, n),
              ((a = t.call(this, e)).inputRef = r.a.createRef()),
              (a.batchCount = 15),
              (a.singleBatchWaitTime = 4e3),
              (a.callCounter = 0),
              (a.asyncForEach = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t, n) {
                    var a;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            a = 0;
                          case 1:
                            if (!(a < t.length)) {
                              e.next = 7;
                              break;
                            }
                            return (e.next = 4), n(t[a], a, t);
                          case 4:
                            a++, (e.next = 1);
                            break;
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
              })()),
              (a.processData = function (e) {
                a.processFakeCloudCall(e, function () {
                  console.log(a.callCounter),
                    (a.callCounter -= 1),
                    0 === a.callCounter &&
                      (a.setState({
                        inUse: !1,
                        isLoading: !1,
                        selectedFile: null,
                      }),
                      C()({
                        icon: "success",
                        title: "All the users has been added to the database.",
                      }));
                });
              }),
              (a.processFakeCloudCall = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t, n) {
                    var r;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = []),
                              console.log(t),
                              (e.next = 4),
                              a.asyncForEach(
                                t,
                                (function () {
                                  var e = Object(l.a)(
                                    i.a.mark(function e(t) {
                                      var n, a, c, s, o, l;
                                      return i.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              try {
                                                (n = t.email.toLowerCase()),
                                                  (a = t.firstname
                                                    .toLowerCase()
                                                    .trim()),
                                                  (c = t.lastname
                                                    .toLowerCase()
                                                    .trim()),
                                                  (s = a + " " + c),
                                                  (o = n.replace(
                                                    /[&\/\\#,+$~%.'":*?<>{}]/g,
                                                    ""
                                                  )),
                                                  (l = {
                                                    email: n,
                                                    id: o,
                                                    name: s,
                                                    profile_image:
                                                      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                                                  }),
                                                  g
                                                    .ref("users/".concat(o))
                                                    .set(l),
                                                  r.push(o);
                                              } catch (i) {
                                                console.log(i), r.push(i);
                                              }
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
                                })()
                              )
                            );
                          case 4:
                            console.log(r), n && n();
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t, n) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.getJsonFromExcel = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t) {
                    var n;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            ((n = new FileReader()).onload = function (e) {
                              var n = e.target.result,
                                a = m.a.read(n, { type: "binary" });
                              a.SheetNames.forEach(function (e) {
                                var n = m.a.utils.sheet_to_row_object_array(
                                  a.Sheets[e]
                                );
                                t(n);
                              });
                            }),
                              n.readAsBinaryString(a.state.selectedFile);
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.chunk = function (e, t) {
                for (var n = [], a = 0; a < e.length; a++) {
                  var r = n[n.length - 1];
                  r && r.length !== t ? r.push(e[a]) : n.push([e[a]]);
                }
                return n;
              }),
              (a.takeAction = function (e) {
                e && e.preventDefault(),
                  a.state.selectedFile && !a.state.inUse
                    ? (a.setState({ inUse: !0, isLoading: !0 }),
                      a.getJsonFromExcel(function (e) {
                        if (
                          ((a.callCounter = 0),
                          console.log(e),
                          e.length < a.batchCount)
                        )
                          (a.callCounter += 1), a.processData(e);
                        else {
                          var t = a.chunk(e, a.batchCount);
                          a.callCounter = 0;
                          var n = a.singleBatchWaitTime;
                          t.forEach(function (e) {
                            (a.callCounter += 1),
                              console.log(
                                e.length,
                                (n * a.callCounter) / 1e3,
                                a.callCounter,
                                n
                              ),
                              setTimeout(function () {
                                a.processData(e);
                              }, n * a.callCounter);
                          });
                        }
                      }))
                    : console.log("wait for another task to get complete!!");
              }),
              (a.state = { selectedFile: null, inUse: !1, isLoading: !1 }),
              a
            );
          }
          return (
            Object(d.a)(n, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(O.jsx)(O.Fragment, {
                    children: Object(O.jsxs)("div", {
                      className: "card",
                      children: [
                        Object(O.jsx)("h2", {
                          children: "Create Users From Excel",
                        }),
                        Object(O.jsxs)("div", {
                          className: "input-body ml",
                          children: [
                            Object(O.jsx)("label", {
                              htmlFor: "newUserExcel",
                              children: "Excel File: ",
                            }),
                            Object(O.jsx)("input", {
                              type: "file",
                              id: "newUserExcel",
                              placeholder: "Name",
                              accept: ".xls,.xlsx",
                              onChange: function (t) {
                                e.setState({ selectedFile: t.target.files[0] });
                              },
                              ref: this.inputRef,
                            }),
                          ],
                        }),
                        Object(O.jsx)("button", {
                          disabled: !this.state.selectedFile,
                          style: this.state.selectedFile
                            ? {}
                            : { pointerEvents: "none", opacity: "0.4" },
                          theme: "accent",
                          onClick: function (t) {
                            return e.takeAction(t);
                          },
                          children: "Create Users",
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            n
          );
        })(r.a.Component),
        F = n(24),
        k = (function (e) {
          Object(p.a)(n, e);
          var t = Object(f.a)(n);
          function n(e) {
            var a;
            return (
              Object(u.a)(this, n),
              ((a = t.call(this, e)).validateEmail = function (e) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  String(e).toLowerCase()
                );
              }),
              (a.onInputChange = function (e) {
                e.preventDefault();
                var t = e.target.value;
                a.setState(Object(F.a)({}, e.target.name, t));
              }),
              (a.handleInputChange = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t, n) {
                    var r;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            (r = !(r = a.state[n])),
                              a.setState(Object(F.a)({}, n, r)),
                              console.log(r);
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t, n) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.onFormSubmit = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t) {
                    var n, r, c, s;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (t.preventDefault(),
                              (n = a.state.name),
                              (r = a.state.email),
                              (c = a.state.unicode),
                              n &&
                                0 !== n.length &&
                                r &&
                                0 !== r.length &&
                                c &&
                                0 !== c.length)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return (
                              window.alert("enter valid data"),
                              e.abrupt("return")
                            );
                          case 7:
                            if (a.validateEmail(r)) {
                              e.next = 10;
                              break;
                            }
                            return (
                              window.alert("enter valid email"),
                              e.abrupt("return")
                            );
                          case 10:
                            (s = [
                              {
                                name: n,
                                email: r.toLowerCase(),
                                unicode: c.toLowerCase().trim(),
                              },
                            ]),
                              console.log(s),
                              x(s, function () {
                                console.log(
                                  "All Work is done!!!! \ud83d\ude0e\ud83d\ude0e\ud83d\ude0e"
                                ),
                                  alert("User added"),
                                  a.setState({
                                    name: "",
                                    email: "",
                                    unicode: "penny2021",
                                  });
                              });
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.state = { name: null, email: null, unicode: "penny2021" }),
              a
            );
          }
          return (
            Object(d.a)(n, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(O.jsx)(O.Fragment, {
                    children: Object(O.jsxs)("div", {
                      className: "card",
                      children: [
                        Object(O.jsx)("h2", { children: "Create Single User" }),
                        Object(O.jsxs)("div", {
                          className: "input-body ",
                          children: [
                            Object(O.jsx)("label", {
                              htmlFor: "newUserEmail",
                              children: "Email: ",
                            }),
                            Object(O.jsx)("input", {
                              type: "email",
                              id: "newUserEmail",
                              name: "email",
                              placeholder: "Email Address",
                              value: this.state.email,
                              onChange: this.onInputChange,
                              autoComplete: "email",
                              required: !0,
                            }),
                          ],
                        }),
                        Object(O.jsxs)("div", {
                          className: "input-body ",
                          children: [
                            Object(O.jsx)("label", {
                              htmlFor: "newUserName",
                              children: "Name: ",
                            }),
                            Object(O.jsx)("input", {
                              type: "text",
                              id: "newUserName",
                              name: "name",
                              placeholder: "Name",
                              value: this.state.name,
                              onChange: this.onInputChange,
                              required: !0,
                            }),
                          ],
                        }),
                        Object(O.jsxs)("div", {
                          className: "input-body ",
                          style: { display: "none" },
                          children: [
                            Object(O.jsx)("label", {
                              htmlFor: "newUserCode",
                              children: "UniCode: ",
                            }),
                            Object(O.jsx)("input", {
                              type: "text",
                              id: "newUsercode",
                              name: "unicode",
                              disabled: !0,
                              placeholder: "penny2021",
                              value: this.state.unicode,
                              onChange: this.onInputChange,
                              required: !0,
                            }),
                          ],
                        }),
                        Object(O.jsx)("button", {
                          theme: "accent",
                          onClick: function (t) {
                            return e.onFormSubmit(t);
                          },
                          children: "Create User",
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            n
          );
        })(r.a.Component),
        U = (function (e) {
          Object(p.a)(n, e);
          var t = Object(f.a)(n);
          function n(e) {
            var a;
            return (
              Object(u.a)(this, n),
              ((a = t.call(this, e)).inputRef = r.a.createRef()),
              (a.batchCount = 15),
              (a.singleBatchWaitTime = 4e3),
              (a.callCounter = 0),
              (a.asyncForEach = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t, n) {
                    var a;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            a = 0;
                          case 1:
                            if (!(a < t.length)) {
                              e.next = 7;
                              break;
                            }
                            return (e.next = 4), n(t[a], a, t);
                          case 4:
                            a++, (e.next = 1);
                            break;
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
              })()),
              (a.callCloudFuntion = function (e, t) {
                JSON.stringify(e);
                console.log(
                  "waiting for resonse now!! request Sent \ud83d\ude0e"
                ),
                  (a.callCounter += 1);
              }),
              (a.deleteUser = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t) {
                    var n, r, c, s, o;
                    return i.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (n = []),
                                t.forEach(function (e) {
                                  n.push(e.email);
                                }),
                                (r = "/users"),
                                (c = g
                                  .ref(r)
                                  .orderByChild("email")
                                  .limitToFirst(1e3)),
                                (e.next = 7),
                                c.once("value")
                              );
                            case 7:
                              (s = e.sent).exists()
                                ? ((o = s.val()),
                                  Object.keys(o).forEach(function (e) {
                                    var t = o[e].email;
                                    if (-1 === n.indexOf(t))
                                      if (
                                        t
                                          .split("@")[0]
                                          .toLowerCase()
                                          .includes("guest")
                                      )
                                        console.log(
                                          "leaving... ".concat(t, " guest")
                                        );
                                      else {
                                        var a = r + "/" + e;
                                        g.ref(a).remove(),
                                          console.log("deleting... ".concat(t));
                                      }
                                    else
                                      console.log(
                                        "leaving... ".concat(t, " excel")
                                      );
                                  }),
                                  console.log("------Done----------"),
                                  a.setState({
                                    inUse: !1,
                                    isLoading: !1,
                                    selectedFile: null,
                                  }),
                                  C()({
                                    icon: "success",
                                    title: "database updated.",
                                  }))
                                : window.alert("noUserFound"),
                                (e.next = 14);
                              break;
                            case 11:
                              (e.prev = 11),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
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
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.processData = function (e) {
                a.processFakeCloudCall(e, function () {
                  console.log(a.callCounter),
                    (a.callCounter -= 1),
                    0 === a.callCounter &&
                      (a.setState({
                        inUse: !1,
                        isLoading: !1,
                        selectedFile: null,
                      }),
                      C()({
                        icon: "success",
                        title: "All the users has been added to the database.",
                      }));
                }),
                  C()({ icon: "success", title: "database updated." });
              }),
              (a.processFakeCloudCall = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t, n) {
                    var r;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = []),
                              console.log(t),
                              (e.next = 4),
                              a.asyncForEach(
                                t,
                                (function () {
                                  var e = Object(l.a)(
                                    i.a.mark(function e(t) {
                                      var n, a, c, s, o, l;
                                      return i.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              try {
                                                (n = t.email.toLowerCase()),
                                                  (a = t.firstname
                                                    .toLowerCase()
                                                    .trim()),
                                                  (c = t.lastname
                                                    .toLowerCase()
                                                    .trim()),
                                                  (s = a + " " + c),
                                                  (o = n.replace(
                                                    /[&\/\\#,+$~%.'":*?<>{}]/g,
                                                    ""
                                                  )),
                                                  (l = {
                                                    email: n,
                                                    id: o,
                                                    name: s,
                                                    profile_image:
                                                      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                                                  }),
                                                  g
                                                    .ref("users/".concat(o))
                                                    .set(l),
                                                  r.push(o);
                                              } catch (i) {
                                                console.log(i), r.push(i);
                                              }
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
                                })()
                              )
                            );
                          case 4:
                            console.log(r), n && n();
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t, n) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.getJsonFromExcel = (function () {
                var e = Object(l.a)(
                  i.a.mark(function e(t) {
                    var n;
                    return i.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            ((n = new FileReader()).onload = function (e) {
                              var n = e.target.result,
                                a = m.a.read(n, { type: "binary" });
                              a.SheetNames.forEach(function (e) {
                                var n = m.a.utils.sheet_to_row_object_array(
                                  a.Sheets[e]
                                );
                                t(n);
                              });
                            }),
                              n.readAsBinaryString(a.state.selectedFile);
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.chunk = function (e, t) {
                for (var n = [], a = 0; a < e.length; a++) {
                  var r = n[n.length - 1];
                  r && r.length !== t ? r.push(e[a]) : n.push([e[a]]);
                }
                return n;
              }),
              (a.takeAction = function (e) {
                e && e.preventDefault(),
                  a.state.selectedFile && !a.state.inUse
                    ? (a.setState({ inUse: !0, isLoading: !0 }),
                      a.getJsonFromExcel(function (e) {
                        a.deleteUser(e);
                      }))
                    : console.log("wait for another task to get complete!!");
              }),
              (a.state = { selectedFile: null, inUse: !1, isLoading: !1 }),
              a
            );
          }
          return (
            Object(d.a)(n, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(O.jsx)(O.Fragment, {
                    children: Object(O.jsxs)("div", {
                      className: "card",
                      children: [
                        Object(O.jsx)("h2", {
                          children: "Delete All Users Except In Excel",
                        }),
                        Object(O.jsxs)("div", {
                          className: "input-body ml",
                          children: [
                            Object(O.jsx)("label", {
                              htmlFor: "newUserExcel",
                              children: "Excel File: ",
                            }),
                            Object(O.jsx)("input", {
                              type: "file",
                              id: "newUserExcel",
                              placeholder: "Name",
                              accept: ".xls,.xlsx",
                              onChange: function (t) {
                                e.setState({ selectedFile: t.target.files[0] });
                              },
                              ref: this.inputRef,
                            }),
                          ],
                        }),
                        Object(O.jsx)("button", {
                          disabled: !this.state.selectedFile,
                          style: this.state.selectedFile
                            ? {}
                            : { pointerEvents: "none", opacity: "0.4" },
                          theme: "accent",
                          onClick: function (t) {
                            return e.takeAction(t);
                          },
                          children: "Update Users",
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            n
          );
        })(r.a.Component);
      var E = function () {
          return Object(O.jsxs)("div", {
            className: "App",
            children: [
              Object(O.jsx)(y, {}),
              Object(O.jsx)(k, {}),
              Object(O.jsx)(U, {}),
            ],
          });
        },
        S = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 55))
              .then(function (t) {
                var n = t.getCLS,
                  a = t.getFID,
                  r = t.getFCP,
                  c = t.getLCP,
                  s = t.getTTFB;
                n(e), a(e), r(e), c(e), s(e);
              });
        };
      s.a.render(
        Object(O.jsx)(r.a.StrictMode, { children: Object(O.jsx)(E, {}) }),
        document.getElementById("root")
      ),
        S();
    },
  },
  [[51, 1, 2]],
]);
//# sourceMappingURL=main.a7202109.chunk.js.map
