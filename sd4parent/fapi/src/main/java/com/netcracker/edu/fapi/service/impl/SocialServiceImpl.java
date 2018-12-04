package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.service.SocialService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.api.impl.GoogleTemplate;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SocialServiceImpl implements SocialService {

    @Value("${server.port}")
    private int serverPort;

    @Value("${spring.social.facebook.appId}")
    private String facebookAppId;
    @Value("${spring.social.facebook.appSecret}")
    private String facebookSecret;

    @Value("${spring.social.google.appId}")
    private String googleAppId;
    @Value("${spring.social.google.appSecret}")
    private String googleSecret;

    @Override
    public String createFacebookAuthorizationURL() {
        FacebookConnectionFactory connectionFactory = new FacebookConnectionFactory(facebookAppId, facebookSecret);
        OAuth2Operations oauthOperations = connectionFactory.getOAuthOperations();
        OAuth2Parameters params = new OAuth2Parameters();
        params.setRedirectUri("http://localhost:" + serverPort + "/facebook");
        params.setScope("email");
//        return sendURL(oauthOperations.buildAuthorizeUrl(params));
        System.out.println(oauthOperations.buildAuthorizeUrl(params));
        return oauthOperations.buildAuthorizeUrl(params);
    }

    @Override
    public String createGoogleAuthorizationURL() {
        GoogleConnectionFactory connectionFactory = new GoogleConnectionFactory(googleAppId, googleSecret);
        OAuth2Operations oauthOperations = connectionFactory.getOAuthOperations();
        OAuth2Parameters params = new OAuth2Parameters();
        params.setRedirectUri("http://localhost:" + serverPort + "/google");
        params.setScope("email");
        System.out.println(oauthOperations.buildAuthorizeUrl(params));
        return oauthOperations.buildAuthorizeUrl(params);
    }

    @Override
    public String createFacebookAccessToken(String code) {
        FacebookConnectionFactory connectionFactory = new FacebookConnectionFactory(facebookAppId, facebookSecret);
        AccessGrant accessGrant = connectionFactory.getOAuthOperations().exchangeForAccess(code, "http://localhost:" + serverPort + "/facebook", null);
        return getFacebookInfo(accessGrant.getAccessToken());
    }

    @Override
    public String createGoogleAccessToken(String code) {
        GoogleConnectionFactory connectionFactory = new GoogleConnectionFactory(googleAppId, googleSecret);
        AccessGrant accessGrant = connectionFactory.getOAuthOperations().exchangeForAccess(code, "http://localhost:" + serverPort + "/google", null);
        return getGoogleInfo(accessGrant.getAccessToken());
    }

    private String getFacebookInfo(String accessToken) {
        Facebook facebook = new FacebookTemplate(accessToken);
        String[] fields = {"first_name", "last_name", "email"};
        return facebook.fetchObject("me", String.class, fields);
    }

    private String getGoogleInfo(String accessToken) {
        Google google = new GoogleTemplate(accessToken);
        return google.userOperations().getUserInfo().getEmail();
    }

//    private String sendURL(String url) {
//        RestTemplate restTemplate = new RestTemplate();
//        return restTemplate.getForObject(url, String.class);
//    }
}
