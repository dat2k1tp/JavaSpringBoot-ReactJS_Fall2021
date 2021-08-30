package com.spring.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dto.OrderDetailDTO;
import com.spring.entity.OrderDetail;
import com.spring.repository.OrderDetailRepository;
import com.spring.service.IOrderDetailService;

@Service
public class OrderDetailServiceImpl implements IOrderDetailService{

	@Autowired
	OrderDetailRepository orderDetailRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<OrderDetailDTO> readAll() {
		List<OrderDetailDTO> dtoList= new ArrayList<OrderDetailDTO>();
		List<OrderDetail> entityList=orderDetailRepo.findAll();
		for(OrderDetail entity:entityList) {
			OrderDetailDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}

	@Override
	public OrderDetailDTO readById(Integer id) {
		Optional<OrderDetail> optional=orderDetailRepo.findById(id);
		if(optional.isPresent()) {
			OrderDetail entity=optional.get();
			OrderDetailDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}
	
	//find by order_id
	@Override
	public List<OrderDetailDTO> readByOrderId(Integer orderId) {
		List<OrderDetailDTO> dtoList= new ArrayList<OrderDetailDTO>();
		List<OrderDetail> entityList=orderDetailRepo.findByOrderId(orderId);
		for(OrderDetail entity:entityList) {
			OrderDetailDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
		
	}


	@Override
	public OrderDetailDTO create(OrderDetailDTO dto) {
		OrderDetail entity=convertToEntity(dto);
		orderDetailRepo.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public OrderDetailDTO update(OrderDetailDTO dto) {
		Optional<OrderDetail> optional=orderDetailRepo.findById(dto.getId());
		if(optional.isPresent()) {
			OrderDetail entity=convertToEntity(dto);
			orderDetailRepo.save(entity);
		}
		return dto;
	}

	@Override
	public OrderDetailDTO delete(Integer id) {
		Optional<OrderDetail> optional=orderDetailRepo.findById(id);
		if(optional.isPresent()) {
			OrderDetail entity=optional.get();
			OrderDetailDTO dto=convertToDTO(entity);
			orderDetailRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public OrderDetail convertToEntity(OrderDetailDTO dto) {
		OrderDetail entity=this.mapper.map(dto, OrderDetail.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public OrderDetailDTO convertToDTO(OrderDetail entity) {
		OrderDetailDTO dto=this.mapper.map(entity, OrderDetailDTO.class);
		return dto;
	}

	
}
