package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority,Integer>{
	@Query(value="SELECT * FROM authorities WHERE limit ?1 offset ?2",
			nativeQuery = true)
    public List<Authority> findAllPaginate(Integer limit,Integer offset);
	
	public List<Authority> findByAccountId(Integer accountId);
}