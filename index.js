import express from "express"
import mongoose from "mongoose"
import router from "./router.js"

const PORT = process.env.PORT || 8080
const DB_URL = 'mongodb+srv://user:user@cryptoexchange.kjgrk.mongodb.net/?retryWrites=true&w=majority&appName=Cryptoexchange'

const app = express()

app.use(express.json())
app.use('/api',router)

async function startApp() 
{
    try
    {
        await mongoose.connect(DB_URL)
        app.listen((PORT) ,() => console.log(`server started on PORT ${PORT}`))
    }
    catch(e)
    {
        console.log(e);
    }
    
}

startApp()

