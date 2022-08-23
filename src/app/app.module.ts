import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http" // esto lo importo yo
import {FormsModule} from "@angular/forms" // esto lo importo yo , para los formularios
import { RouterModule , Routes } from '@angular/router'; // esto lo importo para crear las rutas

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TaskComponent } from './components/task/task.component';
import { Task2Component } from './components/task2/task2.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AboutComponent } from './components/about/about.component';
import { interceptorProvider } from './service/interceptor-service';
import { LoginComponent } from './components/login/login.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';


const appRoutes:Routes = [
  {path:"" , component:LoginComponent},
  // {path:"login" , component:LoginComponent},
  // {path:"" , redirectTo:"/login" , pathMatch: "full"}, // si no hay nada me redige a la ruta login
  {path: "tasks" , component:Task2Component },
  {path:"about" , component:AboutComponent },
  {path:"**" , component:Pagina404Component}, // si se pone ruta que no heciste va dirirgir al pagina404.component
] //

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TaskComponent,
    Task2Component,
    TaskItemComponent,
    AddTaskComponent,
    AboutComponent,
    LoginComponent,
    Pagina404Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // lo traigo aca
    FormsModule, // lo importo aca
    RouterModule.forRoot(appRoutes , {enableTracing: true}) , // lo importo aca
  ],
  providers: [ interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
