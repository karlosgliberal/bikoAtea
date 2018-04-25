import firebase from '@firebase/app';
import '@firebase/firestore';
import 'image.js';
import './scss/style.scss';

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

db.collection('puertaBiko')
  .orderBy('temperatura', 'desc')
  .limit(1)
  .get()
  .then(({ docs }) => {
    console.log(docs[0].data());
});
