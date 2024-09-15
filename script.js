let countAllPokemon = checkCount();
let loadingStart = 1;
let renderStart = 0;
const OFFSET = 20;
let loadedPokemon = [];
let allPokemonData = [];
let currentPokemonStats = [];
let cardBackground = '';
let cardColor = '';
let foundPokemon = [];
let cardAmount = 0;

async function init() {
    await loadPokemonData();
    await loadAllPokemon();
}

async function loadPokemonData() {
    window.addEventListener('scroll', loadMorePokemonData);
    showLoadingScreen();
    for (let i = loadingStart; i < loadingStart + OFFSET; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    renderCards();
    hideLoadingScreen();
    loadingStart += OFFSET;
}

async function loadAllPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon-species/?limit=1025'
    let response = await fetch(url);
    allPokemonData = await response.json();
    allPokemonData = allPokemonData['results'];
}

function showLoadingScreen() {
    document.body.style.overflow = 'hidden';
    document.getElementById('myBtn').style.display = 'none';
    document.getElementById('pokedex').innerHTML += loadingScreenTemplate();
}

function hideLoadingScreen() {
    document.body.style.overflow = 'auto';
    document.getElementById('myBtn').style.display = 'inline-block';
    const LOADING_SCREEN = document.getElementById('loading_screen');
    const LOADING_SCREEN_BACKGROUND = document.getElementById('loading_screen_background');
    document.getElementById('pokedex').removeChild(LOADING_SCREEN);
    document.getElementById('pokedex').removeChild(LOADING_SCREEN_BACKGROUND);
}

function renderCards() {
    for (let i = renderStart; i < renderStart + OFFSET; i++) {
        document.getElementById('pokedex').innerHTML += cardTemplate(i);
    }
    renderStart += OFFSET;
}

async function checkCount() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    count = await response.json();
    countAllPokemon = count['count'];
    return countAllPokemon;
}

function capitalize(name) {
    let newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
}

function loadCurrentColors(i) {
    let pokemonType = loadedPokemon[i]['types'][0]['type']['name'];
    let currentId = allTypes.find(function (entry) {
        return entry.name === pokemonType;
    });
    cardBackground = currentId.bigCardColor;
    cardColor = currentId.color;
}

function showBigCard(i) {
    document.body.style.overflow = 'hidden';
    document.getElementById('myBtn').style.display = 'none';
    const BIG_CARD = document.getElementById('big_card');
    BIG_CARD.style.display = 'flex';
    loadCurrentPokemonStats(i); loadCurrentColors(i);
    BIG_CARD.innerHTML = bigCardTemplate(i);
    checkArrow(i); loadChart(); escBehavior(); backgroundBehavior();
}

function hideBigCard() {
    document.body.style.overflow = 'auto'
    document.getElementById('myBtn').style.display = 'inline-block';
    const BIG_CARD = document.getElementById('big_card');
    BIG_CARD.style.display = 'none';
}

function loadCurrentPokemonStats(i) {
    currentPokemonStats = [];
    let currentStats = loadedPokemon[i]['stats'];
    for (let j = 0; j < currentStats.length; j++) {
        const element = currentStats[j]['base_stat'];
        currentPokemonStats.push(element);
    }
}

function checkArrow(i) {
    if (i == 0 && i == cardAmount - 1) {
        document.querySelector('.left').style.display = 'none';
        document.querySelector('.right').style.display = 'none';
    } else if (i == countAllPokemon || i == cardAmount - 1) {
        document.querySelector('.right').style.display = 'none';
    } else if (i == 0) {
        document.querySelector('.left').style.display = 'none';
    }
}

function slideLeft(i) {
    if (i != 0) {
        showBigCard(i - 1);
    }
}

async function slideRight(i) {
    if (i != countAllPokemon && i < loadedPokemon.length - 1) {
        showBigCard(i + 1);
    } else if (i == loadedPokemon.length - 1 && loadedPokemon.length <= countAllPokemon) {
        await loadPokemonData();
        showBigCard(i + 1);
    }
}

function escBehavior() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hideBigCard();
        }
    });
}

function backgroundBehavior() {
    const BACKGROUND = document.querySelector('.background');
    BACKGROUND.addEventListener('click', function () {
        hideBigCard();
    });
}

let previousScrollPosition = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollPosition > 0 && currentScrollPosition < previousScrollPosition) {
        document.getElementById('header').classList.add('header-visible');
    } else {
        document.getElementById('header').classList.remove('header-visible');

    }
    previousScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', handleScroll);

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    let mybutton = document.getElementById('myBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add('show');
    } else {
        mybutton.classList.remove('show');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function loadMorePokemonData() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadPokemonData();
    }
}

function loadMoreSearchedPokemonData() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        renderLimitedFoundPokemon();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let searchField = document.getElementById("search");
    if (searchField) {
        searchField.addEventListener("input", searchFieldBehavior);
        searchField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                search();
            }
        });
    } else {
        console.error("Das Input-Feld wurde nicht gefunden.");
    }
});

function searchFieldBehavior() {
    let searchField = document.getElementById("search");
    let valueWithoutSpaces = searchField.value.replace(/\s/g, '');
    searchField.value = valueWithoutSpaces;
    if (searchField.value.trim() === "") {
        search();
    }
}

function searchInAllPokemonData() {
    foundPokemon = [];
    let search = document.getElementById('search').value.toLowerCase();
    for (let i = 0; i < allPokemonData.length; i++) {
        if (allPokemonData[i]['name'].includes(search)) {
            foundPokemon.push(i)
        }
    }
}

async function renderFoundPokemon() {
    window.removeEventListener('scroll', loadMorePokemonData);
    showLoadingScreen();
    loadedPokemon = [];
    for (let i = 0; i < foundPokemon.length; i++) {
        const element = foundPokemon[i] + 1;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + element;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    cardAmount = 0;
    renderFoundCards();
}

async function renderLimitedFoundPokemon() {
    window.removeEventListener('scroll', loadMorePokemonData);
    window.addEventListener('scroll', loadMoreSearchedPokemonData);
    showLoadingScreen();
    for (let i = renderStart; i < renderStart + OFFSET; i++) {
        const element = foundPokemon[i] + 1;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + element;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    renderStart += OFFSET;
    cardAmount = 0;
    renderFoundCards();
}

function renderFoundCards() {
    hideLoadingScreen();
    document.getElementById('pokedex').innerHTML = '';
    for (let i = 0; i < loadedPokemon.length; i++) {
        document.getElementById('pokedex').innerHTML += cardTemplate(i);
    }
}

async function search() {
    let search = document.getElementById('search').value.toLowerCase();
    if (search != '') {
        searchInAllPokemonData();
        if (foundPokemon.length < 20) {
            await renderFoundPokemon();
        } else {
            await actionWhenMorePokemonFound();
        }
    } else {
        await actionWhenSearchEmpty();
    }
}

function resetStartValues() {
    loadingStart = 1;
    renderStart = 0;
    loadedPokemon = [];
}

async function actionWhenMorePokemonFound() {
    resetStartValues();
    loadedPokemon = [];
    await renderLimitedFoundPokemon();
}

async function actionWhenSearchEmpty() {
    document.getElementById('pokedex').innerHTML = '';
    resetStartValues();
    await loadPokemonData();
}