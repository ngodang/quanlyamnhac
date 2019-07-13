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
import org.thuctap.quanlyamnhac.dao.ArtistsDao;
import org.thuctap.quanlyamnhac.dao.SongDao;
import org.thuctap.quanlyamnhac.dao.uploadFile;
import org.thuctap.quanlyamnhac.model.Artists;
import org.thuctap.quanlyamnhac.result.ServiceResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/nghesi")
public class ArtistsController {
	
	private static final Logger logger = LoggerFactory.getLogger(ArtistsController.class);
	
	@Autowired
	ArtistsDao artistsDAO;
	
	@Autowired
	SongDao songDao;
	
	@Autowired
	uploadFile upload;
	ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping("/create")
	public ResponseEntity<ServiceResult> createNghesi(
			@RequestParam(required = false, value = "file") MultipartFile file,
			@RequestParam("nghesi") String nghesi) throws JsonParseException, JsonMappingException, IOException {
    	
        Artists artist = objectMapper.readValue(nghesi, Artists.class);
        
		return new ResponseEntity<ServiceResult>(artistsDAO.createNghesi(artist, file), HttpStatus.OK);
	}
	
	@PostMapping("/edit")
	public ResponseEntity<ServiceResult> editNghesi(
			@RequestParam(required = false, value = "file") MultipartFile file, 
			@RequestParam("nghesi") String nghesi) throws JsonParseException, JsonMappingException, IOException{
		
		Artists artist = objectMapper.readValue(nghesi, Artists.class);
		
		return new ResponseEntity<ServiceResult>(artistsDAO.updateNghesi(artist, file), HttpStatus.OK);
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
	
	@GetMapping("/lists")
	public ResponseEntity<ServiceResult> getNghesi() {
		return new ResponseEntity<ServiceResult>(artistsDAO.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/findOne")
	public ResponseEntity<ServiceResult> findOne(@PathParam(value = "artistId") Long artistId) {
		return new ResponseEntity<ServiceResult>(artistsDAO.findOne(artistId), HttpStatus.OK);
	}
	
	@GetMapping("/listsfindname")
	public ResponseEntity<ServiceResult> findNghesi(@PathParam(value = "artistname") String artistname) {
		
		return new ResponseEntity<ServiceResult>(artistsDAO.findByArtistName(artistname), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{artists_id}")
	public ResponseEntity<ServiceResult> deleteNghesi(@PathVariable(value = "artists_id") Long artists_id){
		return new ResponseEntity<ServiceResult>(artistsDAO.deleteNghesi(artists_id), HttpStatus.OK);
	}
}
