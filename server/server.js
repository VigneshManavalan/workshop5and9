const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const User = require("./Models/Users")
const cors = require("cors")
const connectToDatabase = () => {
    const mongoDB = 'mongodb://127.0.0.1:27017/users';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error',()=>{console.log("Error")});
    db.once('open', () =>{
        console.log("Successfully connected to Records DB");
    });
}
app.use(bodyParser.json())
app.use(cors())
app.post("/user",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userToInsert = new User({
        email,
        password
    })

    userToInsert.save().then(data=>{
        console.log(data)
        res.json(data._id)}
        
        
        )
})

app.post("/user/login",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userByEmail = await User.findOne({email:email})
    if(userByEmail!=null){
        if(userByEmail.password==password){
        res.json({logged:true})}
        else{
            res.status(403).json({logged:false})
        }
    }
    else{
        res.status(403).json({logged:false})
    }
})
app.listen(5000)
connectToDatabase()