import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 2,
    });

    res.status(201).json({ 
      message: "User created successfully.", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );

    user.refresh_token = refreshToken;
    await user.save();

    res.json({ 
      accessToken, 
      refreshToken, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token not provided." });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");

    const user = await User.findOne({ where: { id: decoded.user.id } });

    if (!user || user.refresh_token !== token) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // To prevent user enumeration, we don't reveal that the user doesn't exist.
      return res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });
    }

    // In a real application, you would generate a password reset token,
    // save it to the database with an expiration date, and email it to the user.
    // For this example, we'll just send a success message.

    console.log(`Password reset requested for: ${user.email}`);
    
    res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};