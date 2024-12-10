"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _lodash = _interopRequireDefault(require("lodash"));
var _mongoose = require("mongoose");
var _OrderProduct = _interopRequireDefault(require("../models/OrderProduct"));
var _ProductModel = _interopRequireDefault(require("../models/ProductModel"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _emailAPIService = _interopRequireDefault(require("./emailAPIService"));
var _excluded = ["countInStock"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getAllOrders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var listOrders;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          listOrders = [];
          _context.prev = 1;
          _context.next = 4;
          return _OrderProduct["default"].find({}, '-updatedAt -__v');
        case 4:
          listOrders = _context.sent;
          if (!(listOrders && listOrders.length > 0)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", {
            EM: 'Get all orders success!',
            EC: 0,
            DT: listOrders
          });
        case 9:
          return _context.abrupt("return", {
            EM: 'Cannot get all orders because data is empty',
            EC: 1,
            DT: []
          });
        case 10:
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log('>>> check error from getAllOrders():', _context.t0);
          return _context.abrupt("return", {
            EM: "Something wrongs in Service  getAllOrders() ",
            EC: -2,
            DT: ''
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function getAllOrders() {
    return _ref.apply(this, arguments);
  };
}();
var createNewOrder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(rawData) {
    var orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, email, fullName, address, city, phone, user, _rawData$isPaid, isPaid, _rawData$paidAt, paidAt, missingProducts, _iterator, _step, item, name, product, amount, productData, data, newOrder;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          orderItems = rawData.orderItems, paymentMethod = rawData.paymentMethod, itemsPrice = rawData.itemsPrice, shippingPrice = rawData.shippingPrice, totalPrice = rawData.totalPrice, email = rawData.email, fullName = rawData.fullName, address = rawData.address, city = rawData.city, phone = rawData.phone, user = rawData.user, _rawData$isPaid = rawData.isPaid, isPaid = _rawData$isPaid === void 0 ? false : _rawData$isPaid, _rawData$paidAt = rawData.paidAt, paidAt = _rawData$paidAt === void 0 ? '' : _rawData$paidAt;
          if (!(!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !email || !fullName || !address || !city || !phone || !user || !orderItems)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", {
            EM: 'Missing required params',
            EC: 1,
            DT: ''
          });
        case 4:
          missingProducts = [];
          _iterator = _createForOfIteratorHelper(orderItems);
          _context2.prev = 6;
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context2.next = 26;
            break;
          }
          item = _step.value;
          name = item.name, product = item.product, amount = item.amount;
          if (!(!product || !amount)) {
            _context2.next = 13;
            break;
          }
          throw new Error("Missing required params in item: ".concat(JSON.stringify(item)));
        case 13:
          _context2.prev = 13;
          _context2.next = 16;
          return _ProductModel["default"].findOneAndUpdate({
            _id: product,
            countInStock: {
              $gte: amount
            }
          }, {
            $inc: {
              countInStock: -amount,
              sold: +amount
            }
          }, {
            "new": true
          });
        case 16:
          productData = _context2.sent;
          // Nếu không tồn tại productData, thêm product vào mảng missingProducts
          if (!productData) missingProducts.push(name);
          _context2.next = 24;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](13);
          console.error("Error updating product ".concat(product, ":"), _context2.t0);
          missingProducts.push(name); // Đưa vào missingProducts nếu xảy ra lỗi
        case 24:
          _context2.next = 8;
          break;
        case 26:
          _context2.next = 31;
          break;
        case 28:
          _context2.prev = 28;
          _context2.t1 = _context2["catch"](6);
          _iterator.e(_context2.t1);
        case 31:
          _context2.prev = 31;
          _iterator.f();
          return _context2.finish(31);
        case 34:
          ;
          // Loại bỏ các sản phẩm thuộc missingProducts khỏi orderItems
          orderItems = orderItems.filter(function (item) {
            return !missingProducts.includes(item.name);
          });
          // Loại bỏ field countInStock khỏi từng phần tử của orderItems
          orderItems = orderItems.map(function (_ref3) {
            var countInStock = _ref3.countInStock,
              rest = _objectWithoutProperties(_ref3, _excluded);
            return rest;
          });
          if (!(orderItems.length === 0)) {
            _context2.next = 39;
            break;
          }
          return _context2.abrupt("return", {
            EM: 'Các sản phẩm bạn chọn đã bán sạch hoặc không đủ số lượng',
            EC: 2,
            DT: ''
          });
        case 39:
          data = {
            orderItems: orderItems,
            shippingAddress: {
              fullName: fullName,
              address: address,
              city: city,
              phone: phone
            },
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            user: user,
            isPaid: isPaid,
            paidAt: paidAt
          };
          newOrder = new _OrderProduct["default"](data);
          _context2.next = 43;
          return newOrder.save();
        case 43:
          _context2.next = 45;
          return _emailAPIService["default"].sendSimpleEmail(_objectSpread(_objectSpread({}, data), {}, {
            email: email
          }));
        case 45:
          return _context2.abrupt("return", {
            EM: missingProducts.length > 0 ? "Ta\u0323o \u0111\u01A1n tha\u0300nh c\xF4ng, co\u0301 ".concat(missingProducts.length, " sa\u0309n ph\xE2\u0309m kh\xF4ng \u0111u\u0309 s\xF4\u0301 l\u01B0\u01A1\u0323ng \u0111\xEA\u0309 ba\u0301n: ").concat(missingProducts) : "Order created successfully",
            EC: 0,
            DT: orderItems
          });
        case 48:
          _context2.prev = 48;
          _context2.t2 = _context2["catch"](0);
          console.log('>>> check error from createNewOrder():', _context2.t2);
          return _context2.abrupt("return", {
            EM: "Something wrongs in Service  createNewOrder() ",
            EC: -2,
            DT: ''
          });
        case 52:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 48], [6, 28, 31, 34], [13, 20]]);
  }));
  return function createNewOrder(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrdersByUserId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(userId) {
    var listOrders;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (userId) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 3:
          ;
          if (_mongoose.Types.ObjectId.isValid(userId)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Invalid ID format!',
            EC: 1,
            DT: ''
          });
        case 6:
          _context3.next = 8;
          return _OrderProduct["default"].find({
            user: userId
          }, '-updatedAt -__v');
        case 8:
          listOrders = _context3.sent;
          if (!(listOrders.length > 0)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", {
            EM: 'Get list orders by userId success',
            EC: 0,
            DT: listOrders
          });
        case 13:
          return _context3.abrupt("return", {
            EM: 'User not existed, or doesnt have any orders!',
            EC: -1,
            DT: ''
          });
        case 14:
          _context3.next = 20;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log('>>> check error from getOrdersByUserId():', _context3.t0);
          return _context3.abrupt("return", {
            EM: "Something wrongs in Service getOrdersByUserId() ",
            EC: -2,
            DT: ''
          });
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function getOrdersByUserId(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var getDetailOrder = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(orderId, userId) {
    var order, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(!orderId || !userId)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 3:
          if (!(!_mongoose.Types.ObjectId.isValid(orderId) || !_mongoose.Types.ObjectId.isValid(userId))) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", {
            EM: 'Invalid ID format orderId or userId!',
            EC: 1,
            DT: ''
          });
        case 5:
          order = null;
          _context4.next = 8;
          return _UserModel["default"].findOne({
            _id: userId
          }, '-password -createdAt -updatedAt -__v');
        case 8:
          user = _context4.sent;
          if (!(user !== null && user !== void 0 && user.isAdmin)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 12;
          return _OrderProduct["default"].findOne({
            _id: orderId
          }, '-user -createdAt -updatedAt -__v');
        case 12:
          order = _context4.sent;
          _context4.next = 18;
          break;
        case 15:
          _context4.next = 17;
          return _OrderProduct["default"].findOne({
            _id: orderId,
            user: userId
          }, '-user -createdAt -updatedAt -__v');
        case 17:
          order = _context4.sent;
        case 18:
          if (!order) {
            _context4.next = 22;
            break;
          }
          return _context4.abrupt("return", {
            EM: 'Get detail order success',
            EC: 0,
            DT: order
          });
        case 22:
          return _context4.abrupt("return", {
            EM: 'Order is not existed!',
            EC: -1,
            DT: ''
          });
        case 23:
          _context4.next = 29;
          break;
        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](0);
          console.log('>>> check error from getDetailOrder():', _context4.t0);
          return _context4.abrupt("return", {
            EM: "Something wrongs in Service  getDetailOrder() ",
            EC: -2,
            DT: ''
          });
        case 29:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 25]]);
  }));
  return function getDetailOrder(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(orderId, userId) {
    var user, orderDeleted, orderItems, _iterator2, _step2, item, product, amount;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(!orderId || !userId)) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", {
            EM: 'Missing required parameter!',
            EC: 1,
            DT: ''
          });
        case 3:
          if (_mongoose.Types.ObjectId.isValid(orderId)) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", {
            EM: 'Invalid orderId format!',
            EC: 1,
            DT: ''
          });
        case 5:
          if (_mongoose.Types.ObjectId.isValid(userId)) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", {
            EM: 'Invalid userId format!',
            EC: 1,
            DT: ''
          });
        case 7:
          _context5.next = 9;
          return _UserModel["default"].findOne({
            _id: userId
          }, '-password -createdAt -updatedAt -__v');
        case 9:
          user = _context5.sent;
          if (!(user !== null && user !== void 0 && user.isAdmin)) {
            _context5.next = 16;
            break;
          }
          _context5.next = 13;
          return _OrderProduct["default"].findByIdAndDelete(orderId);
        case 13:
          _context5.t0 = _context5.sent;
          _context5.next = 19;
          break;
        case 16:
          _context5.next = 18;
          return _OrderProduct["default"].findOneAndDelete({
            _id: new _mongoose.Types.ObjectId(orderId),
            // Convert sang ObjectId
            user: new _mongoose.Types.ObjectId(userId) // Convert  sang ObjectId
          });
        case 18:
          _context5.t0 = _context5.sent;
        case 19:
          orderDeleted = _context5.t0;
          ;
          if (!orderDeleted) {
            _context5.next = 50;
            break;
          }
          orderItems = orderDeleted.orderItems;
          _iterator2 = _createForOfIteratorHelper(orderItems);
          _context5.prev = 24;
          _iterator2.s();
        case 26:
          if ((_step2 = _iterator2.n()).done) {
            _context5.next = 41;
            break;
          }
          item = _step2.value;
          product = item.product, amount = item.amount;
          if (!(!product || !amount)) {
            _context5.next = 31;
            break;
          }
          throw new Error("Missing required params in item: ".concat(JSON.stringify(item)));
        case 31:
          _context5.prev = 31;
          _context5.next = 34;
          return _ProductModel["default"].findOneAndUpdate({
            _id: product,
            sold: {
              $gte: amount
            }
          }, {
            $inc: {
              countInStock: +amount,
              sold: -amount
            }
          }, {
            "new": true
          });
        case 34:
          _context5.next = 39;
          break;
        case 36:
          _context5.prev = 36;
          _context5.t1 = _context5["catch"](31);
          console.error("Error updating product ".concat(product, ":"), _context5.t1);
        case 39:
          _context5.next = 26;
          break;
        case 41:
          _context5.next = 46;
          break;
        case 43:
          _context5.prev = 43;
          _context5.t2 = _context5["catch"](24);
          _iterator2.e(_context5.t2);
        case 46:
          _context5.prev = 46;
          _iterator2.f();
          return _context5.finish(46);
        case 49:
          ;
        case 50:
          return _context5.abrupt("return", orderDeleted ? {
            EM: 'Delete successfully',
            EC: 0,
            DT: orderDeleted
          } : {
            EM: 'Order not existed to delete!',
            EC: -1,
            DT: ''
          });
        case 53:
          _context5.prev = 53;
          _context5.t3 = _context5["catch"](0);
          console.error('>>> Error in deleteOrder():', _context5.t3.message, _context5.t3.stack);
          return _context5.abrupt("return", {
            EM: "Something wrongs in Service  deleteOrder() ",
            EC: -2,
            DT: ''
          });
        case 57:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 53], [24, 43, 46, 49], [31, 36]]);
  }));
  return function deleteOrder(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  getAllOrders: getAllOrders,
  createNewOrder: createNewOrder,
  getOrdersByUserId: getOrdersByUserId,
  getDetailOrder: getDetailOrder,
  deleteOrder: deleteOrder
};