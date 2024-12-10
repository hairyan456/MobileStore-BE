require('dotenv').config();

const handleGetPaymentConfig = async (req, res) => {
    try {
        return res.status(200).json({
            EM: 'Get payment config success',
            EC: 0,
            DT: process.env.PAYPAL_CLIENT_ID,
        })
    } catch (error) {
        console.log('>>> check error from handleGetPaymentConfig():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

module.exports = {
    handleGetPaymentConfig,
};