import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { JsonPipe } from "@angular/common";
import { Message } from 'src/models/Message';
import { User } from 'src/models/User';

@Component({
  selector: 'chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAppComponent implements OnInit {

  constructor(private socket: Socket, private cdr: ChangeDetectorRef) {}

  public currentUser: User;
  public usersList: User[] = [];
  public messages: Message[] = [];
  public selectedUser: User;

  ngOnInit() {
    this.initSocketListener();
  }

  private getUserNameById(userId: number) {
    const user = this.usersList.find(user => user.id === userId);
    return user ? user.name : "anonymous";
  }

  private initSocketListener() {
    this.socket.on("get users list", (users: string) => {
      this.usersList = [...JSON.parse(users)];
      this.cdr.markForCheck();
    });

    this.socket.on("get messages history", (messages: string) => {
      const historyMessages = [...JSON.parse(messages)];
      this.messages = historyMessages.map(message => {
        return {
          ...message,
          userName: this.getUserNameById(message.userId)
        };
      });
      this.cdr.markForCheck();
    });

    this.socket.on("message", (message: string) => {
      const msg = JSON.parse(message);
      this.messages = [
        ...this.messages,
        {
          ...msg,
          userName: this.getUserNameById(msg.userId)
        }
      ];
      this.cdr.markForCheck();
    });

    this.socket.on("user name added", (user: string) => {
      const newUser = JSON.parse(user);
      this.usersList = [
        ...this.usersList,
        {
          ...newUser,
          isCurrent: this.currentUser
            ? newUser.id === this.currentUser.id
            : false
        }
      ];
      this.cdr.markForCheck();
    });

    this.socket.on("my user added", (user: string) => {
      const createdUser = JSON.parse(user);
      this.currentUser = {
        ...createdUser,
        isCurrent: true
      };
    });
  }

  public handleName(name: string) {
    this.socket.emit("user name added", name);
  }

  public handleMessage(text: string) {
    const msg: any = {
      text,
      userId: this.currentUser.id
    };
    this.socket.emit("message", msg);
  }

  public handleUserSelect(user: User) {
    this.selectedUser = user;
  }

}
