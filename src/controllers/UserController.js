const {createUser, updateUser, getUser, sendVerificationEmail, verifyEmail} = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getOrders } = require('../models/OrderModel');

const GetProfile = async (req,res) => {
   try {
      const token = req.cookies.token;
      const data = jwt.decode(token);
      const user = await getUser(data.user.email);
      res.status(200).json({error:0,data:user});
   } catch (error) {
      res.status(400).json({ error });
   }
}

const GetMyClasses = async (req,res) => {
    try {
        const token = req.cookies.token;
        const data = jwt.decode(token);
        const filters = {
            user_id: data.user.id || null,
            status: req.query.status || "success",
            class_status: req.query.status || null,
            limit: req.query.limit || 10,
            page: req.query.page || 1
        };
        const Orders = await getOrders(filters);
        res.status(200).json({error:0,data:Orders});
    } catch (error) {
       res.status(400).json({ error });
    }
 }

const StoreUser = async (req,res) => {
    try {
        const existingUser = await getUser(req.body.email);
        if (existingUser) {
            return res.status(400).json({ error: 1, message: "Email sudah terdaftar." });
        }
        const token = await createUser(req.body);
        await sendVerificationEmail(req.body.email, token);
        res.status(201).json({error:0,message: "User registered. Verification email sent"})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const VerifyEmail = async (req, res) => {
    const token = req.query.token;
    await verifyEmail(token);
    return res.status(200).json({ error: 0, message: "Email Verified Successfully" });
};


const SignIn = async (req,res) => {
    try {
        if (!req.body.email || !req.body.password) {
           res.status(400).json({
              message: "Please enter email and password",
           });
        }
    
        const user = await getUser(req.body.email,true);
        if (user) {
           if (await bcrypt.compare(req.body.password, user.password)) {
               const token = jwt.sign(
                   {
                   user : 
                       {
                           id: user.id,
                           email: user.email,
                       }
                   },
                   "secret_key",{ expiresIn: "30d"});
               res.cookie("token", token, {
                   // domain: process.env.FRONTEND_URL, // Set your domain here
                   maxAge: new Date(Date.now() + 86400000), // Cookie expires in 1 day
                   secure: true, // Cookie will only be sent over HTTPS
                   httpOnly: true, // Cookie cannot be accessed via client-side scripts
                   // sameSite: "None",
               });
               res.status(200).json({
                   token,
                   user: { id: user.id, name: user.name, email: user.email, photo: user.photo },
               });
               } else {
                   res.status(400).json({
                       message: "Incorrect Password or Email!",
                   });
               }
           } else {
               res.status(400).json({
                   message: "User does not exist..!",
               });
           }
       } catch (error) {
           res.status(400).json({ error });
       }
}

const UpdateUser = async (req,res) => {
    try {
        const token = req.cookies.token;
        const data = jwt.decode(token);
        const user = await updateUser(req.body,data.user.email);
        res.status(200).json({error:0,data:user});
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const SignOut = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  }

module.exports = {StoreUser,UpdateUser, GetProfile, SignIn, SignOut, GetMyClasses, VerifyEmail}; 