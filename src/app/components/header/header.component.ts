import { Component, OnInit } from '@angular/core';
//
import { UiService } from 'src/app/service/ui.service'; // traigo el servicio que cree
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Mi lista de tareas"; // como es typeScript pongo que title sea un string
  taskOpenOrClose : boolean = false ; // esto va ser un boleano , esto sirve para que cuando cambie el estado va cambiar la logia en header.html
  subscription?: Subscription

  constructor(
    private uiService: UiService
   ){ 
     this.subscription = this.uiService.onToggle().subscribe(value => this.taskOpenOrClose = value ); // aca traigo la funcion onToggle() de UiService y le paso el la variable "taskOpenOrClose"
  }

  ngOnInit(): void {
  }

  addTaskOrclose(){  // funcion que va pasar al component header(header.html) que se hizo click en el button, sirve para agregar una tarea o cerrar
    this.uiService.toggleAddTask();
    console.log("funciona el click desde el component header")
  }

}
