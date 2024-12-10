import { Types } from 'mongoose';
import Product from '../models/ProductModel';
import _ from 'lodash';

const checkProdNameExisted = async (prodName) => {
    try {
        const product = await Product.findOne({ name: prodName });
        return !!product; // Trả về true nếu user tồn tại, false nếu không
    } catch (error) {
        console.log('>>> check error (checkProdNameExisted):', error);
    }
};

const getAllProducts = async () => {
    let listProducts = [];
    try {
        listProducts = await Product.find({}, '-createdAt -updatedAt -__v');
        if (listProducts && listProducts.length > 0) {
            return {
                EM: 'Get all Products success!',
                EC: 0,
                DT: listProducts
            }
        }
        else {
            return {
                EM: 'Cannot get all Products because table in DB is empty',
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllProducts():', error);
        return {
            EM: `Something wrongs in Service  getAllProducts() `,
            EC: -2,
            DT: ''
        }
    }
}

// Pagination:
const getAllProductsPagination = async (page, limit, sort, field, filter) => {
    if (page && limit) {
        try {
            let skip = (page - 1) * limit;                   // Tính toán skip (tương đương offset)
            let totalRows = await Product.countDocuments();  // Đếm tổng số documents trong collection
            let totalPages = Math.ceil(totalRows / limit);   // Tính tổng số trang

            let listProducts = [];
            if (filter && field) {
                listProducts = await Product.find({ [field]: { '$regex': filter, '$options': 'i' } })
                    .skip(skip)     // Bỏ qua các document không thuộc trang hiện tại
                    .limit(limit)   // Lấy số lượng document giới hạn
                    .lean();        // Trả về plain JavaScript objects
            }
            else if (sort && field) {
                listProducts = await Product.find({})
                    .skip(skip)     // Bỏ qua các document không thuộc trang hiện tại
                    .limit(limit)   // Lấy số lượng document giới hạn
                    .sort({ [field]: sort })
                    .lean();        // Trả về plain JavaScript objects
            }
            else {
                listProducts = await Product.find({})
                    .skip(skip)
                    .limit(limit)
                    .lean();
            }
            return {
                EM: `success`,
                EC: 0,
                DT: { totalRows, totalPages, listProducts }
            };
        } catch (error) {
            console.log('>>> Error in getAllProductsPagination():', error);
            return {
                EM: `Something went wrong in getAllProductsPagination()`,
                EC: -2,
                DT: ''
            };
        }
    }
    else {
        try {
            let totalRows = await Product.countDocuments();
            let listProducts = [];
            if (filter && field)
                listProducts = await Product.find({ [field]: { '$regex': filter, '$options': 'i' } })
                    .limit(limit ? +limit : null)
                    .lean();

            else if (sort && field)
                listProducts = await Product.find({})
                    .sort({ [field]: sort })
                    .limit(limit ? +limit : null)
                    .lean();        // Trả về plain JavaScript objects

            else
                listProducts = await Product.find({})
                    .limit(limit ? +limit : null)
                    .lean();
            return {
                EM: `success`,
                EC: 0,
                DT: { totalRows, listProducts }
            };
        } catch (error) {
            console.log('>>> Error in getAllProductsPagination():', error);
            return {
                EM: `Something went wrong in getAllProductsPagination()`,
                EC: -2,
                DT: ''
            };
        }
    }
};

const getDetailProdById = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        if (!Types.ObjectId.isValid(id)) {
            return {
                EM: 'Invalid ID format!',
                EC: 1,
                DT: ''
            }
        }
        const product = await Product.findOne({ _id: id }, '-createdAt -updatedAt -__v');
        if (product)
            return {
                EM: 'Get detail product success',
                EC: 0,
                DT: product
            };
        else {
            return {
                EM: 'Product is not existed!',
                EC: -1,
                DT: ''
            }
        }
    }
    catch (error) {
        console.log('>>> check error from getDetailProdById():', error);
        return {
            EM: `Something wrongs in Service  getDetailProdById() `,
            EC: -2,
            DT: ''
        }
    }
}

const createNewProduct = async (rawData) => {
    try {
        if (!rawData.name || !rawData.image || !rawData.type || !rawData.price || !rawData.countInStock || !rawData.rating) {
            return {
                EM: 'Missing required params',
                EC: 1,
                DT: ''
            }
        }
        if (await checkProdNameExisted(rawData.name)) {
            return {
                EM: 'Product name is already existed',
                EC: 2
            }
        }
        const newProd = new Product({
            name: rawData.name,
            image: rawData.image,
            type: rawData.type,
            price: rawData.price,
            countInStock: rawData.countInStock,
            rating: rawData.rating,
            description: rawData?.description,
            discount: rawData?.discount
        });
        await newProd.save();
        return {
            EM: 'Created successfully!',
            EC: 0,
            DT: '',
        }
    } catch (error) {
        console.log('>>> check error from createNewProduct():', error);
        return {
            EM: `Something wrongs in Service  createNewProduct() `,
            EC: -2,
            DT: ''
        }
    }
};

const updateProduct = async ({ id, data }) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            };
        }
        if (!Types.ObjectId.isValid(id)) {
            return {
                EM: 'Invalid ID format!',
                EC: 1,
                DT: ''
            };
        }
        if (await checkProdNameExisted(data.name)) {
            return { EM: 'Product name is existed!', EC: 2, DT: 'name' };
        }
        const updatedProd = await Product.findByIdAndUpdate(id, data, { new: true });
        return (updatedProd) ? { EM: 'Updated success', EC: 0, DT: updatedProd }
            : { EM: 'Product is not existed!', EC: -1, DT: '' };

    } catch (error) {
        console.log('>>> check error from updateProduct():', error);
        return {
            EM: `Something wrongs in Service updateProduct() `,
            EC: -2,
            DT: ''
        }
    }
}

const deleteProduct = async (prodId) => {
    try {
        if (!prodId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        if (!Types.ObjectId.isValid(prodId)) {
            return {
                EM: 'Invalid ID format!',
                EC: 1,
                DT: ''
            }
        }
        const deletedProd = await Product.findByIdAndDelete(prodId);
        return (deletedProd) ?
            {
                EM: 'Delete successfully',
                EC: 0,
                DT: ''
            } :
            {
                EM: 'Product is not existed to delete!',
                EC: -1,
                DT: ''
            }
    } catch (error) {
        console.log('>>> check error from deleteProduct():', error);
        return {
            EM: `Something wrongs in Service deleteProduct() `,
            EC: -2,
            DT: ''
        }
    }
}

const deleteManyProduct = async (arrIds) => {
    try {
        if (_.isEmpty(arrIds) || arrIds?.length <= 0) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        const invalidId = arrIds.find(id => !Types.ObjectId.isValid(id));
        if (invalidId) {
            return {
                EM: `Invalid ID format for ID: ${invalidId}`,
                EC: 1,
                DT: ''
            };
        }
        const result = await Product.deleteMany({ _id: { $in: arrIds } });
        return result.deletedCount > 0 ?
            {
                EM: `Successfully deleted ${result.deletedCount} product(s).`,
                EC: 0,
                DT: result
            } :
            {
                EM: 'No products were found to delete!',
                EC: -1,
                DT: ''
            };
    } catch (error) {
        console.log('>>> check error from deleteProduct():', error);
        return {
            EM: `Something wrongs in Service deleteProduct() `,
            EC: -2,
            DT: ''
        }
    }
}

const getTypesProduct = async () => {
    try {
        let data = await Product.distinct('type');
        if (data && data.length > 0) {
            return {
                EM: 'Get all types product success!',
                EC: 0,
                DT: data
            }
        }
        else {
            return {
                EM: 'Cannot get all types product because table in DB is empty',
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getTypesProduct():', error);
        return {
            EM: `Something wrongs in Service  getTypesProduct() `,
            EC: -2,
            DT: ''
        }
    }
}

const getProductsByType = async (page, limit, filter, prodType) => {
    try {
        if (!prodType)
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        let query = { type: { '$regex': prodType, '$options': 'i' } };
        let listProducts = await Product.find(query).lean();
        if (listProducts && listProducts.length > 0) {
            if (page && limit) {
                let skip = (+page - 1) * (+limit);
                let totalRows = listProducts.length;
                if (filter)
                    query.name = { '$regex': filter, '$options': 'i' };
                listProducts = await Product.find(query)
                    .skip(skip)
                    .limit(limit)
                    .lean();
                return {
                    EM: 'Get products by type paginate success',
                    EC: 0,
                    DT: { totalRows, listProducts }
                }
            }
            return {
                EM: 'Get products by type success',
                EC: 0,
                DT: listProducts
            };
        }
        else
            return {
                EM: `Not found any product with '${prodType}' type!`,
                EC: -1,
                DT: []
            }
    }
    catch (error) {
        console.log('>>> check error from getProductsByType():', error);
        return {
            EM: `Something wrongs in Service  getProductsByType() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    createNewProduct, getAllProducts, getDetailProdById, updateProduct, deleteProduct, deleteManyProduct,
    getAllProductsPagination, getTypesProduct, getProductsByType
};