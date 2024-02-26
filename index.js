// create app
const express = require('express')
const app = express()

// port find
require('dotenv').config()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})) 
// db connection
const dbConnect = require('./config/db')

// coudniary connection
const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect()
// add middleware

// api route mount
const Upload = require('./route/FileUpload')
app.use('/api/v1/upload',Upload)

// activate server
app.listen(PORT,()=>{
    console.log(`App listen Port no ${PORT}`);
})
dbConnect()
