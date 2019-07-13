package org.thuctap.quanlyamnhac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.thuctap.quanlyamnhac.model.Artists;

public interface ArtistsRepository extends JpaRepository<Artists, Long> {
	@Query("SELECT image FROM Artists WHERE artist_id = :artistId")
	String findAnhdaidien(@Param("artistId") Long artistId);
	
	List<Artists> findByArtistnameLike(String artistname);
	
	Artists findByArtistname(String artistname);
}