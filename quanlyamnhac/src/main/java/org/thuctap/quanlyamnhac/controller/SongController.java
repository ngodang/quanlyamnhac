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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thuctap.quanlyamnhac.dao.SongDao;
import org.thuctap.quanlyamnhac.dao.uploadFile;
import org.thuctap.quanlyamnhac.model.Song;
import org.thuctap.quanlyamnhac.result.ServiceResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/baihat")
public class SongController {

	private static final Logger logger = LoggerFactory.getLogger(ArtistsController.class);
	
	@Autowired
	SongDao songDao;
	
	@Autowired
	uploadFile upload;
	ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping("/create")
	public ResponseEntity<ServiceResult> createSong(
			@RequestParam(value = "file") MultipartFile file,
			@RequestParam(required = false, value = "fileimage") MultipartFile fileimage,
			@RequestParam("baihat") String baihat, 
			@RequestParam("sangtac") String sangtac, 
			@RequestParam("trinhbay") String[] trinhbay) throws JsonParseException, JsonMappingException, IOException {
 
        Song song = objectMapper.readValue(baihat, Song.class);
        
		return new ResponseEntity<ServiceResult>(songDao.createSong(song, file, sangtac, fileimage, trinhbay), HttpStatus.OK);
	}
	
	@PostMapping("/edit")
	public ResponseEntity<ServiceResult> editSong(
			@RequestParam(required = false, value = "fileimage") MultipartFile fileimage,
			@RequestParam("baihat") String baihat, 
			@RequestParam("sangtac") String sangtac, 
			@RequestParam("trinhbay") String[] trinhbay) throws JsonParseException, JsonMappingException, IOException{
		
		Song song = objectMapper.readValue(baihat, Song.class);
		
		return new ResponseEntity<ServiceResult>(songDao.editSong(song, sangtac, fileimage, trinhbay), HttpStatus.OK);
	}
	
	@GetMapping("/fileload/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = upload.loadFileAsResource(fileName);
		String filePath = ServletUriComponentsBuilder.fromCurrentRequestUri().toUriString();
        String contentType = null;
        songDao.updateListen(filePath);
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
	
	@GetMapping("/image/{fileName:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = upload.loadFileAsResource(fileName);
		String filePath = ServletUriComponentsBuilder.fromCurrentRequestUri().toUriString();
        String contentType = null;
        songDao.updateListen(filePath);
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
	
	@GetMapping("/lists")
	public ResponseEntity<ServiceResult> getBaihat() {
		return new ResponseEntity<ServiceResult>(songDao.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/findone")
	public ResponseEntity<ServiceResult> findOne(@PathParam(value="songId") Long songId) {
		return new ResponseEntity<ServiceResult>(songDao.findOne(songId), HttpStatus.OK);
	}
	
	@GetMapping("/findartist")
	public ResponseEntity<ServiceResult> findArtist(@PathParam(value="artistId") Long artistId) {
		return new ResponseEntity<ServiceResult>(songDao.findArtist(artistId), HttpStatus.OK);
	}
	
	@GetMapping("/findrandom")
	public ResponseEntity<ServiceResult> findRanDom(@PathParam(value="songId") Long songId) {
		return new ResponseEntity<ServiceResult>(songDao.findRanDom(songId), HttpStatus.OK);
	}
	
	@GetMapping("/listsfindname")
	public ResponseEntity<ServiceResult> findByName(@PathParam(value = "songname") String songname) {
		return new ResponseEntity<ServiceResult>(songDao.findByName(songname), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{songId}")
	public ResponseEntity<ServiceResult> deleteSong(@PathVariable(value = "songId") Long songId){
		return new ResponseEntity<ServiceResult>(songDao.deleteSong(songId), HttpStatus.OK);
	}
}
