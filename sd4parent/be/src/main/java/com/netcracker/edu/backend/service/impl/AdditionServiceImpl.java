package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.Addition;
import com.netcracker.edu.backend.repository.AdditionRepository;
import com.netcracker.edu.backend.service.AdditionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdditionServiceImpl implements AdditionService {

    private AdditionRepository repository;

    @Autowired
    public AdditionServiceImpl(AdditionRepository repository) {
        this.repository = repository;
    }

    @Override
    public Addition saveAddition(Addition extension) {
        return repository.save(extension);
    }

    @Override
    public Optional<Addition> getAdditionById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Iterable<Addition> getAllAdditions() {
        return repository.findAll();
    }

    @Override
    public void deleteAddition(Long id) {
        repository.deleteById(id);
    }

}
