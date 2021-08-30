package com.spring.controller;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.service.IFileManageService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/file")
public class FileManagerController {
	@Autowired
	IFileManageService fileManageService;
	
	//doc  1 file
		@GetMapping("/{folder}/{file}")
		public byte[] getOneFile(@PathVariable("folder") String folder,
				@PathVariable("file") String file) {
			System.out.println("--READ FILE");
			return fileManageService.read(folder, file);
		}
		
		//upload file theo folder
		@PostMapping("/{folder}")
		public String upload(@PathVariable("folder") String folder,
				@PathParam("file") MultipartFile file){
			System.out.println("--UPFILE FILE");
			return fileManageService.save(folder, file);
		}
}
