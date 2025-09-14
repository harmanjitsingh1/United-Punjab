import transporter from "../utils/transporter.js";

export const sendVerificationCode = async (emailTo, OTP) => {
  try {
    // console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
    const mailOptions = {
      from: `"United Punajb" <${process.env.EMAIL_USER}>`,
      to: emailTo,
      subject: "Verify Your Email - United Punjab",
      html: `
  <div style="font-family: Arial, sans-serif; background: #f4f4f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #F57517; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">United Punjab</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px; text-align: center; color: #333333;">
        <h2 style="margin-bottom: 10px;">Email Verification</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Please use the verification code below to complete your signup.  
          This code will expire in <b>5 minutes</b>.
        </p>
        
        <div style="font-size: 32px; letter-spacing: 4px; font-weight: bold; color: #F57517; margin: 20px 0;">
          ${OTP}
        </div>

        <p style="font-size: 14px; color: #666;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f4f4f7; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} UnitedPunjab. All rights reserved.
      </div>

    </div>
  </div>
  `,
    };

    const info = await transporter.sendMail(mailOptions);
    return;
  } catch (err) {
    console.error("Error sending verification code:", err);
    throw err;
  }
};
