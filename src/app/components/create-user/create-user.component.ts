import { Component, OnInit } from '@angular/core';
//
import {NewUser} from "../../interface-newUser"
import { Router } from '@angular/router'; // esto seria como el navigate de react
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  nombre:string="";
  nombreUsuario:string="";
  email:string="";
  password:string="";
  nuevoUsuario!:NewUser;
  errMsj!:string; // esto va contener el error que venga del back

  constructor( private router:Router , private authService :AuthService ) { }

  ngOnInit(): void {
  }

  createUser():void{ // funcion para crear un nuevo usuario
    const {nombre , nombreUsuario ,email ,password} = this ; // con destruturing traigo estas variables
    const arrayParametros = [nombre , nombreUsuario , email , password]; // va ser un array que va tener esos valores
    if(arrayParametros.includes("")){ //si en el array hay un string vacio
      return alert("Algunos de los campos estan vacios") // va retornar esta alerta
    }
    const user = {nombre , nombreUsuario , email ,password}; // creo un objeto que va tener esos campos y sus parametros
    // console.log(user)
    this.nuevoUsuario = user; //la variable "nuevoUsuario" que es la interface NewUser va ser igual al objeto que cree "user"
    // console.log(this.nuevoUsuario)
    this.authService.postNewUser(this.nuevoUsuario).subscribe(value =>{
      value=this.nuevoUsuario;
      alert("Usuario creado")
      this.router.navigate([""]) // vuelvo a esta ruta cuando se crea el usuario
    } , err =>{
      this.errMsj = err.error.mensaje;
      console.log(err.error);
      alert(this.errMsj) // va dar un alerta que son las que cree en el back
    })
  }

}
