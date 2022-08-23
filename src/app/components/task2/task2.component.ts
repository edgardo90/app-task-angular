//otra forma de hacerlo
import { Router } from '@angular/router'; // esto seria como el navigate de react
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
  loading: string = "Cargando..."

  cambio(){ // funcion que setea la variable "loading" con un setTimeOut
    setTimeout(() => this.loading= ""  ,8000 );// cuando pase ese tiempo setea a un string vacio 
  }


  constructor(
    private TaskService : TaskService, // inicializo el servicio que importe que es "TaskService"
    private router: Router
  ) { }



  ngOnInit(): void {
    this.TaskService.getAllTasksBack().subscribe(value =>(this.tasks = value , console.log(this.tasks) ),// get que trae las "tasks" de mi back que cree con base de datos 
    err =>{ // muestro los errores 
      console.log(err.error) // muestro los error por consola
      if(err.error.message === "Acceso denegado"){ // si el err.error.message es "Acceso denegado"
        this.router.navigate([""]) // me redige al login
      }
    } ) ;  
  }


//metodo viejo para la base de datos emulada
  // deleteTask(task: Task){ // funcion que cuando haga lik en el button  va a borrar la task , pongo un argumento que se llame "task" que vas ser de type interface "TASK"
  //   const option = window.confirm("Estas seguro de eleminar esta tarea ?"); // una alerta que si es "si" option va ser true sino va ser false
  //   if(option){
  //     this.TaskService.deleteTask(task).subscribe(() =>(
  //       this.tasks = this.tasks.filter(el => el.id !== task.id)
  //     ));
  //     alert("eleminando tarea")
  //   }
  // }

  // changeReminder(task:Task){ // funcion para cambiar reminder de true a false o viceversa
  //   if(task.reminder === true){
  //     task.reminder = false;
  //   }else{
  //     task.reminder= true;
  //   }
  //   this.TaskService.putReminder(task).subscribe(); // aca paso la modificacion de "task"  por nuestro service de "TaskService" que esta task.service.ts
  //   // console.log(task)
  // }

  // addTask(task:Task){ // funcion para crear una task(tarea)
  //   // console.log(task) // para ver que ese emite el event
  //   this.TaskService.postAddTask(task).subscribe((value)=>(
  //     this.tasks.push(value) // como task es un array hago un push del value que envio
  //   ))
  // }
  //aca termina el metodo viejo


  //metedo nuevos que se usan para el back que cree
  addTaskBack(task:Task){ // funcion para crear una task(tarea)
    console.log(task) // para ver que ese emite el event
    this.TaskService.postBackTasK(task).subscribe(value => (  this.tasks.push(value) )  ) ; // el push que hago al array this.tasks es para que muestre al instante la nueva tarea
  }

  deletedTaskBack(task:Task){ // funcion para eleminar la tarea
    const option = window.confirm("Estas seguro de eleminar esta tarea ?"); // una alerta que si es "si" option va ser true sino va ser false
    if(option){
      this.TaskService.deletedBackTask(task).subscribe(() =>(
        this.tasks = this.tasks.filter(el => el.id !== task.id) // el filter es para que muestre al instante la task eleminada
      ));
      alert("eleminando tarea")
    }
  }

  changeReminderBack(task:Task){ // funcion para cambiar reminder de true a false o viceversa
    if(task.reminder === true){ // con esto se muuestra al instante el cambio
      task.reminder = false;
    }else{
      task.reminder= true;
    }
    this.TaskService.putReminderBack(task).subscribe(); // aca paso la modificacion de "task"  por nuestro service de "TaskService" que esta task.service.ts , guardo el cambio en mi back
    // console.log(task)
  }
  

}
