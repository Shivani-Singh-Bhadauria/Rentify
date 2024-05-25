import Users from "../models/users-model.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req, res) => {
  try {
    //get all users
    const users = await Users.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log("err");
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
export const getsingleuser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user)
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const UserSignup = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new Users({ name, email, password: hashedPassword,role });
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "OK", user });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const UserLogin = async (
  req,
  res,
) => {
  try {
    const { email, password,role } = req.body;
    const user = await Users.findOne({ email });
    console.log(user,role)
    if (!user) {
      return res.status(401).send("User not registered");
    }
    if (role!==user.role) {
      return res.status(401).send("Role Different");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "OK", user });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await Users.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ status: "ERROR", message: "User not registered or token malfunctioned", isAuthenticated: false });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ status: "ERROR", message: "Access UnAuthorized", isAuthenticated: false });
    }

    return res.status(200).json({ status: "OK", isAuthenticated: true, user: { id:user._id,name: user.name, email: user.email,role:user.role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "ERROR", message: error.message, isAuthenticated: false });
  }
};



export const userLogout = async (
  req,
  res
) => {
  try {
    //user token check
    const user = await Users.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};