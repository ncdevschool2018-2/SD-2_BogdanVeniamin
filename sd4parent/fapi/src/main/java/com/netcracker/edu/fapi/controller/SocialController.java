package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.URLViewModel;
import com.netcracker.edu.fapi.service.SocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/social")
public class SocialController {

    @Autowired
    private SocialService socialService;

    @GetMapping("/createFacebookAuthorization")
    public URLViewModel createFacebookAuthorization() {
        return new URLViewModel(socialService.createFacebookAuthorizationURL());
    }

    @GetMapping("/facebook")
    public void createFacebookAccessToken(@RequestParam("code") String code, HttpServletResponse httpServletResponse) {
        String redirectUrl = "http://localhost:4200";

        httpServletResponse.setHeader("Location", redirectUrl);
        httpServletResponse.setStatus(302);

        System.out.println(socialService.createFacebookAccessToken(code));
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
