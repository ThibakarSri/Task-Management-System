import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskDTO } from '../../models/task.model';
import { TASK_STATUS_OPTIONS } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  isEditMode: boolean = false;
  taskId: number | null = null;
  statusOptions = TASK_STATUS_OPTIONS;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check if we're editing an existing task
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = params['id'];
        this.loadTaskForEditing();
      }
    });
  }

  /**
   * Initialize the form
   */
  private initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['TO_DO', Validators.required]
    });
  }

  /**
   * Load task for editing
   */
  private loadTaskForEditing(): void {
    if (!this.taskId) return;

    this.loading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: TaskDTO) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load task:', error);
        this.error = 'Failed to load task. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * Submit form (create or update task)
   */
  onSubmit(): void {
    if (!this.taskForm.valid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    const taskData: TaskDTO = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: (response) => {
          console.log('Task updated successfully:', response);
          this.success = 'Task updated successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/tasks']), 1500);
        },
        error: (error) => {
          console.error('Failed to update task:', error);
          this.error = 'Failed to update task. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Create new task
      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
          this.success = 'Task created successfully!';
          this.loading = false;
          this.taskForm.reset({ status: 'TO_DO' });
          setTimeout(() => this.router.navigate(['/tasks']), 1500);
        },
        error: (error) => {
          console.error('Failed to create task:', error);
          this.error = 'Failed to create task. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Go back to task list
   */
  onBack(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Get form controls for template
   */
  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get status() {
    return this.taskForm.get('status');
  }
}