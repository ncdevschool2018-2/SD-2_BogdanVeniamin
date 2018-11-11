package com.netcracker.edu.fapi.service;

import com.netcracker.edu.fapi.models.AdditionViewModel;

import java.util.List;

public interface AdditionDataService {

    List<AdditionViewModel> getAll();
    AdditionViewModel getAdditionById(Long id);
    AdditionViewModel saveAddition(AdditionViewModel extension);
    void deleteAddition(Long id);

}
