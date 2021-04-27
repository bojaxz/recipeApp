import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "e37416c1";
  const APP_KEY = "c2a677df1e7fa9edfabfb82342adbb76";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  // useEffect used with a callback allows us to run our API query once the query(search once search button is pressed) has been completed.
  useEffect(() => {
    getRecipes();
  }, [query]);

  // async await used to fetch data from edamam API.
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    // always add await when fetching data from a third party.
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  // allows us to use event listener to upate our search value.
  // doing this allows us to update our search state in real time
  // while prepping another const to accept our search when it is completed via the search button.
  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search);
  };

  // function to prevent submit from refreshing page on click. (form submit button will refresh page by default when clicked.)
  // will set our query to the search when the search button is clicked.
  // will then reset the text in search bar to be blank.
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
