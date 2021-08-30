package com.spring.service;

import java.util.List;

import org.springframework.data.domain.Page;


import com.spring.dto.ProductDTO;
import com.spring.entity.Product;

public interface IProductService {
	
	public List<ProductDTO> readAll();
	
	public Page<Product> readAllPaginatePage
	(Integer categoryId,Integer pageParams,Integer limitParams);
	
	public Page<Product> readAllPaginatePageNotCateId
	(Integer pageParams,Integer limitParams);
	
	public Page<Product> readAllRecycleBinPage
	(Integer categoryId,Integer pageParams,Integer limitParams);
	
	public ProductDTO readById(Integer id);
	
	public ProductDTO create(ProductDTO dto,Integer categoryId);
	
	public ProductDTO update(ProductDTO dto,Integer categoryId);
	
	//deletedAt is Byte
	public ProductDTO updateDeletedAt(Integer id,String deletedAt);
	
	public ProductDTO delete(Integer id);
}