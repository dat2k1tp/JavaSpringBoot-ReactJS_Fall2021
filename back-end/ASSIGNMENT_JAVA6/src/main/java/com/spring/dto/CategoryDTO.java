package com.spring.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the categories database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private Integer id;

	
	private Byte deletedAt;

	@NotBlank
	private String name;


	

}