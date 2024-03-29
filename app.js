// SELECT ELEMENTS
const input = document.querySelector(".form-container input");
const searchButton = document.querySelector(".form-container button");
const drinkName = document.querySelector(".drink-name");
const drinkInstructions = document.querySelector(".drink-instructions");
const ingredientOne = document.querySelector(".ingredientone");
const ingredientTwo = document.querySelector(".ingredienttwo");
const errorMessage = document.querySelector(".error-message");

// CONSTS

const drink = {};

drink.ingredients = [];

let searchValue = input.value;

// SEARCH FOR DRINKS
function getDrinks() {
  let api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;

  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
      .then(function(data) {
        drink.name = data.drinks[0].strDrink;
        drink.instructions = data.drinks[0].strInstructions;
        drink.ingredients[0] = data.drinks[0].strIngredient1;
        drink.ingredients[1] = data.drinks[0].strIngredient2;

        displayDrinks()
      })
        .catch(e => {
          displayError();
        })
};


// DISPLAY SEARCH RESULTS
function displayDrinks() {
  errorMessage.style.display = "none";
  drinkName.innerHTML = `<b>Drink:</b> ${drink.name}`;
  drinkInstructions.innerHTML = `<b>Instructions:</b> ${drink.instructions}`;
  ingredientOne.innerHTML = `<b>Ingredient 1:</b> ${drink.ingredients[0]}`;
  ingredientTwo.innerHTML = `<b>Ingredient 2:</b> ${drink.ingredients[1]}`;
};

// DISPLAY ERROR
function displayError() {
  errorMessage.style.display = "block";
  drinkName.innerHTML = `<b>Drink:</b>`;
  drinkInstructions.innerHTML = `<b>Instructions:</b>`;
  ingredientOne.innerHTML = `<b>Ingredient 1:</b>`;
  ingredientTwo.innerHTML = `<b>Ingredient 2:</b>`;
}

// EVENT LISTENER

searchButton.addEventListener('click', function() {
  if (input.value == "") return;

  searchValue = input.value;
  getDrinks();
});

document.addEventListener('keypress', function(e) {
  if (e.keyCode == 13) {
    if (input.value == "") return;

    searchValue = input.value;
    getDrinks();
  }
})
