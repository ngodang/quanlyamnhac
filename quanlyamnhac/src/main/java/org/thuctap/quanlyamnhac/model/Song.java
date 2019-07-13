package org.thuctap.quanlyamnhac.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="song")
@EntityListeners(AuditingEntityListener.class)
public class Song {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long songId;
	
	private String songname;
	
	@Column(name = "lyrics", columnDefinition = "TEXT")
	private String lyrics;
	
	private String filepathsong;
	
	@ColumnDefault("'http://localhost:8080/baihat/image/songdefaultimage.jpg'")
	private String songimage = "http://localhost:8080/baihat/image/songdefaultimage.jpg";
	
	@ColumnDefault("0")
	private Long listen = (long) 0;
	
	@ManyToOne
	@JoinColumn(name = "artist_id", nullable = false)
	private Artists artists;
	
	@ManyToMany(fetch = FetchType.LAZY, 
			cascade = {CascadeType.REFRESH, CascadeType.DETACH, 
						CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name = "shows", 
			joinColumns = { @JoinColumn(name = "song_id") }, 
			inverseJoinColumns = {@JoinColumn(name = "artist_id") })
	private Set<Artists> artistshow = new HashSet<>();
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, 
			cascade = {CascadeType.REFRESH, CascadeType.DETACH, 
						CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "song")
	private Set<Playlists> playlist = new HashSet<>();

	public Long getSongId() {
		return songId;
	}

	public void setSongId(Long songId) {
		this.songId = songId;
	}

	public String getSongname() {
		return songname;
	}

	public void setSongname(String songname) {
		this.songname = songname;
	}

	public String getLyrics() {
		return lyrics;
	}

	public void setLyrics(String lyrics) {
		this.lyrics = lyrics;
	}

	public String getFilepathsong() {
		return filepathsong;
	}

	public void setFilepathsong(String filepathsong) {
		this.filepathsong = filepathsong;
	}

	public Long getListen() {
		return listen;
	}

	public void setListen(Long listen) {
		this.listen = listen;
	}

	public Artists getArtists() {
		return artists;
	}

	public void setArtists(Artists artist) {
		this.artists = artist;
	}

	public Set<Artists> getArtistshow() {
		return artistshow;
	}

	public void setArtistshow(Set<Artists> artistshow) {
		this.artistshow = artistshow;
	}

	public Set<Playlists> getPlaylist() {
		return playlist;
	}

	public void setPlaylist(Set<Playlists> playlist) {
		this.playlist = playlist;
	}

	public String getSongimage() {
		return songimage;
	}

	public void setSongimage(String songimage) {
		this.songimage = songimage;
	}
	
}
