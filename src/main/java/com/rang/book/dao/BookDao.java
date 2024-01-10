package com.rang.book.dao;

import com.rang.book.entity.Book;
import com.rang.book.entity.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface BookDao extends JpaRepository<Book,Long> {

    List<Book> findByStatusAndUserIdNotAndDeletedFalse( BookStatus bookStatus,Long userId);


    List<Book> findByUserIdAndDeletedFalse(Long id);
}
