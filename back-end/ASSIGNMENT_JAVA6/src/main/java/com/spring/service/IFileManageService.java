package com.spring.service;



import org.springframework.web.multipart.MultipartFile;

public interface IFileManageService {
	public byte[] read(String folder,String filename);
	
	public String save(String folder,MultipartFile file);
}
