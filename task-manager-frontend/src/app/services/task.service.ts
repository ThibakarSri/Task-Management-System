import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TaskDTO } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get HTTP headers with Authorization
   */
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all tasks for logged-in user
   */
  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get single task by ID
   */
  getTaskById(id: number): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new task
   */
  createTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.post<TaskDTO>(this.apiUrl, task, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update existing task
   */
  updateTask(id: number, task: TaskDTO): Observable<TaskDTO> {
    return this.http.put<TaskDTO>(`${this.apiUrl}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete task
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get tasks by status
   */
  getTasksByStatus(status: string): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.apiUrl}/status/${status}`, {
      headers: this.getHeaders()
    });
  }
}