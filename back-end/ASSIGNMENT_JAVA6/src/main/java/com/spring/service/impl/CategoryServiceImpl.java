package com.spring.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.dto.CategoryDTO;
import com.spring.entity.Category;
import com.spring.repository.CategoryRepository;
import com.spring.service.ICategoryService;

@Service
public class CategoryServiceImpl implements ICategoryService{

	@Autowired
	CategoryRepository categoryRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<CategoryDTO> readAll() {
		List<CategoryDTO> dtoList= new ArrayList<CategoryDTO>();
		List<Category> entityList=categoryRepo.findAll();
		for(Category entity:entityList) {
			CategoryDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	
	@Override
	public Page<Category> readAllPaginatePage
	(String pageParams, String limitParams) {
		Pageable pageable=PageRequest.of(Integer.parseInt(pageParams)
				,Integer.parseInt(limitParams));
		Page<Category> pageData=this.categoryRepo.findAllPaginatePage(pageable);
		return pageData;
	}


	@Override
	public CategoryDTO readById(Integer id) {
		Optional<Category> optional=categoryRepo.findById(id);
		if(optional.isPresent()) {
			Category entity=optional.get();
			CategoryDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}

	@Override
	public CategoryDTO create(CategoryDTO dto) {
		Category entity=convertToEntity(dto);
		entity.setDeletedAt(Byte.parseByte("0"));
		categoryRepo.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public CategoryDTO update(CategoryDTO dto) {
		Optional<Category> optional=categoryRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Category entity=convertToEntity(dto);
			entity.setDeletedAt(Byte.parseByte("0"));
			categoryRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}

	@Override
	public CategoryDTO delete(Integer id) {
		Optional<Category> optional=categoryRepo.findById(id);
		if(optional.isPresent()) {
			Category entity=optional.get();
			CategoryDTO dto=convertToDTO(entity);
			categoryRepo.delete(entity);
			return dto;
		}
		return null;
	}
	

	@Override
	public CategoryDTO updateDeletedAt(Integer id, String deletedAt) {
		Optional<Category> optional=categoryRepo.findById(id);
		CategoryDTO dto=new CategoryDTO();
		if(optional.isPresent()) {
			Category entity=optional.get();
			entity.setDeletedAt(Byte.parseByte(deletedAt));
			categoryRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}
	
	

	@Override
	public Page<Category> readAllRecycleBinPage
	(String pageParams, String limitParams) {
		Pageable pageable=PageRequest.of(Integer.parseInt(pageParams)
				,Integer.parseInt(limitParams));
		Page<Category> pageData=this.categoryRepo.findRecycleBinPage(pageable);
		return pageData;
	}
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Category convertToEntity(CategoryDTO dto) {
		Category entity=this.mapper.map(dto, Category.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public CategoryDTO convertToDTO(Category entity) {
		CategoryDTO dto=this.mapper.map(entity, CategoryDTO.class);
		return dto;
	}



	

}
