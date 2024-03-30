import nodemailer from "nodemailer";

/** send email verification token */
const sendEmailVerification = async (
  email: string,
  verificationToken: string
) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_NODEMAILER_EMAIL,
      pass: process.env.GOOGLE_NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "LockaRentals",
      to: email,
      subject: "Email Verification",
      html: `
            <div style="margin: 0; padding: 10; box-sizing: border-box">
                <h1 style="font-weight: 300; font-size: 24; color: teal; text-align: center">Verify your email!</h1>
                <h2 style="font-weight: 400; color: teal; font-size: 18; text-align: center;">Welcome to LockaRentals</h2>
                <img alt="logo" style="width: 100%; height: 150px; border-radius: 10px; object-fit: cover" src="https://i.postimg.cc/Kvf9SkHk/shoplocker-half-image.png" />
                <p style="line-height: 1.5; text-align: center;">You just signed up for an account with <b style="font-size: 17; color: teal">LockaRentals</b>, we need you to verify your email before you proceed to login! </p>
                <p style="text-align: center;">Please click the link below to verify your email!</p>
                <a style="color: black; font-weight: 900; text-align: center; display: block; font-size: 30px" target="_blank" href=${verificationUrl}>CLICK HERE!</a>
            </div>
                `,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * ! Reset your token
 */
const sendResetToken = async (email: string, resetToken: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset`
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_NODEMAILER_EMAIL,
      pass: process.env.GOOGLE_NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "LockaRentals",
      to: email,
      subject: "Password Reset Token!",
      html: `
      <div style="margin: 0; padding: 10; box-sizing: border-box">
            <h1 style="font-weight: 300; font-size: 24; color: teal; text-align: center">Password Reset Token!</h1>
            <h2 style="font-weight: 400; color: teal; font-size: 18; text-align: center;">Your Password reset token</h2>
            <p style="text-align: center;">Please enter the reset token in the provided box on our website!</p>
            <p style="color: black; font-weight: 900; text-align: center; display: block; font-size: 30px">${resetToken}</p>
            <a style="color: black; font-weight: 900; text-align: center; display: block; font-size: 30px" target="_blank" href=${resetUrl}>CLICK HERE TO RESET YOUR PASSWORD!</a>
        </div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendEmailVerification, sendResetToken };
