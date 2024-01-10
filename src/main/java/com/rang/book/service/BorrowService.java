package com.rang.book.service;

import com.rang.book.entity.Borrow;
import com.rang.book.entity.User;

import java.security.Principal;
import java.util.List;

public interface BorrowService {


    List<Borrow> listBorrows(Principal principal);

    Borrow createBorrow(String bookId, Principal principal);

    void delete(String borrowId);
}
