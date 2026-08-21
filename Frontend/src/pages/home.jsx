import React, { useEffect, useState } from "react";
import axios from "axios"



function Home(){

    const [message, setMessage] = useState()

    const getMessage = async ()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/");
            setMessage(response.data.message)
        }
        catch (error){
            console.error(error)
            setMessage("Failed to connect Fastapi!")
        }
    }

    return (
        <div className="p-4">
            <h1>connect to fastapi</h1>
            <button onClick={getMessage} className="bg-green-400 h-8 w-20 rounded-2xl">Click</button>
            <p className="p-2 text-blue-500">{message}</p>
        </div>
    )
}


export default Home;