import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  BASE_API = environment.apiUrl;

  constructor(private http:HttpClient) {}


  getAllTodo(): Observable<any>{
    return this.http.get<any>(`${this.BASE_API}/todos`)
  }

  postTodo(body:any){
    return this.http.post(`${this.BASE_API}/todo`, body)
  }

  deleteTodo(id:string){
    return this.http.delete(`${this.BASE_API}/todo/${id}`)
  }

  getTodoById(id:string){
    return this.http.get(`${this.BASE_API}/todo/${id}`)
  }

  updateTodo(body:any){
    return this.http.put(`${this.BASE_API}/todo`, body)
  }
}
