const submit = document.getElementsByClassName("msger-send-btn")[0]

// var socket = io();
// socket.on('new_speech', function (data) {
//     const msgerInput = data.speech_text;
// //   console.log(msgerInput);

// //   const msgText = msgerInput
// //   if (!msgText) return;

// //   appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
// //   msgerInput.value = "";

// //   botResponse();
// // });


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


