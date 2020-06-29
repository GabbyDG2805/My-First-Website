//JavaScript for all pages

window.onload = function() //makes these functions load when the page loads
{
init();
NewsModals();
}
function init()
{
	console.log('init fired');
}

function NewsModals() //Modals for News stories
{
var NewsModal = document.getElementsByClassName("NewsModal")[0]; //Class rather than ID so this can be reused on different elements

var News = document.getElementsByClassName("News")[0];
News.addEventListener("click", ShowModal); // When the div is clicked, the function is called

var ModalClose = document.getElementsByClassName("ModalClose")[0];

function ShowModal() //Shows the modal (for the click event listener)
{
    NewsModal.style.display = "block";
}

ModalClose.onclick = function() //When the cross (X) is clicked, the modal closes
{
    NewsModal.style.display = "none";
}

window.onclick = function(event) //Closes modal if user clicks elsewhere
{
    if (event.target == NewsModal) {
        NewsModal.style.display = "none";
    }
}
}
function _(id) //A handy reusable tool to shorten getElementById
{
	return document.getElementById(id);
}
function FeedTheMachineAlbum() //Music player
{
	var audio = new Audio();
	var audio_folder = "Assets/Music/FeedTheMachine/";
	var audio_ext = ".m4a";
	var audio_index = 1;
	var is_playing = false;
	var playingtrack;
	var FeedTheMachineTracks = _("FeedTheMachineTracks"); //getElementById
	var tracks = { //JSON - accesses files
	    "track1":["Feed the Machine", "01FeedTheMachine"],
		"track2":["Coin for the Ferryman", "02CoinForTheFerryman"],
		"track3":["Song on Fire", "03SongOnFire"],
		"track4":["Must be Nice", "04MustBeNice"],
		"track5":["After the Rain", "05AfterTheRain"],
		"track6":["For the River", "06ForTheRiver"],
		"track7":["Home", "07Home"],
		"track8":["The Betrayal (Act III)", "08TheBetrayal(ActIII)"],
		"track9":["Silent Majority", "09SilentMajority"],
		"track10":["Every Time We're Together", "10EveryTimeWe'reTogether"],
		"track11":["The Betrayal(Act I)", "11TheBetrayal(ActI)"]
	};
	for(var track in tracks){ //creates all of the below elements for each song added to tracks
		var trackbar = document.createElement("div");
		var playbutton = document.createElement("button");
		var trackname = document.createElement("div");
		trackbar.className = "trackbar";
		playbutton.className = "playbutton";
		trackname.className = "trackname";
		trackname.innerHTML = audio_index+". "+tracks[track][0];
		playbutton.id = tracks[track][1];
		playbutton.addEventListener("click", switchTrack);
		trackbar.appendChild(playbutton);
		trackbar.appendChild(trackname);
		FeedTheMachineTracks.appendChild(trackbar);
		audio_index++;
	}
	audio.addEventListener("ended",function() //changes to play button if song has finished
{
	    _(playingtrack).style.background = "url(Assets/Images/play_button.png)";
		playingtrack = "";
		is_playing = false;
	});
	function switchTrack(event){
		if(is_playing){
		    if(playingtrack != event.target.id){
			    is_playing = true;
				_(playingtrack).style.background = "url(Assets/Images/play_button.png)";
			    event.target.style.background = "url(Assets/Images/pause_button.png)"; //changes to pause button if song is playing
			    audio.src = audio_folder+event.target.id+audio_ext;
	            audio.play(); //plays song (for click event listener)
			} else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(Assets/Images/play_button.png)";
			}
		} else {
			is_playing = true;
			event.target.style.background = "url(Assets/Images/pause_button.png)";
			if(playingtrack != event.target.id){
				audio.src = audio_folder+event.target.id+audio_ext;
			}
	        audio.play();
		}
		playingtrack = event.target.id;
	}
}
window.addEventListener("load", FeedTheMachineAlbum); //loads the function

var map, infowindow, marker, i;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.1699, lng: -115.1398},
          zoom: 5
        });

        if (navigator.geolocation) { //checks if geolocation is enabled on browser
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude //stores coordinates if allowed
            };
            map.setCenter(pos); //centers map to current coordinates
          });
		}
		   var locations = [ //coordinates of venue locations
      ['Las Vegas', 36.1699, -115.1398, 1],
      ['Moterrey', 25.686613, -100.316116, 2],
      ['Mexico City', 19.432608, -99.133209, 3],
      ['Glasgow', 55.8642, -4.2518, 4],
      ['Leeds', 53.801277, -1.548567, 5],
	  ['Liverpool', 53.41058, -2.97794, 6],
	  ['Manchester', 53.483959, -2.244644, 7],
	  ['Birmingham', 52.4862, -1.898575, 8],
	  ['London', 51.508530, -0.076132, 9],
	  ['Nottingham', 52.9667, -1.1667, 10]
    ];

    infowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {  //creates markers for locations
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) { //shows tag if clicked
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

	  
	  
 


	  
	  