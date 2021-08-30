package com.spring.service.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.spring.dto.ProductDTO;
import com.spring.entity.Product;
import com.spring.repository.ProductRepository;
import com.spring.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService{

	@Autowired
	ProductRepository productRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<ProductDTO> readAll() {
		List<ProductDTO> dtoList= new ArrayList<ProductDTO>();
		List<Product> entityList=productRepo.findAll();
		for(Product entity:entityList) {
			ProductDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public Page<Product> readAllPaginatePageNotCateId(
			Integer pageParams, 
			Integer limitParams) {
		Pageable pageable=PageRequest.of(pageParams,limitParams);
		Page<Product> pageData=this.productRepo.findAllProduct(pageable);
		return pageData;
	}
	
	@Override
	public Page<Product> readAllPaginatePage(
			Integer categoryId,
			Integer pageParams,
			Integer limitParams) {
		Pageable pageable=PageRequest.of(pageParams,limitParams);
				
		Page<Product> pageData=this.productRepo.
				findAllPaginatePage(pageable,categoryId);
		return pageData;
	}

	@Override
	public ProductDTO readById(Integer id) {
		Optional<Product> optional=productRepo.findById(id);
		if(optional.isPresent()) {
			Product entity=optional.get();
			ProductDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}

	@Override
	public ProductDTO create(ProductDTO dto,Integer categoryId) {
		dto.setCategoryId(categoryId);
		dto.setCreateDate(new Date());
	
		dto.setDeletedAt(Byte.parseByte("0"));
		Product entity=convertToEntity(dto);
//		System.out.println(entity.getCreateDate());
		
		productRepo.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public ProductDTO update(ProductDTO dto,Integer categoryId) {
		dto.setCategoryId(categoryId);
		Optional<Product> optional=productRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Product entity=convertToEntity(dto);
			productRepo.save(entity);
		}
		return dto;
	}

	@Override
	public ProductDTO delete(Integer id) {
		Optional<Product> optional=productRepo.findById(id);
		if(optional.isPresent()) {
			Product entity=optional.get();
			ProductDTO dto=convertToDTO(entity);
			productRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	
	@Override
	public Page<Product> readAllRecycleBinPage(
			Integer categoryId,
			Integer pageParams, 
			Integer limitParams) {
		
		Pageable pageable=PageRequest.of(pageParams,limitParams);
		
		Page<Product> pageData=this.productRepo.
				findRecycleBinPage(pageable, categoryId);
		return pageData;
	}

	@Override
	public ProductDTO updateDeletedAt(
			Integer id, 
			String deletedAt) {
		Optional<Product> optional=productRepo.findById(id);
		ProductDTO dto=new ProductDTO();
		
		if(optional.isPresent()) {
			Product entity=optional.get();
			entity.setDeletedAt(Byte.parseByte(deletedAt));
			productRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Product convertToEntity(ProductDTO dto) {
		Product entity=this.mapper.map(dto, Product.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public ProductDTO convertToDTO(Product entity) {
		ProductDTO dto=this.mapper.map(entity, ProductDTO.class);
		return dto;
	}

	

	

	

}
