package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.AdditionViewModel;
import com.netcracker.edu.fapi.service.AdditionDataService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class AdditionDataServiceImpl implements AdditionDataService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<AdditionViewModel> getAll() {
        RestTemplate restTemplate = new RestTemplate();
        AdditionViewModel[] additionViewModelResponse = restTemplate.getForObject(backendServerUrl + "/api/additions/", AdditionViewModel[].class);
        return additionViewModelResponse == null ? Collections.emptyList() : Arrays.asList(additionViewModelResponse);
    }

    @Override
    public AdditionViewModel getAdditionById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/additions/" + id, AdditionViewModel.class);
    }

    @Override
    public AdditionViewModel saveAddition(AdditionViewModel extension) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/additions", extension, AdditionViewModel.class).getBody();
    }

    @Override
    public void deleteAddition(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/additions/" + id);
    }

}
