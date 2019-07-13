package org.thuctap.quanlyamnhac.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thuctap.quanlyamnhac.model.Category;
import org.thuctap.quanlyamnhac.model.Playlists;
import org.thuctap.quanlyamnhac.model.Song;
import org.thuctap.quanlyamnhac.repository.CategoryRepository;
import org.thuctap.quanlyamnhac.repository.PlaylistsRepository;
import org.thuctap.quanlyamnhac.repository.SongRepository;
import org.thuctap.quanlyamnhac.result.FileException;
import org.thuctap.quanlyamnhac.result.ServiceResult;

@Service
public class PlaylistsDao {
	
	@Autowired
	PlaylistsRepository playlistRepo;
	
	@Autowired
	SongRepository songRepo;
	
	@Autowired
	CategoryRepository categoryRepo;
	
	@Autowired
	uploadFile upload;
	
	public ServiceResult createPlaylist(Playlists playlist, Long categoryId, MultipartFile file) {
		ServiceResult result = new ServiceResult();
		
		if (!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
			throw new FileException("Vui lòng chọn file ảnh");
		}
		
		String fileName = upload.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/playlist/image/")
                .path(fileName)
                .toUriString();
		
		Category category = categoryRepo.findById(categoryId).orElse(null);
		
		playlist.setCategory(category);
		playlist.setPlaylistimage(fileDownloadUri);
		result.setData(playlistRepo.save(playlist));
		result.setMessage("Thêm thành công");
		return result;
	}
	
	public ServiceResult saveSonginPlaylist(Long playlistId, Long songId) {
		ServiceResult result = new ServiceResult();
		
		Playlists playlist = playlistRepo.findById(playlistId).orElse(null);
		Song song = songRepo.findById(songId).orElse(null);
		
		playlist.getSong().add(song);
		song.getPlaylist().add(playlist);
		
		result.setData(playlistRepo.save(playlist));
		result.setMessage("Đã thêm");
		return result;
	}
	
	public ServiceResult editPlaylist(Long playlistId, String playlistname, MultipartFile file) {
		ServiceResult result = new ServiceResult();
		Playlists playlist = playlistRepo.findById(playlistId).orElse(null);
		if(file == null) {
			playlist.setPlaylistname(playlistname);
			result.setData(playlistRepo.save(playlist));
		}else {
			if (!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
				throw new FileException("Vui lòng chọn file ảnh");
			}
			
			String fileName = upload.storeFile(file);
	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/playlist/image/")
	                .path(fileName)
	                .toUriString();
	        
	        String oldpath = playlist.getPlaylistimage();
	        String[] strr = oldpath.split("/");
			String filenameold = strr[strr.length - 1];
			
			playlist.setPlaylistimage(fileDownloadUri);
			playlist.setPlaylistname(playlistname);
			result.setData(playlistRepo.save(playlist));
			
			upload.deleteFile(filenameold);
	        
		}
		
		return result;
	}
	
	public ServiceResult findAll() {
		ServiceResult result = new ServiceResult();
		
		result.setData(playlistRepo.findAll());
		
		return result;
	}
	
	public ServiceResult findOne(Long playlistId) {
		ServiceResult result = new ServiceResult();
		
		result.setData(playlistRepo.findById(playlistId));
		
		return result;
	}
	
	public ServiceResult findByCategory(Long categoryId) {
		ServiceResult result = new ServiceResult();
		
		result.setData(playlistRepo.findByCategory(categoryRepo.findById(categoryId).orElse(null)));
		
		return result;
	}
	
	public ServiceResult findByPlaylistname(String sreachname) {
		ServiceResult result = new ServiceResult();
		
		String playlistname = "%"+sreachname+"%";
		
		result.setData(playlistRepo.findByPlaylistname(playlistname));
		
		return result;
	}
	
	@SuppressWarnings("deprecation")
	public ServiceResult findRanDom() {
		ServiceResult result = new ServiceResult();
		result.setData(playlistRepo.findRanDom(new PageRequest(0, 10)));
		return result;
	}
	
	public ServiceResult deletePlaylist(Long playlistId) {
		ServiceResult result = new ServiceResult();
		
		Playlists playlist = playlistRepo.findById(playlistId).orElse(null);
		String oldpath = playlist.getPlaylistimage();
        String[] strr = oldpath.split("/");
		String filenameold = strr[strr.length - 1];
		
		
		playlistRepo.deleteById(playlistId);
		upload.deleteFile(filenameold);
		result.setMessage("Xoá Thành Công");
		
		return result;
	}

}
