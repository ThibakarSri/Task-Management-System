package com.taskmanager.controller;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        List<TaskDTO> tasks = taskService.getAllTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id, HttpServletRequest request) {
        try {
            Long userId = (Long) request.getAttribute("userId");
            TaskDTO task = taskService.getTaskById(id, userId);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        TaskDTO createdTask = taskService.createTask(taskDTO, userId);
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO, HttpServletRequest request) {
        try {
            Long userId = (Long) request.getAttribute("userId");
            TaskDTO updatedTask = taskService.updateTask(id, taskDTO, userId);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, HttpServletRequest request) {
        try {
            Long userId = (Long) request.getAttribute("userId");
            taskService.deleteTask(id, userId);
            return ResponseEntity.noContent().build();  // 204, not 200
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteTask(@PathVariable Long id, HttpServletRequest request) {
//        try {
//            Long userId = (Long) request.getAttribute("userId");
//            taskService.deleteTask(id, userId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }


    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskDTO>> getTasksByStatus(@PathVariable String status, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        List<TaskDTO> tasks = taskService.getTasksByStatus(status, userId);
        return ResponseEntity.ok(tasks);
    }
}