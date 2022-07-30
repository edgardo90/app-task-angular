// servio para controlar el boton de agregar tarea o cerrar para agregar tarea;

import { Injectable  } from '@angular/core';
import { Observable , Subject } from 'rxjs'; // libreria que nos permite controlar el async , "observable"

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddtasK : boolean = false; // creo una variable de type boleano que inicia en false
  private subjet= new Subject<any>();  // esto sirve para "escuchar" eventos


  constructor() { }

  toggleAddTask():void{ //  funcion que cambia true or false showAddtasK
    console.log("funciona el ui.service")
    this.showAddtasK = !this.showAddtasK;
    this.subjet.next(this.showAddtasK);
  }

  onToggle():Observable<any>{ // va retornar el  "subjet"
    return this.subjet.asObservable();
  }

}
