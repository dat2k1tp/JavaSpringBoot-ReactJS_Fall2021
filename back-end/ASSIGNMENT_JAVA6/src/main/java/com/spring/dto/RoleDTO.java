package com.spring.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the roles database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotBlank
	private String id;

	@NotBlank
	private String name;

	

	
}