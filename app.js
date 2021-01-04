var apikey = "&apikey=ed3e1dd0dea45b0bd4469a41b8d1bbbc";
var baseurl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/"
var artistinput = "";

document.getElementById("search-button").addEventListener("click", function(){
  doSearch();
});

document.getElementById("form").addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});


function doSearch(){
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var response = JSON.parse(this.responseText);
      console.log(response);

      var artists = response.message.body.artist_list;
      for (i=0; i<artists.length; i++){
        SearchArtist(artists[i].artist);
      }
    }
  }
  artistinput = document.getElementById("form").value;
  console.log(artistinput);
  xhttp2.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.search?" + "q_artist=" + artistinput + "&apikey=ed3e1dd0dea45b0bd4469a41b8d1bbbc", true);
  xhttp2.send();
}

function SearchArtist(artist){
  var list = document.getElementById("list");
  var newelement = document.createElement("li");
  newelement.innerText = artist.artist_name;
  newelement.id = artist.artist_id;

  var button = document.createElement("button");
  button.classList.add("expandbtn");
  button.innerHTML = '>';
  button.addEventListener("click", function(){Expand(artist)});
  newelement.appendChild(button);

  list.appendChild(newelement);
}



function Expand(artist){
  console.log(artist);
  document.getElementById("popup").style.display = "initial";
  var addhtml = '<div id="row"><div id="columnleft"><h3>Albums</h3><ul id="albumlist"></ul></div><div id="columnright"><h3>Related Artists</h3><h4>(Click Name to Explore)</h4><ul id="relatedartistlist"></ul></div>'
  document.getElementById("popup").insertAdjacentHTML('afterbegin', addhtml);
  document.getElementById("popup").insertAdjacentHTML('afterbegin', '<button id="clearbutton">X</button>');
  document.getElementById("clearbutton").onclick = function(){clear()};
  document.getElementById("popup").insertAdjacentHTML('afterbegin', '<h2>' + artist.artist_name + '</h2>');
  console.log(document.getElementById("popup"));


  getAlbums(artist.artist_id);
  relatedArtists(artist.artist_id);
}



function getAlbums(artistid){
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var response = JSON.parse(this.responseText);
      var album = response.message.body.album_list;
      for (i=0; i<album.length; i++){
        displayAlbum(album[i].album);
      }
    }
  }
  xhttp2.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.albums.get?" + "artist_id=" + artistid + "&apikey=ed3e1dd0dea45b0bd4469a41b8d1bbbc", true);
  xhttp2.send();
}

function displayAlbum(album){
  var albumcolumn = document.getElementById("albumlist");
  var newalbum = document.createElement("li");
  newalbum.innerText = album.album_name;
  newalbum.id = album.album_id;

  var albumbutton = document.createElement("button");
  albumbutton.classList.add("expandbtn");
  albumbutton.innerHTML = '>';
  albumbutton.addEventListener("click", function(){AlbumTracks(album)});
  newalbum.appendChild(albumbutton);

  albumcolumn.appendChild(newalbum);
}




function AlbumTracks(album){
  var xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){
      var response = JSON.parse(this.responseText);
      var tracks = response.message.body.track_list;
      for (i=0; i<tracks.length; i++){
        document.getElementById(album.album_id).innerHTML += '<p>' + tracks[i].track.track_name + '</p>';
      }
    }
  }
  xhttp3.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.tracks.get?" + "album_id=" + album.album_id + "&apikey=ed3e1dd0dea45b0bd4469a41b8d1bbbc", true);
  xhttp3.send();
}



function relatedArtists(artistid){
  var xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){
      var response = JSON.parse(this.responseText);
      var relatedartist = response.message.body.artist_list;
      for (i=0; i<relatedartist.length; i++){
        displayRelatedArtists(relatedartist[i].artist);
      }
    }
  }
  xhttp3.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.related.get?" + "artist_id=" + artistid + "&apikey=ed3e1dd0dea45b0bd4469a41b8d1bbbc", true);
  xhttp3.send();
}

function displayRelatedArtists(artistname){
  var artistcolumn = document.getElementById("relatedartistlist");
  var newrelatedartist = document.createElement("li");
  newrelatedartist.innerText = artistname.artist_name;
  newrelatedartist.onclick = function(){searchRelatedArtist(artistname)};
  artistcolumn.appendChild(newrelatedartist);

}

function searchRelatedArtist(artistname){
  clear();
  Expand(artistname);
}

function clear(){
  document.getElementById("popup").innerHTML = "";
  document.getElementById("popup").style.display = "none";
}
