//service para la creacion de nuevo usario y el login

import { Injectable } from '@angular/core';
import {HttpClient , HttpHandler, HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable ,of} from "rxjs" // libreria que nos permite controlar el async , "observable"
import {NewUser} from "../interface-newUser" // esta es la interface que cree de nuevo usuario
import {LoginUser} from "../interface-login"//
import {Jwt} from "../interface-jwt"


const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private urlAuth = "http://localhost:8080/auth/" // ruta del back de la parte de crear usuario y el login(y otras rutas)

  constructor(private http:HttpClient) { } // traigo aca el HttpClient que importe y la denomino "http"

  postNewUser(newUser: NewUser):Observable<any> {
    return this.http.post<any>(`${this.urlAuth}nuevo`, newUser , httpOption );
  }

  postLogin(loginUser:LoginUser):Observable<Jwt>{ // como va recibir un jwToken el Observable va lo que va recibir
    return this.http.post<Jwt>(`${this.urlAuth}login`, loginUser , httpOption );
  }

}
