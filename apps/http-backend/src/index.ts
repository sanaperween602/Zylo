import express from "express";
import JWT from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";
import {middleware} from "./middleware";
import { prismaClient } from '@repo/db/client';
import {CreateUserSchema , SigninSchema, CreateRoomSchema} from "@repo/common/types";
type DBClient = typeof prismaClient;
type DBOrm = typeof prismaClient.orm;
type DBPublic = typeof prismaClient.orm.public;
type DBUser = NonNullable<NonNullable<DBPublic>["User"]>;
const app = express();
app.use(express.json());
//
app.post("/signup", async function (req, res) {

    const parsedata = CreateUserSchema.safeParse(req.body);

    if (!parsedata.success) {
        return res.status(400).json({
            message: "Incorrect input"
        });
    }

    try {
        const user = await prismaClient.orm.public.User.create({
    email: parsedata.data.username,
    password: parsedata.data.password,
    name: parsedata.data.name
});
        
  return res.json({
            userId: user.id
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "User creation failed"
        });
    }
});
app.post("/signin",async (req,res)=>{
   const parsedata = SigninSchema.parse(req.body);
    if(!parsedata){
         res.json({
            message:"incorrect input"
        })
        return;
    }
    //TODO : compare the hashed pws here

    const user = await prismaClient.orm.public.User
    .where({
        email: parsedata.username,
        password: parsedata.password
    })
    .first();
    
    if(!user){
        res.status(403).json({
            message:"Not authorized"
        })
        return;
    }

    const token = JWT.sign({
       userId:user.id
    },JWT_SECRET);
    res.json({
        token
    })
})
app.post("/room", middleware ,async (req,res)=>{
      const parsedata = CreateRoomSchema.safeParse(req.body);
    if(!parsedata.success){
         res.json({
            message:"incorrect input"
        })
        return;
    }
    //@ts-ignore
  const userId = req.userId;
  try{
  const room = await prismaClient.orm.public.Room.create({
        slug: parsedata.data.name,
        adminId: userId
    
});

     res.json({
        roomId:room.id
     })
    }catch(e){
        res.status(411).json({
            message:"Room already exist with this name"
        })
    }
})
//get 
app.get("/chats/:roomId", async function (req, res) {
    try{
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.orm.public.Chat
        .where({
            roomId: roomId
        })
        .limit(50)
        .all();

    res.json({
        messages
    });
}    catch(e){
    res.json({
        message:[]
    })
}
});

app.get("/room/:slug", async function (req, res) {
    const slug = req.params.slug;

    const room = await prismaClient.orm.public.Room
        .where({
            slug: slug
        })
        .first();

    res.json({
        room
    });
});

// app.listen(4000);
app.listen(4000, function () {
    console.log("HTTP server running on port 4000");
});