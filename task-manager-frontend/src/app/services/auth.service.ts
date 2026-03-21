import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRequest, AuthResponse } from '../models/auth.model';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();
 
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
 
  /**
   * Register new user
   */
  register(username: string, password: string): Observable<AuthResponse> {
    const request: AuthRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }
 
  /**
   * Login user
   */
  login(username: string, password: string): Observable<AuthResponse> {
    const request: AuthRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request);
  }
 
  /**
   * Save JWT token to localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }
 
  /**
   * Get JWT token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
 
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
 
  /**
   * Save username to localStorage
   */
  saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }
 
  /**
   * Get current username
   */
  getCurrentUsername(): string | null {
    return localStorage.getItem('username');
  }
 
  /**
   * Logout user - clear token and redirect to login
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}
 