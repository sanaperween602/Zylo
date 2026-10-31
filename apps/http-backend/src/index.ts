import express from "express";
import JWT from "jsonwebtoken";
// @ts-expect-error backend-common/config does not currently provide TypeScript declarations.
import {JWT_SECRET} from "@repo/backend-common/config";
import {middleware} from "./middleware";
import {CreateUserSchema , SigninSchema, CreateRoomSchema} from "@repo/common/types";
const app = express();
app.use(express.json());
app.post("/signup",(req,res)=>{
    const data = CreateUserSchema.parse(req.body);
    if(!data){
         res.json({
            message:"incorrect input"
        })
        return;
    }
    res.json({
        userId:"123"
    })
})
app.post("/signin",(req,res)=>{
   const data = SigninSchema.parse(req.body);
    if(!data){
         res.json({
            message:"incorrect input"
        })
        return;
    }

    const userId=1;
    const token = JWT.sign({
       userId:userId
    },JWT_SECRET);
    res.json({
        token
    })
})
app.post("/room", middleware , (req,res)=>{
      const data = CreateRoomSchema.parse(req.body);
    if(!data){
         res.json({
            message:"incorrect input"
        })
        return;
    }
     res.json({
        roomId:"123"
     })
})


app.listen(4000);