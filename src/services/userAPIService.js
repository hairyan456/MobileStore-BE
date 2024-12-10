require('dotenv').config();
import bcrypt from 'bcryptjs';
import User from '../models/UserModel';
import { generateAccessToken, generateRefreshToken, refreshNewTokenService } from '../utils/JWTHelpers';
import { Types } from 'mongoose';

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const checkEmailExisted = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });
        return !!user; // Trả về true nếu user tồn tại, false nếu không
    } catch (error) {
        console.log('>>> check error (checkEmailExisted):', error);
    }
};

const checkPhoneExisted = async (userPhone) => {
    try {
        const user = await User.findOne({ phone: userPhone });
        return !!user; // Trả về true nếu user tồn tại, false nếu không
    } catch (error) {
        console.log('>>> check error (checkPhoneExisted):', error);
    }
};

const registerNewUser = async (rawUserData) => {
    try {
        if (!rawUserData.name || !rawUserData.email || !rawUserData.password || !rawUserData.phone) {
            return {
                EM: 'Missing required params',
                EC: 1,
                DT: ''
            }
        }
        // check email validation:
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regEmail.test(rawUserData.email)) {
            return {
                EM: 'Email is not valid',
                EC: 1
            };
        }
        //check email/phonenumber are existed
        if (await checkEmailExisted(rawUserData.email)) {
            return {
                EM: 'Email is already existed',
                EC: 2
            }
        }
        if (await checkPhoneExisted(rawUserData.phone)) {
            return {
                EM: 'Phone number is already existed',
                EC: 2
            }
        }
        //check password length
        if (rawUserData.password && rawUserData.password.length < 3) {
            return {
                EM: 'Password must have more than 3 letters',
                EC: 3,
                DT: '',
            }
        }
        const newUser = new User({
            name: rawUserData.name,
            email: rawUserData.email,
            password: hashUserPassword(rawUserData.password),
            phone: rawUserData.phone,
        });
        await newUser.save();
        return {
            EM: 'Created successfully!',
            EC: 0,
            DT: '',
        }
    } catch (error) {
        console.log('>>> check error from registerNewUser():', error);
        return {
            EM: `Something wrongs in Service  registerNewUser() `,
            EC: -2,
            DT: ''
        }
    }
};

const loginUser = async (userInfo, res) => {
    try {
        //nếu tồn tại Email hoặc Phone:
        if (await checkEmailExisted(userInfo.valueLogin) || await checkPhoneExisted(userInfo.valueLogin)) {
            const user = await User.findOne({
                $or: [{ email: userInfo.valueLogin }, { phone: userInfo.valueLogin }]
            }).select('id name email password isAdmin phone');
            if (user) {
                if (bcrypt.compareSync(userInfo.password, user.password)) {
                    user.password = undefined; //không trả về password trong  Data
                    res.cookie('refresh_token', generateRefreshToken(user), {
                        httpOnly: true,
                        secure: process.env.NODE_ENV,
                        sameSite: 'Strict', // ngăn tấn công CSRF 
                        maxAge: 1 * 24 * 60 * 60 * 1000, // 7 ngày
                    });
                    return {
                        EM: 'Login successfully',
                        EC: 0,
                        DT: {
                            access_token: generateAccessToken(user),
                            refresh_token: generateRefreshToken(user),
                        },
                    }
                }
                else {
                    return {
                        EM: 'Wrong password!',
                        EC: 2,
                        DT: ''
                    }
                }
            }
        }
        else { //nếu email hoặc phone k tồn tại:
            return {
                EM: 'Email or phone is not existed',
                EC: 1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error loginUser():', error);
        return {
            EM: `Something wrong in loginUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const logoutUser = async (res) => {
    try {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            path: '/', // Mặc định nếu không chỉ định path
            domain: 'localhost',
        });
        return {
            EM: 'Logout successfully!',
            EC: 0,
            DT: ''
        }

    } catch (error) {
        console.log('>>> check error logoutUser():', error);
        return {
            EM: `Something wrong in logoutUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const getAllUsers = async () => {
    let listUsers = [];
    try {
        listUsers = await User.find({}, '-avatar -password -createdAt -updatedAt -__v');
        if (listUsers && listUsers.length > 0) {
            return {
                EM: 'Get list users success!',
                EC: 0,
                DT: listUsers
            }
        }
        else {
            return {
                EM: 'Cannot get list users because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllUsers():', error);
        return {
            EM: `Something wrongs in Service  getAllUsers() `,
            EC: -2,
            DT: ''
        }
    }
}

const getDetailUserById = async (id) => {
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
        const user = await User.findOne({ _id: id }, '-password -createdAt -updatedAt -__v');
        if (user)
            return {
                EM: 'Get detail user success',
                EC: 0,
                DT: user
            };
        else {
            return {
                EM: 'User is not existed!',
                EC: -1,
                DT: ''
            }
        }
    }
    catch (error) {
        console.log('>>> check error from getDetailUserById():', error);
        return {
            EM: `Something wrongs in Service  getDetailUserById() `,
            EC: -2,
            DT: ''
        }
    }
}

const refreshNewToken = async (token) => {
    try {
        if (!token) {
            return {
                EM: 'Token must be required!',
                EC: 1,
                DT: ''
            }
        }
        if (refreshNewTokenService(token))
            return {
                EM: 'Generate new token success',
                EC: 0,
                DT: refreshNewTokenService(token)
            }
        return {
            EM: 'Invalid or expired refresh token',
            EC: 2,
            DT: null
        }

    } catch (error) {
        console.log('>>> check error from refreshNewToken():', error);
        return {
            EM: `Something wrongs in Service refreshNewToken() `,
            EC: -2,
            DT: ''
        }
    }
}

const updateUser = async ({ id, data }) => {
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
        const user = await User.findOne({ _id: id });
        if (user) {
            //nếu update mà phone tồn tại:
            if (await checkPhoneExisted(data.phone)) {
                return {
                    EM: 'Phone number is existed!',
                    EC: 2,
                    DT: 'phone'
                }
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            if (updatedUser) {
                const { password, createdAt, updatedAt, __v, ...data } = updatedUser.toObject();
                return {
                    EM: 'Updated success',
                    EC: 0,
                    DT: data
                }
            }
        }
        else {
            return {
                EM: 'User is not existed!',
                EC: -1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from updateUser():', error);
        return {
            EM: `Something wrongs in Service  updateUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const deleteUser = async (userId) => {
    try {
        if (!userId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        if (!Types.ObjectId.isValid(userId)) {
            return {
                EM: 'Invalid ID format!',
                EC: 1,
                DT: ''
            }
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            return {
                EM: 'Delete successfully',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'User is not existed to delete!',
                EC: -1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from deleteUser():', error);
        return {
            EM: `Something wrongs in Service deleteUser() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser, loginUser, logoutUser, getAllUsers, getDetailUserById, refreshNewToken, updateUser,
    deleteUser
};