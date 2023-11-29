const detailsOverlay = document.getElementById('detailsOverlay');
const closeDetailsButton = document.getElementById('closeDetailsButton');
const detailsContent = document.querySelector('.details-content');

function createDetailItem(label, value) {
    return `<p><strong>${label}:</strong> ${value}</p>`;
}

function createPokemonDetailsHtml(pokemon) {
    const typesHtml = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
    return `
        <h1>Detalhes do Pokémon</h1>
        ${createDetailItem('Nome', pokemon.species)}
        ${createDetailItem('Altura', pokemon.height)}
        ${createDetailItem('Peso', pokemon.weight)}
        ${createDetailItem('HP', pokemon.hp)}
        ${createDetailItem('Ataque', pokemon.attack)}
        ${createDetailItem('Defesa', pokemon.defense)}
        ${createDetailItem('Velocidade', pokemon.speed)}
        ${createDetailItem('Total', pokemon.total)}
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <ol class="types">${typesHtml}</ol>
    `;
}

function showPokemonDetails(pokemon) {
    const detailsHtml = createPokemonDetailsHtml(pokemon);
    detailsContent.innerHTML = detailsHtml;
    detailsOverlay.style.display = 'flex';
}

function hideDetailsOverlay() {
    detailsOverlay.style.display = 'none';
}

detailsOverlay.addEventListener('click', (event) => {
    if (event.target === detailsOverlay) {
        hideDetailsOverlay();
    }
});

const pokemonList = document.getElementById('pokemonList');

pokemonList.addEventListener('click', async (event) => {
    const detailsButton = event.target.closest('.pokemon');
    if (detailsButton) {
        const pokemonId = parseInt(detailsButton.getAttribute('data-pokemon-id'));

        try {
            const pokemonDetails = await pokeApi.getPokemonDetailById(pokemonId);
            showPokemonDetails(pokemonDetails);
        } catch (error) {
            console.error("Erro ao obter detalhes do Pokémon:", error);
        }
    }
});
