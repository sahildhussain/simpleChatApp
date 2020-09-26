$(function() {
	var socket = io.connect("http://localhost:3000")

	//button and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var change_username = $("#change_username")
	var chatroom = $("#chatroom")

	//Emit message
	send_message.click(() => {
		socket.emit("new_message", { message: message.val() })
	})

	//Listen Message
	socket.on("new_message", data => {
		console.log(data)
		chatroom.append(
			"<p class='message'>" + data.username + " : " + data.message + "</p>"
		)
	})

	//Emit a username
	change_username.click(() => {
		console.log("Hi")
		socket.emit("change_username", { username: username.val() })
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
})
