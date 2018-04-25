import firebase from '@firebase/app';
import '@firebase/firestore';
import 'image.js';
import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

var config = {
	apiKey:'AIzaSyA1W0B66TglY86WGLzAckB7K-XT8SxxVNk',
	authDomain:'puertabiko.firebaseapp.com',
	databaseURL:'https://puertabiko.firebaseio.com',
	projectId:'puertabiko',
	storageBucket:'puertabiko.appspot.com',
	messagingSenderId:'683112733184'
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
const db = firebase.firestore();

class Valor extends React.Component {
	render() {
		return React.createElement('span', null, `${this.props.valor}`);
	}
}


const valoresHoy = tipo => {
	const refDatos = db.collection('puertaBiko');
	return refDatos.orderBy(tipo, 'desc')
	.limit(1)
	.get()
	.then(({ docs }) => {
		return docs;
	});
};


Promise.all([valoresHoy('sonido'), valoresHoy('temperatura')]).then(values => {
	let valoresResSonido = values[0][0].data();
	let valoresResTemp = values[1][0].data();
	console.log(valoresResTemp);
	render(valoresResSonido.sonido, 'sonidoHoy');
	render(valoresResTemp.temperatura, 'temperaturaHoy');

}, reason => {
	console.log(reason);
});

const render = (value, element) => {
	ReactDOM.render(
		React.createElement(Valor, {valor: value}, null),
		document.getElementById(element)
	);
};

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		console.log('log');
	}
};
