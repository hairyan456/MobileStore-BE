require('dotenv').config();
import express from 'express';
import configViewEngine from './configs/viewEngine';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configCors from './configs/cors';
import mongoose from 'mongoose';
import initAPIRoutes from './routes/api';

const app = express(), PORT = process.env.PORT || 8080;
//config view engine & cors:
configCors(app);
configViewEngine(app);

app.use(cookieParser());

//config body-parser: 
app.use(bodyParser.json({ limit: '50mb' }));  //mặc định limit-size = 1MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(`mongodb+srv://hai0702:${process.env.DB_PASSWORD}@cluster0.ya8ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch(err => {
        console.log(err);
    });

initAPIRoutes(app);

app.listen(PORT, () => {
    console.log("SERVER is running on PORT:", PORT);
});


