package com.spring.controller;



import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.CategoryDTO;
import com.spring.entity.Category;
import com.spring.service.ICategoryService;

@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/category")
@RestController
public class CategoryController {
	@Autowired
	ICategoryService categoryService;
	
	@GetMapping()
	public ResponseEntity<Page<Category>> getAllPaginate(@RequestParam String page
			,@RequestParam String limit){
		
		Page<Category> pageData= this.categoryService
				.readAllPaginatePage(page, limit);
		return ResponseEntity.ok(pageData);
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<List<CategoryDTO>> getAll(){
		List<CategoryDTO> listData=this.categoryService.readAll();
		return ResponseEntity.ok(listData);
	}
	
	
	@PostMapping()
	public ResponseEntity<CategoryDTO> post(@RequestBody @Valid CategoryDTO cateDTO){
		CategoryDTO newDTO=this.categoryService.create(cateDTO);
		return ResponseEntity.ok(newDTO);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<CategoryDTO> put(@RequestBody @Valid CategoryDTO cateDTO
			,@PathVariable("id") Integer id){
		CategoryDTO newDTO=this.categoryService.update(cateDTO);
		return ResponseEntity.ok(newDTO);
	}
	
	@PutMapping("/soft-delete/{id}")
	public ResponseEntity<CategoryDTO> put(@PathVariable("id") Integer id,
			@RequestParam String deletedAt){
			CategoryDTO newAccDTO=this.
					categoryService.updateDeletedAt(id, deletedAt);
			return ResponseEntity.ok(newAccDTO);
		
		
	}
	
	@GetMapping("/recycle-bin")
	public ResponseEntity<Page<Category>> findRecycleBin(@RequestParam String page
			,@RequestParam String limit){
		
		Page<Category> pageData= this.categoryService
				.readAllRecycleBinPage(page, limit);
		return ResponseEntity.ok(pageData);
	}
	
}
