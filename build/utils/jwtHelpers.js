"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshNewTokenService = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _excluded = ["iat", "exp"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
require('dotenv').config();
var generateAccessToken = exports.generateAccessToken = function generateAccessToken(payload) {
  // vì object payload là Mongoose object => payload.toObject() để đưa về plain object
  try {
    var secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
    return payload instanceof _mongoose["default"].Document ? _jsonwebtoken["default"].sign(payload.toObject(), secretKey, {
      expiresIn: '10s'
    }) : _jsonwebtoken["default"].sign(payload, secretKey, {
      expiresIn: '10s'
    });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
};
var generateRefreshToken = exports.generateRefreshToken = function generateRefreshToken(payload) {
  // vì object payload là Mongoose object => payload.toObject() để đưa về plain object
  try {
    var secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
    return _jsonwebtoken["default"].sign(payload.toObject(), secretKey, {
      expiresIn: '1d'
    });
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Failed to generate refresh token');
  }
};
var refreshNewTokenService = exports.refreshNewTokenService = function refreshNewTokenService(token) {
  try {
    if (token) {
      var _Jwt$verify = _jsonwebtoken["default"].verify(token, process.env.JWT_REFRESH_TOKEN_SECRET),
        iat = _Jwt$verify.iat,
        exp = _Jwt$verify.exp,
        rest = _objectWithoutProperties(_Jwt$verify, _excluded);
      return generateAccessToken(rest);
    }
  } catch (error) {
    console.error('Error refresh new token:', error);
    return null;
  }
};