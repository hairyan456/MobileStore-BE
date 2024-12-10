import userAPIService from '../services/userAPIService';

const handleLogin = async (req, res) => {
    try {
        let data = await userAPIService.loginUser(req.body, res);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (error) {
        console.log('error from handleLogin():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        let data = await userAPIService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('error from handleRegister():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleLogout = async (req, res) => {
    try {
        let data = await userAPIService.logoutUser(res);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (error) {
        console.log('error from handleLogout():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleGetAllUsers = async (req, res) => {
    try {
        let data = await userAPIService.getAllUsers();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleGetAllUsers():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleGetDetailUser = async (req, res) => {
    try {
        let data = await userAPIService.getDetailUserById(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleGetDetailUser():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleRefreshToken = async (req, res) => {
    try {
        if (!req.params.refresh_token)
            return res.status(200).json({
                EM: 'Empty bearer token!',
                EC: 1,
                DT: '',
            });
        const token = req.params.refresh_token;
        let data = await userAPIService.refreshNewToken(token);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleRefreshToken():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        let data = await userAPIService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleUpdateUser():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleDeleteUser = async (req, res) => {
    try {
        let data = await userAPIService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from handleDeleteUser():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

module.exports = {
    handleGetAllUsers, handleGetDetailUser, handleRefreshToken, handleLogin, handleRegister, handleLogout,
    handleUpdateUser, handleDeleteUser
};