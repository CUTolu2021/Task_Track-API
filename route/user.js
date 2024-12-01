const {
    createUser,getAll,getById,updateById,deleteById,getAllTaskByUserId,signIn
} = require("../controller/user");
const hashPassword = require("../middleware/hashPassword");
const {verifyAuthToken} = require("../middleware/authFunction");
const userRouter = require("express").Router();


//userRouter.get("/",verifyAuthToken,getAll)
userRouter.post("/",hashPassword,createUser)
userRouter.get("/:id",verifyAuthToken,getById)
userRouter.put("/:id",verifyAuthToken,updateById)
userRouter.delete("/:id",verifyAuthToken,deleteById)
userRouter.post("/login",signIn)

module.exports = userRouter;
