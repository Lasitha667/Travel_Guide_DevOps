package com.example.Tour.Service;

import com.example.Tour.Repository.UserRepository;
import com.example.Tour.Model.usermodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🔹 Signup (register user with encrypted password)
    public usermodel registerUser(usermodel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 🔹 Login (validate email + password)
    public boolean loginUser(String email, String password) {
        Optional<usermodel> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword());
    }

    // 🔹 Get all users
    public List<usermodel> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Get user by email
    public Optional<usermodel> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
