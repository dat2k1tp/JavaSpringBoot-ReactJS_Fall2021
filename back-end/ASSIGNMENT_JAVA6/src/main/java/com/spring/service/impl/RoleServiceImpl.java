package com.spring.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dto.RoleDTO;
import com.spring.entity.Role;
import com.spring.repository.RoleRepository;
import com.spring.service.IRoleService;

@Service
public class RoleServiceImpl implements IRoleService{

	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<RoleDTO> readAll() {
		List<RoleDTO> dtoList= new ArrayList<RoleDTO>();
		List<Role> entityList=roleRepo.findAll();
		for(Role entity:entityList) {
			RoleDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}

	@Override
	public RoleDTO readById(String id) {
		Optional<Role> optional=roleRepo.findById(id);
		if(optional.isPresent()) {
			Role entity=optional.get();
			RoleDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}

	@Override
	public RoleDTO create(RoleDTO dto) {
		Role entity=convertToEntity(dto);
		roleRepo.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public RoleDTO update(RoleDTO dto) {
		Optional<Role> optional=roleRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Role entity=convertToEntity(dto);
			roleRepo.save(entity);
		}
		return dto;
	}

	@Override
	public RoleDTO delete(String id) {
		Optional<Role> optional=roleRepo.findById(id);
		if(optional.isPresent()) {
			Role entity=optional.get();
			RoleDTO dto=convertToDTO(entity);
			roleRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Role convertToEntity(RoleDTO dto) {
		Role entity=this.mapper.map(dto, Role.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public RoleDTO convertToDTO(Role entity) {
		RoleDTO dto=this.mapper.map(entity, RoleDTO.class);
		return dto;
	}

}
