package org.thuctap.quanlyamnhac.model;

import java.util.Date;
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
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="artists")
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
public class Artists {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long artistId;
	
	@NotNull
	private String artistname;
	
	private String realname;
	
	private String artistsex;
	
	private Date birthday;

	private String address;
	
	@Column(name = "story", columnDefinition = "TEXT")
	private String story;
	
	@ColumnDefault("'http://localhost:8080/nghesi/image/defaultimage.png'")
	private String image = "http://localhost:8080/nghesi/image/defaultimage.png";
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, mappedBy = "artistshow")
	private Set<Song> songshow = new HashSet<>();
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "artists", cascade = CascadeType.ALL)
	private Set<Song> song = new HashSet<>();

	public Long getArtistId() {
		return artistId;
	}

	public void setArtistId(Long artistId) {
		this.artistId = artistId;
	}

	public String getArtistname() {
		return artistname;
	}

	public void setArtistname(String artistname) {
		this.artistname = artistname;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getArtistsex() {
		return artistsex;
	}

	public void setArtistsex(String artistsex) {
		this.artistsex = artistsex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStory() {
		return story;
	}

	public void setStory(String story) {
		this.story = story;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Set<Song> getSongshow() {
		return songshow;
	}

	public void setSongshow(Set<Song> songshow) {
		this.songshow = songshow;
	}

	public Set<Song> getSong() {
		return song;
	}

	public void setSong(Set<Song> song) {
		this.song = song;
	}
}
