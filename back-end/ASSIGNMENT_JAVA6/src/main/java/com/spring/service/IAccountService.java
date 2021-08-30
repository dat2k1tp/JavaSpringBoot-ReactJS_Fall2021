package com.spring.service;

import java.util.List;

import com.spring.dto.AccountDTO;
import com.spring.dto.ChangePasswordDTO;

public interface IAccountService {
	//deleteAt not deletedAt
	public List<AccountDTO> readAll();
	
	//page&limit is Integer
	public List<AccountDTO> readAllPaginate
	(String pageParams, String limitParams);
	
	public List<AccountDTO> readAllRecycleBin
	(String pageParams, String limitParams);
	
	public AccountDTO readById(Integer id);
	
	public AccountDTO create(AccountDTO dto);
	
	public AccountDTO updateDeleteAt(Integer id,String deleteAt);
	
	public AccountDTO update(AccountDTO dto);
	
	//changePass
	public AccountDTO changePassword(ChangePasswordDTO dto);
	
	public AccountDTO delete(Integer id);
	
	public AccountDTO loginBasic(String username,String password);
}
