package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.Post;
import com.netcracker.edu.backend.service.PostService;
import com.netcracker.edu.backend.repository.PostRepository;
import com.netcracker.edu.backend.entity.Addition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.netcracker.edu.backend.repository.specification.PostSpecification.postsFindByLogin;

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
    public void getPost(Long id, Set<Addition> additions) {

        repository.addAddition(id, additions);
    }

    @Override
    public void deletePost(Long id)
    {
        repository.deleteById(id);
    }

    @Override
    public Iterable<Post> getPostsByLogin(String login) {
        return repository.findAll(postsFindByLogin(login));
    }

    @Override
    public Page<Post> getPostsByPage(int page) {
        Sort sort = new Sort(new Sort.Order(Sort.Direction.ASC, "id"));
        Pageable pageable = new PageRequest(page-1, 2, sort);
        return repository.findAll(pageable);
    }

}
