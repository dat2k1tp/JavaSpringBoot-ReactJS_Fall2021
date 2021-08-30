package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer>{
	public List<OrderDetail> findByOrderId(Integer orderId);
}