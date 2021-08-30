package com.spring.service;

import java.util.List;

import com.spring.dto.RoleDTO;

public interface IRoleService {
	
	public List<RoleDTO> readAll();
	
	public RoleDTO readById(String id);
	
	public RoleDTO create(RoleDTO dto);
	
	public RoleDTO update(RoleDTO dto);
	
	public RoleDTO delete(String id);
}