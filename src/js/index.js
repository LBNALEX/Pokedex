let url = ` https://pokeapi.co/api/v2/pokemon/`;
let arrayPokeUrl = [];
let arrayPokeName = [];
let pokebusqueda = document.getElementById('pokebusqueda');
let btnBuscarPoke = document.getElementById('btnBuscarPoke');


getInfo(url).then((pokeinfo) => {
    pokeinfo.forEach(enlace => {
        getData(enlace.url)
        .then((data) => {
            arrayPokeUrl.push(data);//data.sprites.other['official-artwork']['front_default']
            return arrayPokeUrl;
        })
        .then((urlImages) => {
            if(urlImages.length == 20){
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
        console.log(url);
        let response = await axios.get(url);
        return response.data;
    } catch (e) {
        return [];
    }
}

function fillInfo(pokeinfo) {
    pokeinfo.sort((a, b) => {
        return a.id - b.id;
    });
    console.log(pokeinfo);
    
    const seccion = document.getElementById('seccionPokedex');
    let ul = document.getElementById('milista');
    let li;
    let div;
    let img;
    let p;
    console.log(ul);

   pokeinfo.forEach(element => {
    console.log(element.id);
    li = document.createElement('li');  
    div = document.createElement('div');
    div.classList.add('pokemon');
    
    img = document.createElement('img');
    img.src = element.sprites.other['official-artwork']['front_default'];
    img.alt =element.name;
    img.id =element.id;
    div.appendChild(img);
    p = document.createElement('p');
    p.innerHTML =element.name;
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);

    div.addEventListener('click',() =>{
        console.log(element.id);
        localStorage.setItem('idPoke', element.id);
         window.open('http://127.0.0.1:5501/pokemon.html', "_self");
     });
   });
        
    seccion.appendChild(ul);

}

if (btnBuscarPoke) {
    btnBuscarPoke.addEventListener('click', (e) => {
        e.preventDefault();
        console.log( pokebusqueda.value.toLowerCase());
        localStorage.setItem('idPoke', pokebusqueda.value.toLowerCase());
        window.open('http://127.0.0.1:5501/pokemon.html', "_self");
        //pokebusqueda.value = '';

    });
}

if (pokebusqueda) {
    pokebusqueda.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log( pokebusqueda.value.toLowerCase());
            localStorage.setItem('idPoke', pokebusqueda.value.toLowerCase());
            window.open('http://127.0.0.1:5501/pokemon.html', "_self");
            //pokebusqueda.value = '';
        }
    });
}