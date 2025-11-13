package com.example.Tour.Controller;

import com.example.Tour.Model.usermodel;
import com.example.Tour.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend requests
public class UserController {

    @Autowired
    private UserService userService;

    // 🔹 Signup
    @PostMapping("/signup")
    public ResponseEntity<usermodel> signup(@RequestBody usermodel user) {
        usermodel savedUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // 🔹 Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody usermodel user) {
        boolean success = userService.loginUser(user.getEmail(), user.getPassword());
        if (success) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // 🔹 Get all users
    @GetMapping("/all")
    public ResponseEntity<List<usermodel>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 🔹 Get user by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<usermodel> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
