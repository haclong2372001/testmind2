const express = require('express')
const app = express()
const morgan = require('morgan')
const connectDb = require('./database/index')
const cors = require("cors")
const dotenv = require("dotenv")
const PORT =8001
const router = require('./routers')

dotenv.config()
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(router)
connectDb()
app.use(morgan("combined"))
app.listen(PORT,()=>{
    console.log('Server is listening on http://localhost:' + PORT)
})