package com.rang.book.dao;

import com.rang.book.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


public interface BorrowDao extends JpaRepository<Borrow, Long> {

    List<Borrow> findByBorrowerId(Long borrowerid);

    List<Borrow> findByBookId(Long bookid);
}
