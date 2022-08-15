import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//
import {Task} from "../../interface-task" // traigo la inteface task
import { UiService } from 'src/app/service/ui.service'; // traigo el service ui
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask : EventEmitter<Task> = new EventEmitter() // para emitir(enviar) la informacion a otro componente(componente padre)

  text:string = ""; // creo una variable que sea de tipo string 
  day:string = "";
  reminder: boolean = false // creo una variable que sea de tipo true o false
  taskOpenOrClose : boolean = false // boleano que va servir si se muestra el formulario o no
  subscription?: Subscription

  constructor(
    private uiService: UiService
  ) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.taskOpenOrClose = value ) // aca traigo la funcion onToggle() de UiService y le paso el la variable "taskOpenOrClose"
  }

  ngOnInit(): void {
  }


  onSubmit(){ // funcion para enviar el formulario
    if(this.text === ""){
      return alert("la tarea esta vacia");
    }
    if(this.day === ""){
      return alert("Tienes que poner una fecha");
    }
    let {text , day , reminder} = this; // con destruturing traigo lo que esta this
    day = day.split("-").reverse().join("/") // cambio la forma que este la fecha
    const newTask = {text , day , reminder};
    // console.log(newTask) 
    this.onAddTask.emit(newTask) // emito(envio) el @Output al componente padre
    this.text=""; //seteo el text y las demas varibales
    this.day="";
    this.reminder=false;
    return alert("Tarea creada con exito")
  }


}
