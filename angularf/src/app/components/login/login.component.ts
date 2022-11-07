import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  }

  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  constructor(private backend: BackendService, private token: TokenService, private router: Router, private Auth: AuthService) { }
  public error = null;
  ngOnInit(): void {
    this.googleAuthSDK();
  }
  submitLogin() {
    //console.log(this.form);
    return this.backend.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    console.log(data);
    this.token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.Auth.setUid(data.user.id);
    this.Auth.autoLogout(data.expires_in);
    this.router.navigateByUrl('/marcaje');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }







  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs
        let profile = googleAuthUser.getBasicProfile();
        let datal = {
          token: googleAuthUser.getAuthResponse().id_token,
          id: profile.getId(),
          name: profile.getName(),
          image: profile.getImageUrl(),
          email: profile.getEmail(),
          password:''
        };
        /*let form_data = new FormData();

        for ( let key in datal ) {
          form_data.append(key, datal[key]);
        }*/

        console.log(datal);
        return this.backend.loginoauth(datal).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );

        /*console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());*/

      }, (error: any) => {
        console.log(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '215664618326-3uj4s60macp523354j1tgfbk7tpnae45.apps.googleusercontent.com',
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }




}
