import express, { Router } from "express"
import bootstrap from "./Src/index.route.js"
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
const app = express()





bootstrap(app,express)


// you Need to install sha256 and axios and import both inside js or by script tag
// sha256 from https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js
//axios from https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})