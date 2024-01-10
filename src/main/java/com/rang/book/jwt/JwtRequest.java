package com.rang.book.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * corps de requete http qui contiendra notre email et password
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtRequest {

    private String email;
    private String password;
}
