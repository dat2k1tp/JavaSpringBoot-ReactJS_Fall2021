package com.spring.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.dto.OrderDTO;
import com.spring.dto.OrderDetailDTO;
import com.spring.entity.Order;
import com.spring.entity.OrderDetail;
import com.spring.entity.Product;
import com.spring.repository.OrderDetailRepository;
import com.spring.repository.OrderRepository;
import com.spring.repository.ProductRepository;
import com.spring.service.IOrderService;

@Service
public class OrderServiceImpl implements IOrderService{

	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	OrderDetailRepository orderDetailRepo;
	
	@Autowired
	ProductRepository productRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<OrderDTO> readAll() {
		List<OrderDTO> dtoList= new ArrayList<OrderDTO>();
		List<Order> entityList=orderRepo.findAll();
		for(Order entity:entityList) {
			OrderDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public Page<Order> readAllPaginatePage(Integer pageParams, Integer limitParams) {
		Pageable pageable=PageRequest.of(pageParams,limitParams);
				
		Page<Order> pageData=this.orderRepo.findAllPaginatePage(pageable);
		return pageData;
	}

	@Override
	public OrderDTO readById(Integer id) {
		Optional<Order> optional=orderRepo.findById(id);
		if(optional.isPresent()) {
			Order entity=optional.get();
			OrderDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}
	
	//find by ACCOUNT
	@Override
	public Page<Order> readByAccountPaginatePage(
			Integer accountId,
			Integer pageParams,
			Integer limitParams) {
		Pageable pageable=PageRequest.of(pageParams,limitParams);
		
		Page<Order> pageData=this.orderRepo.
				findByAccountPaginatePage(pageable, accountId);
		return pageData;
	}

	@Override
	public OrderDTO create(OrderDTO dto) {
		//save order
		dto.setCreateDate(new Date());
		dto.setDeletedAt(Byte.parseByte("0"));
		dto.setStatus(Byte.parseByte("0"));
		Order entity=convertToEntity(dto);
		orderRepo.save(entity);
		dto.setId(entity.getId());
		
		
		//save orderDetail
		List<OrderDetailDTO> listOrderDetailDTO=dto.getListOrderDetail();
		List<OrderDetail> listOrderDetail= listOrderDetailDTO.stream().map(e->{
			OrderDetail orderDetail=new OrderDetail();
			orderDetail.setOrder(entity);
			orderDetail.setPrice(e.getPrice());  
			orderDetail.setQuantity(e.getQuantity());
			Optional<Product> optional =productRepo.findById(e.getProductId());
					if(optional.isPresent()) {
						orderDetail.setProduct(optional.get());
					}
				return orderDetail;
		}).collect(Collectors.toList());
		
		
		orderDetailRepo.saveAll(listOrderDetail);
		
		
		return dto;
	}

	@Override
	public OrderDTO update(OrderDTO dto) {
		Optional<Order> optional=orderRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Order entity=convertToEntity(dto);
			orderRepo.save(entity);
		}
		return dto;
	}
	
	

	@Override
	public OrderDTO updateStatus(Integer id, String status) {
		Optional<Order> optional=orderRepo.findById(id);
		OrderDTO dto=new OrderDTO();
		if(optional.isPresent()) {
			Order entity=optional.get();
			entity.setStatus(Byte.parseByte(status));;
			orderRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}

	@Override
	public OrderDTO delete(Integer id) {
		Optional<Order> optional=orderRepo.findById(id);
		if(optional.isPresent()) {
			Order entity=optional.get();
			OrderDTO dto=convertToDTO(entity);
			orderRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	//RECYCLE BIN
	@Override
	public Page<Order> readAllRecycleBinPage(Integer pageParams, Integer limitParams) {
		Pageable pageable=PageRequest.of(pageParams,limitParams);
		
		Page<Order> pageData=this.orderRepo.findRecycleBinPage(pageable);
		return pageData;
	}
	
	
	@Override
	public OrderDTO updateDeletedAt(Integer id, String deletedAt) {
		Optional<Order> optional=orderRepo.findById(id);
		OrderDTO dto=new OrderDTO();
		if(optional.isPresent()) {
			Order entity=optional.get();
			entity.setDeletedAt(Byte.parseByte(deletedAt));
			orderRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}

	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Order convertToEntity(OrderDTO dto) {
		Order entity=this.mapper.map(dto, Order.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public OrderDTO convertToDTO(Order entity) {
		OrderDTO dto=this.mapper.map(entity, OrderDTO.class);
		return dto;
	}

	
	
	

	

	

	

	

}
