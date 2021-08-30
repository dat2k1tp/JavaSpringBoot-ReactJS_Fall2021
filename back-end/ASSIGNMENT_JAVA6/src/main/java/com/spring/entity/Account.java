package com.spring.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the accounts database table.
 * 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="accounts")
public class Account implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;

	@Column(name="deleted_at")
	private Byte deletedAt;
	
	@Column(name="email")
	private String email;
	
	@Column(name="name")
	private String name;

	@Column(name="password")
	private String password;

	@Column(name="photo")
	private String photo;

	@Column(name="username")
	private String username;

	//bi-directional many-to-one association to Authority
	@JsonIgnore
	@OneToMany(mappedBy="account")
	private List<Authority> authorities;

	//bi-directional many-to-one association to Order
	@JsonIgnore
	@OneToMany(mappedBy="account")
	private List<Order> orders;

	

}