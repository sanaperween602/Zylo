"use client";
export function Authpage({isSignin}:{
    isSignin: boolean
}){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2">
                <input placeholder="Email" type="Email"></input>
            </div>
            <div className="p-2">
            <input placeholder="password" type="password"></input>
            </div>
            <div>
             <button onClick={()=>{
                }}>{isSignin ? "signin " : "signup"}</button>
            </div>

        </div>

    </div>
}
