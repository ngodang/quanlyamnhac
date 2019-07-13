package org.thuctap.quanlyamnhac.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.thuctap.quanlyamnhac.dao.PlaylistsDao;
import org.thuctap.quanlyamnhac.dao.uploadFile;
import org.thuctap.quanlyamnhac.model.Playlists;
import org.thuctap.quanlyamnhac.result.ServiceResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/playlist")
public class PlaylistsController {
	
	private static final Logger logger = LoggerFactory.getLogger(ArtistsController.class);
	
	@Autowired
	PlaylistsDao playlistDao;
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Autowired
	uploadFile upload;
	
	@PostMapping("/themplaylist")
	public ResponseEntity<ServiceResult> createPlaylist(
			@RequestParam("file") MultipartFile file,
			@RequestParam("Playlist") String playlistnew, 
			@RequestParam("theloaiId") Long categoryId) throws JsonParseException, JsonMappingException, IOException{
		
		Playlists playlist = objectMapper.readValue(playlistnew, Playlists.class);
		
		return new ResponseEntity<ServiceResult>(playlistDao.createPlaylist(playlist, categoryId, file), HttpStatus.OK);
	}
	
	@PostMapping("/thembaihatvaoplaylist")
	public ResponseEntity<ServiceResult> saveSonginPlaylist(@RequestParam("playlistID") Long playlistId, @RequestParam("baihatID") Long songId){
		return new ResponseEntity<ServiceResult>(playlistDao.saveSonginPlaylist(playlistId, songId), HttpStatus.OK);
	}
	
	@PostMapping("/suaplaylist")
	public ResponseEntity<ServiceResult> editPlaylist(
			@RequestParam(required = false, value = "file") MultipartFile file,
			@RequestParam("playlistID") Long playlistId, 
			@RequestParam("playlistname") String newplaylistname){
		return new ResponseEntity<ServiceResult>(playlistDao.editPlaylist(playlistId, newplaylistname, file), HttpStatus.OK);
	}
	
	@GetMapping("/image/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = upload.loadFileAsResource(fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        System.out.println(resource);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
	
	@GetMapping("/findall")
	public ResponseEntity<ServiceResult> findAll(){
		return new ResponseEntity<ServiceResult>(playlistDao.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/findrandom")
	public ResponseEntity<ServiceResult> findRanDom(){
		return new ResponseEntity<ServiceResult>(playlistDao.findRanDom(), HttpStatus.OK);
	}
	
	@GetMapping("/findone")
	public ResponseEntity<ServiceResult> findOne(@PathParam(value = "playlistId") Long playlistId){
		return new ResponseEntity<ServiceResult>(playlistDao.findOne(playlistId), HttpStatus.OK);
	}
	
	@GetMapping("/findtheloai")
	public ResponseEntity<ServiceResult> findByCategory(@PathParam(value = "categoryId") Long categoryId){
		return new ResponseEntity<ServiceResult>(playlistDao.findByCategory(categoryId), HttpStatus.OK);
	}
	
	@GetMapping("/findname")
	public ResponseEntity<ServiceResult> findByPlaylistname(@PathParam(value = "sreachname") String sreachname){
		return new ResponseEntity<ServiceResult>(playlistDao.findByPlaylistname(sreachname), HttpStatus.OK);
	}
	
	@DeleteMapping("/xoaplaylist{playlistId}")
	public ResponseEntity<ServiceResult> deletePlaylist(@PathVariable(value = "playlistId") Long playlistId){
		return new ResponseEntity<ServiceResult>(playlistDao.deletePlaylist(playlistId), HttpStatus.OK);
	}

}
