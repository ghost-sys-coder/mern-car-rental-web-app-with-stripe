import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface JwtPayload {
  id?: string;
}

/** Authenticate User Token */

export const requireAuthToken = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { rentalToken } = req.cookies;

  if (rentalToken) {
    jwt.verify(
      rentalToken,
      process.env.AUTH_SECRET,
      {},
      async (err, userInfo) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        next();
      }
    );
  } else {
    return res.status(500).json({ message: "You are not authorized!" });
  }
};

/** check if user exists */
export const checkUser = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { rentalToken } = req.cookies;

  if (rentalToken) {
    jwt.verify(
      rentalToken,
      process.env.AUTH_SECRET,
      {},
      async (err, userInfo: string | JwtPayload) => {
        if (err) {
          res.locals.user = null;
          return res.status(401).json({ message: "Invalid Token" });
        }

        if (typeof userInfo === "string") {
          return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await User.findById(userInfo.id);
        res.locals.user = user;
        next();
      }
    );
  } else {
    return res.status(500).json({ message: "You are not authorized!" });
  }
};

/** check admin access */
export const checkAdminAcess = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { rentalToken } = req.cookies;

  if (rentalToken) {
    jwt.verify(
      rentalToken,
      process.env.AUTH_SECRET,
      {},
      async (err, userInfo: string | JwtPayload) => {
        if (err) {
          res.locals.user = null;
          return res.status(401).json({ message: "Invalid Token" });
        }

        if (typeof userInfo === "string") {
          return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await User.findById(userInfo.id);
        if (user.admin) {
          res.locals.user = user;
          next();
        } else {
          
          return res.status(500).json({ message: "This resource requires admin rights!" });
        }
      }
    );
  } else {
    return res.status(500).json({ message: "You are not authorized!" });
  }
};
