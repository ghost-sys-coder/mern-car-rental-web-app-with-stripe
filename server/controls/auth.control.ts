import crypto from "crypto";
import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { connectToDB } from "../database/mongodb";
import { IUser, JwtPayload } from "../types";
import { createToken, maxAge } from "../utils";
import { sendEmailVerification, sendResetToken } from "../middleware/nodemailer";

/**
 * ! Register user
 * ! Method POST
 */
const registerUser = async (req: Request, res: Response) => {
  /** running a database connection if hosting on vercel */
  await connectToDB();

  const { username, password, email, firstName, lastName }: IUser = req.body;

  try {
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(401).json({ message: "Email taken! Try again!" });
    }

    const checkUsername = await User.findOne({ username });

    if (checkUsername) {
      return res.status(401).json({ message: "Username already taken!" });
    }

    const user = await User.create({
      username,
      firstName,
      lastName,
      password,
      email,
      verificationToken: crypto.randomBytes(20).toString("hex"),
    });

    /** send email verification token */
    await sendEmailVerification(email, user.verificationToken)

    return res.status(200).json({ message: "Registration Successful!" });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

/**
 * ? Login user
 * ? Method POST
 */
const loginUser = async (req: Request, res: Response) => {
  /** handle db connection when hosting on vercel */
  await connectToDB();

  const { email, password }: IUser = await req.body;

  try {
    const user = await User.login(email, password);

    /** create token */
    const token = await createToken(user.id, user.username, user.email, user.admin);

    res.cookie("rentalToken", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: maxAge * 1000,
    });

    return res.status(200).json({ message: "User logged in!" });
  } catch (error) {
    console.log(error);
    let err = error.message;
    if (err === "Check your email for a verification link!") {
      return res.status(401).json({
        message:
          "Email not verified! Check your email for a verification token!",
      });
    } else if (err === "Wrong Password!") {
      return res.status(400).json({ message: "Wrong Password! Try again!" });
    } else if (err === "Email not registered!") {
      return res
        .status(403)
        .json({ message: "Email is not registered! Create an account!" });
    }

    return res
      .status(500)
      .json({ message: "Login failed! Check your credentials!" });
  }
};

/**
 * * Verify user profile
 * * Method GET
 */
const verifyUserProfile = async (req: Request, res: Response) => {
  /** running db connection when hosting to vercel */
  await connectToDB();
  
  const { rentalToken } = await req.cookies;

  if (rentalToken) {
    jwt.verify(
      rentalToken,
      process.env.AUTH_SECRET,
      {},
      async (err, userInfo: string | JwtPayload) => {
        console.log("working")
        if (err) return res.status(401).json({ message: "Invalid Token" });

        if (typeof userInfo === "string") {
          return res.status(401).json({ message: "Invalid Token" });
        }

        const { _id, username,email, image, admin } = await User.findById(
          userInfo.id
        );

        return res.status(200).json({ _id, username, email, image, admin });
      }
    );
  } else {
    return res.status(500).json({message: "You are not logged in!"})
  }
};

/**
 * ! Logout User
 * ! Method POST
 */
const logoutUser = async (req: Request, res: Response) => {
  /** run mongodb when hosting to vercel */

  await connectToDB();

  const { rentalToken } = req.cookies;

  if (!rentalToken) {
    return res.status(500).json({message: "Failed! Try again!"})
  }

  res
    .cookie("rentalToken", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ message: "Logged Out!" });
};

/**
 * ? Resend email verification token
 * ? METHOD POST
 */
const resendEmailVerificationToken = async (req: Request, res: Response) => {
  await connectToDB();

  try {
    const { email } = req.body;

    /** check if email exists */

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(401).json({ message: "Email does not exist!" });
    }

    /** check if user is verified */
    const checkIsUserVerified = await User.findOne({
      email,
      email_verified: true,
    });

    if (checkIsUserVerified) {
      return res.status(201).json({ message: "Email already verified!" });
    }

    /** send verification token */
    await sendEmailVerification(email, crypto.randomBytes(20).toString("hex"));

    return res
      .status(200)
      .json({ message: "Verification Token sent to your email!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * *Forgot password
 * * Method POST
 */
const forgotPassword = async (req: Request, res: Response) => {
  await connectToDB();

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "Email not found! Create an account!" });

    user.resetCode = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    user.resetCodeExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);

    /** save user */
    await user.save();

    /** send reset token to the user email */
    await sendResetToken(email, user.resetCode);

    return res
      .status(200)
      .json({ message: "Check your email for a password reset token!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * ! Reset Password
 * ! METHOD POST
 */
const resetPassword = async (req: Request, res: Response) => {
  await connectToDB();

  try {
    const { token, password } = req.body;

    /** check if user exists and has the token */
    const checkUser = await User.findOne({
      resetCode: token,
      resetCodeExpiration: { $gt: new Date() },
    });

    if (!checkUser) {
      return res.status(404).json({ message: "Invalid or Expired token!" });
    }

    /** update password and reset code fields */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { email: checkUser.email },
      {
        $set: {
          resetCode: "",
          resetCodeExpiration: "",
          password: hashedPassword,
        },
      },
      { multi: true, new: true }
    );

    return res.status(200).json({ message: "Password Reset Successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Password Reset Failed!" });
  }
};

/**
 * ? VERIFY VERIFICATION TOKEN
 * ? METHOD POST
 */
const verifyToken = async (req: Request, res: Response) => {
  await connectToDB();

  try {
    const { token } = req.params;

    /** find user with the given token and update the token info */

    const checkUser = await User.findOneAndUpdate(
      { verificationToken: token },
      {
        $set: {
          verificationToken: "",
          email_verified: true,
        },
      },
      { new: true, multi: true }
    );

    if (!checkUser) {
      return res.status(404).json({ message: "Token not found!" });
    }

    return res.status(200).json({ message: "User has been verified!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token verification failed!" });
  }
};

/**
 * * UPDATE USER INFORMATION
 * * METHOD PUT
 */
const updateUserInfo = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();
  
  try {
    const { email } = req.body;
    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
      multi: true,
    });

    /** if user does not exist */
    if (!updatedUser) return res.status(404).json({ message: "Email not found! Use your account email" });


    return res
      .status(200)
      .json({
        message: "User information has been updated!",
        success: true,
        updatedUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * ! Newsletter Subscription
 * ! Method PUT
 */

const newsletterSubsciption = async (req: Request, res: Response) => {
  /** await mongoDB connection for vercel upload */
  await connectToDB();

  const { email } = await req.body;

  try {
    /** check if email exists */
    const checkEmail = await User.findOne({ email });

    /** if email is not registered */
    if (!checkEmail) {
      return res.status(404).json({message: "Email not registered! Use your account email!"})
    }

    /** check if user already subscribed */
    if (checkEmail.subscribeToNewsletter) {
      return res.status(400).json({message: "You are already subscribed to our Newsletter!"})
    }

    /** subscribe new user */
    checkEmail.subscribeToNewsletter = true;

    /** save new user details*/
    await checkEmail.save();

    return res.status(200).json({
      message: "Thank you for subscribing!",
      success: true,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}


export {
  registerUser,
  loginUser,
  verifyUserProfile,
  logoutUser,
  resendEmailVerificationToken,
  resetPassword,
  forgotPassword,
  verifyToken,
  updateUserInfo,
  newsletterSubsciption
};
