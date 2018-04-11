import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
    this.state = {activeRoom: '', user: null };
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  activeRoom (room) {
    this.setState({ activeRoom: room });
  }

  setUser (user) {
    this.setState({ user: user });
  }

  render () {
    const showMessages = this.state.activeRoom;
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div>
        <h1>{this.state.activeRoom.name || 'Select A Room'}</h1>
        <User firebase={firebase} setUser={this.setUser} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key } user={currentUser} />)
        : null
        }
      </div>
    );
  }
}

export default App;
