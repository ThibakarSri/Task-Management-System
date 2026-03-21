import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Fill form with demo credentials
   */
  useDemoCredentials(): void {
    this.loginForm.patchValue({
      username: 'Thiba',
      password: 'password25'
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    this.loading = true;
    this.error = null;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.token);
        this.authService.saveUsername(response.username);
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.error = error.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}