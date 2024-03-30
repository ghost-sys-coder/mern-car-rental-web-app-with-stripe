import { Document, Types, Schema } from "mongoose";

export interface IUser extends Document {
  admin: boolean;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetCode?: string;
  email_verified?: boolean;
  verificationToken?: string;
  resetCodeExpiration?: Date;
  rentals?: [Types.ObjectId] | [string] | null;
  image?: string;
  subscribeToNewsletter?: boolean
}

export interface JwtPayload {
  id?: string;
}

export interface ICar extends Document {
  creator?: Schema.Types.ObjectId | string | null;
  title: string;
  description: string;
  rentalPrice: {
    daily?: number,
    hourly?: number
  };
  brand: string;
  purchasePrice: number;
  mileage: number;
  engine: string;
  transmissionType: string;
  images: string[],
  booked: boolean;
  rentalId?: Schema.Types.ObjectId | string | null,
  rentalDate?: {
    initialDate: Date,
    endDate: Date
  }
}


export interface IComment {
  creator: string;
  description: string;
  name: string;
  email: string;
}

export interface IBlog extends Document {
  creator: Schema.Types.ObjectId | string | null;
  image?: string;
  title: string;
  description: string;
  tags: string[];
  comments?: IComment[];
}
