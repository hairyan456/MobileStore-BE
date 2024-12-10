import jwt from "jsonwebtoken";
require('dotenv').config();

export const authPermissionMiddleware = (req, res, next) => {
    try {
        if (!req?.headers?.authorization)
            return res.status(200).json({
                EM: 'Empty bearer token!',
                EC: 1,
                DT: '',
            });
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_ACCESS_TOKEN_SECRET);
        if (decoded) {
            if (!decoded?.isAdmin)
                return res.status(500).json({
                    EM: 'You dont have permission !',
                    EC: -1,
                    DT: '',
                });
            else
                next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: err.message,
            EC: -999,
            DT: '',
        })
    }
};

export const authUserMiddleware = (req, res, next) => {
    try {
        if (!req?.headers?.authorization)
            return res.status(200).json({
                EM: 'Empty bearer token!',
                EC: 1,
                DT: '',
            });
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_ACCESS_TOKEN_SECRET);
        if (decoded) {
            if (decoded?.isAdmin || decoded?._id === req.params.id || decoded?._id === req.body.id || decoded?._id === req.query.id)
                next();
            else {
                return res.status(500).json({
                    EM: 'You dont have permission !',
                    EC: -1,
                    DT: '',
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            EM: err.message,
            EC: -999,
            DT: '',
        })
    }
};