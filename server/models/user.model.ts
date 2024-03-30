import { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";

interface IUserModel extends Model<IUser>{
    login(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser>({
    admin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    resetCode: {
        type: String
    },
    verificationToken: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    resetCodeExpiration: {
        type: Date
    },
    rentals: {
        type: [Schema.Types.ObjectId],
        ref: 'Rentals'
    },
    username: {
        type: String,
        unique: true,
    },
    image: {
        type: String
    },
    subscribeToNewsletter: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


/** Fire this function before the document is saved to the db */
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


/** Fire function after the document is saved */
UserSchema.post("save", async (doc, next) => {
    console.log("user has been saved to mongodb", doc);
    next();
});

/** mongoose function to log in user */
UserSchema.statics.login = async function(email, password){
    const user: IUser = await this.findOne({ email });

    if (user) {
        if (!user.email_verified) {
            throw Error("Check your email for a verification link!");
        }

        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }
        throw Error("Wrong Password!")

    }
    throw Error("Email not registered!")

}



const User = model<IUser, IUserModel>('User', UserSchema);

export default User;