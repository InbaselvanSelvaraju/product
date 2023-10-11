const app =  require('./app')

const mongoose = require("mongoose");



const DB = "mongodb://127.0.0.1/e-com-app";                     

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

mongoose.connect(DB).then(() => console.log("Db connection successful"));


const port = 4000

const server = app.listen(port,()=>{
    console.log(`App running on port ${port}`);
})