import {NextFunction , Request ,Response} from "express";
import JWT from "jsonwebtoken";
// @ts-expect-error backend-common/config does not currently provide TypeScript declarations.
import {JWT_SECRET} from "@repo/backend-common/config";
export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
//@ts-ignore
   const decoded = JWT.verify(token, JWT_SECRET);
  if(decoded.userId){
   //@ts-ignore
         req.userId=decoded.userId;
         next();
   }else{
    res.json({
        message:"unauthorized"
    })
   }

}