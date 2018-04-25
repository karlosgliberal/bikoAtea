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
let angle = 0;
function setup(){
  createCanvas(100,100);
  background(0);
}

function draw(){
  angle += 0.02;
  background(127+127*sin(angle));
}

db.collection("puertaBiko")
.orderBy('sonido', 'desc')
.limit(1)
.get()
.then(({ docs }) => {
  console.log(docs[0].data());
})

db.collection("puertaBiko")
.orderBy('temperatura', 'desc')
.limit(1)
.get()
.then(({ docs }) => {
  console.log(docs[0].data());
})

var barChartData = [];
var valores = []
db.collection("puertaBiko").onSnapshot(function(querySnapshot) {
  querySnapshot.forEach(function (documentSnapshot) {
    var data = documentSnapshot.data();
    valores.push();
    barChartData.push({lable:data.timestamp, value:{time:data.timestamp, temperatura:data.temperatura, sonido:data.sonido}});
    // $("#temperaturaExterior").html(data.temperatura);
  });
});

db.collection("datosGenericos").doc("datos")
.onSnapshot(function(doc) {
  let datosTotales = doc.data();
  $("#accesosHoy").html(datosTotales.aperturasDiarias);
});
