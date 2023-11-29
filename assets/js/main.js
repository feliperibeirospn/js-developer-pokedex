const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const detailsContainer = document.getElementById('detailsContainer'); // Supondo que este elemento exista

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    const typesHtml = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">${typesHtml}</ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="details-button-container">
                <button class="pokemon" data-pokemon-id="${pokemon.number}">Atributos</button>
            </div>
        </li>
    `;
}

function appendPokemonsToList(pokemons) {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
}

function loadPokemonItems(currentOffset, currentLimit) {
    pokeApi.getPokemons(currentOffset, currentLimit).then(pokemons => {
        appendPokemonsToList(pokemons || []);
    });
}

function updateLoadMoreButton() {
    const nextOffset = offset + limit;
    if (nextOffset >= maxRecords) {
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const nextLimit = (offset + limit > maxRecords) ? maxRecords - offset : limit;

    loadPokemonItems(offset, nextLimit);
    updateLoadMoreButton();

    detailsContainer.style.display = 'none';
});
