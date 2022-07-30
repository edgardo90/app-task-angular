//primera version como lo hice , funciona

import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
// import {arrayTASKS} from "../../array-tareas"; // este es el array con las tareas
import {Task} from "../../interface-task" // este es el interface de las tareas
import { TaskService } from 'src/app/service/task.service'; // traigo el servicio "TaskService"


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = []; // creo "tasks" que va ser la  interface de "Task" de type array  ; va ser igual a un array vacio
  @Output() onDeleteTask : EventEmitter<Task> = new EventEmitter(); // con esto  extraigo la funcion hacia afuera para que lo maneje la lista de "task"(tareas); "creo que esto sirve si las tasks(tareas) estan en otro componente" 

  constructor( 
    private TaskService : TaskService // inicializo el servicio que importe que es "TaskService"
  ) { }

  ngOnInit(): void {
    // esto es una promesa
    this.TaskService.getTask().subscribe(value => (this.tasks = value) ) ; // con esto traigo todas las tasks,cuando se monta nuestro componente nos va a traer nuestro servicio, el subscribe es un metodo de "Observable"
  }

  onDelete(task: Task){ // funcion que cuando haga lik en el button  va a borrar la task , pongo un argumento que se llame "task" que vas ser de type interface "TASK"
    console.log(task) // me va mostrar la task(tarea) que toque
    this.onDeleteTask.emit(task) // traigo el onDeleteTask y utilizo la funcion "emit" con el argumento, "creo que esto sirve si las tasks(tareas) estan en otro componente"
    console.log(this.tasks)
    this.TaskService.deleteTask(task).subscribe(() =>(
      this.tasks = this.tasks.filter(el => el.id !== task.id)
    ))
  }

}
