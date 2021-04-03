import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatAppComponent } from './components/chat/chat-app/chat-app.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { ChatNamePopupComponent } from './components/chat/chat-name-popup/chat-name-popup.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { MessageComponent } from './components/chat/message/message.component';
import { UsersListComponent } from './components/chat/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { AuthService } from './_services';
import { AuthGuard } from './_helpers/auth-guard/auth-guard.service';
import { httpInterceptorProviders } from './_helpers/http-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/common/login/login.component';
import { SignupComponent } from './components/common/signup/signup.component';
import { EditUserComponent } from './components/common/edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';


const config: SocketIoConfig = { url: "http://localhost:4200", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatAppComponent,
    ChatInputComponent,
    ChatNamePopupComponent,
    ChatWindowComponent,
    MessageComponent,
    UsersListComponent,
    LoginComponent,
    SignupComponent,
    EditUserComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [AuthService, AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

//TODO: Need to remove this section
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
