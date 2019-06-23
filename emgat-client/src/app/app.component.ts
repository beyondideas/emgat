import { Injectable, Component } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


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
 

  constructor(
    private _http: Http,
    ){}


  _username: string = "";
  get username(): string {
    return this._username;
  }
  set username(value: string) {
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
    this.currentUser({
      text: this.message,
      roomId: '19419373',
    });
    console.log('what is the current user', this.currentUser)

    return this._http.post("/api/sendMessage", this.currentUser)
      .map(result => {
        return result.json();
      })
  }

  addUserToRoom() {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
      }
    };
    const username = { 
      "username": this._username
    };
    console.log('this is this: ', username);

    return this._http.post('http://localhost:4200/users/', username)
      .map(result => {
        console.log('this s the result', result)
        return result.json();
      })
    
  }


  addUser() {
    this.addUserToRoom().subscribe((res)=> {
      console.log('this is the response', res)
    }, (err) => {
      console.log('this is the error', err)
    })
  }
}