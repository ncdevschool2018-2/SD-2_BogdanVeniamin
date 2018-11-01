package com.netcracker.edu.fapi.service;

import com.netcracker.edu.fapi.models.PostViewModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostDataService {

    List<PostViewModel> getAll();
    PostViewModel getPostById(Long id);
    PostViewModel savePost(PostViewModel product);
    void deletePost(Long id);

}
