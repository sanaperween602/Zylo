export default async function({
    params
}:{
    params:Promise<{
        slug:string
    }>;
}){
    const slug = (await params).slug;
    return (
        <div>
            <h1>Welcome to Zylo!</h1>
            <p>Room ID:{slug}</p>
        </div>
    )
}



