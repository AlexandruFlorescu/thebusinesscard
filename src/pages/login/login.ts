import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   loading: Loading;
   form: FormGroup;
   registerCredentials = { email: '', password: '' };

   constructor(private nav: NavController, private fb: FormBuilder, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController)
   {
   		this.form = fb.group({
   			email: ['', Validators.compose([Validators.required, Validators.email])],
   			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
   		});
  }

   public createAccount() {
     this.nav.push(RegisterPage);
   }

   public login() {
     this.showLoading()
     let user = this.auth.signInWithEmail(this.registerCredentials)
     console.log(user);
     if (user) {
       this.nav.setRoot(HomePage);
     } else {
       this.showError("Access Denied");
     }

   }

   showLoading() {
     this.loading = this.loadingCtrl.create({
       content: 'Please wait...',
       dismissOnPageChange: true
     });
     this.loading.present();
   }

   showError(text) {
     this.loading.dismiss();

     let alert = this.alertCtrl.create({
       title: 'Fail',
       subTitle: text,
       buttons: ['OK']
     });
     alert.present();
   }
}
