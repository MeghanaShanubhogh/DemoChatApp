var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose');

app.use(express.static(__dirname,{index: 'login.html'}));
/// setting up static html - __dirname - all files in dirctory and listen in 4000 port
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

var dbUrl = "mongodb+srv://myst:myst@cluster0.vgsrp5a.mongodb.net/?retryWrites=true&w=majority";

var Message = mongoose.model('Message',{
    name:String,
    Actor:String
});

app.get('/messages',async (req,res)=>{ 
    
    try{
        messages = await Message.find({});
        console.log(res.statusCode);
        res.send(messages);
        
        //res.sendStatus(200);
    }
    catch(err)
    {
        console.log("cannot find msgs "+err);
    }
});
app.get('/messages/:name',async (req,res)=>{ 
    
    try{
        user = req.params.name;
        messages = await Message.find({name:user});
        console.log(res.statusCode);
        res.send(messages);
        //res.sendStatus(200);
    }
    catch(err)
    {
        console.log("cannot find msgs "+err);
    }
});

app.post('/messages',(req,res)=>{
    saveMongoDB(req.body);
    console.log(req.body);
    io.emit('message',req.body);  
});

io.on('connection',(socket)=>{
    console.log('user Connected');
});

async function mongooseConnect()
{
    try{
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    }
    catch(err)
    {
      console.log("Error connecting to mongoDb "+err);   
    }
}
async function saveMongoDB(requestBody)
{
    try{
            var mess = new Message(requestBody);
            await mess.save();
        }
        catch(err)
        {
            console.log("error saving to DB");
        } 
}
mongooseConnect();

let server = http.listen(4000,()=>{
    console.log("Server is running on port "+server.address().port);
});
