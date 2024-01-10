package com.rang.book.controller;


import com.rang.book.dao.BookDao;
import com.rang.book.dao.BorrowDao;
import com.rang.book.dao.UserDao;
import com.rang.book.entity.*;
import com.rang.book.service.BookService;
import com.rang.book.service.CategoryService;
import com.rang.book.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth") //Swagger
@CrossOrigin("*")
public class BookController {

    private BookService bookService;

    private BorrowDao borrowDao;

    private BookDao bookDao;

    private CategoryService categoryService;

    private UserDao userDao;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> fetchBooks(@RequestParam(required = false) BookStatus status, Principal principal){

        Long userConnectedId = this.getUserConnectedId(principal);

        List<Book> books = bookService.fetchBooks(status,userConnectedId);


        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> loadBook(@PathVariable("id") String bookId){
        Book book = bookService.loadBook(bookId);

        return new ResponseEntity<>(book, HttpStatus.OK);
    }


    @PostMapping("/books")
    public ResponseEntity<Book> addBook(@RequestBody @Valid Book book, Principal principal){
        Long userConnectedId = this.getUserConnectedId(principal);
        Book savedBook = bookService.addBooks(book, userConnectedId);

        return new ResponseEntity<>(savedBook , HttpStatus.CREATED);
    }

    @DeleteMapping("books/{id}")
    public ResponseEntity delete(@PathVariable("id") String bookId){
        Optional<Book> bookToDelete = bookDao.findById(Long.valueOf(bookId));
        if(!bookToDelete.isPresent()){
            return new ResponseEntity<>("Book not found", HttpStatus.BAD_REQUEST);
        }

        Book book = bookToDelete.get();
        List<Borrow> borrows = borrowDao.findByBookId(book.getId());

//        borrows.forEach(borrow -> {
//            if (borrow.getCloseDate() == null){
//                User borrower = borrow.getBorrower();
//                return new ResponseEntity(borrower, HttpStatus.CONFLICT);
//            }
//        });
        for (Borrow borrow : borrows) {
            // closeDate = null   borrow en cours
            if (borrow.getCloseDate() == null) {
                User borrower = borrow.getBorrower();
                return new ResponseEntity(borrower, HttpStatus.CONFLICT);
            }
        }

        book.setDeleted(true);
        bookDao.save(book);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") String bookId, @RequestBody @Valid Book book){
        book.setId(Long.valueOf(bookId));
        Book updatedBook = bookService.updateBook(book);

        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> listCategories(){
        List<Category> categories = categoryService.listCategories();

        return new ResponseEntity<>(categories,HttpStatus.OK);
    }


    public Long getUserConnectedId(Principal principal){
        if(!(principal instanceof UsernamePasswordAuthenticationToken)){
            throw new RuntimeException("User not found");
        }

        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;

        User oneByEmail = userDao.findOneByEmail(token.getName());

        return oneByEmail.getId();
    }
}
