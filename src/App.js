import React, { Component } from 'react';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';
import './App.css';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyASRr9Un36HecJ4y84v5DMzAli4RMVGTgY",
    authDomain: "bloc-chat-react-e0a88.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-e0a88.firebaseio.com",
    projectId: "bloc-chat-react-e0a88",
    storageBucket: "bloc-chat-react-e0a88.appspot.com",
    messagingSenderId: "139421148139"
  };

  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}/>
      </div>
    );
  }
}

export default App;
