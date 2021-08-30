package com.spring.service;

import java.util.List;

import com.spring.dto.AuthorityDTO;

public interface IAuthorityService {
	
	public List<AuthorityDTO> readAll();
	
//	public List<AuthorityDTO> readAllPaginate
//	(String pageParams,String limitParams);
	
	public AuthorityDTO readById(Integer id);
	
	public AuthorityDTO create(AuthorityDTO dto);
	
	public AuthorityDTO update(AuthorityDTO dto);
	
	public AuthorityDTO delete(Integer id);
}