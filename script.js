const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; // API
let data = [];
let count = 5;
let sortMethod = "";

// Element HTML
const cardCocktails = document.getElementById("cardCocktails");
const searchInput = document.getElementById("searchInput");
const sortASC = document.getElementById("sortASC");
const sortDSC = document.getElementById("sortDSC");
const countCocktails = document.getElementById("countCocktails");
const valueCocktails = document.getElementById("valueCocktails");
const sortSelect = document.getElementById("sortName");

// Récupere les données
async function fetchData() {
  try {
    const req = await fetch(url);
    data = await req.json();
    displayCard();
  } catch (error) {
    console.log(error);
  }
}

function displayCard() {
  cardCocktails.innerHTML = "";

  let cocktailCopy = [...data.drinks];

  // search name
  if (searchInput) {
    cocktailCopy = cocktailCopy.filter((c) =>
      c.strDrink.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  switch (sortMethod) {
    // Trie A-Z
    case "sortNameAsc":
      cocktailCopy = cocktailCopy.sort((c1, c2) =>
        c1.strDrink.localeCompare(c2.strDrink)
      );

      break;

    // Trie Z-A
    case "sortNameDesc":
      cocktailCopy = cocktailCopy.sort((c2, c1) =>
        c1.strDrink.localeCompare(c2.strDrink)
      );
      break;

    default:
      break;
  }

  cocktailCopy.slice(0, count).forEach((e) => {
    cardCocktails.innerHTML += `
  <div class="card">
        <div class="card-img">
          <img
            src="${e.strDrinkThumb}"
            alt=""
          />
        </div>
        <div class="card-info">
          <h1>${e.strDrink}</h1>

          <p>
            Verre : ${e.strGlass}
          </p>

          <p>
           Ingrédients clés : ${e.strIngredient1}, ${e.strIngredient2}, ${e.strIngredient3}
          </p>
        </div>
      </div>
  `;
  });
}

searchInput.addEventListener("input", () => {
  displayCard();
});

sortSelect.addEventListener("change", () => {
  sortMethod = sortSelect.value;
  displayCard();
});

countCocktails.addEventListener("input", () => {
  count = countCocktails.value;
  valueCocktails.textContent = count;
  displayCard();
});

fetchData();
