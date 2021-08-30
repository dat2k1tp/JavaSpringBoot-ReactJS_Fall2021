package com.spring.entity;

import java.io.Serializable;

import javax.persistence.*;

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
@Entity
@Table(name="authorities")
public class Authority implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;

	//bi-directional many-to-one association to Account
	@ManyToOne
	@JoinColumn(name="account_id",referencedColumnName = "id")
	private Account account;

	//bi-directional many-to-one association to Role
	@ManyToOne
	@JoinColumn(name="role_id",referencedColumnName = "id")
	private Role role;

	

}