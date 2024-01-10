package com.rang.book.service;

import com.rang.book.entity.Book;
import com.rang.book.entity.BookStatus;

import java.util.List;

public interface BookService {

    List<Book> fetchBooks(BookStatus status, Long userId);

    Book addBooks(Book book, Long connectUserId);

    Book updateBook(Book book);

    Book loadBook(String bookId);

}
