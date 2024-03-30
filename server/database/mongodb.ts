import mongoose from "mongoose";

mongoose.set("strictQuery", false);

// connect to mongodb

export const connectToDB = async () => {
    try {
        const mongoDBConn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB running on: ${mongoDBConn.connection.host}`)
    } catch (error: any) {
        console.log(error);
    }
}