package com.spring.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.spring.dto.ProductDTO;
import com.spring.entity.Product;
import com.spring.service.IProductService;

@CrossOrigin(origins = "*")
@RequestMapping("/rest/admin/product")
@RestController
public class ProductController {
	@Autowired
	IProductService productService;
	
	@GetMapping()
	public ResponseEntity<Page<Product>> getAllPaginate(
			@RequestParam Integer page
			,@RequestParam Integer limit,
			@RequestParam Integer categoryId){
		
		Page<Product> pageData= this.productService
				.readAllPaginatePage(categoryId, page, limit);
		return ResponseEntity.ok(pageData);
	}
	
	@GetMapping("/all")
	public ResponseEntity<Page<Product>> getAllPaginateNotCateId(
			@RequestParam Integer page,
			@RequestParam Integer limit){
		
		Page<Product> pageData= this.productService
				.readAllPaginatePageNotCateId(page, limit);
		return ResponseEntity.ok(pageData);
	}
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> getById(@PathVariable("id") Integer id){
		ProductDTO newAccDTO=this.productService.readById(id);
		return ResponseEntity.ok(newAccDTO);
	}
	
	
	@PostMapping()
	public ResponseEntity<ProductDTO> post(
			@RequestBody @Valid ProductDTO productDTO,
			@RequestParam Integer categoryId){
		ProductDTO newDTO=this.productService.create(productDTO, categoryId);
		return ResponseEntity.ok(newDTO);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> put(
			@RequestBody @Valid ProductDTO productDTO
			,@PathVariable("id") Integer id,
			@RequestParam Integer categoryId){
		ProductDTO newDTO=this.productService.update(productDTO, categoryId);
		return ResponseEntity.ok(newDTO);
	}
	
	@PutMapping("/soft-delete/{id}")
	public ResponseEntity<ProductDTO> put(@PathVariable("id") Integer id,
			@RequestParam String deletedAt){
			ProductDTO newAccDTO=this.
					productService.updateDeletedAt(id, deletedAt);
			return ResponseEntity.ok(newAccDTO);
		
		
	}
	
	@GetMapping("/recycle-bin")
	public ResponseEntity<Page<Product>> findRecycleBin(
			@RequestParam Integer page
			,@RequestParam Integer limit,
			@RequestParam Integer categoryId){
		
		Page<Product> pageData= this.productService
				.readAllRecycleBinPage(categoryId,page,limit);
		return ResponseEntity.ok(pageData);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ProductDTO> delete(@PathVariable("id") Integer id){
		ProductDTO newAccDTO=this.productService.delete(id);
		return ResponseEntity.ok(newAccDTO);
	}
	
	
}
