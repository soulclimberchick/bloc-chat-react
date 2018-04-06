import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import * as firebase from 'firebase';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyASRr9Un36HecJ4y84v5DMzAli4RMVGTgY',
  authDomain: 'bloc-chat-react-e0a88.firebaseapp.com',
  databaseURL: 'https://bloc-chat-react-e0a88.firebaseio.com',
  projectId: 'bloc-chat-react-e0a88',
  storageBucket: 'bloc-chat-react-e0a88.appspot.com',
  messagingSenderId: '139421148139'
};

firebase.initializeApp(config);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {activeRoom: ''};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom (room) {
    this.setState({ activeRoom: room });
  }

  render () {
    const showMessages = this.state.activeRoom;
    return (
      <div>
        <h1>{this.state.activeRoom.name || 'Select A Room'}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>
        : null
        }
      </div>
    );
  }
}

export default App;
