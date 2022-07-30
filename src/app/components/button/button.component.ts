import { Component,
  OnInit ,
  Input , // importar "input" nos sirve para tomar(recibir) los valores de otro componente
  Output , // nos sirve para enviar datos valores(datos) a otro componente
  EventEmitter // emite un evento
} from '@angular/core'; 

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = ""; // con @Input() toma el valor(de otro component)  y va tener el valor de ese string
  @Input() color : string= "" ; // con @Input() toma el valor(de otro component) , este va servir para cambiar el color del button
  @Output() buttonClick = new EventEmitter() // emito fuera del component una accion(hacia el componente padre)

  constructor() { }

  ngOnInit(): void {
  }

   onClick(){ // creo la funcion onClick , la que va emitir una accion cuando se haga click en el button
    this.buttonClick.emit()
  }

}
