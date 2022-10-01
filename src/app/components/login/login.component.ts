import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // esto seria como el navigate de react
import{LoginUser} from "../../interface-login";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUser; // como no va estar inicializado le pongo un singo de admiracion
  nombreUsuario: string =""
  password : string = ""
  roles: string[] = [];
  errMsj!: string; // esto va contener el error que venga del back


  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenService.getUserName())
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): any{
    const {nombreUsuario , password} = this;
    const login = {nombreUsuario , password} ;
    this.loginUsuario = login;
    console.log(this.loginUsuario)
    this.authService.postLogin(this.loginUsuario).subscribe(data =>{
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      alert("Ingreso con exito")
      return this.router.navigate(['tasks'])// navego a la ruta "/tasks" que es el componente task2.componets
    }, err =>{
      this.isLogged = false;
      this.isLogginFail = true;
      this.errMsj = err.error.msg ; // err.error.msg es donde esta el string con el error
      console.log(err.error); // veo en formato de objeto los errores
      if(this.errMsj){
        return alert(this.errMsj);
      }
      return alert("Usuario o contraeña es incorrecto")
      // return alert(this.errMsj === undefined && err.error.message === "Bad credentials" ? "La contraseña es incorrecta" : this.errMsj) 
      // alert(err.error.message)
    })
  }

}
