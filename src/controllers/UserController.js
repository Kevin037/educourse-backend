const {getAllUsers} = require('../models/users');

const GetUser = async (req,res) => {
    try {
        const [data] = await getAllUsers();
        res.json({error:0,data:data})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const StoreUser = async (req,res) => {
    res.json({error:0,data:req.body})
}

const UpdateUser = async (req,res) => {
    res.json({error:0,data:"update user ok"})
}

const DeleteUser = async (req,res) => {
    res.json({error:0,data:"user deleted ok"})
}

module.exports = {StoreUser,UpdateUser,DeleteUser, GetUser}; 