const express = require('express');
const app = express();

const Chat = require('./models/chats.js')

const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const path = require('path');
app.use(express.static(path.join(__dirname,"public")));
path.join('views',(__dirname,'/views'));

main().then(()=>{
    console.log("Connection Successful");
}).catch(err =>{
    console.log(err);
})


app.set("view engine",'ejs');

app.listen(8080,()=>{
    console.log("Server is listening to port: 8080");
})

app.get("/",(req,res)=>{
    res.send("Hi There!!!");
})

app.get("/chats",async (req,res)=>{
    let allChats = await Chat.find();
    res.render("index.ejs",{allChats});
})

const chat1 = new Chat({
    from:"Nikhil",
    to:"Shikha",
    message:"Hola!!",
    created_at: new Date()
})

// chat1.save().then((data)=>{
//     console.log(data);
// })
