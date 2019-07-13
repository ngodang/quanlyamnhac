package org.thuctap.quanlyamnhac.controller;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thuctap.quanlyamnhac.dao.CategoryDao;
import org.thuctap.quanlyamnhac.model.Category;
import org.thuctap.quanlyamnhac.result.ServiceResult;

@RestController
@RequestMapping("/theloai")
public class CategoryController {
	
	@Autowired
	CategoryDao categoryDao;
	
	@PostMapping("/createandedit")
	public ResponseEntity<ServiceResult> createCategory(@RequestBody Category category){
		return new ResponseEntity<ServiceResult>(categoryDao.createAndUpdate(category), HttpStatus.OK);
	}

	@GetMapping("/lists")
	public ResponseEntity<ServiceResult> findAll(){
		return new ResponseEntity<ServiceResult>(categoryDao.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/listsfindname")
	public ResponseEntity<ServiceResult> findByName(@PathParam("categoryname") String sreachname){
		return new ResponseEntity<ServiceResult>(categoryDao.findByName(sreachname), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{theloaiId}")
	public ResponseEntity<ServiceResult> delete(@PathVariable("theloaiId") Long categoryId){
		return new ResponseEntity<ServiceResult>(categoryDao.delete(categoryId), HttpStatus.OK);
	}
}
