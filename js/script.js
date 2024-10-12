const searchButtonEl = document.getElementById("search-button");
const mealsEl = document.getElementById("meals");

// Global variable to store the meals
let meals = [];

function fetchMeals(searchQuery) {
  let apiURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian";
  if (searchQuery) {
    apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchQuery}`;
  }
  $.ajax({
    type: "get",
    url: apiURL,
    success: function (response) {
      //   console.log(response.meals);
      meals = response.meals;
      displayDataOnUI(meals);
    },
    error(err) {
      console.log(err);
      meals = [];
    },
  });
}

function displayDataOnUI(meals) {
  let result = "";
  meals.forEach((meal) => {
    result += `
         <li class="meal">
          <h2 class="meal-title">${meal.strMeal}</h2>
          <img src=${meal.strMealThumb} alt=${meal.strMeal} />
          <h3 class="meal-id">${meal.idMeal}</h3>
        </li>
        `;
  });
  mealsEl.innerHTML = result;
}

function handleSearch() {
  let inputEl = document.getElementById("search-field");
  let searchQuery = inputEl.value;
  fetchMeals(searchQuery);
}

fetchMeals();

searchButtonEl.addEventListener("click", handleSearch);
