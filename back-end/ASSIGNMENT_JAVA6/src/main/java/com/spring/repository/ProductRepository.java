package com.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Integer>{
	@Query("SELECT entity FROM Product entity WHERE entity.deletedAt=0 AND"
			+ " entity.category.id=:categoryId") 
	public Page<Product> findAllPaginatePage(Pageable pageable,
			@Param("categoryId")Integer id);
	
	@Query("SELECT entity FROM Product entity WHERE entity.deletedAt=1 AND "
			+ "entity.category.id=:categoryId")
	public Page<Product> findRecycleBinPage(Pageable pageable,
			@Param("categoryId")Integer id);
	
	@Query("SELECT entity FROM Product entity WHERE entity.deletedAt=0")
	Page<Product> findAllProduct(Pageable pageable);
}