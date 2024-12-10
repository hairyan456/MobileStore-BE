"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _productController = _interopRequireDefault(require("../controllers/productController"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
var _paymentController = _interopRequireDefault(require("../controllers/paymentController"));
var _authMiddleWare = require("../middleware/authMiddleWare");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initAPIRoutes = function initAPIRoutes(app) {
  // routes for Login - Register
  router.post("/login", _userController["default"].handleLogin);
  router.post("/register", _userController["default"].handleRegister);
  router.post("/logout", _userController["default"].handleLogout);

  // routes for USER:
  router.get('/users', _authMiddleWare.authPermissionMiddleware, _userController["default"].handleGetAllUsers);
  router.get('/users/:id', _authMiddleWare.authUserMiddleware, _userController["default"].handleGetDetailUser);
  router.get('/refresh-token/:refresh_token', _userController["default"].handleRefreshToken);
  router.put('/users/update', _authMiddleWare.authUserMiddleware, _userController["default"].handleUpdateUser);
  router["delete"]('/users/delete', _authMiddleWare.authPermissionMiddleware, _userController["default"].handleDeleteUser);

  // routes for PRODUCT:
  router.get('/product', _productController["default"].handleGetAllProducts);
  router.get('/product/get-all-types', _productController["default"].handleGetTypesProduct);
  router.get('/product/get-products-by-type/:prodType', _productController["default"].handleGetProductsByType);
  router.get('/product/:id', _productController["default"].handleGetDetailProd);
  router.post('/product/create', _authMiddleWare.authPermissionMiddleware, _productController["default"].handleCreateNewProduct);
  router.put('/product/update', _authMiddleWare.authPermissionMiddleware, _productController["default"].handleUpdateProduct);
  router["delete"]('/product/delete', _authMiddleWare.authPermissionMiddleware, _productController["default"].handleDeleteProduct);
  router["delete"]('/product/delete-many', _authMiddleWare.authPermissionMiddleware, _productController["default"].handleDeleteManyProduct);

  // routes for ORDER:
  router.get('/order', _authMiddleWare.authPermissionMiddleware, _orderController["default"].handleGetAllOrders);
  router.get('/order/get-orders-by-userId/:id', _authMiddleWare.authUserMiddleware, _orderController["default"].handleGetOrdersByUserId);
  router.get('/order/get-detail-order/:orderId', _authMiddleWare.authUserMiddleware, _orderController["default"].handleGetDetailOrder);
  router.post('/order/create', _authMiddleWare.authUserMiddleware, _orderController["default"].handleCreateNewOrder);
  router["delete"]('/order/delete/:orderId', _orderController["default"].handleDeleteOrder);

  //routes for Payment (Paypal)
  router.get('/payment/config', _paymentController["default"].handleGetPaymentConfig);
  return app.use("/api/v1/", router);
};
var _default = exports["default"] = initAPIRoutes;