import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../shared/user';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const PHONE_RGEX_EXPRESSION = '[0-9]{10}';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fromBuilder: FormBuilder,
    private userProvider: UserProvider,
    private alertCtrl: AlertController) {

    this.registerForm = this.fromBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
        ]
      ],
      password: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20)
        ]
      ],
      name: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      mobileNumber: ['', [
          Validators.required,
          Validators.pattern(PHONE_RGEX_EXPRESSION)
        ]
      ],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
    * Displays an alert based on the error's message.
    * @param {any} errmess JSON with error generated by the API.
    */
  registerErrorHandler(errmess: any) {
    let registerErrorAlert = this.alertCtrl.create({
      title: 'Ups...',
      subTitle: errmess.message,
      buttons: ['Dismiss']
    });
    registerErrorAlert.present();
  }

  /**
    * Sends the information provided by the user to make a request
    * to register the user.
    */
  onSubmit() {
    let newUser: User = this.registerForm.value;
    this.userProvider.registerUser(newUser)
      .subscribe((resp) => {
        console.log(resp);
        if(resp.status === 200) {
          let registerSuccessAlert = this.alertCtrl.create({
            title: 'Yay!',
            subTitle: 'Registration succesfull.',
            buttons: ['Dismiss']
          });
          registerSuccessAlert.present();
          this.navCtrl.pop();
        }
      },
      errmess => this.registerErrorHandler(errmess) );
  }

}
