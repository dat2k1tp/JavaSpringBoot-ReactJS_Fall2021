package com.spring.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the order_details database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private Integer id;

	@NotNull
	private Double price;

	@NotNull
	private Integer quantity;

	@NotNull
	private Integer orderId;

	@NotNull
	private Integer productId;
	
	//support findByOrderId
	private ProductDTO product;
	




}