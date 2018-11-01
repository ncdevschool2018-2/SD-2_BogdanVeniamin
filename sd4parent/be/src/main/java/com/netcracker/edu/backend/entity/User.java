package com.netcracker.edu.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String login;
    private String password;
    private String role;
    private String email;
    private boolean language;
    private String lastDateLogin;

    public User(String login, String password, String role, String email, boolean language, String lastLogin) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.email = email;
        this.language = language;
        this.lastDateLogin = lastDateLogin;
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

    public boolean isLanguage() {
        return language;
    }

    public void setLanguage(boolean language) {
        this.language = language;
    }

    public String getLastDateLogin() {
        return lastDateLogin;
    }

    public void setLastDateLogin(String lastDateLogin) {
        this.lastDateLogin = lastDateLogin;
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
        return Objects.hash(id, login, password, role, email, language, lastDateLogin);
    }

    @Override
    public String toString() {
        return "User { id: " + id +
                ", login: " + login +
                ", password: " + password +
                ", role: " + role +
                ", email: " + email +
                ", language: " + language +
                ", lastDateLogin: " + lastDateLogin + " }";
    }
}
