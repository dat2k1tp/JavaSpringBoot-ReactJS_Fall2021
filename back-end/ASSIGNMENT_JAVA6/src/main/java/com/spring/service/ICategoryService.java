package com.spring.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.spring.dto.CategoryDTO;
import com.spring.entity.Category;

public interface ICategoryService {
	
	public List<CategoryDTO> readAll();
	
	//page&limit is Integer
	public Page<Category> readAllPaginatePage
	(String pageParams,String limitParams);
	
	public Page<Category> readAllRecycleBinPage
	(String pageParams,String limitParams);
	
	public CategoryDTO readById(Integer id);
	
	public CategoryDTO create(CategoryDTO dto);
	
	public CategoryDTO update(CategoryDTO dto);
	
	//deletedAt is Byte
	public CategoryDTO updateDeletedAt(Integer id,String deletedAt);
	
	public CategoryDTO delete(Integer id);
}