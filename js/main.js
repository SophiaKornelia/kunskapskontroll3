let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let ul = document.getElementById('ul');



const movieLink = 'https://api.tvmaze.com/search/shows?'

searchBtn.addEventListener('click', async function(){

    try {
        const movieResponse = await fetch((movieLink + "q=" + inputLabel.value))
        console.log(movieLink + "q=" + inputLabel.value);


        if(movieResponse.ok === false){
            throw new Error (`HTTP error code: ${movieResponse.status}, HTTP error message: ${movieResponse.statusText}`);
        }

        const movieData = await movieResponse.json();

        let movieList = "";

        for (const movie of movieData){
             const title = movie.show.name
             const premiered = movie.show.premiered
             const summary = movie.show.summary
             const image = movie.show.image.medium


             movieList += `<li>${title} ${premiered} ${summary} <img src="${image}"></li>`
        }
        
        ul.innerHTML = movieList; 
    
 
    } catch (error) {
        console.log(error);
    }

});
