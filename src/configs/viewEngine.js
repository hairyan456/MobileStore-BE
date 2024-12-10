import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));  //cho phép ng dùng truy cập các source lưu trong folder 'public'
}

export default configViewEngine;