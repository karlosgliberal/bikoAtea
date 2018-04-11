var config = {
  apiKey: "AIzaSyA1W0B66TglY86WGLzAckB7K-XT8SxxVNk",
  authDomain: "puertabiko.firebaseapp.com",
  databaseURL: "https://puertabiko.firebaseio.com",
  projectId: "puertabiko",
  storageBucket: "puertabiko.appspot.com",
  messagingSenderId: "683112733184"
};
firebase.initializeApp(config);

var db = firebase.firestore();

function setup(){
  createCanvas(100,100);
  background(0);
}

function draw(){
  ellipse(10,10,10,10);
}

db.collection("puertaBiko").onSnapshot(function(querySnapshot) {
  querySnapshot.forEach(function (documentSnapshot) {
    var data = documentSnapshot.data();
    console.log(data);
    $("#temperaturaExterior").html(data.temperatura);
    // do something with the data of each document.
  });
});

db.collection("datosGenericos").doc("datos")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        let datosTotales = doc.data();
        $("#accesosHoy").html(datosTotales.aperturasDiarias);
    });
