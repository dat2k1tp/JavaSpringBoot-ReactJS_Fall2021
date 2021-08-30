package com.spring.service;

import java.util.List;

import org.springframework.data.domain.Page;


import com.spring.dto.OrderDTO;
import com.spring.entity.Order;

public interface IOrderService {
	
	public List<OrderDTO> readAll();
	
	//page&limit is Integer
	public Page<Order> readAllPaginatePage
		(Integer pageParams, Integer limitParams);
		
	public Page<Order> readAllRecycleBinPage
		(Integer pageParams, Integer limitParams);
	
	public Page<Order> readByAccountPaginatePage
	(Integer accountId,Integer pageParams, Integer limitParams);
	
	public OrderDTO readById(Integer id);
	
	
	public OrderDTO create(OrderDTO dto);
	
	public OrderDTO update(OrderDTO dto);
	
	//deletedAt is Byte
	public OrderDTO updateDeletedAt(Integer id,String deletedAt);
	
	//status is Byte
	public OrderDTO updateStatus(Integer id,String status);
	
	public OrderDTO delete(Integer id);
}