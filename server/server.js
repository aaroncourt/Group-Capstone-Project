require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');
const socket = require('socket.io');


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

require('./config/mongoose.config');    
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/like.routes')(app);
require('./routes/picture.routes')(app);


//sets the port to a variable so socket can access
const server = app.listen(process.env.MY_PORT, () => console.log(`Listening on port:${process.env.MY_PORT} `) );

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log("socket.id " + socket.id);

    socket.on("Update_chat", (data) => {
        console.log("The payload: ", data);
        io.emit("Update_chat_likes", data);
    })
})