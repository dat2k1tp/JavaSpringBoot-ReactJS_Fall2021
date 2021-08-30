package com.spring.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.OrderDTO;
import com.spring.entity.Order;
import com.spring.service.IOrderService;

@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/order")
@RestController
public class OrderController {
	@Autowired
	IOrderService orderService;
	
	@GetMapping()
	public ResponseEntity<Page<Order>> getAllPaginate(
			@RequestParam Integer page
			,@RequestParam Integer limit){
			
		
		Page<Order> pageData= this.orderService
				.readAllPaginatePage(page, limit);
		return ResponseEntity.ok(pageData);
	}
	
	@GetMapping("/account/{id}")
	public ResponseEntity<Page<Order>> getByAccount(
			@PathVariable("id") Integer accountId,
			@RequestParam Integer page
			,@RequestParam Integer limit){
			
		
		Page<Order> pageData= this.orderService
				.readByAccountPaginatePage(accountId, page, limit);
		return ResponseEntity.ok(pageData);
	}
	
	@PostMapping()
	public ResponseEntity<OrderDTO> post(
			@RequestBody @Valid OrderDTO orderDTO){
			
		OrderDTO newDTO=this.orderService.create(orderDTO);
		return ResponseEntity.ok(newDTO);
	}
	
	@PutMapping("/soft-delete/{id}")
	public ResponseEntity<OrderDTO> put(@PathVariable("id") Integer id,
			@RequestParam String deletedAt){
			OrderDTO newAccDTO=this.
					orderService.updateDeletedAt(id, deletedAt);
			return ResponseEntity.ok(newAccDTO);
		
		
	}
	

	
	@GetMapping("/recycle-bin")
	public ResponseEntity<Page<Order>> findRecycleBin(
			@RequestParam Integer page
			,@RequestParam Integer limit){
		
		Page<Order> pageData= this.orderService
				.readAllRecycleBinPage(page,limit);
		return ResponseEntity.ok(pageData);
	}
	
	
	@PutMapping("/status-order/{id}")
	public ResponseEntity<OrderDTO> status(@PathVariable("id") Integer id,
			@RequestParam String status){
			OrderDTO newAccDTO=this.
					orderService.updateStatus(id, status);
			return ResponseEntity.ok(newAccDTO);
		
		
	}
	
}
