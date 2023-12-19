import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  getOneTask(taskId: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${taskId}`)
  }

  deleteTask(taskId: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }

  updateTask(taskId: String, updates: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${taskId}`, updates);
  }

  createTask(newTask: String): Observable<any>{
    return this.http.post(this.baseUrl, {title: newTask, isHidden: false, isCompleted: false})
  }


}
