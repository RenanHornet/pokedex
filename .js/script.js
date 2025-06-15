const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let currentPokemonData = null;
const traducaoTipos = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Metálico',
  fairy: 'Fada'
};

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}


const fetchPokemon =  async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }  
}

const renderPokemon =  async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  

  const data = await fetchPokemon(pokemon);

  if (data) {
    currentPokemonData = data;
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  
});
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }    
});  
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});  

renderPokemon(searchPokemon);

//botao popup.

const btnPopUp = document.getElementById('btnPopUp');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopup');

//adiciona um evento de click ao botao 'info'.
btnPopUp.addEventListener('click', function () {
  if (currentPokemonData) {
    const altura = currentPokemonData.height / 10;
    const peso = currentPokemonData.weight / 10;

    const tipos = currentPokemonData.types
      .map((tipo) => traducaoTipos[tipo.type.name] || capitalizar(tipo.type.name))
      .join(', ');

    const habilidades = currentPokemonData.abilities
      .slice(0, 4)
      .map((h) => capitalizar(h.ability.name))
      .join(', ');

    document.getElementById('info-tipo').innerText = `Tipo: ${tipos}`;
    document.getElementById('info-altura').innerText = `Altura: ${altura} m`;
    document.getElementById('info-peso').innerText = `Peso: ${peso} kg`;
    document.getElementById('info-habilidade').innerText = `Habilidades: ${habilidades}`;

    popup.style.display = 'block';
  }
});



closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none'; // Esconde o popup
});



