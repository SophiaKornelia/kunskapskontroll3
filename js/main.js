let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let ul = document.getElementById('ul');
let btn2; 
let title; 


const movieLink = 'https://api.tvmaze.com/search/shows?';


ul.addEventListener('click', async function(event) {
    if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Show episodes') {
        let episodeInput1  = document.createElement('input')
        let episodeInput2  = document.createElement('input')
        episodeInput1.type = 'text';
        episodeInput2.type = 'text';
        let btn3 = document.createElement('button');
        btn3.innerHTML = 'Search episode';

        ul.innerHTML = "";
        document.body.appendChild(episodeInput1);
        document.body.appendChild(episodeInput2);
        document.body.appendChild(btn3);
       
        btn3.addEventListener('click', async function(){

            const episodes = await fetch(`https://api.tvmaze.com/shows/${btn2.value}/episodebynumber?season=${episodeInput1.value}&number=${episodeInput1.value}`);
            const data = await episodes.json(); 
            console.log(data);
    


            
            let episodeList = ""; 
            
                const name = data.name
                const season = data.season
                
                episodeList += `<li>${title} ${name} ${season} </li>`

                ul.innerHTML = episodeList;
                
        });

        
    }
});

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
             title = movie.show.name
             const premiered = movie.show.premiered
             const summary = movie.show.summary
             const image = movie.show.image.medium
             btn2 = document.createElement('button');
             btn2.value = movie.show.id; 
             btn2.innerText = "Show episodes"
             
             movieList += `<li>${title} ${premiered} ${summary} <img src="${image}"></li>`;
             movieList += btn2.outerHTML;
             
            }
            
        ul.innerHTML = movieList; 

    } catch (error) {
        console.log(error);
    }

});
