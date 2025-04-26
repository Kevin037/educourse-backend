const {getAllUsers, createUser, updateUser, deleteUser} = require('../models/UserModel');

const GetUser = async (req,res) => {
    try {
        const [data] = await getAllUsers();
        res.status(200).json({error:0,data:data})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const StoreUser = async (req,res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({error:0,message: "User successfully registered."})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const UpdateUser = async (req,res) => {
    try {
        await updateUser(req.body,req.params.id);
        res.status(200).json({error:0,data:"Deleted"})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

const DeleteUser = async (req,res) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({error:0,data:req.body})
    } catch (error) {
        res.status(500).json({error:1,data:"Server error",message:error});
    }
}

module.exports = {StoreUser,UpdateUser,DeleteUser, GetUser}; 