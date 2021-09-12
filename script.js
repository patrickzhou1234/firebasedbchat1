msginput = document.getElementById("msginput");
username = document.getElementById("username");
msgs = document.getElementById("msgs");
const firebaseConfig = {
    apiKey: "AIzaSyAuJP9dHW-tGeIflY-7PDj7etdgtAWcLqw",
    authDomain: "database1-50200.firebaseapp.com",
    databaseURL: "https://database1-50200-default-rtdb.firebaseio.com/",
    storageBucket: "database1-50200.appspot.com",
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendmsg() {
  db.ref("messages/"+new Date().toLocaleTimeString()).set({
      msg: username.value+": "+msginput.value
  });
  msginput.value = "";
}

function welc() {
  db.ref("messages/"+new Date().toLocaleTimeString()).set({
      msg: "Bot🤖: Welcome to the chat "+username.value+". "
  });
  username.style.display = "none";
  document.getElementById("submituser").style.display = "none";
  msginput.style.display = "block";
  document.getElementById("chatbtn").style.display = "block";
}

function checkinput(event, element) {
  if (event.keyCode == "13") {
    if (element == "msginput") {
      sendmsg();
    } else {
      welc();
    }
  }
}

const fetchChat=db.ref("messages/");
fetchChat.on("child_added",function(snapshot){
  const message = snapshot.val();
  msgs.innerHTML += message.msg+"<br>";
});
