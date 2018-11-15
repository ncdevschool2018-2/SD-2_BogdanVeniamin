package com.netcracker.edu.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class WalletViewModel {

    private Long id;
    private float money = 100;
    private UserViewModel owner;

    public WalletViewModel() {
    }

    public WalletViewModel(long id, float money, UserViewModel owner) {
        this.id = id;
        this.money = money;
        this.owner = owner;
    }

    public long getId() {
        return id;
    }

    public float getMoney() {
        return money;
    }

    public UserViewModel getOwner() {
        return owner;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setMoney(float money) {
        this.money = money;
    }

    public void setOwner(UserViewModel owner) {
        this.owner = owner;
    }
}
