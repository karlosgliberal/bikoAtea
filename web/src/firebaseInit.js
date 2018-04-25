
import firebase from '@firebase/app';
import '@firebase/firestore';

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
export default function firebaseInit() {
	return db;
}
