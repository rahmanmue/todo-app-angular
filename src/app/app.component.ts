import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/todo.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  data!:any[];
  title!:string;
  desc!:string;
  itemById: any;
  isUpdate:boolean=false;

  constructor(private todoService:TodoService){
    this.getAllTodo();
  }

  getAllTodo(){
    this.todoService.getAllTodo().subscribe(data => this.data = data);
  }

  postTodo(body:any){
    this.todoService.postTodo(body).subscribe({
      next: () =>{   
        this.getAllTodo()
        this.title ='';
        this.desc = '';
      },
      error: err => console.log(err)
    })
  }

  deleteTodo(id:string){
    this.todoService.deleteTodo(id).subscribe({
      next: ()=> this.getAllTodo(),
      error: err => console.log(err)
    });
  }


  clickAdd(){
    this.postTodo({
      title : this.title,
      description: this.desc
    });
  }

  clickDelete(id:string){
    this.deleteTodo(id);
  }

  clickGetId(id:string){
    this.todoService.getTodoById(id).subscribe({
      next: (data) => {
        console.log(data)
        this.itemById = data;
        this.title = this.itemById.title;
        this.desc = this.itemById.description;
        this.isUpdate = true;
      }
    })
  }

  clickUpdate(){
    this.todoService.updateTodo({
      id: this.itemById.id,
      title: this.title,
      description: this.desc,
      done: this.itemById.done
    }).subscribe({
      next:() => {
        this.isUpdate= false;
        this.getAllTodo();
        this.title = '';
        this.desc = '';
        alert('Berhasil update')
      },
      error: err => console.log(err)
    })
  }
}
