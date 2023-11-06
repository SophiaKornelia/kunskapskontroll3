let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let searchEpisodeBtnContainer = document.querySelector('.search-episode-btn-container');
let ul = document.getElementById('ul');
let title;
let episodeInput1 = document.getElementById('episodeInput1');
let episodeInput2 = document.getElementById('episodeInput2');
let btn3 = document.getElementById('btn3');
let showId; 

searchEpisodeBtnContainer.classList.add('hide');

const movieLink = 'https://api.tvmaze.com/search/shows?';


ul.addEventListener('click', async function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Show episodes') {

        searchEpisodeBtnContainer.classList.toggle('hide');
        

        btn3.addEventListener('click', async function () {
            // const btn2Value = event.target.getAttribute('data-id');

            try {

                const episodes = await fetch(`https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episodeInput1.value}&number=${episodeInput2.value}`);
                if (episodes.ok === false) {
                    throw new Error(`HTTP error code: ${episodes.status}, HTTP error message: ${episodes.statusText}`);
                }

                const data = await episodes.json();

                let episodeList = "";
    
                const name = data.name
                const season = data.season
    
                episodeList += `<li>${title} ${name} ${season} </li>`
    
                ul.innerHTML = episodeList;

                searchEpisodeBtnContainer.classList.toggle('hide');
            } catch (error) {
                console.log(error);

            }
            
        });


    }
});

searchBtn.addEventListener('click', async function () {

    try {
        const movieResponse = await fetch((movieLink + "q=" + inputLabel.value))
        console.log(movieLink + "q=" + inputLabel.value);


        if (movieResponse.ok === false) {
            throw new Error(`HTTP error code: ${movieResponse.status}, HTTP error message: ${movieResponse.statusText}`);
        }

        const movieData = await movieResponse.json();

        let movieList = "";

        if (movieData.length > 0) {
            const firstMovie = movieData[0];
            title = firstMovie.show.name;
            const premiered = firstMovie.show.premiered;
            const summary = firstMovie.show.summary;
            const image = firstMovie.show.image.medium;
            console.log(firstMovie.show.premiered);
            btn2 = document.createElement('button');
            btn2.innerText = "Show episodes";
            showId = firstMovie.show.id;

            // btn2.setAttribute('data-id', showId);

            movieList += `<li>${title} ${premiered} ${summary} <img src="${image}">${btn2.outerHTML}</li>`;
        }

        ul.innerHTML = movieList;

    } catch (error) {
        console.log(error);
    }

});
