import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { CpfCnpjValidator } from 'src/app/validators/cpf-cnpj/cpf-cnpj.validator';
import { DateValidator } from 'src/app/validators/date/date.validator';

import { MessageService } from 'src/app/components/message/service/message.service';
import { UserService } from 'src/app/users/service/user.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;

  cpf!: number;
  cep!: number;
  address!: string;
  state!: string;
  city!: string;
  district!: string;
  number!: number;
  complement!: string;

  position!: string;
  administrator: boolean = false;
  date_of_birth!: Date;

  form!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  module = 'Usuário';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private _location: Location
  ) { }

  async ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.breadcrumbAction = this.isAddMode ? 'Cadastrar' : 'Editar';

    this.form = this.formBuilder.group({
        first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.minLength(11), CpfCnpjValidator.validate]],
        cep: ['', [Validators.required, Validators.minLength(8)]],
        address: ['', [Validators.required, Validators.maxLength(80)]],
        state: ['', [Validators.required, Validators.maxLength(2)]],
        city: ['', [Validators.required, Validators.maxLength(50)]],
        district: ['', [Validators.required, Validators.maxLength(50)]],
        number: ['', [Validators.required, Validators.maxLength(10)]],
        complement: ['', Validators.maxLength(20)],
        position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        administrator: ['', Validators.required],
        date_of_birth: ['', [Validators.required, DateValidator.validate]],
    });

    if (!this.isAddMode) {
      await this.userService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          if (x.date_of_birth) {
            const [day, month, year] = x.date_of_birth.split('/');
            x.date_of_birth = `${day}${month}${year}`;
          }
          
          this.form.patchValue(x);
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.isAddMode ?  this.create() : this.update();
  }

  private create() {
    let formData = this.formData(this.form.value);
    this.userService.create(formData)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' cadastrado com sucesso');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  private update() {
    let formData = this.formData(this.form.value);
    this.userService.update(this.id, formData)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' atualizado com sucesso.');
      })
      .add(() => this.loading = false);
  }

  private formData(values: any): any 
  {
    values.date_of_birth = this.dateToString(values.date_of_birth);
    return values;
  }

  private dateToString(date: string): string 
  {
    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4);

    return `${year}-${month}-${day}`;
  }

  backClicked() {
    this._location.back();
  }

  changeCep(event: Event){
    let cep = (<HTMLInputElement>event.target).value;
    if(cep.length == 9){
      this.userService.getAddressByCep(cep)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.form.patchValue({
              address: data.logradouro,
              city: data.localidade,
              district: data.bairro,
              state: data.uf,
            });
          },
          error => {
            this.messageService.error(error);
          }
        );
    }
  }

}