"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./configs/viewEngine"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("./configs/cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _api = _interopRequireDefault(require("./routes/api"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
var app = (0, _express["default"])(),
  PORT = process.env.PORT || 8080;
//config view engine & cors:
(0, _cors["default"])(app);
(0, _viewEngine["default"])(app);
app.use((0, _cookieParser["default"])());

//config body-parser: 
app.use(_bodyParser["default"].json({
  limit: '50mb'
})); //mặc định limit-size = 1MB
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
_mongoose["default"].connect("mongodb+srv://hai0702:".concat(process.env.DB_PASSWORD, "@cluster0.ya8ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")).then(function () {
  console.log('Connect DB success!');
})["catch"](function (err) {
  console.log(err);
});
(0, _api["default"])(app);
app.listen(PORT, function () {
  console.log("SERVER is running on PORT:", PORT);
});