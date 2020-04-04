require('dotenv').config();

let PORT;

if(process.env.PORT){
    PORT = process.env.PORT;
}

module.exports = {
    PORT,
    MONGO_URI: process.env.MONGO_URI
}
