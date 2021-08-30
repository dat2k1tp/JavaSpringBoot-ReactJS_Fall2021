package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.entity.Account;

public interface AccountRepository extends JpaRepository<Account,Integer>{
	@Query(value="SELECT * FROM accounts e WHERE e.deleted_at=0 ORDER BY e.id  limit ?1 offset ?2",
			nativeQuery = true)
    public List<Account> findAllPaginate(Integer limit,Integer offset);
	
	@Query(value="SELECT * FROM accounts e WHERE e.deleted_at=1 ORDER BY e.id  limit ?1 offset ?2",
			nativeQuery = true)
    public List<Account> findAllRecycleBin(Integer limit,Integer offset);
	
	@Query("SELECT e FROM Account e WHERE deletedAt=0 AND e.username=:username")
    public Account findAccountLogin(@Param("username")String username);
	
	
}