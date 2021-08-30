package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.OrderDetailDTO;
import com.spring.service.IOrderDetailService;

@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/order-detail")
@RestController
public class OrderDetailController {
	@Autowired
	IOrderDetailService orderDetailService;
	
	@GetMapping()
	public ResponseEntity<List<OrderDetailDTO>> getByOrderId(
			@RequestParam Integer orderId){
			
			
		List<OrderDetailDTO> data= this.orderDetailService.
				readByOrderId(orderId);
				
		return ResponseEntity.ok(data);
	}
}
