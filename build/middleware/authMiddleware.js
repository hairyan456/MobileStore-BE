"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUserMiddleware = exports.authPermissionMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
var authPermissionMiddleware = exports.authPermissionMiddleware = function authPermissionMiddleware(req, res, next) {
  try {
    var _req$headers;
    if (!(req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.authorization)) return res.status(200).json({
      EM: 'Empty bearer token!',
      EC: 1,
      DT: ''
    });
    var decoded = _jsonwebtoken["default"].verify(req.headers.authorization.split(' ')[1], process.env.JWT_ACCESS_TOKEN_SECRET);
    if (decoded) {
      if (!(decoded !== null && decoded !== void 0 && decoded.isAdmin)) return res.status(500).json({
        EM: 'You dont have permission !',
        EC: -1,
        DT: ''
      });else next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: err.message,
      EC: -999,
      DT: ''
    });
  }
};
var authUserMiddleware = exports.authUserMiddleware = function authUserMiddleware(req, res, next) {
  try {
    var _req$headers2;
    if (!(req !== null && req !== void 0 && (_req$headers2 = req.headers) !== null && _req$headers2 !== void 0 && _req$headers2.authorization)) return res.status(200).json({
      EM: 'Empty bearer token!',
      EC: 1,
      DT: ''
    });
    var decoded = _jsonwebtoken["default"].verify(req.headers.authorization.split(' ')[1], process.env.JWT_ACCESS_TOKEN_SECRET);
    if (decoded) {
      if (decoded !== null && decoded !== void 0 && decoded.isAdmin || (decoded === null || decoded === void 0 ? void 0 : decoded._id) === req.params.id || (decoded === null || decoded === void 0 ? void 0 : decoded._id) === req.body.id || (decoded === null || decoded === void 0 ? void 0 : decoded._id) === req.query.id) next();else {
        return res.status(500).json({
          EM: 'You dont have permission !',
          EC: -1,
          DT: ''
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      EM: err.message,
      EC: -999,
      DT: ''
    });
  }
};