import Jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
require('dotenv').config();

export const generateAccessToken = (payload) => {
    // vì object payload là Mongoose object => payload.toObject() để đưa về plain object
    try {
        const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
        return (payload instanceof mongoose.Document) ? Jwt.sign(payload.toObject(), secretKey, { expiresIn: '10s' })
            : Jwt.sign(payload, secretKey, { expiresIn: '10s' });
    }
    catch (error) {
        console.error('Error generating access token:', error);
        throw new Error('Failed to generate access token');
    }
};

export const generateRefreshToken = (payload) => {
    // vì object payload là Mongoose object => payload.toObject() để đưa về plain object
    try {
        const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
        return Jwt.sign(payload.toObject(), secretKey, { expiresIn: '1d' });
    }
    catch (error) {
        console.error('Error generating refresh token:', error);
        throw new Error('Failed to generate refresh token');
    }
};

export const refreshNewTokenService = (token) => {
    try {
        if (token) {
            const { iat, exp, ...rest } = Jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
            return generateAccessToken(rest);
        }
    } catch (error) {
        console.error('Error refresh new token:', error);
        return null;
    }
};