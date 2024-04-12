const express = require("express")
require("./config/config")

const router = require('./routers/userRouter')

const app = express()
app.use(express.json())
app.use(router )
app.listen(process.env.PORT,()=>{
    console.log(`server is connected on port: ${process.env.PORT}`);
}) 