package org.thuctap.quanlyamnhac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.thuctap.quanlyamnhac.model.Artists;
import org.thuctap.quanlyamnhac.model.Song;

public interface SongRepository extends JpaRepository<Song, Long>{
	
	List<Song> findBySongname(String songname);
	
	@Transactional 
	@Modifying
	@Query("UPDATE Song SET listen = listen + 1 where filepathsong = :filepathsong")
	void updateListen(@Param("filepathsong") String filepathsong);
	
	
	@Query("SELECT s FROM Song s where s.songId !=:songID ORDER BY RAND()")
	List<Song> findRanDom(@Param("songID") Long songID);
	
	List<Song> findByArtistshow(Artists artist);
 
}
