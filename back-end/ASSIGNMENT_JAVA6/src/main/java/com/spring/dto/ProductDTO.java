package com.spring.dto;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the products database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private Integer id;

	@NotNull
	private Integer available;

	
	private Date createDate;

	
	private Byte deletedAt;

	
	private String image;

	@NotBlank
	private String name;

	@NotNull
	private Double price;

	
	private Integer categoryId;


}