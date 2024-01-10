package com.rang.book.jwt;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.rang.book.jwt.JwtFilter.AUTHORIZATION_HEADER;

@RestController
@AllArgsConstructor
public class JwtController {

    private JwtUtils jwtUtils;

    private AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/authenticate") //.requestMatchers("/authenticate").permitAll().anyRequest().authenticated()
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest jwtRequest){
        Authentication authentication = logUser(jwtRequest.getEmail(), jwtRequest.getPassword());

        String jwt = jwtUtils.generateToken(authentication);

        //renvoyer ce token aux clients
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(AUTHORIZATION_HEADER, "Bearer " + jwt);
        Object principal = authentication.getPrincipal();  //principal.toString() = email que user connecte
        return new ResponseEntity<>(new JwtResponse(((User) principal).getUsername()),httpHeaders, HttpStatus.OK);
    }

    //authenticationManagerBuilder recupere les informations viennent de myUserDetailServiceImpl
    public Authentication logUser(String email, String password) {

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }
}
