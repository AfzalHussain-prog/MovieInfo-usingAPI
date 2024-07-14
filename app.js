const form=document.querySelector("form");
const movieCont=document.querySelector(".movie-cont");
const input=document.querySelector(".inputBox")

// function to fetch movie details from OMDB API
const getMovieInfo =async (movie) =>{
   try{
    const myApiKey = "487c1e79"
    const url= `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(url);
    const data= await response.json();
    
    showMovieData(data);
   }
   catch(error){
    showErrorMsg("404 NOT FOUND")
   }
}
// function to show movie details on the screen
const showMovieData = (data) =>{
    movieCont.innerHTML=""
    input.value=""
    movieCont.classList.remove('nobg')
    // using Destructuring assignment to extract properties from data object
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;
    
    const movieElement = document.createElement('div')
    movieElement.classList.add('movie-info')
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: <i class="fa-light fa-star"></i></strong>${imdbRating}</p>`
    const movieGenreEl=document.createElement('div')
    movieGenreEl.classList.add('movie-genre')
    Genre.split(",").forEach(ele =>{
        const p=document.createElement('p')
        p.innerText=ele;
        movieGenreEl.append(p)
    })
    movieElement.append(movieGenreEl);
    movieElement.innerHTML +=`<p><strong>Released Date:</strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p>
                            <p><strong>Plot:</strong>${Plot}</p>`
    
    //creating a div for movie poster
    const moviePosterEl=document.createElement('div')
    moviePosterEl.classList.add('movie-poster')
    moviePosterEl.innerHTML=`<img src="${Poster}">`

    movieCont.appendChild(moviePosterEl)
    movieCont.appendChild(movieElement);
}
// function to show no results message when no movie is found
function showErrorMsg(message){
    movieCont.innerHTML=`<h2>${message}</h2>`;
    movieCont.classList.add('nobg')

}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const movieName=input.value.trim();
    if(movieName !== ""){
        getMovieInfo(movieName)
    }
    else{
        showErrorMsg("Enter a movie name to get information")
    }
})