var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var http = require('http').Server(app);
var server = app.listen(3000, () => {
    console.log("server is running on port", server.address().port);
});
var io = require('socket.io').listen(server);
var Schema = mongoose.Schema;
// var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/simple-chat'
// http://localhost:27017/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var dbUrl = "mongodb://admin:admin@localhost:27017/admin";

io.on('connection', () =>{
 console.log('a user is connected')
})

mongoose
    .connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to mongoose");
    })
    .catch(err => {
        console.log("error", error);
    });

var Message = mongoose.model("Message", new Schema({
            name: String,
            message: String
        }));
app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

app.use(express.static(__dirname));
