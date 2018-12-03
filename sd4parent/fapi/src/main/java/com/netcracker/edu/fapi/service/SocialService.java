package com.netcracker.edu.fapi.service;

public interface SocialService {

    String createFacebookAuthorizationURL();
    String createFacebookAccessToken(String code);
    String createGoogleAuthorizationURL();
    String createGoogleAccessToken(String code);

}
