package org.thuctap.quanlyamnhac.dao;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.thuctap.quanlyamnhac.config.PropertiesFile;
import org.thuctap.quanlyamnhac.result.FileException;
import org.thuctap.quanlyamnhac.result.FileNotFound;

@Service
public class uploadFile {

	private final Path fileStorageLocation;

    @Autowired
    public uploadFile(PropertiesFile fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
    	
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            String newFileName = System.currentTimeMillis() + "_" + fileName;
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return newFileName;
        } catch (IOException ex) {
            throw new FileException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFound("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFound("File not found " + fileName, ex);
        }
    }
    
    public boolean deleteFile(String fileName) {
    	
    	Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
    	
    	try {
    	    Files.delete(filePath);
    	    return true;
    	} catch (NoSuchFileException x) {
    		throw new FileNotFound("File not found " + filePath, x);
    	} catch (DirectoryNotEmptyException x) {
    		throw new FileNotFound("not found emty" + filePath, x);
    	} catch (IOException x) {
    	    System.err.println(x);
    	}
		return false;
    }
	
}
