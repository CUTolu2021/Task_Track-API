const {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    getByStatus
} = require("../controller/task");
const {verifyAuthToken} = require("../middleware/authFunction");
const taskRouter = require("express").Router();

taskRouter.get("/",verifyAuthToken,getAll)
taskRouter.post("/",verifyAuthToken,create)
taskRouter.get("/:id",verifyAuthToken,getById)    
taskRouter.put("/:id",verifyAuthToken,updateById)
taskRouter.delete("/:id",verifyAuthToken,deleteById)
taskRouter.get("/status/:status",verifyAuthToken,getByStatus)

module.exports = taskRouter;
