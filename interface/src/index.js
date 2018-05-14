import firebase from '@firebase/app';
import '@firebase/firestore';
import 'image.js';
import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import 'd3Skech.js';

// const coleccionDatosGenericos = 'datosGenericos';
// const documentosDatosGenericos = 'datos';

var config = {
  apiKey: 'AIzaSyA1W0B66TglY86WGLzAckB7K-XT8SxxVNk',
  authDomain: 'puertabiko.firebaseapp.com',
  databaseURL: 'https://puertabiko.firebaseio.com',
  projectId: 'puertabiko',
  storageBucket: 'puertabiko.appspot.com',
  messagingSenderId: '683112733184'
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const db = firebase.firestore();

class Valor extends React.Component {
  render() {
    return React.createElement('span', null, `${this.props.valor}`);
  }
}

const datosGenericosPuerta = () => {
  const refDatosGenericos = db.collection('datosGenericos').doc('datos');
  refDatosGenericos.onSnapshot(function(doc) {
    let datosTotales = doc.data();
    render(datosTotales.aperturasDiarias, 'puertaHoy');
  });
};
datosGenericosPuerta();

const valoresTotales = tipo => {
  const refDatos = db.collection('puertaBiko');
  return refDatos
    .orderBy(tipo, 'desc')
    .limit(1)
    .get()
    .then(({ docs }) => {
      return docs;
    });
};

const testIsma = () => {
  db
    .collection('puertaBiko')
    .where('timestamp', '>', '24-04-2018T16:00:00')
    .where('timestamp', '<', '24-04-2018T20:00:00')
    .get()
    .then(({ docs }) => {
      docs.map(doc => {
          console.log(doc);
      });
    });
};
testIsma();

Promise.all([valoresTotales('sonido'), valoresTotales('temperatura')]).then(
  values => {
    let valoresResSonido = values[0][0].data();
    let valoresResTemp = values[1][0].data();

    render(valoresResSonido.sonido, 'sonidoHoy');
    render(valoresResTemp.temperatura, 'temperaturaHoy');
  },
  reason => {
    console.log(reason);
  }
);

const render = (value, element) => {
  ReactDOM.render(
    React.createElement(Valor, { valor: value }, null),
    document.getElementById(element)
  );
};
