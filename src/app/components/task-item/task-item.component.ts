import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import {Task} from "../../interface-task" // este es el interface de las tareas
import {TASKSarr} from "../../array-tareas"; // traigo el array vacio que cree

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task= TASKSarr[0] // lo traigo aca y le digo que inicie en 0, de esta forma traigo con "input" lo que esta en "task2.component"
  @Output() onDeleteTask : EventEmitter<Task> = new EventEmitter(); // con esto  extraigo la funcion hacia afuera para que lo maneje la lista de "tasks"(tareas); "esto la va recibir "task2.component" " 
  @Output() onChangeReminder : EventEmitter<Task> = new EventEmitter();

  constructor() { }

  

  ngOnInit(): void {
    // console.log(this.task) // me va a mostrar uno por uno cada "tarea"(task)
  }


  onDelete(task: Task){ // funcion que cuando haga lik en el button  va a borrar la task , pongo un argumento que se llame "task" que vas ser de type interface "TASK"
    // console.log(task) // me va mostrar la task(tarea) que toque
    this.onDeleteTask.emit(task) // traigo el onDeleteTask y utilizo la funcion "emit" con el argumento, "esto la va recibir(emitir) "task2.component" " 
  }

  onReminderTrueOrFalse(task: Task){ // funcion para cambiar reminder de true a false , en este caso sirve para enviar(emitir) a "task2.component"
    // console.log(task)
    this.onChangeReminder.emit(task)
  }

}
