"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _JWTHelpers = require("../utils/jwtHelpers");
var _mongoose = require("mongoose");
var _excluded = ["password", "createdAt", "updatedAt", "__v"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() { } function GeneratorFunction() { } function GeneratorFunctionPrototype() { } var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a; ;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var hashUserPassword = function hashUserPassword(password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};
var checkEmailExisted = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(userEmail) {
    var user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _UserModel["default"].findOne({
            email: userEmail
          });
        case 3:
          user = _context.sent;
          return _context.abrupt("return", !!user);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('>>> check error (checkEmailExisted):', _context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function checkEmailExisted(_x) {
    return _ref.apply(this, arguments);
  };
}();
var checkPhoneExisted = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userPhone) {
    var user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _UserModel["default"].findOne({
            phone: userPhone
          });
        case 3:
          user = _context2.sent;
          return _context2.abrupt("return", !!user);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log('>>> check error (checkPhoneExisted):', _context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function checkPhoneExisted(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var registerNewUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(rawUserData) {
    var regEmail, newUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!(!rawUserData.name || !rawUserData.email || !rawUserData.password || !rawUserData.phone)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Missing required params',
            EC: 1,
            DT: ''
          });
        case 3:
          // check email validation:
          regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regEmail.test(rawUserData.email)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Email is not valid',
            EC: 1
          });
        case 6:
          _context3.next = 8;
          return checkEmailExisted(rawUserData.email);
        case 8:
          if (!_context3.sent) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Email is already existed',
            EC: 2
          });
        case 10:
          _context3.next = 12;
          return checkPhoneExisted(rawUserData.phone);
        case 12:
          if (!_context3.sent) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Phone number is already existed',
            EC: 2
          });
        case 14:
          if (!(rawUserData.password && rawUserData.password.length < 3)) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Password must have more than 3 letters',
            EC: 3,
            DT: ''
          });
        case 16:
          newUser = new _UserModel["default"]({
            name: rawUserData.name,
            email: rawUserData.email,
            password: hashUserPassword(rawUserData.password),
            phone: rawUserData.phone
          });
          _context3.next = 19;
          return newUser.save();
        case 19:
          return _context3.abrupt("return", {
            EM: 'Created successfully!',
            EC: 0,
            DT: ''
          });
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.log('>>> check error from registerNewUser():', _context3.t0);
          return _context3.abrupt("return", {
            EM: "Something wrongs in Service  registerNewUser() ",
            EC: -2,
            DT: ''
          });
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function registerNewUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(userInfo, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return checkEmailExisted(userInfo.valueLogin);
        case 3:
          _context4.t0 = _context4.sent;
          if (_context4.t0) {
            _context4.next = 8;
            break;
          }
          _context4.next = 7;
          return checkPhoneExisted(userInfo.valueLogin);
        case 7:
          _context4.t0 = _context4.sent;
        case 8:
          if (!_context4.t0) {
            _context4.next = 22;
            break;
          }
          _context4.next = 11;
          return _UserModel["default"].findOne({
            $or: [{
              email: userInfo.valueLogin
            }, {
              phone: userInfo.valueLogin
            }]
          }).select('id name email password isAdmin phone');
        case 11:
          user = _context4.sent;
          if (!user) {
            _context4.next = 20;
            break;
          }
          if (!_bcryptjs["default"].compareSync(userInfo.password, user.password)) {
            _context4.next = 19;
            break;
          }
          user.password = undefined; //không trả về password trong  Data
          res.cookie('refresh_token', (0, _JWTHelpers.generateRefreshToken)(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            // ngăn tấn công CSRF 
            maxAge: 1 * 24 * 60 * 60 * 1000 // 7 ngày
          });
          return _context4.abrupt("return", {
            EM: 'Login successfully',
            EC: 0,
            DT: {
              access_token: (0, _JWTHelpers.generateAccessToken)(user),
              refresh_token: (0, _JWTHelpers.generateRefreshToken)(user)
            }
          });
        case 19:
          return _context4.abrupt("return", {
            EM: 'Wrong password!',
            EC: 2,
            DT: ''
          });
        case 20:
          _context4.next = 23;
          break;
        case 22:
          return _context4.abrupt("return", {
            EM: 'Email or phone is not existed',
            EC: 1,
            DT: ''
          });
        case 23:
          _context4.next = 29;
          break;
        case 25:
          _context4.prev = 25;
          _context4.t1 = _context4["catch"](0);
          console.log('>>> check error loginUser():', _context4.t1);
          return _context4.abrupt("return", {
            EM: "Something wrong in loginUser() ",
            EC: -2,
            DT: ''
          });
        case 29:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 25]]);
  }));
  return function loginUser(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var logoutUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            path: '/',
            // Mặc định nếu không chỉ định path
            domain: 'localhost'
          });
          return _context5.abrupt("return", {
            EM: 'Logout successfully!',
            EC: 0,
            DT: ''
          });
        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          console.log('>>> check error logoutUser():', _context5.t0);
          return _context5.abrupt("return", {
            EM: "Something wrong in logoutUser() ",
            EC: -2,
            DT: ''
          });
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 5]]);
  }));
  return function logoutUser(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllUsers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var listUsers;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          listUsers = [];
          _context6.prev = 1;
          _context6.next = 4;
          return _UserModel["default"].find({}, '-avatar -password -createdAt -updatedAt -__v');
        case 4:
          listUsers = _context6.sent;
          if (!(listUsers && listUsers.length > 0)) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", {
            EM: 'Get list users success!',
            EC: 0,
            DT: listUsers
          });
        case 9:
          return _context6.abrupt("return", {
            EM: 'Cannot get list users because table in DB is empty',
            EC: 0,
            DT: []
          });
        case 10:
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          console.log('>>> check error from getAllUsers():', _context6.t0);
          return _context6.abrupt("return", {
            EM: "Something wrongs in Service  getAllUsers() ",
            EC: -2,
            DT: ''
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return function getAllUsers() {
    return _ref6.apply(this, arguments);
  };
}();
var getDetailUserById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
    var user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (id) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 3:
          if (_mongoose.Types.ObjectId.isValid(id)) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", {
            EM: 'Invalid ID format!',
            EC: 1,
            DT: ''
          });
        case 5:
          _context7.next = 7;
          return _UserModel["default"].findOne({
            _id: id
          }, '-password -createdAt -updatedAt -__v');
        case 7:
          user = _context7.sent;
          if (!user) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", {
            EM: 'Get detail user success',
            EC: 0,
            DT: user
          });
        case 12:
          return _context7.abrupt("return", {
            EM: 'User is not existed!',
            EC: -1,
            DT: ''
          });
        case 13:
          _context7.next = 19;
          break;
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          console.log('>>> check error from getDetailUserById():', _context7.t0);
          return _context7.abrupt("return", {
            EM: "Something wrongs in Service  getDetailUserById() ",
            EC: -2,
            DT: ''
          });
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 15]]);
  }));
  return function getDetailUserById(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var refreshNewToken = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(token) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          if (token) {
            _context8.next = 3;
            break;
          }
          return _context8.abrupt("return", {
            EM: 'Token must be required!',
            EC: 1,
            DT: ''
          });
        case 3:
          if (!(0, _JWTHelpers.refreshNewTokenService)(token)) {
            _context8.next = 5;
            break;
          }
          return _context8.abrupt("return", {
            EM: 'Generate new token success',
            EC: 0,
            DT: (0, _JWTHelpers.refreshNewTokenService)(token)
          });
        case 5:
          return _context8.abrupt("return", {
            EM: 'Invalid or expired refresh token',
            EC: 2,
            DT: null
          });
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log('>>> check error from refreshNewToken():', _context8.t0);
          return _context8.abrupt("return", {
            EM: "Something wrongs in Service refreshNewToken() ",
            EC: -2,
            DT: ''
          });
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function refreshNewToken(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref9) {
    var id, data, user, updatedUser, _updatedUser$toObject, password, createdAt, updatedAt, __v, _data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = _ref9.id, data = _ref9.data;
          _context9.prev = 1;
          if (id) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 4:
          if (_mongoose.Types.ObjectId.isValid(id)) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", {
            EM: 'Invalid ID format!',
            EC: 1,
            DT: ''
          });
        case 6:
          _context9.next = 8;
          return _UserModel["default"].findOne({
            _id: id
          });
        case 8:
          user = _context9.sent;
          if (!user) {
            _context9.next = 22;
            break;
          }
          _context9.next = 12;
          return checkPhoneExisted(data.phone);
        case 12:
          if (!_context9.sent) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", {
            EM: 'Phone number is existed!',
            EC: 2,
            DT: 'phone'
          });
        case 14:
          _context9.next = 16;
          return _UserModel["default"].findByIdAndUpdate(id, data, {
            "new": true
          });
        case 16:
          updatedUser = _context9.sent;
          if (!updatedUser) {
            _context9.next = 20;
            break;
          }
          _updatedUser$toObject = updatedUser.toObject(), password = _updatedUser$toObject.password, createdAt = _updatedUser$toObject.createdAt, updatedAt = _updatedUser$toObject.updatedAt, __v = _updatedUser$toObject.__v, _data = _objectWithoutProperties(_updatedUser$toObject, _excluded);
          return _context9.abrupt("return", {
            EM: 'Updated success',
            EC: 0,
            DT: _data
          });
        case 20:
          _context9.next = 23;
          break;
        case 22:
          return _context9.abrupt("return", {
            EM: 'User is not existed!',
            EC: -1,
            DT: ''
          });
        case 23:
          _context9.next = 29;
          break;
        case 25:
          _context9.prev = 25;
          _context9.t0 = _context9["catch"](1);
          console.log('>>> check error from updateUser():', _context9.t0);
          return _context9.abrupt("return", {
            EM: "Something wrongs in Service  updateUser() ",
            EC: -2,
            DT: ''
          });
        case 29:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 25]]);
  }));
  return function updateUser(_x9) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(userId) {
    var deletedUser;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (userId) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 3:
          if (_mongoose.Types.ObjectId.isValid(userId)) {
            _context10.next = 5;
            break;
          }
          return _context10.abrupt("return", {
            EM: 'Invalid ID format!',
            EC: 1,
            DT: ''
          });
        case 5:
          _context10.next = 7;
          return _UserModel["default"].findByIdAndDelete(userId);
        case 7:
          deletedUser = _context10.sent;
          if (!deletedUser) {
            _context10.next = 12;
            break;
          }
          return _context10.abrupt("return", {
            EM: 'Delete successfully',
            EC: 0,
            DT: ''
          });
        case 12:
          return _context10.abrupt("return", {
            EM: 'User is not existed to delete!',
            EC: -1,
            DT: ''
          });
        case 13:
          _context10.next = 19;
          break;
        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](0);
          console.log('>>> check error from deleteUser():', _context10.t0);
          return _context10.abrupt("return", {
            EM: "Something wrongs in Service deleteUser() ",
            EC: -2,
            DT: ''
          });
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 15]]);
  }));
  return function deleteUser(_x10) {
    return _ref11.apply(this, arguments);
  };
}();
module.exports = {
  registerNewUser: registerNewUser,
  loginUser: loginUser,
  logoutUser: logoutUser,
  getAllUsers: getAllUsers,
  getDetailUserById: getDetailUserById,
  refreshNewToken: refreshNewToken,
  updateUser: updateUser,
  deleteUser: deleteUser
};