package com.rang.book.dao;

import com.rang.book.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserDao extends JpaRepository<User, Long> {

    User findOneByEmail(String email); //shift + f6
}
