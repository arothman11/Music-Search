// var apikey = "e3ae07c70ac4d70d2402ea6bc2007a14";


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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      // var response = JSON.parse(this.responseText);
      console.log(this.response.json);

    }
    else{
      // console.log(this.readyState);
      // console.log(this.status);
    }
  }

  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433", true);
  xhttp.setRequestHeader("x-api-key", "e3ae07c70ac4d70d2402ea6bc2007a14");
  xhttp.send();

}
