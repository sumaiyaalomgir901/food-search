const searchFood = () => {
  const inputSearch = document.getElementById("input-search");
  const inputSearchText = inputSearch.value;

  inputSearch.value = "";
  if (inputSearchText.length == 0) {
    const errorMsg = document.getElementById("error-msg");
    const h1 = document.createElement("h1");
    h1.innerText = "Please enter food name";
    errorMsg.appendChild(h1);
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFood(data.meals));
  }
};
const displayFood = (meals) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadFoodDetails(${meal.idMeal})" class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4>${meal.strMeal}</h4>
      </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
};
const loadFoodDetails = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayFoodDetails(data.meals[0]);

  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => displayFoodDetails(data.meals[0]));
};
const displayFoodDetails = (meal) => {
  const foodDetails = document.getElementById("food-details");
  foodDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h4>${meal.strMeal}</h4>
    <h5>${meal.strCategory}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
    </div>
  </div>
  `;
  foodDetails.appendChild(div);
};
/*  */
