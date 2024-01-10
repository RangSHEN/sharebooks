package com.rang.book.service.impl;


import com.rang.book.dao.UserDao;
import com.rang.book.entity.User;
import com.rang.book.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {


    private UserDao userDao;

    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(User user) {
        User userExist= userDao.findOneByEmail(user.getEmail());
        if (userExist != null){
            throw new RuntimeException("User already exist!");
        }
        return saveUser(user);

//        return userDao.save(userExist);
    }

    private User saveUser(User user){

        User userInfo = new User();
        userInfo.setEmail(user.getEmail());
        userInfo.setPassword(passwordEncoder.encode(user.getPassword()));
        userInfo.setLastName(StringUtils.capitalize(user.getLastName()));
        userInfo.setFirstName(StringUtils.capitalize(user.getFirstName()));
        userDao.save(userInfo);
        return userInfo;
    }
}
