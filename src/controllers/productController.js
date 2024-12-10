import productAPIService from '../services/productAPIService';

const handleGetAllProducts = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {  //nếu hiển thị phân trang
            let { page, limit, sort, field, filter } = req.query;
            let data = await productAPIService.getAllProductsPagination(+page, +limit, sort, field, filter);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        else {
            let { limit, sort, field, filter } = req.query;
            if (limit) {
                let data = await productAPIService.getAllProductsPagination('', limit, sort, field, filter);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT,
                })
            }
            else {
                let data = await productAPIService.getAllProducts();
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT,
                })
            }
        }

    } catch (error) {
        console.log('>>> check error from handleGetAllProducts():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleGetDetailProd = async (req, res) => {
    try {
        let data = await productAPIService.getDetailProdById(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleGetDetailProd():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleCreateNewProduct = async (req, res) => {
    try {
        let data = await productAPIService.createNewProduct(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('error from handleCreateNewProduct():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleUpdateProduct = async (req, res) => {
    try {
        let data = await productAPIService.updateProduct(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleUpdateProduct():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleDeleteProduct = async (req, res) => {
    try {
        let data = await productAPIService.deleteProduct(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleDeleteProduct():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleDeleteManyProduct = async (req, res) => {
    try {
        let data = await productAPIService.deleteManyProduct(req.body.ids);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleDeleteManyProduct():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleGetTypesProduct = async (req, res) => {
    try {
        let data = await productAPIService.getTypesProduct();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log('>>> check error from handleGetTypesProduct():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleGetProductsByType = async (req, res) => {
    try {
        let { page, limit, filter } = req.query;
        let { prodType } = req.params;
        let data = await productAPIService.getProductsByType(page, limit, filter, prodType);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log('>>> check error from handleGetProductsByType():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

module.exports = {
    handleGetAllProducts, handleGetDetailProd, handleCreateNewProduct, handleUpdateProduct, handleDeleteProduct,
    handleDeleteManyProduct, handleGetTypesProduct, handleGetProductsByType
};