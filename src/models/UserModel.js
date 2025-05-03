const dbPool = require("../config/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const getAllUsers = () => {
    const rows = dbPool.execute("SELECT * FROM users");
    return rows;
};

const createUser = async (body) => {
    const password = await bcrypt.hash(body.password, 10);
    const token = uuidv4();
    const rows = dbPool.execute(`INSERT INTO users (name,email,	no_hp,password, verification_token)
        VALUES (?, ?, ?, ?, ?)`, [body.name, body.email, body.no_hp, password, token]);
    return token;
};

const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Educourse Account - Verify your email',
        html: `<p>Click the link to verify your email: <a href="${process.env.FRONTEND_URL}/auth/verifikasi-email?token=${token}">Verify Email</a></p>`
    };

    await transporter.sendMail(mailOptions);
};

const verifyEmail = async(token) => {
        
    const [result] = await dbPool.execute(`SELECT * FROM users WHERE verification_token = ?`, [token]);

    if (result.length === 0) {
        return res.status(400).json({ error: 1, message: "Invalid Verification Token" });
    }

    await dbPool.execute(`UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?`, [result[0].id]);
    return true;
}

const getUser = async (email, sync=false) => {
    const attr = (sync) ? '*' : 'id, name, email, no_hp, photo';
    const [user] = await dbPool.execute(`SELECT ${attr} FROM users WHERE email = '${email}' AND is_verified = 1`);
    return (user.length > 0) ? user[0] : false;
}

const updateUser = async (body,email) => {
    const keys = Object.keys(body);
    if (keys.length === 0) {
        return { error: true, message: 'Tidak ada data untuk diupdate'};
    }
    const setQuery = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => body[key]);
    const rows = await dbPool.execute(`UPDATE users SET ${setQuery} WHERE email = '${email}'`,values);
    return rows;
};

const deleteUser = (idUser) => {
    const rows = dbPool.execute(`DELETE FROM users WHERE id = ${idUser}`);
    return rows;
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser,sendVerificationEmail, verifyEmail };