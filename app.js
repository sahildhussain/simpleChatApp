const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/',(req, res) => {
    res.render('index')
})

server = app.listen(3000)

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('New user Connected')
    
    socket.username = 'Anonymous'

    //received from chat.js
    socket.on('change_username', (data)=>{
        console.log(data.username)
        socket.username = data.username
    })

    socket.on('new_message', (data)=>{
        //Broadcasting message
        io.sockets.emit('new_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', (data) => {
        //broadcasting to all sockets except self
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})