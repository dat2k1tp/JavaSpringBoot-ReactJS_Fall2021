package com.spring.service.impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.service.IFileManageService;
@Service
public class FileManageServiceImpl implements IFileManageService{

	String path="D:\\Java6CMS\\Code\\ASSIGNMENT_JAVA6\\src\\main\\resources\\static";
	
	//tao 1 duong dan luu tru khi co 1 thu muc va file
		private Path getPath(String folder,String filename) {
			
			File dir=Paths.get(path,folder).toFile();
			if(!dir.exists()) {
				dir.mkdirs();
			}
			return Paths.get(dir.getAbsolutePath(),filename);
			
		}
	
	
	@Override
	public byte[] read(String folder, String filename) {
		Path path=this.getPath(folder, filename);
		try {
			return Files.readAllBytes(path);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	@Override
	public String save(String folder, MultipartFile file) {
		
		//ten file +time now
		String name=System.currentTimeMillis()+file.getOriginalFilename();
		
		//tao ten file moi +lay duoi file
		String filename=Integer.toHexString(name.hashCode())
				+name.substring(name.lastIndexOf("."));
		//luu file & luu ten file
		Path path=this.getPath(folder, filename);
		try {
			file.transferTo(path);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return filename;
	}

}
