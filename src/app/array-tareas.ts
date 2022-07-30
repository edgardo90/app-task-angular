// va ser a un array de tareas(tasks) , es un ejemplo para ver si lo puedo renderizar(esto es estatico) . "La verdadera (array de tareas(tasks) ) es una emulacion de una base de datos llamado db.json y de ahi adentro "task" "
import { Task } from "./interface-task"; // importo la interface que cree, que va contral el tipo y que datos tiene que tener

export const arrayTASKS: Task[] = [ // aca digo que "arrayTASKS" sea la interface que cree "Task" de tipo array
    {
        id: 1,
        text: "Primera tarea",
        day: "13/12/1990",
        reminder: false,
        // ejemplo:"hola" //  si aca activo el "ejemplo" me va tirar un error por que en la interface no existe "ejemplo" de type string
    },
    {
        id: 2,
        text: "Seguda tarea",
        day: "1/2/2000",
        reminder: false,
    },
    {
        id: 3,
        text: "Tercera tarea",
        day: "5/4/2010",
        reminder: false,
    }
];

export const TASKSarr : Task[] = [] // esto sirve para hacerlo con task2.ts y task.item , aca digo que "TASKSarr" sea la interface que cree "Task" de tipo array