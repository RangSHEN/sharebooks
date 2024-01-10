package com.rang.book.service.impl;

import com.rang.book.dao.CategoryDao;
import com.rang.book.entity.Category;
import com.rang.book.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryDao categoryDao;

    @Override
    public List<Category> listCategories() {


        return categoryDao.findAll();
    }
}
