const form=document.querySelector("form");
const movieCont=document.querySelector(".movie-cont");
const input=document.querySelector(".inputBox")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const movieName=input.value.trim();
    if(movieName !== ""){
        getMovieInfo(movieName)
    }
})