import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatAppComponent } from './components/chat/chat-app/chat-app.component';
import { LoginComponent } from './components/common/login/login.component';
import { SignupComponent } from './components/common/signup/signup.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'chat',
    component: ChatAppComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// //TODO: Need to remove this section
// declare module "@angular/core" {
//   interface ModuleWithProviders<T = any> {
//       ngModule: Type<T>;
//       providers?: Provider[];
//   }
// }
