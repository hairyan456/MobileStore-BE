import _ from 'lodash';
import { Types } from 'mongoose';
import Order from '../models/OrderProduct';
import Product from '../models/ProductModel';
import User from '../models/UserModel';
import emailAPIService from './emailAPIService';

const getAllOrders = async () => {
    let listOrders = [];
    try {
        listOrders = await Order.find({}, '-updatedAt -__v');
        if (listOrders && listOrders.length > 0) {
            return {
                EM: 'Get all orders success!',
                EC: 0,
                DT: listOrders
            }
        }
        else {
            return {
                EM: 'Cannot get all orders because data is empty',
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllOrders():', error);
        return {
            EM: `Something wrongs in Service  getAllOrders() `,
            EC: -2,
            DT: ''
        }
    }
}

const createNewOrder = async (rawData) => {
    try {
        let { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, email, fullName, address, city, phone, user,
            isPaid = false, paidAt = '' } = rawData;
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !email || !fullName || !address ||
            !city || !phone || !user || !orderItems) {
            return {
                EM: 'Missing required params',
                EC: 1,
                DT: ''
            }
        }
        const missingProducts = [];
        for (const item of orderItems) {
            const { name, product, amount } = item;
            if (!product || !amount)
                throw new Error(`Missing required params in item: ${JSON.stringify(item)}`);
            try {
                const productData = await Product.findOneAndUpdate(
                    { _id: product, countInStock: { $gte: amount } },
                    {
                        $inc: {
                            countInStock: -amount,
                            sold: +amount,
                        },
                    },
                    { new: true }
                );
                // Nếu không tồn tại productData, thêm product vào mảng missingProducts
                if (!productData)
                    missingProducts.push(name);
            } catch (error) {
                console.error(`Error updating product ${product}:`, error);
                missingProducts.push(name); // Đưa vào missingProducts nếu xảy ra lỗi
            }
        };
        // Loại bỏ các sản phẩm thuộc missingProducts khỏi orderItems
        orderItems = orderItems.filter(item => !missingProducts.includes(item.name));
        // Loại bỏ field countInStock khỏi từng phần tử của orderItems
        orderItems = orderItems.map(({ countInStock, ...rest }) => rest);
        if (orderItems.length === 0)
            return {
                EM: 'Các sản phẩm bạn chọn đã bán sạch hoặc không đủ số lượng',
                EC: 2,
                DT: '',
            };
        let data = {
            orderItems,
            shippingAddress: {
                fullName,
                address,
                city,
                phone,
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user,
            isPaid,
            paidAt,
        }
        const newOrder = new Order(data);
        await newOrder.save();
        await emailAPIService.sendSimpleEmail({ ...data, email });
        return {
            EM: missingProducts.length > 0 ? `Tạo đơn thành công, có ${missingProducts.length} sản phẩm không đủ số lượng để bán: ${missingProducts}`
                : `Order created successfully`,
            EC: 0,
            DT: orderItems,
        }
    } catch (error) {
        console.log('>>> check error from createNewOrder():', error);
        return {
            EM: `Something wrongs in Service  createNewOrder() `,
            EC: -2,
            DT: ''
        }
    }
};

const getOrdersByUserId = async (userId) => {
    try {
        if (!userId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        };
        if (!Types.ObjectId.isValid(userId)) {
            return {
                EM: 'Invalid ID format!',
                EC: 1,
                DT: ''
            }
        }
        const listOrders = await Order.find({ user: userId }, '-updatedAt -__v');
        if (listOrders.length > 0)
            return {
                EM: 'Get list orders by userId success',
                EC: 0,
                DT: listOrders,
            };
        else
            return {
                EM: 'User not existed, or doesnt have any orders!',
                EC: -1,
                DT: ''
            }
    }
    catch (error) {
        console.log('>>> check error from getOrdersByUserId():', error);
        return {
            EM: `Something wrongs in Service getOrdersByUserId() `,
            EC: -2,
            DT: ''
        }
    }
};

const getDetailOrder = async (orderId, userId) => {
    try {
        if (!orderId || !userId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }

        if (!Types.ObjectId.isValid(orderId) || !Types.ObjectId.isValid(userId)) {
            return {
                EM: 'Invalid ID format orderId or userId!',
                EC: 1,
                DT: ''
            }
        }
        let order = null;
        const user = await User.findOne({ _id: userId }, '-password -createdAt -updatedAt -__v');
        if (user?.isAdmin)
            order = await Order.findOne({ _id: orderId }, '-user -createdAt -updatedAt -__v');
        else
            order = await Order.findOne({ _id: orderId, user: userId }, '-user -createdAt -updatedAt -__v');
        if (order)
            return {
                EM: 'Get detail order success',
                EC: 0,
                DT: order
            };
        else
            return {
                EM: 'Order is not existed!',
                EC: -1,
                DT: ''
            }
    }
    catch (error) {
        console.log('>>> check error from getDetailOrder():', error);
        return {
            EM: `Something wrongs in Service  getDetailOrder() `,
            EC: -2,
            DT: ''
        }
    }
}

const deleteOrder = async (orderId, userId) => {
    try {
        if (!orderId || !userId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }

        if (!Types.ObjectId.isValid(orderId)) {
            return {
                EM: 'Invalid orderId format!',
                EC: 1,
                DT: ''
            }
        }
        if (!Types.ObjectId.isValid(userId)) {
            return {
                EM: 'Invalid userId format!',
                EC: 1,
                DT: ''
            }
        }

        const user = await User.findOne({ _id: userId }, '-password -createdAt -updatedAt -__v');
        const orderDeleted = (user?.isAdmin) ? await Order.findByIdAndDelete(orderId) :
            await Order.findOneAndDelete({
                _id: new Types.ObjectId(orderId), // Convert sang ObjectId
                user: new Types.ObjectId(userId) // Convert  sang ObjectId
            });;
        if (orderDeleted) {
            const { orderItems } = orderDeleted;
            for (const item of orderItems) {
                const { product, amount } = item;
                if (!product || !amount)
                    throw new Error(`Missing required params in item: ${JSON.stringify(item)}`);
                try {
                    await Product.findOneAndUpdate({ _id: product, sold: { $gte: amount } },
                        {
                            $inc: {
                                countInStock: +amount,
                                sold: -amount,
                            },
                        },
                        { new: true }
                    );
                } catch (error) {
                    console.error(`Error updating product ${product}:`, error);
                }
            };
        }
        return (orderDeleted) ?
            {
                EM: 'Delete successfully',
                EC: 0,
                DT: orderDeleted
            } :
            {
                EM: 'Order not existed to delete!',
                EC: -1,
                DT: ''
            }
    }
    catch (error) {
        console.error('>>> Error in deleteOrder():', error.message, error.stack);
        return {
            EM: `Something wrongs in Service  deleteOrder() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    getAllOrders, createNewOrder, getOrdersByUserId, getDetailOrder, deleteOrder
};