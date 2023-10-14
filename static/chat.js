const msgerForm = get(".msger-inputarea");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "User";

// --ソケットここから--
// var socket = io.connect('http://localhost:8000/socket.io/socket.io.js');
// socket.on('new_speech', function(data) {
//   const msgerInput = data.speech_text;
//   console.log(msgerInput);

//   const msgText = msgerInput
//   if (!msgText) return;

//   appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
//   msgerInput.value = "";

//   botResponse();
// });
// --ソケットここまで--

function send_to_python() {
    var send_data = $("#sample_text").val();
    $.ajax("/call_from_ajax", {
        type: "post",
        data: {"data": send_data},              // 連想配列をPOSTする
    }).done(function(received_data) {           // 戻ってきたのはJSON（文字列）
        var dict = JSON.parse(received_data);   // JSONを連想配列にする
        // 以下、Javascriptで料理する
        var answer = dict["user_input"];
        appendMessage(PERSON_NAME, PERSON_IMG, "right", answer);
        msgerInput.value = "";
    }).fail(function() {
        console.log("失敗");
    });
};


function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
