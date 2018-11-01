package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.Post;
import com.netcracker.edu.backend.service.PostService;
import com.netcracker.edu.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PostServiceImpl implements PostService {

    private PostRepository repository;

    @Autowired
    public PostServiceImpl(PostRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public Post savePost(Post product)
    {
        return repository.save(product);
    }

    @Override
    public Optional<Post> getPostById(Long id)
    {
        return repository.findById(id);
    }

    @Override
    public Iterable<Post> getAllPosts()
    {
        return repository.findAll();
    }

    @Override
    public void deletePost(Long id)
    {
        repository.deleteById(id);
    }

}
