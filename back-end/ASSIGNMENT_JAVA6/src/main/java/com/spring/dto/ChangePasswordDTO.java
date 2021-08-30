package com.spring.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the accounts database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotNull
	private Integer id;

	
	@NotBlank
	private String password;

	@NotBlank
	private String newPassword;

	@NotBlank
	private String confirmPassword;



	

}