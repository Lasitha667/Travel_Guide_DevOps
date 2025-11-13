package com.example.Tour.Repository;

import com.example.Tour.Model.usermodel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<usermodel, String> {
    Optional<usermodel> findByEmail(String email);
}
