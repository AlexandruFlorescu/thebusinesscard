import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  	signupError: string;
  	form: FormGroup;
    registerCredentials = { email: '', password: '' };

  	constructor(fb: FormBuilder, private navCtrl: NavController, private auth: AuthService) {
  		this.form = fb.group({
  			email: ['', Validators.compose([Validators.required, Validators.email])],
  			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  		});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  register(){
    let data = this.form.value;

    		this.auth.signUp(this.registerCredentials).then(
    			() => this.navCtrl.setRoot(HomePage),
    			error => this.signupError = error.message
    		);
  }
}
