"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]('./src/public')); //cho phép ng dùng truy cập các source lưu trong folder 'public'
};
var _default = exports["default"] = configViewEngine;