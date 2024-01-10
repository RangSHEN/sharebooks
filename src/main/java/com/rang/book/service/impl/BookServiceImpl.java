package com.rang.book.service.impl;

import com.rang.book.dao.BookDao;
import com.rang.book.dao.BorrowDao;
import com.rang.book.dao.CategoryDao;
import com.rang.book.dao.UserDao;
import com.rang.book.entity.*;
import com.rang.book.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {


    private BookDao bookDao;

    private CategoryDao categoryDao;

    private UserDao userDao;

    private BorrowDao borrowDao;

    @Override
    public List<Book> fetchBooks(BookStatus status, Long userId) {

        List<Book> books;

        if(status != null && status == BookStatus.FREE){
            books = bookDao.findByStatusAndUserIdNotAndDeletedFalse(status,userId);
        } else {
            books = bookDao.findByUserIdAndDeletedFalse(userId);
        }

        return books;
    }

    @Override
    public Book addBooks(Book book, Long connectUserId) {

        Optional<User> optionalUser = userDao.findById(connectUserId);
        //Cannot invoke "com.rang.book.entity.Category.getId()" because the return value of "com.rang.book.entity.Book.getCategory()" is null
        //Optional<Category> optionalCategory = categoryDao.findById(book.getCategory().getId());
        //solutuion     @Transient
        //    private Long categoryId;
        Optional<Category> optionalCategory = categoryDao.findById(book.getCategoryId());

        if(optionalUser.isPresent()){
            book.setUser(optionalUser.get());
        }else {
            throw new RuntimeException("You must provide a valid user");
        }
        if(optionalCategory.isPresent()){
            book.setCategory(optionalCategory.get());
        }else {
            throw new RuntimeException("You must provide a valid category");
        }

        book.setDeleted(false);
        book.setStatus(BookStatus.FREE);
        return bookDao.save(book);
    }

    @Override
    public Book updateBook(Book book) {
        Book existingBook = bookDao.findById(book.getId()).orElseThrow(() -> new RuntimeException("Book not found"));

        existingBook.setCategory(categoryDao.findById(book.getCategoryId()).get());
        existingBook.setTitle(book.getTitle());
        return bookDao.save(existingBook);

    }

    @Override
    public Book loadBook(String bookId) {
        Book book = bookDao.findById(Long.valueOf(bookId)).orElseThrow(
                () -> new RuntimeException("Book not found")
        );

        return book;
    }


}
