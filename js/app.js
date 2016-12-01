
  var config = {
    apiKey: "AIzaSyAqrn-aemqCFbI5sJNAWiRLUMJ3KJY4NYI",
    authDomain: "caleo-34532.firebaseapp.com",
    databaseURL: "https://caleo-34532.firebaseio.com",
    storageBucket: "caleo-34532.appspot.com",
    messagingSenderId: "448149338883"
  };
  firebase.initializeApp(config);
 var twitter = new firebase.auth.TwitterAuthProvider();
 var facebook = new firebase.auth.FacebookAuthProvider();
 var google = new firebase.auth.GoogleAuthProvider();
 $( ".btn" ).hover(
  function() {
    $( this ).addClass( "animated pulse" );
  }, function() {
    $( this ).removeClass( "animated pulse" );
  }
);
 $(".btn").click(function(){
     var name = $(this).attr('name');
     firebase.auth().signInWithPopup(valor(name)).then(function(result) {
       console.log(result.user);
       exito(result.user);
     }).catch(function(error) {
  ;
       console.log(error);
     });

})


  function exito(data){
    console.log(data.displayName,data.photoURL, data.uid )
    var usuario = {nombre: data.displayName, foto: data.photoURL, userId: data.uid}
    localStorage.setItem('usuario', JSON.stringify(usuario))
    window.location.replace('app.html');

  }


function valor (x){
  if(x === 'facebook'){
    return facebook;
  }else if (x === 'twitter'){
    return twitter;
  }else{
    return google;
  }
}
