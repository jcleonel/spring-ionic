import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService,
    public loadingCtrl: LoadingController) {
  
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.loading();
    let user = this.storage.getLocalUser();
    if (user !== null) {
      this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');        
      },
      error => {});
    }
   
  }

  loading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 3000
    });
    loader.present();
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');        
      },
      error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}


