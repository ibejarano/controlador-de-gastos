require('dotenv').config();

let PORT;

if(process.env.PORT){
    PORT = process.env.PORT;
}

module.exports = {
    PORT
}
