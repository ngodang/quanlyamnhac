package org.thuctap.quanlyamnhac.dao;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thuctap.quanlyamnhac.model.Artists;
import org.thuctap.quanlyamnhac.repository.ArtistsRepository;
import org.thuctap.quanlyamnhac.result.FileException;
import org.thuctap.quanlyamnhac.result.ServiceResult;
import org.thuctap.quanlyamnhac.result.ServiceResult.Status;


@Service
public class ArtistsDao {
	
	@Autowired
	ArtistsRepository artistrepossitory;
	
	@Autowired
	uploadFile upload;
	
	public ServiceResult createNghesi(Artists artist, MultipartFile file) {
		ServiceResult result = new ServiceResult();
		
		try {
			if(file == null) {
				result.setData(artistrepossitory.save(artist));
				result.setMessage("Thêm thành công");				
			}else {
		    	
				if (!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
					throw new FileException("Vui lòng chọn file ảnh");
				}
				String fileName = upload.storeFile(file);
		        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
		                .path("/nghesi/image/")
		                .path(fileName)
		                .toUriString();
		        artist.setImage(fileDownloadUri);
		        result.setData(artistrepossitory.save(artist));
				result.setMessage("Thêm thành công");
			}
		}catch(ConstraintViolationException ex) {
			result.setStatus(Status.FAILED);
			result.setMessage("Có lỗi xảy ra");
	    }
		return result;
	}
	
	public ServiceResult findAll() {
		ServiceResult result = new ServiceResult();
		result.setData(artistrepossitory.findAll());
		return result;
	}
	
	public ServiceResult findOne(Long artistId) {
		ServiceResult result = new ServiceResult();
		result.setData(artistrepossitory.findById(artistId));
		return result;
	}
	
	public ServiceResult findByArtistName(String sreachname) {
		ServiceResult result = new ServiceResult();
		String artistname = "%"+sreachname+"%";
		result.setData(artistrepossitory.findByArtistnameLike(artistname));
		return result;
	}
	
	public ServiceResult updateNghesi(Artists artist, MultipartFile file) {
		ServiceResult result = new ServiceResult();
		String filepath = artistrepossitory.findAnhdaidien(artist.getArtistId());
		String[] strr = filepath.split("/");
		String filenameold = strr[strr.length - 1];
		if(file == null) {
			artist.setImage(filepath);
			result.setData(artistrepossitory.save(artist));
			result.setMessage("edit success !");
		}else {
			if (!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
				throw new FileException("Vui lòng chọn file ảnh");
			}
			
			String fileName = upload.storeFile(file);
	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/nghesi/image/")
	                .path(fileName)
	                .toUriString();
	        artist.setImage(fileDownloadUri);
	        result.setData(artistrepossitory.save(artist));
			result.setMessage("edit success !");
			if(!filenameold.equals("defaultimage.png"))
				upload.deleteFile(filenameold);
		}
		
		return result;
	}
	
	public ServiceResult deleteNghesi(Long artistId) {
		ServiceResult result = new ServiceResult();
		String filepath = artistrepossitory.findAnhdaidien(artistId);
		String[] strr = filepath.split("/");
		String filenameold = strr[strr.length - 1];
		artistrepossitory.deleteById(artistId);
		if(!filenameold.equals("defaultimage.png"))
			upload.deleteFile(filenameold);
		result.setMessage("delete success !");
		return result;
	}
}
