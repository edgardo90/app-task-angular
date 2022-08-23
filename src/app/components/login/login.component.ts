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
  loginUsuario!: LoginUser;
  nombreUsuario: string =""
  password : string = ""
  roles: string[] = [];
  errMsj!: string;


  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    const {nombreUsuario , password} = this;
    // this.loginUsuario.nombreUsuario = nombreUsuario;
    // this.loginUsuario.password = password;
    const login = {nombreUsuario , password}
    this.loginUsuario = login;
    console.log(this.loginUsuario)
    this.authService.postLogin(this.loginUsuario).subscribe(data =>{
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['tasks'])// navego a la ruta "/tasks" que es el componente task2.componets
    }, err =>{
      this.isLogged = false;
      this.isLogginFail = true;
      this.errMsj = err.error.msg ; // err.error.msg es donde esta el string con el error
      console.log(err.error); // veo en formato de objeto los errores
      alert(this.errMsj === undefined && err.error.message === "Bad credentials" ? "La contraseña es incorrecta" : this.errMsj) 
      // alert(err.error.message)
    })
  }

}
