package com.spring.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the orders database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private Integer id;

	@NotBlank
	private String address;


	private Date createDate;

	
	private Byte deletedAt;

	
	private Byte status;
	

	@NotBlank
	@Pattern(regexp ="(^$|[0-9]{10,11})")
	private String telephone;

	
	private Integer accountId;
	
	private List<OrderDetailDTO> listOrderDetail;

	

}