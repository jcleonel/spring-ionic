import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipoCliente : ['', [Validators.required]],
        cpfOuCnpj : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['', [Validators.required]],
        logradouro : ['', [Validators.required]],
        numero : ['', [Validators.required]],
        complemento : ['', []],
        bairro : ['', []],
        cep : ['', [Validators.required]],
        telefone1 : ['', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoID : [null, [Validators.required]],
        cidadeID : [null, [Validators.required]] 
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response =>{
        this.estados = response;
        this.formGroup.controls.estadoID.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoID;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeID.setValue(null);
      },
      error => {});
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {}
    );
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}


