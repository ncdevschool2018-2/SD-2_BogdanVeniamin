package com.netcracker.edu.backend.entity;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @PrimaryKeyJoinColumn(name = "id", referencedColumnName = "owner_id")
//    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    private Wallet wallet;

    @JsonManagedReference
    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Wallet wallet;

    @Size(max = 45)
    private String login;

    @NotNull
    @Size(max = 255)
    private String password;

    @Size(max = 45)
    private String role;

    @NotNull
    @Email
    @Size(max = 45)
    private String email;

    private String language;
    private String lastDateLogin;

    @Column(name = "reset_token")
    private String resetToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Set<Subscription> subscriptions = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Comment> comments = new HashSet<>();

    public User(String login, String password, String role, String email, String language, String lastDateLogin, Wallet wallet) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.email = email;
        this.language = language;
        this.lastDateLogin = lastDateLogin;
        this.wallet = wallet;
    }

    public User() {
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

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;
        User that = (User) obj;
        return id == that.id &&
                Objects.equals(login, that.login) &&
                Objects.equals(password, that.password) &&
                Objects.equals(role, that.role) &&
                Objects.equals(email, that.email) &&
                Objects.equals(language, that.language) &&
                Objects.equals(lastDateLogin, that.lastDateLogin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, login, wallet, password, role, email, language, lastDateLogin);
    }

    @Override
    public String toString() {
        return "User { id: " + id +
                ", login: " + login +
                ", wallet: " + wallet.toString() +
                ", password: " + password +
                ", role: " + role +
                ", email: " + email +
                ", language: " + language +
                ", lastDateLogin: " + lastDateLogin + " }";
    }
}
