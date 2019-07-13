package org.thuctap.quanlyamnhac.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="playlists")
@EntityListeners(AuditingEntityListener.class)
public class Playlists {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long playlistId;
	
	private String playlistname;
	
	private String playlistimage;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(name = "playlistsong", 
			joinColumns = { @JoinColumn(name = "song_id") }, 
			inverseJoinColumns = {@JoinColumn(name = "playlists_id") })
	private Set<Song> song = new HashSet<>();

	public Long getPlaylistId() {
		return playlistId;
	}

	public void setPlaylistId(Long playlistId) {
		this.playlistId = playlistId;
	}

	public String getPlaylistname() {
		return playlistname;
	}

	public void setPlaylistname(String playlistname) {
		this.playlistname = playlistname;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Song> getSong() {
		return song;
	}

	public void setSong(Set<Song> song) {
		this.song = song;
	}

	public String getPlaylistimage() {
		return playlistimage;
	}

	public void setPlaylistimage(String playlistimage) {
		this.playlistimage = playlistimage;
	}

}
