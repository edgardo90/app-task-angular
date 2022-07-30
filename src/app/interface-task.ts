

export interface Task{ // controla el type de datos que va ser y que datos va a tener , para eso sirve "interface"
    id?: number; // va ser de type number
    text: string; // va ser de type string
    day: string;
    reminder: boolean; // va ser de type true or false
}