package com.rang.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "Book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(name = "title", nullable = false, length = 64)
    private String title;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false)
    //@JsonIgnore //Cannot call sendError() after the response has been committed
    private Category category;

    @Transient
    private Long categoryId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    //@JsonIgnore
    private User user;

    @Basic
    @Column(name = "status", nullable = false)
    private BookStatus status;

    @Basic
    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Borrow> borrow;


    @Override
    public int hashCode() {
        return Objects.hash(id, title, status, deleted);
    }
}
