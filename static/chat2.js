const submit = document.getElementsByClassName("msger-send-btn")[0]

function ws_event() {
  submit.addEventListener("click", function () {
    var socket = io();
    // socket.on('connect', function (data) {
    //   socket.emit('my event', { data: 'I\'m connected!' });
    // });
    socket.on('connect', function () {
      socket.emit("speech_detected", { data: 'I\'m connected!' })
    });

  })
}

ws_event()


