let idpoke = document.getElementById('idpoke');
let namepoke = document.getElementById('namepoke');
let imagenpoke = document.getElementById('imagenpoke');
let pesopoke = document.getElementById('pesopoke');
let alturapoke = document.getElementById('alturapoke');
let listaTipos = document.getElementById('listaTipos');
let listaHabilidades = document.getElementById('listaHabilidades');
let listaEstadisticas = document.getElementById('listaEstadisticas');
let pokebusqueda = document.getElementById('pokebusqueda');
let btnBuscarPoke = document.getElementById('btnBuscarPoke');

btnBuscarPoke.addEventListener('click', (e) => {
    console.log(pokebusqueda.value);
    getInfo(pokebusqueda.value).then((pokeinfo) => {
         fillInfo(pokeinfo);
    });
    
});

getInfo(1).then((pokeinfo) => {
    fillInfo(pokeinfo);
});
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

function fillInfo(pokeinfo){
    let tipoPoke;
    let habilidadPoke;
    let estadisticaPoke;

    idpoke.innerHTML = pokeinfo.id;
    namepoke.innerHTML = pokeinfo.name;
    pesopoke.innerHTML = pokeinfo.weight;
    alturapoke.innerHTML = pokeinfo.height;

    const urlImage = pokeinfo.sprites.other['official-artwork']['front_default'];
    imagenpoke.src = urlImage;
    imagenpoke.alt = "Pokemon: "+pokeinfo.name;

    pokeinfo.types.forEach(tipo => {
        tipoPoke = document.createElement('li');
        //tipoPoke.classList.add('nombrePoke');
        tipoPoke.id = tipo.type.name;
        tipoPoke.innerHTML = tipo.type.name;
        listaTipos.appendChild(tipoPoke);
     });

    pokeinfo.abilities.forEach(habilidad => {
       habilidadPoke = document.createElement('li');
        //habilidadPoke.classList.add('nombrePoke');
        habilidadPoke.id = habilidad.ability.name;
        habilidadPoke.innerHTML = habilidad.ability.name;
        listaHabilidades.appendChild(habilidadPoke);
    });

    pokeinfo.stats.forEach(estadistica => {
        estadisticaPoke = document.createElement('li');
         //estadisticaPoke.classList.add('nombrePoke');
         estadisticaPoke.id = estadistica["stat"]["name"];
         estadisticaPoke.innerHTML =`${estadistica["stat"]["name"]} = ${estadistica["base_stat"]}`;
         listaEstadisticas.appendChild(estadisticaPoke);
     });
}

//document.addEventListener("DOMContentLoaded", getInfo);