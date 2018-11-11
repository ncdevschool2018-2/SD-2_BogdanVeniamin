package com.netcracker.edu.backend.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
    private Wallet wallet;

    @Size(max = 45)
    private String login;

    @NotNull
    @Size(max = 45)
    private String password;

    @NotNull
    @Size(max = 45)
    private String role;

    @NotNull
    @Email
    @Size(max = 45)
    private String email;

    private String language;
    private String lastDateLogin;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "users")
    private Set<Post> posts = new HashSet<>();

    public User(String login, String password, String role, String email, String language, String lastDateLogin) {
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
