import { Schema, model } from "mongoose";
import { ICar } from "../types";

const CarSchema = new Schema<ICar>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Car name is required!"]
    },
    description: {
        type: String,
        required: [true, "Car Description is required!"]
    },
    brand: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true,
    },
    transmissionType: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    rentalPrice: {
        daily: Number,
        hourly: Number
    },
    images: {
        type: [String],
        required: [true, "Please provide images for the car"]
    },
    booked: {
        type: Boolean,
        default: false
    },
    rentalId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rentalDate: {
        initialDate: Date,
        endDate: Date
    }
}, {timestamps: true});


const Car = model<ICar>("Car", CarSchema);

export default Car;