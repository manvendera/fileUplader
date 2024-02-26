const { Code } = require('mongodb');
const File = require('../models/File')
const cloudinary = require('cloudinary').v2

// localfile upload => handler function
exports.localFileUpload = async (req, res) => {
    try {
        // fetch filefrom request
        const file = req.files.file;
        console.log("file name", file);
        // create path where file need to be stored on server
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('PATH', path);
        // add path to the  move function
        file.mv(path, (err) => {
            console.log(err);
        })
        res.json({
            success: true,
            message: "Loacl file upload successful"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error found in server"
        })
        console.log(error);
    }
}



// image upload handler
function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type)
}
async function uploadFileToCloudinary(file, folder) {
    const options = { folder }
    console.log("temp-file",file.tempFilePath);
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, email, tags } = req.body;
        console.log(name, email, tags);
        const file = req.files.imageFile
        console.log(file);
        // validation


        const supportedType = ['jpj', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type=>", fileType);
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supported"
            })
        }
        // file formate will be supported the we upload cloudinary
        console.log('codehelp');
        const response = await uploadFileToCloudinary(file, 'Codehelp')
        console.log(response);
        // enery save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "image SuccessFuly Uploaed"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "wong"
        })
    }
}



// vide upload handler
exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body
        console.log(name, tags, email);
        const file = req.files.videoUrl

        const supportedType = ['mp4', 'mov',]
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type=>", fileType);
        // todo add a upper limit of 5mb for video
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supported"
            })
        }
        // if file supported the upload the video on cloudinary
        console.log('codehelp');
        const response = await uploadFileToCloudinary(file, 'Codehelp')
        console.log(response);
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            // videoUrl: response.secure_url,
            message: "video SuccessFuly Uploaed"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "some thing went wrong"
        })
    }
}