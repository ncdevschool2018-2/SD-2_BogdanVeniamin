package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.User;
import com.netcracker.edu.backend.service.UserService;
import com.netcracker.edu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

    private UserRepository repository;

    @Autowired
    public UserServiceImpl(UserRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public User saveUser(User account)
    {
        return repository.save(account);
    }

    @Override
    public Optional<User> getUserById(Long id)
    {
        return repository.findById(id);
    }

    @Override
    public Iterable<User> getAllUsers()
    {
        return repository.findAll();
    }

    @Override
    public void deleteUser(Long id)
    {
        repository.deleteById(id);
    }

}
