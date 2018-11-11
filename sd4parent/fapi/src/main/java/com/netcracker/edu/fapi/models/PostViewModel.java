package com.netcracker.edu.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)

public class PostViewModel {

    private long id;
    private String title;
    private String description;
    private float price;
    private int discount;
    private Set<UserViewModel> users;
    private Set<PackageViewModel> packages;
    private Set<AdditionViewModel> additions;

    public PostViewModel() {

    }

    public PostViewModel(long id, String title, String description, float price, int discount, Set<UserViewModel> users, Set<PackageViewModel> packages, Set<AdditionViewModel> additions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.users = users;
        this.packages = packages;
        this.additions = additions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public Set<UserViewModel> getUsers() {
        return users;
    }

    public void setUsers(Set<UserViewModel> users) {
        this.users = users;
    }

    public Set<PackageViewModel> getPackages() {
        return packages;
    }

    public void setPackages(Set<PackageViewModel> packages) {
        this.packages = packages;
    }

    public Set<AdditionViewModel> getAdditions() {
        return additions;
    }

    public void setAdditions(Set<AdditionViewModel> additions) {
        this.additions = additions;
    }
}


