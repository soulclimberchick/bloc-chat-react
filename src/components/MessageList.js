import React, { Component } from 'react';

export class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = { username: '', content: '', sentAt: '', roomId: '', messages: []};
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.state.roomId
    });
    this.setState({ username: '', content: '', sentAt: '', roomId: '' });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  setTime(time) {
    const format = new Date(time);
    const newTime = String(format);
    return newTime;
  }

  render() {
    const activeRoom = this.props.activeRoom;
    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type='text' value={this.state.content} placeholder='Enter Message' onChange={this.handleChange} />
        <input type='submit' value='Send' />
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>{message.username}: {message.content} on {this.setTime(message.sentAt)}</li>
        }
        return null;
      })
    );

    return (
      <div>
        <div>{messageBar}</div>
        <div>{messageList}</div>
      </div>
    );
  }
}

export default MessageList;
