const GetUser = async (req,res) => {
    res.json({error:0,data:"get user ok"})
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