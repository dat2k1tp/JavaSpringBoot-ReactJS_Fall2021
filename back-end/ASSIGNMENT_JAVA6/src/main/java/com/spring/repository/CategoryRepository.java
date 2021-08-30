package com.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer>{
	@Query("SELECT entity FROM Category entity WHERE entity.deletedAt=0") 
	public Page<Category> findAllPaginatePage(Pageable pageable);
	
	@Query("SELECT entity FROM Category entity WHERE entity.deletedAt=1")
	public Page<Category> findRecycleBinPage(Pageable pageable);
}
