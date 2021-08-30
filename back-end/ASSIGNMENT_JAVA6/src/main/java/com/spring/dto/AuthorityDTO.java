package com.spring.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the authorities database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityDTO implements Serializable {
	private static final long serialVersionUID = 1L;


	private Integer id;

	@NotNull
	private Integer accountId;

	@NotBlank
	private String roleId;

	

}