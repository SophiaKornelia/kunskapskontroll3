let headerContainer = document.getElementById('header-container');

let searchContainer = document.querySelector('.search-container');
let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');

let searchEpisodeBtnContainer = document.querySelector('.search-episode-btn-container');
let episodeInput1 = document.getElementById('episodeInput1');
let episodeInput2 = document.getElementById('episodeInput2');
let moreInfoBtn = document.getElementById('more-info-btn');

let ul = document.getElementById('ul');
let newSearchBtn = document.getElementById('new-search-btn');

let title;
let showId;

inputLabel.value = "...";
searchEpisodeBtnContainer.classList.add('hide');
inputLabel.addEventListener('focus', function () {
inputLabel.value = "";
});

searchBtn.addEventListener('click', async function () {
    
    try {
        const movieResponse = await fetch(`https://api.tvmaze.com/search/shows?q=${inputLabel.value}`)

        if (movieResponse.ok === false) {
            throw new Error(`HTTP error code: ${movieResponse.status}, HTTP error message: ${movieResponse.statusText}`);
        }

        const movieData = await movieResponse.json();

        episodeInput1.value = "...";
        episodeInput2.value = "...";

        episodeInput1.addEventListener('focus', function () {
            episodeInput1.value = "";
            });
            
        episodeInput2.addEventListener('focus', function () {
            episodeInput2.value = "";
            });

        let movieList = "";


        if (movieData.length === 0) {
            alert('This serie does not exist, try another search!');
        }

        if (movieData.length > 0) {
            const firstMovie = movieData[0];
            title = firstMovie.show.name;
            const premiered = firstMovie.show.premiered;
            const summary = firstMovie.show.summary;
            const image = firstMovie.show.image.medium;

            showId = firstMovie.show.id;

            movieList = `<li><h2>${title}  </h2> <img src="${image}"><br><br>
            Premiered: ${premiered} <br><br> About:${summary} </li>`;

            searchEpisodeBtnContainer.classList.toggle('hide');
            searchContainer.classList.add('hide');
            headerContainer.classList.add('hide');
        }

        ul.innerHTML = movieList;

    } catch (error) {
        console.log(error);
        ul.innerHTML = "Ops something went wrong!"
    }
});


moreInfoBtn.addEventListener('click', async function () {
    try {
        const episodes = await fetch(`https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episodeInput1.value}&number=${episodeInput2.value}`);
        
        if (episodes.ok === false) {
            throw new Error(`HTTP error code: ${episodes.status}, HTTP error message: ${episodes.statusText}`);
        }

        const data = await episodes.json();
        
        let episodeList = "";
        
        const name = data.name
        const season = data.season
        const episode = data.number
        const summary = data.summary

        episodeList += `<li><h3>${title}</h3>Season ${season} episode ${episode} is called ${name}. <br><h4>A small summary about the episode:</h4>${summary}</li>`

        ul.innerHTML = episodeList;

        searchEpisodeBtnContainer.classList.toggle('hide');
        newSearchBtn.classList.toggle('hide');
        
    } catch (error) {
        console.log(error);
        alert('The season or episode does not exist, try another search!');
    } 
});

newSearchBtn.addEventListener('click', function() {
    episodeList = ""; 
    ul.innerHTML = "";
    inputLabel.value = "...";

    searchContainer.classList.toggle('hide');
    headerContainer.classList.toggle('hide');
    newSearchBtn.classList.toggle('hide');
});
