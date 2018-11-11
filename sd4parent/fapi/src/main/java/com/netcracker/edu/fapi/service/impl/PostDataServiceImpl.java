package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.PostViewModel;
import com.netcracker.edu.fapi.service.PostDataService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class PostDataServiceImpl implements PostDataService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<PostViewModel> getAll() {
        RestTemplate restTemplate = new RestTemplate();
        PostViewModel[] postViewModelResponse = restTemplate.getForObject(backendServerUrl + "/api/posts", PostViewModel[].class);
        return postViewModelResponse == null ? Collections.emptyList() : Arrays.asList(postViewModelResponse);
    }

    @Override
    public PostViewModel getPostById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/posts/" + id, PostViewModel.class);
    }

    @Override
    public PostViewModel savePost(PostViewModel product) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/posts", product, PostViewModel.class).getBody();
    }

    @Override
    public void deletePost(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/posts/" + id);
    }

    @Override
    public List<PostViewModel> getPostsByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        PostViewModel[] postViewModelResponse = restTemplate.getForObject(backendServerUrl + "/api/posts/?login=" + login, PostViewModel[].class);
        return postViewModelResponse == null ? Collections.emptyList() : Arrays.asList(postViewModelResponse);
    }
}
