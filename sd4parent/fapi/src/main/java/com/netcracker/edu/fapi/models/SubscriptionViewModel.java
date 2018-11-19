package com.netcracker.edu.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class SubscriptionViewModel {

    private long id;
    private UserViewModel user;
    private PostViewModel post;
    private int duration;
    private String date;

    public SubscriptionViewModel() {
    }

    public SubscriptionViewModel(long id, UserViewModel user, PostViewModel post, int duration, String date) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.duration = duration;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserViewModel getUser() {
        return user;
    }

    public void setUser(UserViewModel user) {
        this.user = user;
    }

    public PostViewModel getPost() {
        return post;
    }

    public void setPost(PostViewModel post) {
        this.post = post;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
