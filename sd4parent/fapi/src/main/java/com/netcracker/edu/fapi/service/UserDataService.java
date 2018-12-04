package com.netcracker.edu.fapi.service;

import com.netcracker.edu.fapi.models.LoginStringViewModel;
import com.netcracker.edu.fapi.models.UserViewModel;

import java.util.List;

public interface UserDataService {

    List<UserViewModel> getAll();
    UserViewModel getUserById(Long id);
    UserViewModel saveUser(UserViewModel account);
    void deleteUser(Long id);
    UserViewModel getUserByLogin(String login);
    void banUser(Long id);
    void checkUser(String login);
    UserViewModel getUserByEmail(String email);
    UserViewModel getUserByResetToken(String resetToken);
    void updateToken(LoginStringViewModel resetToken);
    void updatePassword(LoginStringViewModel password);
}
