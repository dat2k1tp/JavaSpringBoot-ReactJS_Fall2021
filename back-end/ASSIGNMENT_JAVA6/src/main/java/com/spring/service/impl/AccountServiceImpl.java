package com.spring.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.dto.AccountDTO;
import com.spring.dto.ChangePasswordDTO;
import com.spring.entity.Account;
import com.spring.entity.Authority;
import com.spring.entity.Role;
import com.spring.repository.AccountRepository;
import com.spring.repository.AuthorityRepository;
import com.spring.repository.RoleRepository;
import com.spring.service.IAccountService;


@Service
public class AccountServiceImpl implements IAccountService{

	@Autowired
	AccountRepository accountRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	AuthorityRepository authorityRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	BCryptPasswordEncoder encoder;
	
	
	
	@Override
	public List<AccountDTO> readAll() {
		List<AccountDTO> dtoList= new ArrayList<AccountDTO>();
		List<Account> entityList=accountRepo.findAll();
		for(Account entity:entityList) {
			AccountDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
		
		
	}
	
	
	@Override
	public List<AccountDTO> readAllPaginate(String pageParams, String limitParams) {
		int page=Integer.parseInt(pageParams);
		int limit=Integer.parseInt(limitParams);
		int offset=limit*page;
		
		List<AccountDTO> dtoList= new ArrayList<AccountDTO>();
		List<Account> entityList=accountRepo.findAllPaginate(limit, offset);
		
		for(Account entity:entityList) {
			AccountDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
		
	}

	@Override
	public AccountDTO readById(Integer id) {
		Optional<Account> optional=accountRepo.findById(id);
		if(optional.isPresent()) {
			Account entity=optional.get();
			AccountDTO dto=convertToDTO(entity);
			return dto;
		}
		return null;
	}

	@Override
	public AccountDTO create(AccountDTO dto) {
		dto.setPassword(encoder.encode(dto.getPassword()));
		Account entity=convertToEntity(dto);
		entity.setDeletedAt(Byte.parseByte("0"));
		accountRepo.save(entity);
		dto.setId(entity.getId());
		
		//save authority, phan quyen mac dinh la user
		
		
			Authority userRole= new Authority();
			
			Role roleNew=roleRepo.findById("USER").get();
			userRole.setRole(roleNew);
			System.out.println(roleNew);
			
			userRole.setAccount(entity);
			
			authorityRepo.save(userRole);
		
		return dto;
		
	}

	@Override
	public AccountDTO updateDeleteAt(Integer id,String deleteAt) {
		Optional<Account> optional=accountRepo.findById(id);
		AccountDTO dto=new AccountDTO();
		if(optional.isPresent()) {
			Account entity=optional.get();
			entity.setDeletedAt(Byte.parseByte(deleteAt));
			accountRepo.save(entity);
			dto=convertToDTO(entity);
		}
		return dto;
	}
	
	@Override
	public AccountDTO update(AccountDTO dto) {
		Optional<Account> optional=accountRepo.findById(dto.getId());
		if(optional.isPresent()) {
			Account entity=convertToEntity(dto);
			entity.setDeletedAt(Byte.parseByte("0"));
			accountRepo.save(entity);
		}
		return dto;
	}

	@Override
	public AccountDTO delete(Integer id) {
		Optional<Account> optional=accountRepo.findById(id);
		if(optional.isPresent()) {
			Account entity=optional.get();
			AccountDTO dto=convertToDTO(entity);
			accountRepo.delete(entity);
			return dto;
		}
		return null;
	}
	
	
	@Override
	public List<AccountDTO> readAllRecycleBin(String pageParams, String limitParams) {
		int page=Integer.parseInt(pageParams);
		int limit=Integer.parseInt(limitParams);
		int offset=limit*page;
		
		List<AccountDTO> dtoList= new ArrayList<AccountDTO>();
		List<Account> entityList=accountRepo.findAllRecycleBin(limit, offset);
		
		for(Account entity:entityList) {
			AccountDTO dto =convertToDTO(entity);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	//	LOGIN BASIC 
	
	@Override
	public AccountDTO loginBasic(String username, String password) {
		Account entity=accountRepo.findAccountLogin(username);
		AccountDTO dto =new AccountDTO();
		
		if(entity!=null) {
			List<Authority> listAuth=authorityRepo.findByAccountId(entity.getId());
			List<String> listRole=new ArrayList<String>();
			if(encoder.matches(password,entity.getPassword())) {
				dto=convertToDTO(entity);
				// set role
				listAuth.forEach(e->{
					listRole.add(e.getRole().getId());
				});
				dto.setRoles(listRole);
				return dto;
			}
		}
		return dto;
			
		
	}
	
	//change Pass
	@Override
	public AccountDTO changePassword(ChangePasswordDTO dto) {
		Optional<Account> optional=accountRepo.findById(dto.getId());
		AccountDTO newDTO=new AccountDTO();
		if(optional.isPresent()) {
			Account entity=optional.get();
			if(encoder.matches(dto.getPassword(),entity.getPassword())) {
				entity.setPassword(encoder.encode(dto.getNewPassword()));
			}
			entity.setDeletedAt(Byte.parseByte("0"));
			accountRepo.save(entity);
			newDTO=convertToDTO(entity);
		}
		return newDTO;
	}

	
	
	
	/**
	 * <b>Convert DTO to Entity</b>
	 * ModelMapper version 2.4.4
	 */
	public Account convertToEntity(AccountDTO dto) {
		Account entity=this.mapper.map(dto, Account.class);
		return entity;
	}
	
	/**
	 * <b>Convert Entity to DTO</b>
	 * ModelMapper version 2.4.4
	 */
	public AccountDTO convertToDTO(Account entity) {
		AccountDTO dto=this.mapper.map(entity, AccountDTO.class);
		return dto;
	}


	



	


	

	

}
