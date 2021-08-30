package com.spring.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.AuthorityDTO;
import com.spring.service.IAccountService;
import com.spring.service.IAuthorityService;
import com.spring.service.IRoleService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/authority")
public class AuthorityController {
	@Autowired
	IAccountService accountService;
	
	@Autowired
	IRoleService roleService;
	
	@Autowired
	IAuthorityService authorityService;
	
	
	@GetMapping()
	public  ResponseEntity<Map<String,Object>> getAuthorities(
//			@RequestParam String page,@RequestParam String limit
			){
		if(authorityService.readAll().isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		Map<String,Object> data=new HashMap<String, Object>();
		data.put("authorities",authorityService.readAll());
		data.put("roles",roleService.readAll());
		data.put("accounts",accountService.readAll());
		
		return ResponseEntity.ok(data);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<AuthorityDTO> delete(@PathVariable("id") Integer id){
		return ResponseEntity.ok(authorityService.delete(id));
	}
	
	@PostMapping()
	public ResponseEntity<AuthorityDTO> create(@RequestBody AuthorityDTO dto){
		return ResponseEntity.ok(authorityService.create(dto));
	}
}
