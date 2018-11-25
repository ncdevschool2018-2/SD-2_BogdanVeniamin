package com.netcracker.edu.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class UserViewModel {

    private long id;
    private String login;
    private String password;
    private String role;
    private String email;
    private String language;
    private String lastDateLogin;
    private WalletViewModel wallet;
    private boolean ban;

    public UserViewModel(String login, WalletViewModel wallet, String password, String role, String email, String language, String lastDateLogin, boolean ban) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.email = email;
        this.language = language;
        this.lastDateLogin = lastDateLogin;
        this.wallet = wallet;
        this.ban = ban;
    }

    public UserViewModel(String login, String password, String role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public UserViewModel() {
        this.wallet = new WalletViewModel();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public WalletViewModel getWallet() {
        return wallet;
    }

    public void setWallet(WalletViewModel wallet) {
        this.wallet = wallet;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getLastDateLogin() {
        return lastDateLogin;
    }

    public void setLastDateLogin(String lastDateLogin) {
        this.lastDateLogin = lastDateLogin;
    }

    public boolean isBan() {
        return ban;
    }

    public void setBan(boolean ban) {
        this.ban = ban;
    }
}
