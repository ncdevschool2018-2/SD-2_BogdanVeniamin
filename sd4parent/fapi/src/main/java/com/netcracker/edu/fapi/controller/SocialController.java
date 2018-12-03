package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.service.SocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class SocialController {

    @Autowired
    private SocialService socialService;

    @GetMapping("/createFacebookAuthorization")
    public String createFacebookAuthorization() {
        return socialService.createFacebookAuthorizationURL();
    }

    @GetMapping("/facebook")
    public String createFacebookAccessToken(@RequestParam("code") String code) {
        return socialService.createFacebookAccessToken(code);
    }

    @GetMapping("/createGoogleAuthorization")
    public String createGoogleAuthorization() {
        return socialService.createGoogleAuthorizationURL();
    }

    @GetMapping("/google")
    public String createGoogleAccessToken(@RequestParam("code") String code) {
        return socialService.createGoogleAccessToken(code);
    }

}
