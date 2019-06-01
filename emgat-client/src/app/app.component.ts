import { Component } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Chatroom';
  messages = [];
  users = [];
  currentUser: any;

  _username: string = "";
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    console.log('when does this get set', value)
    this._username = value;
  }

  _message: string = '';
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  sendMessage() {
    const { message, currentUser } = this;
    currentUser.sendMessage({
      text: message,
      roomId: '19419373',
    });
    this.message = '';
  }

  addUser() {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
      }
    };
    const username = { 
      "username": this._username
    };
    console.log('this:',this)
    console.log('this is this: ', username);
    axios.post('http://localhost:8080/users', username, axiosConfig)
      .then(() => {
        console.log('does this work')
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:8080/authenticate'
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:66d5095f-98c1-4fe5-a905-44bf16127d01',
          userId: username,
          tokenProvider
        });

        return chatManager
          .connect()
          .then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: '19419373',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.messages.push(message);
                },
                onPresenceChanged: (state, user) => {
                  this.users = currentUser.users.sort((a, b) => {
                    if (a.presence.state === 'online') return -1;

                    return 1;
                  });
                },
              },
            });

            this.currentUser = currentUser;
            this.users = currentUser.users;
          });
      })
        .catch((error) => {


          console.error('this error', error)
        })
  }
}