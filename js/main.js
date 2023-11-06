let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let searchEpisodeBtnContainer = document.querySelector('.search-episode-btn-container');
let ul = document.getElementById('ul');
let title;
let episodeInput1 = document.getElementById('episodeInput1');
let episodeInput2 = document.getElementById('episodeInput2');
let btn3 = document.getElementById('btn3');

searchEpisodeBtnContainer.classList.add('hide');

const movieLink = 'https://api.tvmaze.com/search/shows?';


ul.addEventListener('click', async function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Show episodes') {

        searchEpisodeBtnContainer.classList.toggle('hide');


        // let episodeInput1 = document.getElementById('episode-input-1');
        // let episodeInput2 = document.getElementById('episode-input-2');
        // let btn3 = document.getElementById('search-episode-button');

        // if (!episodeInput1) {
        //     episodeInput1 = document.createElement('input');
        //     episodeInput1.type = 'text';
        //     episodeInput1.id = 'episode-input-1';
        // }

        // if (!episodeInput2) {
        //     episodeInput2 = document.createElement('input');
        //     episodeInput2.type = 'text';
        //     episodeInput2.id = 'episode-input-2';
        // }

        // if (!btn3) {
        //     btn3 = document.createElement('button');
        //     btn3.innerHTML = 'Search episode';
        //     btn3.id = 'search-episode-button';
        // }

        // ul.innerHTML = "";
        // document.body.appendChild(episodeInput1);
        // document.body.appendChild(episodeInput2);
        // document.body.appendChild(btn3);

        btn3.addEventListener('click', async function () {

            const episodeInput1Value = episodeInput1.value;
            const episodeInput2Value = episodeInput2.value;
            const btn2Value = event.target.getAttribute('data-id');

            try {

                const episodes = await fetch(`https://api.tvmaze.com/shows/${btn2Value}/episodebynumber?season=${episodeInput1.value}&number=${episodeInput2.value}`);

                if (episodes.ok === false) {
                    throw new Error(`HTTP error code: ${episodes.status}, HTTP error message: ${episodes.statusText}`);
                }

                const data = await episodes.json();

            } catch (error) {
                console.log(error);



                let episodeList = "";

                const name = data.name
                const season = data.season

                episodeList += `<li>${title} ${name} ${season} </li>`

                ul.innerHTML = episodeList;
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
            const showId = firstMovie.show.id;

            btn2.setAttribute('data-id', showId);

            movieList += `<li>${title} ${premiered} ${summary} <img src="${image}">${btn2.outerHTML}</li>`;
        }

        ul.innerHTML = movieList;

    } catch (error) {
        console.log(error);
    }

});
