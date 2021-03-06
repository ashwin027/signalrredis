import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  connection: signalR.HubConnection;
  messages: Array<string> = new Array<string>();
  message: string;
  podName: string;

  ngOnInit(): void {
    this.startConnAndListen();
  }

  sendMessage(): void {
    try {
      this.connection.invoke("NewChatMessage", this.message);
      this.message = '';
    } catch (e) {
      console.error(e.toString());
    }
  }

  startConnAndListen(): void {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('/chatHub')
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.start().then(() => {
        this.connection.on("ChatMessageReceived", (message) => {
          setTimeout(() => {
            this.messages.push(message);
            this.messages = [...this.messages];
          }, 0);
          
        });
        this.connection.on("PodName", (podName) => {
          setTimeout(() => {
            this.podName = podName;
          }, 0);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
