package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.UserViewModel;
import com.netcracker.edu.fapi.models.WalletViewModel;
import com.netcracker.edu.fapi.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/u")
public class UserDataController {

    @Autowired
    UserDataService userDataService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserViewModel> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userDataService.getUserById(Long.valueOf(id)));
    }

    @RequestMapping
    public ResponseEntity<List<UserViewModel>> getAllUsers() { return ResponseEntity.ok(userDataService.getAll()); }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<UserViewModel> getUserByLogin(@RequestParam("login") String login) {
        return ResponseEntity.ok(userDataService.getUserByLogin(login));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UserViewModel> saveUser(@RequestBody UserViewModel account) {
        if(account != null) {
            return ResponseEntity.ok(userDataService.saveUser(account));
        }
        else
            return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String id) {
        userDataService.deleteUser(Long.valueOf(id));
    }



}
