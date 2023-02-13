import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './config/db/db.js';
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from './middleware/error-handler.js';
import {router as authRouter} from "./routes/authRoutes.js";
import {router as userRouter} from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';
import 'express-async-errors'
import {router as productRouter}from './routes/productRoutes.js';
import {router as reviewRouter} from './routes/reviewRoutes.js';
import cors from 'cors';

// #757EB0 #71307A #B81F7B

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(cookieParser((process.env.JWT_SECRET)))
const PORT = process.env.PORT || 5000;

const url = `localhost:${PORT}`;
// Setting up the routes for use

app.use(`/auth`, authRouter);
app.use(`/users`, userRouter);
app.use(`/products`, productRouter);
app.use(`/reviews`, reviewRouter);



app.get("/", (req, res)=>{
    res.send("Welcome to the total beauty affairs backend");
})
// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// Code to start the server
const start = async () => {
    try {
        await connectionDB(process.env.MONGO_URI)
       app.listen(PORT, console.log("server is running"))
        
    } catch (error) {
        console.log(error);
        
    }
}
start();
