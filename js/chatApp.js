var config = {
    apiKey: "AIzaSyAqrn-aemqCFbI5sJNAWiRLUMJ3KJY4NYI",
    authDomain: "caleo-34532.firebaseapp.com",
    databaseURL: "https://caleo-34532.firebaseio.com",
    storageBucket: "caleo-34532.appspot.com",
    messagingSenderId: "448149338883"
};
firebase.initializeApp(config);

const {nombre, foto, userId} = JSON.parse(localStorage.getItem('usuario'))
const db = firebase.database();

// $('body').mouseleave(function (){
//   console.log('out')
// })
// $('body').mouseenter(function (){
//   console.log('in')
// })

$('#port').text('Hello ' + nombre + ', Welcome to Caleo Chat');

writeUserData(nombre, foto, userId);

function writeUserData(nombre, foto, userId) {
    db.ref('/users/' + userId).set({nombre: nombre, foto: foto, userId: userId})
}

db.ref('/users/').on('child_added', snapshot => {
    const nombre = snapshot.val().nombre;
    const foto = snapshot.val().foto;
    const userId = snapshot.val().userId;
    if(userId){
      imagenId(foto, nombre, userId);
    }else{
      db.ref('/users/' + userId).remove();
      $(`#${userId}`).remove();
    }
})


db.ref('/messages').on('child_added', snapshot => {
    const {haveText, foto, nombre} = snapshot.val()
    displayChatMessage(haveText, foto, nombre);
})


$("#tableText").keypress(function fpress(e) {
    if (e.which == 13) {
        send();
    }
});
function displayChatMessage(haveText, foto, nombre) {
    $('#textSended').append(`

        <div class='contenedor'>
          <div class='img-name'>
            <img class='idPhoto' src="${foto}" height=20px width=20px/>
            <h4>&nbsp;&nbsp;${nombre}:&nbsp;</h4>
          </div>
          <div class='menssage bubble'>
          <p>
            ${haveText}
            </p>
          </div>
        </div>`);
    $('#textSended')[0].scrollTop = $('#textSended')[0].scrollHeight;
}
function imagenId(foto, nombre, userId) {
    $('#image').append(`<div class='imgLogo' id=${userId}><img class='idPhoto' src="${foto}" alt="" height=50px width=50px/><div class='contTextImg'><img class ='writing isWriting' src='http://findicons.com/files/icons/129/soft_scraps/128/pen_green_01.png' width='10px' heigth='10px'><p>${nombre}<p></div></div>`);
}

$('#logout').click(function() {
    localStorage.clear()
    db.ref('/users/' + userId).remove();
    $(`#${userId}`).remove();
    window.location.replace('index.html');
})
$("#button-send").click(function fclick () {
    send();
})

function send() {
  var haveText = $('#tableText').val();
    if (haveText === '') {
        return alert('write something');
    }else{
      $('#tableText').val("");
      db.ref('/messages').push({haveText, foto, nombre});
    }
}

$("hr").click(function() {
    $("#image").css("width", "200px");
    $("#image").css("visibility", "visible");
})
$("#image").click(function() {
    $("#image").css("width", "0");
    $("#image").css("visibility", "hidden");
})

writing();

function writing (){
  $( "#tableText" ).keyup(function() {
    var textos = $('#tableText').val();
    if(textos != ''){
      $(`#${userId} .writing`).removeClass('isWriting');
    }else{
      $(`#${userId} .writing`).addClass('isWriting');
    }
  });
}
