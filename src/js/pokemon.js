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
let contenedorPerfil = document.getElementById('contenedorPerfil')
let contenedorPerfil1 = document.getElementById('contenedorPerfil1')
const alertaEspacio = document.getElementById('liveAlertPlaceholder');
let pokemon = localStorage.getItem('idPoke');
let logo = document.getElementById('logo');

//regresar a la pokedex
logo.addEventListener('click', (e) => {
    localStorage.removeItem('idPoke');
    window.open('./index.html', "_self");

});


if (btnBuscarPoke) {
    btnBuscarPoke.addEventListener('click', (e) => {
        e.preventDefault();
        listaEstadisticas.innerHTML = '';
        listaTipos.innerHTML = '';
        listaHabilidades.innerHTML = '';
        //Spinner
        contenedorPerfil.style.display = 'none';
        contenedorPerfil1.style.display = 'none';
        var contenidoPadre = document.getElementById('contenido');
        const divSpinner = document.createElement('div');
        divSpinner.classList.add('spinner');
        contenidoPadre.appendChild(divSpinner);
        setTimeout(() => {
            //SPINNER
            contenedorPerfil.style.display = 'block';
            contenedorPerfil1.style.display = 'block';
            divSpinner.remove();
        }, 500);
        getInfo(pokebusqueda.value.toLowerCase()).then((pokeinfo) => {
            fillInfo(pokeinfo);

        }).catch((error) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-danger alert-dismissible" role="alert">`,
                `   <div>El Pokémon no existe</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')
            alertaEspacio.append(wrapper);
        });

        pokebusqueda.value = '';

    });
}

if (pokebusqueda) {
    pokebusqueda.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            listaEstadisticas.innerHTML = '';
            listaTipos.innerHTML = '';
            listaHabilidades.innerHTML = '';

            //Spinner
            contenedorPerfil.style.display = 'none';
            contenedorPerfil1.style.display = 'none';
            var contenidoPadre = document.getElementById('contenido');
            const divSpinner = document.createElement('div');
            divSpinner.classList.add('spinner');
            contenidoPadre.appendChild(divSpinner);
            setTimeout(() => {
                //SPINNER
                contenedorPerfil.style.display = 'block';
                contenedorPerfil1.style.display = 'block';
                divSpinner.remove();
            }, 500);
            getInfo(pokebusqueda.value.toLowerCase()).then((pokeinfo) => {
                fillInfo(pokeinfo);

            }).catch((error) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-danger alert-dismissible" role="alert">`,
                    `   <div>El Pokémon no existe</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                alertaEspacio.append(wrapper);
            });

            pokebusqueda.value = '';
        }
    });
}

getInfo(pokemon).then((pokeinfo) => {
    fillInfo(pokeinfo);
});
//Obtener Pokemons
async function getInfo(id) {
    let url = ` https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
        let response = await axios.get(url);
        return response.data;
    } catch (e) {
        return [];
    }
}

function fillInfo(pokeinfo) {
    let tipoPoke;
    let habilidadPoke;
    let estadisticaPoke;
    let peso = pokeinfo.weight / 10;
    let altura = pokeinfo.height / 10;

    idpoke.innerHTML = pokeinfo.id;
    namepoke.innerHTML = pokeinfo.name;
    pesopoke.innerHTML = `${peso} KG`;
    alturapoke.innerHTML = `${altura} M`;

    const urlImage = pokeinfo.sprites.other['official-artwork']['front_default'];
    imagenpoke.src = urlImage;
    imagenpoke.alt = "Pokemon: " + pokeinfo.name;

    pokeinfo.types.forEach(tipo => {
        tipoPoke = document.createElement('li');
        tipoPoke.id = tipo.type.name;
        tipoPoke.innerHTML = tipo.type.name;
        listaTipos.appendChild(tipoPoke);
    });

    pokeinfo.abilities.forEach(habilidad => {
        habilidadPoke = document.createElement('li');
        habilidadPoke.id = habilidad.ability.name;
        habilidadPoke.innerHTML = habilidad.ability.name;
        listaHabilidades.appendChild(habilidadPoke);
    });

    pokeinfo.stats.forEach(estadistica => {
        estadisticaPoke = document.createElement('li');
        estadisticaPoke.id = estadistica["stat"]["name"];
        estadisticaPoke.innerHTML = `${estadistica["stat"]["name"]} = ${estadistica["base_stat"]}`;
        listaEstadisticas.appendChild(estadisticaPoke);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    //Spinner
    contenedorPerfil.style.display = 'none';
    contenedorPerfil1.style.display = 'none';
    var contenidoPadre = document.getElementById('contenido');
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    contenidoPadre.appendChild(divSpinner);
    setTimeout(() => {
        //SPINNER
        contenedorPerfil.style.display = 'block';
        contenedorPerfil1.style.display = 'block';
        divSpinner.remove();
    }, 500);



});
