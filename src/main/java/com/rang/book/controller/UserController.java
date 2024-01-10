package com.rang.book.controller;

import com.rang.book.dao.UserDao;
import com.rang.book.entity.User;
import com.rang.book.jwt.JwtController;
import com.rang.book.jwt.JwtFilter;
import com.rang.book.jwt.JwtUtils;
import com.rang.book.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("*")
public class UserController {

    private UserService userService;

    private JwtController jwtController;

    private JwtUtils jwtUtils;

    //inscription
    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody @Valid User user){

        User addedUser = userService.addUser(user);

        Authentication authentication = jwtController.logUser(user.getEmail(), user.getPassword());

        String jwt = jwtUtils.generateToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(addedUser,httpHeaders, HttpStatus.CREATED);
    }

    @GetMapping("/isConnected")
    public ResponseEntity getUserConnected(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return new ResponseEntity(((UserDetails) principal).getUsername(), HttpStatus.OK);
        }
        return new ResponseEntity("User is not connected", HttpStatus.FORBIDDEN);
    }

}
