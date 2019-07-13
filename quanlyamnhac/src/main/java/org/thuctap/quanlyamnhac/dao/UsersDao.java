package org.thuctap.quanlyamnhac.dao;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thuctap.quanlyamnhac.model.Users;
import org.thuctap.quanlyamnhac.repository.UsersRepository;
import org.thuctap.quanlyamnhac.result.ServiceResult;
import org.thuctap.quanlyamnhac.result.ServiceResult.Status;

@Service
public class UsersDao {

	@Autowired
	UsersRepository userRepo;
	
	@Autowired
	JwtDao jwtDao;
	
	public ServiceResult create(Users user) {
		
		ServiceResult result = new ServiceResult();
		if(userRepo.findByUsername(user.getUsername()) == null) {
			String pwd = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
			user.setPassword(pwd);
			
			result.setData(userRepo.save(user));
			result.setMessage("Create success !");			
		}else {
			result.setStatus(Status.FAILED);
			result.setMessage("user đã tồn tại !");	
		}
		return result;
	}
	
	public ServiceResult edit(Users user, String newpassword) {
		ServiceResult result = new ServiceResult();
		
		if(userRepo.findByUsername(user.getUsername()) == null) {
			result.setStatus(Status.FAILED);
			result.setMessage("Không tìm thấy user !");			
		}else {
			
			Users userol = userRepo.findByUsername(user.getUsername());
			if(BCrypt.checkpw(user.getPassword(), userol.getPassword())) {
				String pwd = BCrypt.hashpw(newpassword, BCrypt.gensalt(12));
				user.setPassword(pwd);
				result.setData(userRepo.save(user));
				result.setMessage("Update success  !");
			}else {
				result.setStatus(Status.FAILED);
				result.setMessage("Mật khẩu cũ không đúng !");	
			}
		}
		return result;
	}
	
	public ServiceResult getOneUser(Users user) {
		ServiceResult result = new ServiceResult();
		Users userOne = userRepo.findByUsername(user.getUsername());
		userOne.setPassword(null);
		result.setData(userOne);
		return result;
	}
	
	
	public ServiceResult checkLogin(String username, String password) {
		ServiceResult result = new ServiceResult();
		if(userRepo.findByUsername(username) == null) {
			result.setMessage("username không đúng");
			result.setStatus(Status.FAILED);
		}else {
			Users user = userRepo.findByUsername(username);
			if(BCrypt.checkpw(password, user.getPassword())) {
				jwtDao.generateTokenLogin(username);
				user.setPassword(null);
				result.setData(user);
			}else {
				result.setMessage("password không đúng");
				result.setStatus(Status.FAILED);
			}
		}
		return result;
	}
	
}
