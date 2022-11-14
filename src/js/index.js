let url = ` https://pokeapi.co/api/v2/pokemon/`;
let arrayPokeUrl = [];
let pokebusqueda = document.getElementById('pokebusqueda');
let btnBuscarPoke = document.getElementById('btnBuscarPoke');
let anterior = document.getElementById('anterior');
let siguiente = document.getElementById('siguiente');
let cantidadPokes = 0;
let opcion = 1;


function getInfo(url){
    return new Promise((resolve,reject) =>{
        axios
            .get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

getInfo(url).then((pokeinfo) => {
    pokeinfo.forEach(enlace => {
        getData(enlace.url)
            .then((data) => {
                arrayPokeUrl.push(data);//data.sprites.other['official-artwork']['front_default']
                return arrayPokeUrl;
            })
            .then((urlImages) => {
                if (urlImages.length == 20) {
                    fillInfo(urlImages);

                }
            })
            .catch((error) => {
                console.log("Error ", error);
            });
    });

}).catch((error) => {
    console.log(error);
});

function getData(url) {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//Obtener Pokemons
async function getInfo(url) {
    try {
        let response = await axios.get(url);
        return response.data.results;
    } catch (e) {
        return [];
    }
}

async function getImages(url) {
    try {
        let response = await axios.get(url);
        return response.data;
    } catch (e) {
        return [];
    }
}

function fillInfo(pokeinfo) {
    pokeinfo.sort((a, b) =>   a.id - b.id);

    const seccion = document.getElementById('seccionPokedex');
    let ul = document.getElementById('milista');
    let li;
    let div;
    let img;
    let p;
    let btn;

    pokeinfo.forEach(element => {
        li = document.createElement('li');
        div = document.createElement('div');
        div.classList.add('pokemon');

        img = document.createElement('img');
        img.src = element.sprites.other['official-artwork']['front_default'];
        img.alt = element.name;
        img.id = element.id;
        div.appendChild(img);
        p = document.createElement('p');
        p.innerHTML = element.name;
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);

        div.addEventListener('click', () => {
            localStorage.setItem('idPoke', element.id);
            window.open('./pokemon.html', "_self");
        });

    });
    if (opcion == 1) {
        cantidadPokes = cantidadPokes + 20;
    }
    else {
        cantidadPokes = cantidadPokes - 20;
    }


}

if (btnBuscarPoke) {
    btnBuscarPoke.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('idPoke', pokebusqueda.value.toLowerCase());
        window.open('./pokemon.html', "_self");
        //pokebusqueda.value = '';

    });
}

if (pokebusqueda) {
    pokebusqueda.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            localStorage.setItem('idPoke', pokebusqueda.value.toLowerCase());
            window.open('./pokemon.html', "_self");
            //pokebusqueda.value = '';
        }
    });
}

if (anterior) {
    anterior.addEventListener('click', (e) => {
        e.preventDefault();
        opcion = 0;
    });
}
if (siguiente) {
    siguiente.addEventListener('click', (e) => {
        e.preventDefault();
        opcion = 1;
        let qtyarray = arrayPokeUrl.length;
        for (let index = 0; index < qtyarray; index++) {
            arrayPokeUrl.pop();

        }
        urlSiguiente = `https://pokeapi.co/api/v2/pokemon/?offset=${cantidadPokes}&limit=20`;
        getInfo(urlSiguiente).then((pokeinfo) => {
            pokeinfo.forEach(enlace => {
                getData(enlace.url)
                    .then((data) => {
                        arrayPokeUrl.push(data);
                        return arrayPokeUrl;
                    })
                    .then((urlImages) => {
                        if (urlImages.length == 20) {
                            fillInfo(urlImages);

                        }
                    })
                    .catch((error) => {
                        console.log("Error ", error);
                    });
            });

        }).catch((error) => {
            console.log(error);
        });
    });
}