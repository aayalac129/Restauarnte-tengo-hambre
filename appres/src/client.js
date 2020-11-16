import * as sapper from '@sapper/app';
import firebase from 'firebase/app'
import 'firebase/firestore'

sapper.start({
	target: document.querySelector('#sapper')
});

var firebaseConfig = {
        apiKey: "AIzaSyAUHuHpw9_UaZzpEXFps5vZIXhkxF0ja9M",
        authDomain: "pro-restaurante.firebaseapp.com",
        databaseURL: "https://pro-restaurante.firebaseio.com",
        projectId: "pro-restaurante",
        storageBucket: "pro-restaurante.appspot.com",
        messagingSenderId: "422665383700",
        appId: "1:422665383700:web:b8cc22693f4f7b5e6d9c01"
      };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



  

