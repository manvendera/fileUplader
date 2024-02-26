const mongoose = require('mongoose')

require('dotenv').config()
const API = process.env.DATABASE_URL
const dbConnect = async () => {
    try {
        mongoose.connect(API, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
      
          })
            .then(() => {
                console.log(`database connect successfult`);
            })
            .catch((error) => {
                console.log(`databse can't connected successfuly`);
                console.log(error);
                process.exit(1)
            })
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = dbConnect