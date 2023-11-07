let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let searchEpisodeBtnContainer = document.querySelector('.search-episode-btn-container');
let searchContainer = document.querySelector('.search-container');
let ul = document.getElementById('ul');
let title;
let episodeInput1 = document.getElementById('episodeInput1');
let episodeInput2 = document.getElementById('episodeInput2');
let btn3 = document.getElementById('btn3');
let showId; 

searchEpisodeBtnContainer.classList.add('hide');
inputLabel.value = "...";
inputLabel.addEventListener('focus', function () {
    inputLabel.value = "";
});

const movieLink = 'https://api.tvmaze.com/search/shows?';

searchBtn.addEventListener('click', async function () {

    try {
        const movieResponse = await fetch((movieLink + "q=" + inputLabel.value))
        console.log(movieLink + "q=" + inputLabel.value);


        if (movieResponse.ok === false) {
            throw new Error(`HTTP error code: ${movieResponse.status}, HTTP error message: ${movieResponse.statusText}`);

        }

        const movieData = await movieResponse.json();

        let movieList = "";

        if (movieData.length === 0){
            alert('This serie does not exist, try another search!');
        }

        console.log(movieData.length);
         if (movieData.length > 0) {
            const firstMovie = movieData[0];
            title = firstMovie.show.name;
            const premiered = firstMovie.show.premiered;
            const summary = firstMovie.show.summary;
            const image = firstMovie.show.image.medium;
    
            showId = firstMovie.show.id;
        

            movieList += `<li><h2>${title}  </h2> <img src="${image}"><br><br>
            Premiered: ${premiered} <br><br> About:${summary} </li>`;

            searchEpisodeBtnContainer.classList.toggle('hide');
            searchContainer.classList.add('hide');
        }

        ul.innerHTML = movieList;

    } catch (error) {
        console.log(error);
    }

   

});

    btn3.addEventListener('click', async function () {
    
            
            try {
                
                const episodes = await fetch(`https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episodeInput1.value}&number=${episodeInput2.value}`);
                if (episodes.ok === false) {
                    throw new Error(`HTTP error code: ${episodes.status}, HTTP error message: ${episodes.statusText}`);
                }
                
                const data = await episodes.json();
                console.log(data);
                
                let episodeList = "";
                
                const name = data.name
                const season = data.season
                const summary = data.summary
                
                episodeList += `<li>${title}<br>Season ${episodeInput1.value} episode${episodeInput2.value} is called ${name}. <br><br><h4>A small summary about the episode:</h4>${summary}</li>`
                
                ul.innerHTML = episodeList;
                
                searchContainer.classList.toggle('hide');
                searchEpisodeBtnContainer.classList.toggle('hide');
            } catch (error) {
                console.log(error);

            }
            
        });


//     }
// });

