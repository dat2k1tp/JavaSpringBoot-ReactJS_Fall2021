package com.spring.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.AccountDTO;
import com.spring.dto.ChangePasswordDTO;
import com.spring.service.IAccountService;

@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/user")
@RestController
public class AccountController {

	@Autowired
	IAccountService accountService;
	
	
	
	
	@GetMapping()
	public ResponseEntity<List<AccountDTO>> findNativeQuery(@RequestParam String page
			,@RequestParam String limit) {
		  
		List<AccountDTO> newAccDTO = 
				this.accountService.readAllPaginate(page,limit);
		return  ResponseEntity.ok(newAccDTO);
	}
	
	@PostMapping()
	public ResponseEntity<AccountDTO> create(
			@RequestBody @Valid AccountDTO accDTO){
    	accountService.create(accDTO);
		return ResponseEntity.ok(accDTO);
	}
	
	@PutMapping("/soft-delete/{id}")
	public ResponseEntity<AccountDTO> updateDeletedAt(@PathVariable("id") Integer id,
			@RequestParam String deleteAt){
		if(deleteAt!=null) {
			AccountDTO newAccDTO=this.accountService.updateDeleteAt(id, deleteAt);
			return ResponseEntity.ok(newAccDTO);
		}
		return ResponseEntity.notFound().build();
		
	}
	
	@PutMapping("{id}")
	public ResponseEntity<AccountDTO> updateProfile(
			@RequestBody @Valid AccountDTO accDTO){
			
		AccountDTO newAccDTO=this.accountService.update(accDTO);
		return ResponseEntity.ok(newAccDTO);
		
	}
	
	//Change pass
	@PutMapping("/change-password/{id}")
	public ResponseEntity<AccountDTO> changePass(
			@RequestBody @Valid ChangePasswordDTO passDTO){
		AccountDTO newAccDTO=this.accountService.changePassword(passDTO);
		return ResponseEntity.ok(newAccDTO);
		
	}
	
	@GetMapping("/recycle-bin")
	public ResponseEntity<List<AccountDTO>> findRecycleBin(@RequestParam String page
			,@RequestParam String limit) {
		  
		List<AccountDTO> newAccDTO = 
				this.accountService.readAllRecycleBin(page, limit);
		return  ResponseEntity.ok(newAccDTO);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<AccountDTO> delete(@PathVariable("id") Integer id){
		AccountDTO newAccDTO=this.accountService.delete(id);
		return ResponseEntity.ok(newAccDTO);
	}
	
	@GetMapping("/login")
	public ResponseEntity<AccountDTO> login(
			@RequestParam String username,
			@RequestParam String password){
		AccountDTO newAccDTO=this.accountService.loginBasic
				(username, password);
//				System.out.println(encoder.encode(password));
		return ResponseEntity.ok(newAccDTO);
	}
	
}
