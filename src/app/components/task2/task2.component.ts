//otra forma de hacerlo

import { Component, OnInit } from '@angular/core';
import {Task} from "../../interface-task" // este es el interface de las tareas
import { TaskService } from 'src/app/service/task.service'; // traigo el servicio "TaskService"


@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {
  tasks: Task[] = []; // creo "tasks" que va ser la  interface de "Task" de type array  ; va ser igual a un array vacio


  constructor(
    private TaskService : TaskService // inicializo el servicio que importe que es "TaskService"
  ) { }



  ngOnInit(): void {
    this.TaskService.getTask().subscribe(value => (this.tasks = value) ) ; // cuando se monta nuestro componente nos va a traer nuestro servicio, el subscribe es un metodo de "Observable"
  }



  deleteTask(task: Task){ // funcion que cuando haga lik en el button  va a borrar la task , pongo un argumento que se llame "task" que vas ser de type interface "TASK"
    const option = window.confirm("Estas seguro de eleminar esta tarea ?"); // una alerta que si es "si" option va ser true sino va ser false
    if(option){
      this.TaskService.deleteTask(task).subscribe(() =>(
        this.tasks = this.tasks.filter(el => el.id !== task.id)
      ));
      alert("eleminando tarea")
    }
  }


  changeReminder(task:Task){ // funcion para cambiar reminder de true a false o viceversa
    if(task.reminder === true){
      task.reminder = false;
    }else{
      task.reminder= true;
    }
    this.TaskService.putReminder(task).subscribe(); // aca paso la modificacion de "task"  por nuestro service de "TaskService" que esta task.service.ts
    // console.log(task)
  }

  addTask(task:Task){ // funcion para crear una task(tarea)
    // console.log(task) // para ver que ese emite el event
    this.TaskService.postAddTask(task).subscribe((value)=>(
      this.tasks.push(value) // como task es un array hago un push del value que envio
    ))
  }

}
