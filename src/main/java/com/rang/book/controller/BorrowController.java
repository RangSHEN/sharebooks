package com.rang.book.controller;

import com.rang.book.entity.Borrow;
import com.rang.book.service.BorrowService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin("*")
public class BorrowController {

    private BorrowService borrowService;

    @GetMapping("/borrows")
    public ResponseEntity<List<Borrow>> list(Principal principal){

        List<Borrow> borrows = borrowService.listBorrows(principal);

        return new ResponseEntity<>(borrows, HttpStatus.OK);
    }

    @PostMapping("/borrows/{id}")
    public ResponseEntity<Borrow> create(@PathVariable("id") String bookId, Principal principal){

        Borrow borrow = borrowService.createBorrow(bookId, principal);

        return new ResponseEntity<>(borrow, HttpStatus.CREATED);
    }

    @DeleteMapping("/borrow/{id}")
    public ResponseEntity delete(@PathVariable("id") String borrowId){

        borrowService.delete(borrowId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
