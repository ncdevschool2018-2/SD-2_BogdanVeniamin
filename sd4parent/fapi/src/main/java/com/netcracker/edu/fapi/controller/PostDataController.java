package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.PostViewModel;
import com.netcracker.edu.fapi.service.PostDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/p")
public class PostDataController {

    @Autowired
    private PostDataService postDataService;

    @RequestMapping
    public ResponseEntity<List<PostViewModel>> getAllPosts() {
        return ResponseEntity.ok(postDataService.getAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<PostViewModel> savePost(@RequestBody PostViewModel post /*todo server validation*/) {
        if (post != null) {
            return ResponseEntity.ok(postDataService.savePost(post));
        }
        return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletePost(@PathVariable String id) {
        postDataService.deletePost(Long.valueOf(id));
    }

}
