
import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/brevo.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing Details. Required Field Must be submitted" });
    }
    try {
        const existing_user = await userModel.findOne({ email });
        if (existing_user) {
            return res.status(409).json({ success: false, message: "User already Exist, Please Login" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashpassword, isVerified: false });
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpairy = Date.now() + 10 * 60 * 1000;
        await user.save();
        const mailoption = {
            to: email,
            subject: "Verify your Peerpath account 🔐",
            text: `Hello,
Thank you for signing up on PeerPath 🚀
To complete your verification, please use the One-Time Password (OTP) below:
🔐 Your OTP: ${otp}
This OTP is valid for the next 10 minutes.
Please do not share this code with anyone for security reasons.
If you did not request this verification, you can safely ignore this email.
Welcome to PeerPath — a platform built to empower students through collaboration and shared guidance.
Warm regards,
Team PeerPath`
        }
        sendEmail(mailoption).catch(err => {
            console.error("OTP email failed:", err.message);
        });
        return res.status(201).json({ success: true, message: "Otp Send to Mail", next: "Verify_OTP" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

export const resendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is Required" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verifyOtp = String(otp);
        user.verifyOtpExpairy = Date.now() + 10 * 60 * 1000;
        await user.save();
        const mailOption = {
            to: email,
            subject: "Resend Verification Otp 🔐",
            text: `Hey User Your Resend Verification otp is ${otp} This OTP is valid for 10 minutes.
Please do not share it with anyone.

— Team Intryo`
        }
        sendEmail(mailOption).catch(err => {
            console.log("otp mailed failed", err.message);
        })
        return res.status(201).json({ success: true, message: "otp send to mail", next: "verify the otp" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const checkUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(200).json({ success: true, exists: true, message: "User exists" });
        } else {
            return res.status(200).json({ success: true, exists: false, message: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Allow verification if already verified (for login)
        // if (user.isVerified) {
        //     return res.status(200).json({ success: true, message: "User already verified" });
        // }

        if (user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpairy < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP Expired" });
        }

        user.isVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpairy = 0;
        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully", user: { name: user.name, email: user.email } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and Password are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // if (!user.isVerified) {
        //     return res.status(403).json({ success: false, message: "Please verify your email first", next: "Verify_OTP" });
        // }

        // Generate and send OTP for login verification
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verifyOtp = String(otp);
        user.verifyOtpExpairy = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOption = {
            to: email,
            subject: "Login Verification Otp 🔐",
            text: `Hello,
Thank you for signing up on PeerPath 🚀
To complete your verification, please use the One-Time Password (OTP) below:
🔐 Your OTP: ${otp}
This OTP is valid for the next 10 minutes.
Please do not share this code with anyone for security reasons.
If you did not request this verification, you can safely ignore this email.
Welcome to PeerPath — a platform built to empower students through collaboration and shared guidance.
Warm regards,
Team PeerPath`
        }
        sendEmail(mailOption).catch(err => {
            console.log("otp mailed failed", err.message);
        })

        return res.status(200).json({ success: true, message: "OTP sent to email", next: "Verify_OTP" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
