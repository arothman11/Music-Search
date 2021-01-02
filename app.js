var apikey = "&apikey=e3ae07c70ac4d70d2402ea6bc2007a14";
var baseurl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/"


document.getElementById("search-button").addEventListener("click", function(){
  doSearch();
});

document.getElementById("form").addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});


// //LIST
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function(){
//   if (this.readyState == 4 && this.status == 200){
//     var response = JSON.parse(this.responseText);
//     console.log(response);
//
//     // for (i=0; i<response.length; i++){
//     //   AddItem(response[i]);
//     // }
//   }
// }
//
// xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.get?album_id=14250417&apikey=e3ae07c70ac4d70d2402ea6bc2007a14", true);
// // xhttp.setRequestHeader("x-api-key", "e3ae07c70ac4d70d2402ea6bc2007a14");
// xhttp.send();


function doSearch(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var response = JSON.parse(this.responseText);
      console.log(response);
      AddItem(response);
    }
    else{
      // console.log(this.readyState);
      // console.log(this.status);
    }
  }
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.get?album_id=14250417&apikey=e3ae07c70ac4d70d2402ea6bc2007a14", true);
  // xhttp.setRequestHeader("x-api-key", "e3ae07c70ac4d70d2402ea6bc2007a14");
  xhttp.send();
}

function AddItem(response){
  // var input = document.getElementById("form").value;
  // console.log(input);
  var list = document.getElementById("list");
  var newelement = document.createElement("li");
  newelement.innerText = response.message.body.album.album_id;

  list.appendChild(newelement);


}
