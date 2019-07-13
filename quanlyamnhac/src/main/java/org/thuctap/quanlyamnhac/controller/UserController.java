package org.thuctap.quanlyamnhac.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thuctap.quanlyamnhac.dao.UsersDao;
import org.thuctap.quanlyamnhac.model.Users;
import org.thuctap.quanlyamnhac.result.ServiceResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/")
public class UserController {

	@Autowired
	UsersDao userDao;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping("/dangky")
	public ResponseEntity<ServiceResult> createUser(@RequestBody Users user){
		return new ResponseEntity<ServiceResult>(userDao.create(user), HttpStatus.OK);
	}
	
	@PostMapping("/user/edit")
	public ResponseEntity<ServiceResult> editUser(@RequestParam("user") String user, 
			@RequestParam("newpassword") String newpassword) throws JsonParseException, JsonMappingException, IOException{
		
		Users usernew = objectMapper.readValue(user, Users.class);
		
		return new ResponseEntity<ServiceResult>(userDao.edit(usernew, newpassword), HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ServiceResult> login(HttpServletRequest request, 
			@RequestParam("username") String username, @RequestParam("password") String password){

		return new ResponseEntity<ServiceResult>(userDao.checkLogin(username, password), HttpStatus.OK);
	}
	
	
}
