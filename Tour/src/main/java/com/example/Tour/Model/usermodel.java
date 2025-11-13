package com.example.Tour.Model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class usermodel {
    private String id;

    private String username;
    private String email;
    private String password; // store encrypted!

    // getters & setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

}
