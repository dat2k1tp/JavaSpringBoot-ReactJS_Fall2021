package com.spring.config;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(BindException.class)
	public ResponseEntity<String> handleBindException(BindException e) {
		System.out.println(e.getBindingResult().
				getAllErrors());
		return ResponseEntity.status(400).body("Request không hợp lệ");
	}
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleUnwantedException(Exception e) {
        // Log lỗi ra và ẩn đi message thực sự 
        e.printStackTrace();
        return ResponseEntity.status(500).body("Unknow error");
    }
	
	
}
