let inputLabel = document.getElementById('input-label');
let searchBtn = document.getElementById('search-btn');
let pokeName = document.getElementById('poke-name');
let imgContainer = document.getElementById('img-container');
let showType = document.getElementById('show-type');
const pokeLink = 'https://pokeapi.co/api/v2/pokemon/'

searchBtn.addEventListener('click', async function(){

    try {
        const pokeResponse = await fetch((pokeLink + inputLabel.value) + "?type=" +`${showType.value}`)
        console.log(pokeLink + inputLabel.value);
        let pokesearch = pokeLink + inputLabel.value; 

        if(pokeResponse.ok === false){
            throw new Error (`HTTP error code: ${pokeResponse.status}, HTTP error message: ${pokeResponse.statusText}`);
        }

        const pokeData = await pokeResponse.json();
        console.log(pokeData);
        console.log(pokeData.sprites.front_default);
        console.log(pokeData.type);

        const img = document.createElement('img');
        img.src = pokeData.sprites.front_default;
        imgContainer.appendChild(img);


        // ability.addEventListener('click', async function(){
            
        //     const pokeResponse2 = await fetch(pokesearch.abilities )
        //     const pokeAbilities = await pokeResponse2.json();
        //     console.log(pokeAbilities);
    
        // }); 
 
    } catch (error) {
        console.log(error);
    }

});
