const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const verify = jwt.verify(token,process.env.TOKEN_KEY);
        next()
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }
}

const is_guest = (req, res, next) => {
    const token = req.cookies.token;
    try {
        jwt.verify(token,process.env.TOKEN_KEY,(err,data)=>{
            if (err) {
                // Kalau error verifikasi token, misal token salah/expired, lanjut (anggap guest)
                return next();
            }
            return res.status(401).json({status:false})
        })
    } catch (error) {
        next()
    }
}
module.exports = {verifyToken,is_guest}