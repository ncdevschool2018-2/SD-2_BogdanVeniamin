package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.MoneyOperation;
import com.netcracker.edu.backend.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserService {

    User saveUser(User account);
    Optional<User>  getUserById(Long id);
    Iterable<User> getAllUsers();
    void deleteUser(Long id);
    Optional<User> getUserByLogin(String login);
}
