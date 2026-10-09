// mhw api: https://mhw-db.com/monsters

const monsterListEL = document.querySelector(".monster__list");

async function main() {
  const monsterData = await fetch("https://mhw-db.com/monsters");
  const monster = await monsterData.json();
  monsterListEL.innerHTML = monster
    .map((monster) => monsterHTML(monster))
    .join("");
  console.log(monster);
}

main();

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
                    <b>Resistances:</b> ${monster.resistances.map((strong) => strong.element).join(", ") || "None"}
                  </p>
                  <p class="monster__para monster__weakness">
                    <b>Weaknesses:</b> ${monster.weaknesses.map((weak) => weak.element).join(", ") || "None"}
                  </p>
                </div>
              </div>`;
}
