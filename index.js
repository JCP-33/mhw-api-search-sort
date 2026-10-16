// mhw api: https://mhw-db.com/monsters

const monsterListEL = document.querySelector(".monster__list");
let monsters = [];

// this function pulls and translates the data from the API
async function main(filtered) {
  document.querySelector(".monsters__loader--wrapper").innerHTML =
    `<div class="monsters__loader"><i class="fas fa-spinner monsters__loading--spinner"></i></div>`;
  const monsterData = await fetch("https://mhw-db.com/monsters");
  monsters = await monsterData.json();
  document.querySelector(".monsters__loader--wrapper").innerHTML = "";
  renderMonsters(monsters);
}

main();

// this function is to pull the data to HTML
function renderMonsters(monsterArray) {
  monsterListEL.innerHTML = monsterArray
    .map((monster) => monsterHTML(monster))
    .join("");
}

// this is the HTML that is inserted for the main() function
function monsterHTML(monster) {
  return `<div class="monster">
            <div class="monster__content">
              <figure class="monster__img--wrapper">
                <img
                  src="assets/monsters/${monster.name}.png"
                  alt=""
                  class="monster__img"
                />
                <figcaption class="monster__title">${monster.name}</figcaption>
              </figure>
              <div class="monster__specs">
                <p class="monster__para monster__type">
                  <b>Type:</b> ${monster.type}
                </p>
                <p class="monster__para monster__species">
                  <b>Species:</b> ${monster.species}
                </p>
                <p class="monster__element"><b>Elements:</b> ${monster.elements.join(", ") || "None"}</p>                
              </div>
            </div>
            <div class="monster__description--bg">
              <p class="monster__para monster__description">
                <b>Description:</b> ${monster.description}
              </p>
              <p class="monster__para monster__resistance">
                <b>Resistances:</b> ${monster.resistances.map((resist) => resist.element).join(", ") || "None"}
              </p>
              <p class="monster__para monster__weakness">
                <b>Weaknesses:</b> ${monster.weaknesses.map((weak) => weak.element).join(", ") || "None"}
              </p>
            </div>
          </div>`;
}

const searchMonster = document.querySelector(".banner__search--input");

// adding event listener so the console knows when the input changes
searchMonster.addEventListener("input", (event) => {
  const searchedMonsters = event.target.value;
  const filteredMonster = monsters.filter((monster) => {
    return monster.name.toLowerCase().includes(searchedMonsters.toLowerCase());
  });

  // this if/else function was made with assistance from Ducky AI as self-researched solutions fell short in final testing. this checks to see if the object can exist within the array before displaying on client side
  if (filteredMonster.length > 0) {
    monsterListEL.innerHTML = filteredMonster.map(monsterHTML).join("");
  } else {
    monsterListEL.innerHTML = "<p>No monsters found.</p>";
  }
  monsterHTML(filteredMonster);
});

// this function is for the filter dropdowns
function filterMonsters() {
  const type = document.getElementById("type").value;
  const species = document.getElementById("species").value;
  const element = document.getElementById("element").value;
  const weaknesses = document.getElementById("weakness").value;
  const resistances = document.getElementById("resistance").value;

  const filtered = monsters.filter((monster) => {
    const typeMatch = type === "" || monster.type === type;
    const speciesMatch = species === "" || monster.species === species;
    const elementMatch = element === "" || monster.elements?.includes(element);
    const weaknessMatch =
      weaknesses === "" ||
      monster.weaknesses?.some(
        (weak) => weak.element === weaknesses && weak.stars === 3,
      );
    const resistanceMatch =
      resistances === "" ||
      monster.resistances?.some((resist) => resist.element === resistances);
    return (
      typeMatch &&
      speciesMatch &&
      elementMatch &&
      weaknessMatch &&
      resistanceMatch
    );
  });

  if (filtered.length === 0) {
    monsterListEL.innerHTML = "<p>Monster does not exist</p>";
  } else {
    renderMonsters(filtered);
  }
}
