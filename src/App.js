import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestone'
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectonData} from 'react-firebase-hooks/firestone';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { signOut } from 'firebase/auth';
firebase.initializeApp({
 
    apiKey: "AIzaSyDHjIxUBFgfkVZHk-5U-VdPLqbkHmpYnpo",
    authDomain: "domfatherdevs-chat.firebaseapp.com",
    projectId: "domfatherdevs-chat",
    storageBucket: "domfatherdevs-chat.appspot.com",
    messagingSenderId: "83137515878",
    appId: "1:83137515878:web:0d14a983482e4a7f35f8a7",
    measurementId: "G-TTW3X92E5R",
});
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <>
    <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
     </div>
    <div className="App">
      <header className="App-header">
   
      </header>
    <section>
      {user ? <ChatRoom /> : <SignIn />}
    </section>
    </div>
    </>
  );
}

function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function signOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {IdField: 'id'});

}
function ChatMessage(props) {
  const { text, uid } = props.message;
  return<p>text</p>
}
export default App;
