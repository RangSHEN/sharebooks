package com.rang.book.dao;

import com.rang.book.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CategoryDao extends JpaRepository<Category,Long> {


}
