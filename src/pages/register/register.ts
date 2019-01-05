import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';


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

  	constructor(
  		fb: FormBuilder,
  		private navCtrl: NavController
  	) {
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
    		let credentials = {
    			email: data.email,
    			password: data.password
    		};
    		this.auth.signUp(credentials).then(
    			() => this.navCtrl.setRoot(HomePage),
    			error => this.signupError = error.message
    		);
  }
}
