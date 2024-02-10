import express from "express";

const authRouter = express.Router();

authRouter.post("/login", (req, res)=>{
    res.send({message:"login"})
});

export default authRouter;
