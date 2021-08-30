package com.spring.service;

import java.util.List;

import com.spring.dto.OrderDetailDTO;

public interface IOrderDetailService {
	
	public List<OrderDetailDTO> readAll();
	
	public OrderDetailDTO readById(Integer id);
	
	//find by order_id
	public List<OrderDetailDTO> readByOrderId(Integer orderId);
	
	public OrderDetailDTO create(OrderDetailDTO dto);
	
	public OrderDetailDTO update(OrderDetailDTO dto);
	
	public OrderDetailDTO delete(Integer id);
}