let allTypes = [
  {
    name: "normal",
    color: "rgb(168, 167, 122)",
    backgroundColor: "linear-gradient(to top, #A8A77A, white)",
    bigCardColor: "rgba(168, 167, 122, 0.2)"
  },
  {
    name: "fighting",
    color: "rgb(194, 46, 40)",
    backgroundColor: "linear-gradient(to top, #C22E28, white)",
    bigCardColor: "rgba(194, 46, 40, 0.2)"
  },
  {
    name: "flying",
    color: "rgb(169, 143, 243)",
    backgroundColor: "linear-gradient(to top, #A98FF3, white)",
    bigCardColor: "rgba(169, 143, 243, 0.2)"
  },
  {
    name: "poison",
    color: "rgb(163, 62, 161)",
    backgroundColor: "linear-gradient(to top, #A33EA1, white)",
    bigCardColor: "rgba(163, 62, 161, 0.2)"
  },
  {
    name: "ground",
    color: "rgb(226, 191, 101)",
    backgroundColor: "linear-gradient(to top, #E2BF65, white)",
    bigCardColor: "rgba(226, 191, 101, 0.2)"
  },
  {
    name: "rock",
    color: "rgb(182, 161, 54)",
    backgroundColor: "linear-gradient(to top, #B6A136, white)",
    bigCardColor: "rgba(182, 161, 54, 0.2)"
  },
  {
    name: "bug",
    color: "rgb(166, 185, 26)",
    backgroundColor: "linear-gradient(to top, #A6B91A, white)",
    bigCardColor: "rgba(166, 185, 26, 0.2)"
  },
  {
    name: "ghost",
    color: "rgb(115, 87, 151)",
    backgroundColor: "linear-gradient(to top, #735797, white)",
    bigCardColor: "rgba(115, 87, 151, 0.2)"
  },
  {
    name: "steel",
    color: "rgb(183, 183, 206)",
    backgroundColor: "linear-gradient(to top, #B7B7CE, white)",
    bigCardColor: "rgba(183, 183, 206, 0.2)"
  },
  {
    name: "fire",
    color: "rgb(238, 129, 48)",
    backgroundColor: "linear-gradient(to top, #EE8130, white)",
    bigCardColor: "rgba(238, 129, 48, 0.2)"
  },
  {
    name: "water",
    color: "rgb(99, 144, 240)",
    backgroundColor: "linear-gradient(to top, #6390F0, white)",
    bigCardColor: "rgba(99, 144, 240, 0.2)"
  },
  {
    name: "grass",
    color: "rgb(122, 199, 76)",
    backgroundColor: "linear-gradient(to top, #7AC74C, white)",
    bigCardColor: "rgba(122, 199, 76, 0.2)"
  },
  {
    name: "electric",
    color: "rgb(247, 208, 44)",
    backgroundColor: "linear-gradient(to top, #F7D02C, white)",
    bigCardColor: "rgba(247, 208, 44, 0.2)"
  },
  {
    name: "psychic",
    color: "rgb(249, 85, 135)",
    backgroundColor: "linear-gradient(to top, #F95587, white)",
    bigCardColor: "rgba(249, 85, 135, 0.2)"
  },
  {
    name: "ice",
    color: "rgb(150, 217, 214)",
    backgroundColor: "linear-gradient(to top, #96D9D6, white)",
    bigCardColor: "rgba(150, 217, 214, 0.2)"
  },
  {
    name: "dragon",
    color: "rgb(111, 53, 252)",
    backgroundColor: "linear-gradient(to top, #6F35FC, white)",
    bigCardColor: "rgba(111, 53, 252, 0.2)"
  },
  {
    name: "dark",
    color: "rgb(112, 87, 70)",
    backgroundColor: "linear-gradient(to top, #705746, white)",
    bigCardColor: "rgba(112, 87, 70, 0.2)"
  },
  {
    name: "fairy",
    color: "rgb(214, 133, 173)",
    backgroundColor: "linear-gradient(to top, #D685AD, white)",
    bigCardColor: "rgba(214, 133, 173, 0.2)"
  },
  {
    name: "unknown",
    color: "rgb(0, 0, 0)",
    backgroundColor: "linear-gradient(to top, #000000, white)",
    bigCardColor: "rgba(0, 0, 0, 0.2)"
  },
  {
    name: "shadow",
    color: "rgb(89, 87, 97)",
    backgroundColor: "linear-gradient(to top, #595761, white)",
    bigCardColor: "rgba(89, 87, 97, 0.2)"
  }
];

function getCardData(i) {
  let pokemonName = capitalize(loadedPokemon[i]['name']);
  let pokemonImage = loadedPokemon[i]['sprites']['other']['dream_world']['front_default'];
  if (pokemonImage === null) { return null };
  let pokemonId = loadedPokemon[i]['id'];
  let pokemonType = loadedPokemon[i]['types'][0]['type']['name'];
  let currentId = allTypes.find(function (entry) { return entry.name === pokemonType });
  let background = currentId.backgroundColor;
  let color = currentId.color;
  let src = './img/icons/' + currentId.name + '.svg';
  let experience = loadedPokemon[i]['base_experience'];
  let height = loadedPokemon[i]['height'];
  let weight = loadedPokemon[i]['weight'];
  return {
      pokemonName: pokemonName,
      pokemonImage: pokemonImage,
      pokemonId: pokemonId,
      pokemonType: pokemonType,
      background: background,
      color: color,
      src: src,
      experience: experience,
      height: height,
      weight: weight,
  };
}

function cardTemplate(i) {
  let cardData = getCardData(i);
  if (cardData === null) {
    return '';
  };
  cardAmount++
  return /*html*/`
    <div id="pokedex_card${i}" class="pokedex-card" style="background: ${cardData.background};" onclick="showBigCard(${i})">
        <div class="card-header">
            <h1 id="pokemon_name${i}">${cardData.pokemonName}</h1>
            <h2 id="pokemon_id${i}"># ${cardData.pokemonId}</h2>
        </div>
        <img id="pokemon_image${i}" class="sm-img img-pos" src="${cardData.pokemonImage}" alt="">
        <div class="type">
            <img id="type_img${i}" class="type-img" src="${cardData.src}" alt="">
        </div>
    </div>
  `
}

function bigCardTemplate(i) {
  let cardData = getCardData(i);
  if (cardData === null) {
    return '';
  };
  return /*html*/`
    <div class="background"></div>
    <div id="${i}" class="pokemon-detail">
        <section>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path id="circlePath" fill="none" stroke-width="4" stroke="none" d="
                    M 10, 50
                    a 40,40 0 1,1 80,0
                    a 40,40 0 1,1 -80,0
                  " />
                <text id="text" font-family="Roboto" font-size="8" font-weight="bold" fill="rgba(0, 0, 0, 0.5)">
                    <textPath id="textPath" href="#circlePath">${cardData.pokemonName} #${cardData.pokemonId}</textPath>
                </text>
            </svg>
        </section>
        <div class="card-background" style="background: ${cardData.background};">
            <img id="pokemon_image_card" class="lg-img img-pos-card" src="${cardData.pokemonImage}" alt="">
            <div class="type">
                <img id="type_img_card" class="type-img" src="./img/icons/${cardData.pokemonType}.svg" alt="">
            </div>
        </div>
        <img class="close-btn show-btn" src="./img/add.png" alt="Close" onclick="hideBigCard()">
        <img class="arrow left show-btn" onclick="slideLeft(${i})" src="./img/arrow.png" alt="">
        <img class="arrow right show-btn" onclick="slideRight(${i})" src="./img/arrow.png" alt="">
        <div class="base-stats" style="color: ${cardData.color};">
            <h2>XP: ${cardData.experience}</h2>
            <h2>Height: ${cardData.height * 10} cm</h2>
            <h2>Weight: ${cardData.weight / 10} kg</h2>
        </div>
        <div class="chart">
            <canvas id="myChart" width="100%" height="100%"></canvas>
        </div>
    </div>
  `
}

function loadingScreenTemplate() {
  return /*html*/`
    <div id="loading_screen_background" class="background"></div>
    <div id="loading_screen" class="loading-screen">
        <img id="loading" src="./img/pokemon-1635610_640.png" alt="">
        <label for="loading">Loading . . .</label>
    </div>
  `
}