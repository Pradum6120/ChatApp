import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

const secret = '123ghytm';

// The generateToken function now accepts `userId` and creates a token based on it.
const generateToken = async (userId) => {
  try {
    const payload = {
      userId: userId // You were using `newuser._id` which is incorrect since you're passing `userId` directly.
    };

    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    return console.error('Error while generating token:', error.message);
  }
};

const authjwt = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(400).json({
        message: "token not found",
      });
    }
     console.log("authorization" ,authorization )

    const token = authorization.split(" ")[1];

    if (!token) {
     return res.status(400).json({
        message: "unauthorized : not token found",
      });
    }
     console.log("token", token)
    const verification = jwt.verify(token, secret);
    console.log("verfication", verification)
    const currentUser = await User.findById(verification.userId)
    console.log("curret user", currentUser)

    req.user = currentUser
    next()
    

  } catch (error) {
    console.log(error)
    return res.status(400).json({
        message: "unable to verify",
        error: error.message
      });
  }
};

export {authjwt, generateToken}