package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.Addition;
import com.netcracker.edu.backend.entity.Post;
import com.netcracker.edu.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Post> getPostById(@PathVariable(name = "id") Long id) {
        Optional<Post> post = postService.getPostById(id);
        if(post.isPresent()) {
            return ResponseEntity.ok(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Post> getAllPosts() { return postService.getAllPosts(); }

    @RequestMapping(method = RequestMethod.POST)
    public Post savePost(@RequestBody Post product) {
        return postService.savePost(product);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deletePost(@PathVariable(name = "id") Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public Iterable<Post> getPostsByLogin(@RequestParam("login") String login) {
        return postService.getPostsByLogin(login);
    }

    @RequestMapping(value = "/page/{num}", method = RequestMethod.GET)
    public Iterable<Post> getPostsByPage(@PathVariable(name = "num") int num) {
        Page pageContent = postService.getPostsByPage(num);
        return pageContent.getContent();
    }

    @RequestMapping(value = "/total-pages", method = RequestMethod.GET)
    public int getTotalPages() {
        Page pageContent = postService.getPostsByPage(1);
        return pageContent.getTotalPages();
    }

    @RequestMapping(value = "/add/{id}", method = RequestMethod.POST)
    public void getPost(@PathVariable(name = "id") Long id, @RequestBody Set<Addition> additions) {
        postService.getPost(id, additions);
    }
}