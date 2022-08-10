//aca manejo los get , post ,put , etc...

// el servicio(service) se encarga de comunicarse con el back y la base de datos

import { Injectable } from '@angular/core';
import {HttpClient , HttpHandler, HttpHeaders} from "@angular/common/http"  // esto sirve para ser los get y post
import { Observable ,of} from "rxjs" // libreria que nos permite controlar el async , "observable"
import {Task} from "../interface-task"  // este es el interface de las tareas
// import {arrayTASKS} from "../array-tareas" // este es el array con las tareas , esto esta estatico


const httpOption = { // esto es para decir que envio un json a la aplicacion , "sin esto lo probe y me funcion AH TENER EN CUENTA"
  headers: new HttpHeaders({
    "content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:3005/tasks"
  private apiUrlAllTask = "http://localhost:3005/tasks" // aca va estar la url para traer todas las tareas que estan en db.json
  private urltaskBack = "http://localhost:8080/task"; // url de mi back 

  constructor (private http:HttpClient // traigo aca el HttpClient que importe
    ) { }
  

    //aca comienza las rutas con mi back creado en java
    getAllTasksBack():Observable<Task[]>{ // traigo las task de mi base de datos
      return this.http.get<Task[]>(this.urltaskBack+"/all") // le agrego esta extencion "/all" para traer todas mis task
    }
  
    postBackTasK(task:Task):Observable<Task>{ // funcion para guardar la task en mi base de datos del back que cree
      return this.http.post<Task>(this.urltaskBack+"/create" , task, httpOption )
    }
  
    deletedBackTask(task:Task): Observable<Task>{ // funcion para eleminar la task de mi base de datos
      const urlTaskDeleted = `${this.urltaskBack}/deleted/${task.id}` ; // en esta variable va tener la ruta del back mas el id del "task"
      return this.http.delete<Task>(urlTaskDeleted);
    }
  
    putReminderBack(task:Task):Observable<Task> { // creo el service de put para task.reminder(lo cambia true)
      const urlTaskId = `${this.urltaskBack}/putreminder/${task.id}`
      return this.http.put<Task>(urlTaskId , task , httpOption) // "EN TEORIA CON httpOption(que cree) le digo como lo tiene que manejar "
    }


    

  //aca esta el metodo viejo , que utilizo la base de datos emulada 
  getTask(): Observable<Task[]>{ // para manejar la sincronia utilizo el "Observable"  , "Task[]" es la interface y le digo que es de tipo array
    return this.http.get<Task[]>(this.apiUrlAllTask) // acatraio todas las tareas
  }

  deleteTask(task:Task): Observable<Task>{ // creo el service delete
    const url = `${this.apiUrl}/${task.id}` // va ser por su id , esto tambien puede ser asi : this.apiUrl + "/" + task.id
    return this.http.delete<Task>(url) // me ve retornar ese url que tenga ese id
  }

  putReminder(task:Task):Observable<Task> { // creo el service de put para task.reminder
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url , task , httpOption) // "EN TEORIA CON httpOption(que cree) le digo como lo tiene que manejar "
  }

  postAddTask(task:Task): Observable<Task>  { // service para el post de crear una tarea
    return this.http.post<Task>(this.apiUrl ,task , httpOption)
  }
  //aca termina el metodo viejo




  
}
