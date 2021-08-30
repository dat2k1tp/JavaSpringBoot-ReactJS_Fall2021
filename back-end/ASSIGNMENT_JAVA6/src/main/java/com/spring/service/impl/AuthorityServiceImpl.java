package com.spring.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dto.AuthorityDTO;
import com.spring.entity.Authority;
import com.spring.repository.AuthorityRepository;
import com.spring.service.IAuthorityService;

@Service
public class AuthorityServiceImpl implements IAuthorityService{

	@Autowired
	AuthorityRepository authorityRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<AuthorityDTO> readAll() {
		List<AuthorityDTO> dtoList= new ArrayList<AuthorityDTO>();
		List<Authority> entityList=authorityRepo.findAll();
		for(Authority entity:entityList) {
			AuthorityDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
//	@Override
//	public List<AuthorityDTO> readAllPaginate(String pageParams, String limitParams) {
//		int page=Integer.parseInt(pageParams);
//		int limit=Integer.parseInt(limitParams);
//		int offset=limit*page;
//		
//		List<AuthorityDTO> dtoList= new ArrayList<AuthorityDTO>();
//		List<Authority> entityList=authorityRepo.findAllPaginate(limit, offset);
//		
//		for(Authority entity:entityList) {
//			AuthorityDTO dto =convertToDTO(entity);
//			dtoList.add(dto);
//		}
//		
//		return dtoList;
//	}

	@Override
	public AuthorityDTO readById(Integer id) {
		Optional<Authority> optional=authorityRepo.findById(id);
		if(optional.isPresent()) {
			Authority entity=optional.get();
			AuthorityDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}

	@Override
	public AuthorityDTO create(AuthorityDTO dto) {
		Authority entity=convertToEntity(dto);
		authorityRepo.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public AuthorityDTO update(AuthorityDTO dto) {
		Optional<Authority> optional=authorityRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Authority entity=convertToEntity(dto);
			authorityRepo.save(entity);
		}
		return dto;
	}

	@Override
	public AuthorityDTO delete(Integer id) {
		Optional<Authority> optional=authorityRepo.findById(id);
		if(optional.isPresent()) {
			Authority entity=optional.get();
			AuthorityDTO dto=convertToDTO(entity);
			authorityRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Authority convertToEntity(AuthorityDTO dto) {
		Authority entity=this.mapper.map(dto, Authority.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public AuthorityDTO convertToDTO(Authority entity) {
		AuthorityDTO dto=this.mapper.map(entity, AuthorityDTO.class);
		return dto;
	}

	

}
