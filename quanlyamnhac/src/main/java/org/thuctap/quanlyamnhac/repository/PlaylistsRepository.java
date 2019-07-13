package org.thuctap.quanlyamnhac.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.thuctap.quanlyamnhac.model.Category;
import org.thuctap.quanlyamnhac.model.Playlists;

public interface PlaylistsRepository extends JpaRepository<Playlists, Long>{
	
	List<Playlists> findByCategory(Category category);
	
	List<Playlists> findByPlaylistname(String sreachname);

	@Query("SELECT u FROM Playlists u ORDER BY RAND()")
	List<Playlists> findRanDom(Pageable pageable);

}
