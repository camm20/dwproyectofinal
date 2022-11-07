import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MarcajeComponent } from './components/marcaje/marcaje.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';

const routes: Routes = [
  {
    path: '',
    component : LoginComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'login',
    component : LoginComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'marcaje',
    component : MarcajeComponent,
    canActivate : [AfterLoginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
