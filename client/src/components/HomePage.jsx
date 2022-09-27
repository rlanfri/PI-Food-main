import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  dietTypeFilter,
  aplhabeticalSort,
  healthScoreSort,
/*   dietOrigin, */
} from "../actions";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import "./HomePage.css";
import Image from "../images/logo.png";

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [ /* order */, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [recipesPage, /* setRecipesPage */] = useState(9);
  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;

  //ejemplo 0 a 9, 9 no se muestra
  const showRecipesPage = allRecipes.slice( //.slice sirve para cortar un array y mostrar solo una cantidad de elementos determinada por el parametro que le pasemos (9)
    firstRecipePage, 
    quantityRecipesPage
  );
  //seteo el state de las recetas por pagina

  const paged = function (pageNumber) { 
    setPage(pageNumber);
  };


  useEffect(() => { 
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }
/*   function handleOriginFilter(e) {
    e.preventDefault();
    dispatch(dietOrigin(e.target.value));
    setPage(1);
  } */

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleHealthScoreSort(e) {
    e.preventDefault();
    dispatch(healthScoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <Fragment>

      {/* HEADER */}
      <div className="header">
        <Link to="/home">
          <img src={Image} alt="logo" className="logo" />
        </Link>
      </div>

      {/* BODY */}
      <div className="home">
        {/* SEARCH BAR */}
        <SearchBar />

        <br />
        <div>
          {/* REFRESH BUTTON */}
          <button className="refreshButton" onClick={handleClick}>
          Refresh recipes
          </button>
          {/* NEW RECIPE */}
          <Link to="/recipe">
            <button className="addButton">Add new recipe</button>
          </Link>
        </div>
        {/* SELECT */}
        <div className="select">
          <label className="filters">Sort:</label>

          {/* AlPHABETICAL */}
          <select
            className="select"
            name="alphabetical"
            onChange={(e) => handleAlphabeticalSort(e)}
            defaultValue= {"default"}
          >
            <option disabled value="default">
              Alphabetical
            </option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>

          {/* HEALTH SCORE */}
          <select
            className="select"
            name="numerical"
            onChange={(e) => handleHealthScoreSort(e)}
            defaultValue= {"default"}
          >
            <option disabled value="default">
              Health Score
            </option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
          </select>

          {/* FILTER DIETS */}
          <label className="filters">Diet Types:</label>
          <select
            className="select"
            name="diets"
            onChange={(e) => handleDietTypeFilter(e)}
            defaultValue= {"default"}
          >
            <option disabled value="default">
              Select diet...
            </option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Keto</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto-Vegetarian</option>
            <option value="ovo vegetarian">Ovo-Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleolithic">Paleo</option>
            <option value="primal">Primal</option>
            <option value="low fodmap">Low FODMAP</option>
            <option value="whole 30">Whole30</option>
            <option value="dairy free">Dairy Free</option>
          </select>
          {/* FILTER ORIGINS */}
{/*           <label className="filters">Origin:</label>
          <select
            className="select"
            name="origins"
            onChange={(e) => handleOriginFilter(e)}
            defaultValue= {"default"}
          >
          <option disabled value="default">
              Select Origin...
            </option>
            <option value="all">All</option>
            <option value="api">Api</option>
            <option value="createdindb">Created</option>
          </select> */}

        </div>

        {/* PAGED */}
        <Paged
          recipesPage={recipesPage}
          allRecipes={allRecipes.length}
          paged={paged}
        />
        {/* RECIPES RENDER*/}
        <div className="allrecipes">
          {showRecipesPage?.map((e) => {
            return (
            showRecipesPage ===[] ? (
              <div className="noRecipes">
                <img src="../images/loading-opaque.gif" alt="Loading..." />
              </div>
            ) : (
              <div className="eachRecipe" key={prevId++}>
                <Link className="linkRecetas" to={`home/${e.id}`}>
                  <Recipe
                    image={
                      e.image
                        ? e.image
                        : "https://c.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif"
                    }
                    name={e.name}
                    dietTypes={e.dietTypes}
                    healthScore={e.healthScore}
                    /*                     veryHealthy={e.veryHealthy} */
                  />
                </Link>
              </div>
            )
            );
          })}
        </div>

        {/* PAGED */}
        <Paged
          recipesPage={recipesPage} 
          allRecipes={allRecipes.length}
          paged={paged}
        />
      </div>

      {/* FOOTER */}
      <div className="footer">
        <footer> Made with ♡ by Rodrigo Lanfri</footer>

      </div>

    </Fragment>
  );
}
