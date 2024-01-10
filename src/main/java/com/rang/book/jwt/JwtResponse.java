package com.rang.book.jwt;

public class JwtResponse {

    private String userName;
    public JwtResponse(String userName) {

        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
