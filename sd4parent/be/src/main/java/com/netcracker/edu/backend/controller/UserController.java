package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.MoneyOperation;
import com.netcracker.edu.backend.entity.User;
import com.netcracker.edu.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") Long id) {
        Optional<User> user = userService.getUserById(id);
        if(user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<User> getAllUsers() { return userService.getAllUsers(); }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public User saveUser(@RequestBody User account) {
        return userService.saveUser(account);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteUser(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByLogin(@RequestParam("login") String login) {
        Optional<User> user = userService.getUserByLogin(login);
        if(user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/ban", method = RequestMethod.GET)
    public void banUser(@RequestParam("id") Long id) {
        userService.banUser(id);
    }

    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public void checkUser(@RequestParam("login") String login) {
        userService.checkUser(login);
    }

}
