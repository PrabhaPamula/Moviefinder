const API_URL="http://www.omdbapi.com/?apikey=39332ef6&s=";
const API_URL_SEARCH="http://www.omdbapi.com/?apikey=39332ef6&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click",function(){
	console.log(search_input.value);
	const query = search_input.value;
	//console.log(document.getElementById("search_input").value);
	if(query){
		getMovies(API_URL+query);
	}
});

async function getMovies(url){
	const resp = await fetch(url);
	const respData = await resp.json();
	console.log(respData);
	showMovies(respData.Search);
}

function showMovies(movies){
	card.innerHTML="";
	movies.forEach(async function(movie){
		const movieData=await fetch(API_URL_SEARCH+movie.imdbID);
		const movieDataobj=await movieData.json();
		movie_display(movieDataobj);
	});
}

function movie_display(imovie){
	const movieElm=document.createElement("div");
	movieElm.classList.add("movie-card");
	movieElm.innerHTML=`
		<div class="card">
		<div class="movie-description">
			<img src="${imovie.Poster}" alt="Poster" width="300px" heigth="300px"/>
		</div>
			
			<br>
			<div class="movie-description">
				<span class="movie-title"><b>Title :</b><span class="value">${imovie.Title}</span></span><br>
				<span class="movie-title"><b>Rating  :</b><span class="value">${imovie.imdbRating}</span></span><br>
				<span class="movie-title"><b>Direction  :</b><span class="value">${imovie.Director}</span></span><br>
				<span class="movie-title"><b>Released Date  :</b><span class="value">${imovie.Released} </span></span><br>
				<span class="movie-title"><b>Genre  :</b><span class="value">${imovie.Genre} </span></span>
			</div>
		</div>
	`;
	card.appendChild(movieElm);
}