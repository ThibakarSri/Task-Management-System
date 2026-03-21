package com.taskmanager.service;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskDTO> getAllTasks(Long userId) {
        return taskRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Long id, Long userId) throws Exception {
        Task task = taskRepository.findByIdAndUserId(id, userId);
        if (task == null) {
            throw new Exception("Task not found");
        }
        return convertToDTO(task);
    }

    public TaskDTO createTask(TaskDTO taskDTO, Long userId) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(Task.TaskStatus.valueOf(taskDTO.getStatus()));
        task.setUserId(userId);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());

        task = taskRepository.save(task);
        return convertToDTO(task);
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDTO, Long userId) throws Exception {
        Task task = taskRepository.findByIdAndUserId(id, userId);
        if (task == null) {
            throw new Exception("Task not found");
        }

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(Task.TaskStatus.valueOf(taskDTO.getStatus()));
        task.setUpdatedAt(LocalDateTime.now());

        task = taskRepository.save(task);
        return convertToDTO(task);
    }

    @Transactional
    public void deleteTask(Long id, Long userId) throws Exception {
        Task task = taskRepository.findByIdAndUserId(id, userId);
        if (task == null) {
            throw new Exception("Task not found");
        }
            taskRepository.deleteByIdAndUserId(id, userId);
    }


    public List<TaskDTO> getTasksByStatus(String status, Long userId) {
        Task.TaskStatus taskStatus = Task.TaskStatus.valueOf(status);
        return taskRepository.findByUserIdAndStatus(userId, taskStatus).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus().toString());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        return dto;
    }
}