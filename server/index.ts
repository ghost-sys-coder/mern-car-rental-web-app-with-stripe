import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


/** import application routes */
import authRoutes from "./routes/auth.route";
import carRoutes from "./routes/car.route";
import blogRoutes from "./routes/blog.route";

/** import mongodb database connection */
import { connectToDB } from "./database/mongodb";


/** environmental file configuration */
dotenv.config({ path: './config/config.env' });

/** initialize express app */
const app = express();
const port = process.env.PORT || 5000;

/** logging files and actions */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


/** application middleware configuration */
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'DELETE', 'PUT', 'PATCH', 'POST']
}));
app.use(cookieParser())

/** running applicatin routes */
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/blogs", blogRoutes);


/** running express app */
app.listen(port, async () => {
    await connectToDB();
    console.log(`Server running on port: ${port}`)
});


export default app;