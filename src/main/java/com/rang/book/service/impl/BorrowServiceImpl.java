package com.rang.book.service.impl;

import com.rang.book.controller.BookController;
import com.rang.book.dao.BookDao;
import com.rang.book.dao.BorrowDao;
import com.rang.book.dao.UserDao;
import com.rang.book.entity.Book;
import com.rang.book.entity.BookStatus;
import com.rang.book.entity.Borrow;
import com.rang.book.entity.User;
import com.rang.book.service.BorrowService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BorrowServiceImpl implements BorrowService {


    private BorrowDao borrowDao;

    private UserDao userDao;

    private BookDao bookDao;

    private BookController bookController;

    @Override
    public List<Borrow> listBorrows(Principal principal) {
        List<Borrow> borrows = borrowDao.findByBorrowerId(bookController.getUserConnectedId(principal));

        return borrows;
    }

    @Override
    public Borrow createBorrow(String bookId, Principal principal) {
        Long userConnectedId = bookController.getUserConnectedId(principal);
        Optional<User> borrower = userDao.findById(userConnectedId);
        Optional<Book> book = bookDao.findById(Long.valueOf(bookId));

        if (borrower.isPresent() && book.isPresent() && book.get().getStatus().equals(BookStatus.FREE)){
            Borrow borrow = new Borrow();
            Book bookEntity = book.get();
            borrow.setBook(bookEntity);
            borrow.setBorrower(borrower.get());
            borrow.setLender(bookEntity.getUser());
            borrow.setAskDate(LocalDate.now());
            Borrow savedBorrow = borrowDao.save(borrow);

            bookEntity.setStatus(BookStatus.BORROWED);
            bookDao.save(bookEntity);

            return savedBorrow;
        } else {

            throw new RuntimeException("Bad Request");
        }
    }

    @Override
    public void delete(String borrowId) {
        Optional<Borrow> borrow = borrowDao.findById(Long.valueOf(borrowId));
        if (borrow.isEmpty()){
            throw new RuntimeException("Borrow not found");
        }

        Borrow borrowEntity = borrow.get();
        borrowEntity.setCloseDate(LocalDate.now());
        borrowDao.save(borrowEntity);

        Book book = borrowEntity.getBook();
        book.setStatus(BookStatus.FREE);
        bookDao.save(book);

    }


}
