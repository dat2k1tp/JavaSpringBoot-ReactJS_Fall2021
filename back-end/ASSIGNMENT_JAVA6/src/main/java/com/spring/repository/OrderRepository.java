package com.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.entity.Order;

public interface OrderRepository extends JpaRepository<Order,Integer>{
	@Query("SELECT entity FROM Order entity WHERE entity.deletedAt=0") 
	public Page<Order> findAllPaginatePage(Pageable pageable);
	
	@Query("SELECT entity FROM Order entity WHERE entity.deletedAt=1")
	public Page<Order> findRecycleBinPage(Pageable pageable);
	
	@Query("SELECT entity FROM Order entity WHERE entity.deletedAt=0 AND "
			+ "entity.account.id=:accountId") 
	public Page<Order> findByAccountPaginatePage
	(Pageable pageable,@Param("accountId") Integer accountId);
	
	
}