package com.netcracker.edu.fapi.models;

public class SubscriptionRenewalViewModel {

    private Long id;
    private int duration;
    private float cost;

    public SubscriptionRenewalViewModel() {
    }

    public SubscriptionRenewalViewModel(int duration, float cost) {
        this.duration = duration;
        this.cost = cost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

}
