import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskDTO } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: TaskDTO[] = [];
  loading: boolean = false;
  error: string | null = null;
  currentUsername: string | null = null;
  showConfirmDialog: boolean = false;
  confirmDialogType: 'delete' | 'logout' = 'delete';
  taskToDelete: number | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.currentUsername = this.authService.getCurrentUsername();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Load all tasks for the user
   */
  loadTasks(): void {
    this.loading = true;
    this.error = null;

    this.taskService.getAllTasks().subscribe({
      next: (data: TaskDTO[]) => {
        this.tasks = data;
        this.loading = false;
        console.log('Tasks loaded successfully:', data);
      },
      error: (error) => {
        console.error('Failed to load tasks:', error);
        this.error = 'Failed to load tasks. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * Show delete confirmation dialog
   */
  showDeleteConfirm(id: number | undefined): void {
    if (!id) return;
    this.taskToDelete = id;
    this.confirmDialogType = 'delete';
    this.showConfirmDialog = true;
  }

  /**
   * Confirm delete task
   */
  confirmDelete(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.showConfirmDialog = false;
          this.taskToDelete = null;
          this.loadTasks(); // Reload tasks
        },
        error: (error) => {
          console.error('Failed to delete task:', error);
          this.error = 'Failed to delete task. Please try again.';
          this.showConfirmDialog = false;
        }
      });
    }
  }

  /**
   * Show logout confirmation dialog
   */
  showLogoutConfirm(): void {
    this.confirmDialogType = 'logout';
    this.showConfirmDialog = true;
  }

  /**
   * Confirm logout
   */
  confirmLogout(): void {
    this.showConfirmDialog = false;
    this.authService.logout();
  }

  /**
   * Cancel confirmation dialog
   */
  cancelConfirm(): void {
    this.showConfirmDialog = false;
    this.taskToDelete = null;
  }

  /**
   * Filter tasks by status
   */
  filterByStatus(status: string): void {
    if (status === 'ALL') {
      this.loadTasks();
    } else {
      this.loading = true;
      this.error = null;

      this.taskService.getTasksByStatus(status).subscribe({
        next: (data: TaskDTO[]) => {
          this.tasks = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to filter tasks:', error);
          this.error = 'Failed to filter tasks. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Get status badge color
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'TO_DO':
        return 'status-todo';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'DONE':
        return 'status-done';
      default:
        return '';
    }
  }
}