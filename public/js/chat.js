const btn = document.getElementById("btn")
socket.emit("joinChat", ROOM_ID)
btn.addEventListener("click", () => {
    var contents = document.getElementById("chat_contents")
    socket.emit("chat", ROOM_ID, contents)
})

socket.on("new chat", contents => {
    console.log(contents);
})