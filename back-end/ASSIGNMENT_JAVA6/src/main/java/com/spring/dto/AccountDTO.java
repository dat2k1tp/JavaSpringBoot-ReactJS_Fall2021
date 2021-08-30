package com.spring.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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
public class AccountDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private Integer id;

	
	private Byte deletedAt;
	
	@Email
	@NotBlank
	private String email;
	
	@NotBlank
	private String name;

	@NotBlank
	private String password;

	
	private String photo;

	@NotBlank
	private String username;


	private List<String> roles;

	

}