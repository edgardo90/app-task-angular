import { Component, OnInit } from '@angular/core';
//
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // esto seria como el navigate de react
import { UiService } from 'src/app/service/ui.service'; // traigo el servicio que cree
import {TokenService} from "../../service/token.service"; // // traigo el servicio que cree de token


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Mi lista de tareas"; // como es typeScript pongo que title sea un string
  taskOpenOrClose : boolean = false ; // esto va ser un boleano , esto sirve para que cuando cambie el estado va cambiar la logica en header.html
  subscription?: Subscription
  isLogged = false; // esto es para desloguearse, con esto puedo jugar con *ngIf para ver si se muestra el button o no

  constructor(private uiService: UiService , private router: Router , private tokenService:TokenService ){ 

     this.subscription = this.uiService.onToggle().subscribe(value => this.taskOpenOrClose = value ); // aca traigo la funcion onToggle() de UiService y le paso el la variable "taskOpenOrClose"
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){ // si hay token
      this.isLogged=true;  // cambia a "isLogged" a true
    }else{
      this.isLogged = false; // sino que siga en false
    }
    console.log(this.tokenService.getUserName())// veo el user name del usuario que esta logueado
  }


  addTaskOrclose(){  // funcion que va pasar al component header(header.html) que se hizo click en el button, sirve para agregar una tarea o cerrar
    this.uiService.toggleAddTask();
    console.log("funciona el click desde el component header")
  }

  logOut():void{ // funcion para desloguearse
    this.tokenService.logOut();
    window.location.reload();
    this.router.navigate([""]);
  }

}
