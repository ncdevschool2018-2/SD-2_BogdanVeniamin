package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.Addition;
import com.netcracker.edu.backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

public interface PostService {

    Post savePost(Post product);
    Optional<Post>  getPostById(Long id);
    Iterable<Post> getAllPosts();
    void deletePost(Long id);
    Iterable<Post> getPostsByLogin(String login);
    Page<Post> getPostsByPage(int page);
    void getPost(Long id, Set<Addition> additions);
}
