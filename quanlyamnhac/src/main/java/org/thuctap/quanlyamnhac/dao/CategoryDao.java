package org.thuctap.quanlyamnhac.dao;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thuctap.quanlyamnhac.model.Category;
import org.thuctap.quanlyamnhac.repository.CategoryRepository;
import org.thuctap.quanlyamnhac.result.ServiceResult;
import org.thuctap.quanlyamnhac.result.ServiceResult.Status;

@Service
public class CategoryDao {

	@Autowired
	CategoryRepository categoryRepo;
	
	public ServiceResult createAndUpdate(Category category) {
		ServiceResult result = new ServiceResult();
		try {
			result.setData(categoryRepo.save(category));
			result.setMessage("success !");
		} catch (ConstraintViolationException e) {
			result.setStatus(Status.FAILED);
			result.setMessage("Có lỗi xảy ra");
		}
		return result;
	}
	
	public ServiceResult findAll() {
		ServiceResult result = new ServiceResult();
		result.setData(categoryRepo.findAll());
		return result;
	}
	
	public ServiceResult findByName(String sreachname) {
		ServiceResult result = new ServiceResult();
		String categoryname = "%"+sreachname+"%";
		result.setData(categoryRepo.findByCategorynameLike(categoryname));
		return result;
	}
	
	public ServiceResult delete(Long categoryId) {
		ServiceResult result = new ServiceResult();
		categoryRepo.deleteById(categoryId);
		result.setMessage("delete success !");
		return result;		
	}
}
