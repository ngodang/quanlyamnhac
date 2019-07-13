package org.thuctap.quanlyamnhac.dao;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thuctap.quanlyamnhac.model.Artists;
import org.thuctap.quanlyamnhac.model.Song;
import org.thuctap.quanlyamnhac.repository.ArtistsRepository;
import org.thuctap.quanlyamnhac.repository.SongRepository;
import org.thuctap.quanlyamnhac.result.FileException;
import org.thuctap.quanlyamnhac.result.ServiceResult;
import org.thuctap.quanlyamnhac.result.ServiceResult.Status;

@Service
public class SongDao {

	@Autowired
	SongRepository songRepo;
	
	@Autowired
	ArtistsRepository artistRepo;
	
	@Autowired
	uploadFile upload;
	
	public ServiceResult createSong(Song song, MultipartFile file, String artistname, MultipartFile fileimage, String[] trinhbay){
		
		ServiceResult result = new ServiceResult();
		try {
			if (!(file.getOriginalFilename().endsWith(".mp3") || file.getOriginalFilename().endsWith(".WMA") || file.getOriginalFilename().endsWith(".WAV") || file.getOriginalFilename().endsWith(".mp4") || file.getOriginalFilename().endsWith(".AVI") || file.getOriginalFilename().endsWith(".MKV") || file.getOriginalFilename().endsWith(".WMV"))) {
				throw new FileException("Vui lòng chọn nhạc hoặc video");
			}
			if(fileimage == null) {
				
			}else {
				if (!(fileimage.getOriginalFilename().endsWith(".png") || fileimage.getOriginalFilename().endsWith(".jpeg") || fileimage.getOriginalFilename().endsWith(".jpg"))) {
					throw new FileException("Vui lòng chọn file ảnh");
				}
				String fileNameimage = upload.storeFile(fileimage);
		        String fileDownloadUriimage = ServletUriComponentsBuilder.fromCurrentContextPath()
		                .path("/baihat/image/")
		                .path(fileNameimage)
		                .toUriString();
		        song.setSongimage(fileDownloadUriimage);
		        
			}
			
			String fileName = upload.storeFile(file);
	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/baihat/fileload/")
	                .path(fileName)
	                .toUriString();
	        
	        if(artistRepo.findByArtistname(artistname.trim()) == null) {
	        	result.setStatus(Status.FAILED);
				result.setMessage("Không tìm thấy nghệ sĩ '"+artistname.trim()+"'");
				return result;
	        }
			
	        Artists artist = artistRepo.findByArtistname(artistname);
	        
	        song.setFilepathsong(fileDownloadUri);
	        song.setArtists(artist);
	        
			
			for(String name: trinhbay) {
				System.out.print(name.trim());
				if(artistRepo.findByArtistname(name.trim()) == null) {
					result.setStatus(Status.FAILED);
					result.setMessage("Không tìm thấy nghệ sĩ '"+name.trim()+"'");
					return result;
				}
				Artists artisttrinhbay = artistRepo.findByArtistname(name.trim());
				song.getArtistshow().add(artisttrinhbay);
				artisttrinhbay.getSongshow().add(song);
			}
	        
	        result.setData(songRepo.save(song));
	        result.setMessage("Thêm Thành Công");
		}catch(ConstraintViolationException ex) {
			result.setStatus(Status.FAILED);
			result.setMessage("Có lỗi xảy ra");
	    }
		
		return result;
	}
	
	public ServiceResult editSong(Song song, String tacgia, MultipartFile fileimage, String[] trinhbay) {
		ServiceResult result = new ServiceResult();
		try {
			Song songold = songRepo.findById(song.getSongId()).orElse(null);
			String filepath = songold.getFilepathsong();
			String filepathimage = songold.getSongimage();
			if(fileimage == null) {
				song.setSongimage(filepathimage);
			}else {
				if (!(fileimage.getOriginalFilename().endsWith(".png") || fileimage.getOriginalFilename().endsWith(".jpeg") || fileimage.getOriginalFilename().endsWith(".jpg"))) {
					throw new FileException("Vui lòng chọn file ảnh");
				}
				String fileNameimage = upload.storeFile(fileimage);
		        String fileDownloadUriimage = ServletUriComponentsBuilder.fromCurrentContextPath()
		                .path("/baihat/image/")
		                .path(fileNameimage)
		                .toUriString();
		        song.setSongimage(fileDownloadUriimage);
		        
		        String[] strr = filepathimage.split("/");
				String filenameold = strr[strr.length - 1];
				if(!filenameold.equals("songdefaultimage.jpg"))
					upload.deleteFile(filenameold);
			}
			if(artistRepo.findByArtistname(tacgia.trim()) == null) {
				result.setStatus(Status.FAILED);
				result.setMessage("Không tìm thấy nghệ sĩ '"+tacgia.trim()+"'");
				return result;
	        }
			
	        Artists artisttacgia = artistRepo.findByArtistname(tacgia);
	        
	        song.setArtists(artisttacgia);
			song.setFilepathsong(filepath);
			
			for(String name: trinhbay) {
				if(artistRepo.findByArtistname(name.trim()) == null) {
					result.setStatus(Status.FAILED);
					result.setMessage("Không tìm thấy nghệ sĩ '"+name.trim()+"'");
					return result;
				}
				Artists artisttrinhbay = artistRepo.findByArtistname(name.trim());
				song.getArtistshow().add(artisttrinhbay);
				artisttrinhbay.getSongshow().add(song);
			}
			
	        result.setData(songRepo.save(song));
	        result.setMessage("Sửa thành công");
		}catch(ConstraintViolationException ex) {
			result.setStatus(Status.FAILED);
			result.setMessage("Có lỗi xảy ra");
	    }
		
		return result;
	}
	
	public ServiceResult deleteSong(Long songId) {
		ServiceResult result = new ServiceResult();
		Song songold = songRepo.findById(songId).orElse(null);
		String filepath = songold.getFilepathsong();
		String filepathimage = songold.getSongimage();
		String[] strr = filepath.split("/");
		String filenameold = strr[strr.length - 1];
		
		String[] strrimage = filepathimage.split("/");
		String fileimageold = strrimage[strrimage.length - 1];
		
		songRepo.deleteById(songId);
		upload.deleteFile(filenameold);
		if(!fileimageold.equals("songdefaultimage.jpg"))
			upload.deleteFile(fileimageold);
		result.setMessage("delete success !");
		return result;
	}
	
	public ServiceResult findAll() {
		ServiceResult result = new ServiceResult();
		System.out.println(songRepo.findAll());
		result.setData(songRepo.findAll());
		return result;
	}
	
	public ServiceResult findOne(Long songId) {
		ServiceResult result = new ServiceResult();
		result.setData(songRepo.findById(songId));
		return result;
	}
	
	public ServiceResult findArtist(Long artistId) {
		ServiceResult result = new ServiceResult();
		
		Artists artist = artistRepo.findById(artistId).orElse(null);
		
		result.setData(songRepo.findByArtistshow(artist));
		return result;
	}
	
	public ServiceResult findRanDom(Long songId) {
		ServiceResult result = new ServiceResult();
		result.setData(songRepo.findRanDom(songId));
		return result;
	}
	
	public ServiceResult findByName(String sreach) {
		ServiceResult result = new ServiceResult();
		String songname = "%"+sreach+"%";
		result.setData(songRepo.findBySongname(songname));
		return result;
	}
	
	public void updateListen(String filePath) {
		songRepo.updateListen(filePath);
	}
}
