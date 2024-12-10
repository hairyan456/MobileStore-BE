import express from 'express';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import orderController from '../controllers/orderController';
import paymentController from '../controllers/paymentController';
import { authPermissionMiddleware, authUserMiddleware } from '../middleware/authMiddleWare';

const router = express.Router();
const initAPIRoutes = (app) => {
    // routes for Login - Register
    router.post("/login", userController.handleLogin);
    router.post("/register", userController.handleRegister);
    router.post("/logout", userController.handleLogout);

    // routes for USER:
    router.get('/users', authPermissionMiddleware, userController.handleGetAllUsers);
    router.get('/users/:id', authUserMiddleware, userController.handleGetDetailUser);
    router.get('/refresh-token/:refresh_token', userController.handleRefreshToken);
    router.put('/users/update', authUserMiddleware, userController.handleUpdateUser);
    router.delete('/users/delete', authPermissionMiddleware, userController.handleDeleteUser);

    // routes for PRODUCT:
    router.get('/product', productController.handleGetAllProducts);
    router.get('/product/get-all-types', productController.handleGetTypesProduct);
    router.get('/product/get-products-by-type/:prodType', productController.handleGetProductsByType)
    router.get('/product/:id', productController.handleGetDetailProd);
    router.post('/product/create', authPermissionMiddleware, productController.handleCreateNewProduct);
    router.put('/product/update', authPermissionMiddleware, productController.handleUpdateProduct);
    router.delete('/product/delete', authPermissionMiddleware, productController.handleDeleteProduct);
    router.delete('/product/delete-many', authPermissionMiddleware, productController.handleDeleteManyProduct);

    // routes for ORDER:
    router.get('/order', authPermissionMiddleware, orderController.handleGetAllOrders);
    router.get('/order/get-orders-by-userId/:id', authUserMiddleware, orderController.handleGetOrdersByUserId);
    router.get('/order/get-detail-order/:orderId', authUserMiddleware, orderController.handleGetDetailOrder);
    router.post('/order/create', authUserMiddleware, orderController.handleCreateNewOrder);
    router.delete('/order/delete/:orderId', orderController.handleDeleteOrder);

    //routes for Payment (Paypal)
    router.get('/payment/config', paymentController.handleGetPaymentConfig);


    return app.use("/api/v1/", router);
}

export default initAPIRoutes;