package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.Post;

import java.util.Optional;

public interface PostService {

    Post savePost(Post product);
    Optional<Post>  getPostById(Long id);
    Iterable<Post> getAllPosts();
    void deletePost(Long id);
}
