package com.rang.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Email
    @Column(name = "email")
    private String email;

    @Size(min=2, max=25, message = "Le prénom doit faire entre 5 et 25 caractères")
    @Column(name = "first_Name")
    private String firstName;

    @Size(min=2, max=25, message = "Le prénom doit faire entre 5 et 25 caractères")
    @Column(name = "last_Name")
    private String lastName;

    @Basic
    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Book> books;

    @Override
    public int hashCode() {
        return Objects.hash(id, email, firstName, lastName, password);
    }

}
