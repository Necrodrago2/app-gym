package com.example.demo.controllers;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET: Obtener todos los usuarios
    // URL: http://localhost:8080/api/users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // POST: Crear un usuario nuevo
    // URL: http://localhost:8080/api/users
    @PostMapping
    public User createUser(@RequestBody User user) {
        // En un caso real, aquí encriptaríamos la contraseña
        return userRepository.save(user);
    }
}