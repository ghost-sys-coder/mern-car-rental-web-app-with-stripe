import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, newsletterSubsciption, registerUser, resendEmailVerificationToken, resetPassword, updateUserInfo, verifyToken, verifyUserProfile } from "../controls/auth.control";
import { checkUser } from "../middleware/authentication";


const router = Router();



/**
 * ! Register User
 * ! Method POST
 */
router.post("/register", registerUser);


/**
 * ? Login User
 * ? METHOD POST
 */
router.post("/login", loginUser);


/**
 * * Verify user profile
 * * Method GET
 */
router.get("/profile", verifyUserProfile);


/**
 * ! Logout User
 * ! Method POST
 */
router.post("/logout", logoutUser);

/**
 * ? FORGOT PASSWORD
 * ? METHOD POST
 */
router.post("/forgot-password", forgotPassword);


/**
 * * RESET PASSWORD
 * * METHOD POST
 */
router.post("/reset-password", resetPassword);

/**
 * ! VERIFY TOKEN
 * ! METHOD POST
 */
router.get("/verify/:token", verifyToken);


/**
 * ? RESEND EMAIL VERIFICATION TOKEN
 * ? METHOD POST
 */
router.post("/resend/token", resendEmailVerificationToken);

/**
 * * UPDATE USER INFORMATION
 * * METHOD PUT
 */
router.put("/user/update", checkUser, updateUserInfo);

/**
 * ! Newsletter Subscription
 * ! Method PUT
 */
router.put("/newsletter/subscription", checkUser, newsletterSubsciption);

export default router;
