import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatNamePopupComponent } from './chat-name-popup/chat-name-popup.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageComponent } from './message/message.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";


const config: SocketIoConfig = { url: "http://localhost:4200", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatAppComponent,
    ChatInputComponent,
    ChatNamePopupComponent,
    ChatWindowComponent,
    MessageComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
