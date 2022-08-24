

//interface para la creacion del usuario
export interface NewUser{ // controla el type de datos que va ser y que datos va a tener , para eso sirve "interface"
    nombre: string,
    nombreUsuario: string,
    email:string,
    password:string,
}