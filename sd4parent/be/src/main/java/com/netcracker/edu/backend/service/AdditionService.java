package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.Addition;

import java.util.Optional;

public interface AdditionService {

    Addition saveAddition(Addition extension);
    Optional<Addition> getAdditionById(Long id);
    Iterable<Addition> getAllAdditions();
    void deleteAddition(Long id);

}
