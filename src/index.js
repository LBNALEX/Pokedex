let idpoke = localStorage.getItem('idpoke');
let namepoke = localStorage.getItem('namepoke');
let imagenpoke = localStorage.getItem('imagenpoke');
let listaTipos = document.getElementById('listaTipos');



//Obtener peliculas
async function getInfo(id){
    let url =` https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
        let response = await axios.get(url);
        return response.data;
    } catch (e) {
        return [];
    }
}

getInfo(1).then((pokeinfo) => {
    
    console.log(pokeinfo);
    console.log(pokeinfo.id);
    console.log(pokeinfo.name);
    console.log(pokeinfo.types);
    pokeinfo.types.forEach(element => {
        console.log(element.type.name);
     });
    console.log(pokeinfo.abilities);

    pokeinfo.abilities.forEach(element => {
       console.log(element.ability.name);
    });

    console.log(pokeinfo.weight);
    console.log(pokeinfo.height);
    console.log(pokeinfo.sprites.other['official-artwork']['front_default']);
    
    
    // for (let i = 0; i < 10; i++){
    //     elemento = document.createElement('li');
    //     elemento.classList.add('nombrePeli');
    //     elemento.id = i;
    //     elemento.innerHTML = `${movies.cast[i].title}`;
    //     listaPeliculas.appendChild(elemento);
    //     elemento.addEventListener('click', () =>{
    //         localStorage.setItem('idPelicula', movies.cast[i].id);
    //         window.location="../../detallePelicula.html"; 
    //     })
    // }

    // fillInfo();
});

// function fillInfo(){
//     namepoke.innerHTML = nameActor;
//     imagenpoke.src = `https://image.tmdb.org/t/p/w500${fotoActor}`;
//     imagenpoke.alt = nameActor;
// }