import dotenv from "dotenv"
dotenv.config();

import { connectDb } from "./src/config/database.js";
import config from "../backend/src/config/environment.js"
import app from "./app.js";


const {PORT} = config;


const startServer = async()=>{
    try {
        await connectDb();


        app.listen(PORT,()=>{
            console.log(`Server connected on port ${PORT}`);
            
        })
    } catch (error) {
        console.log("error while connecting server");
        
    }
    


}
startServer();