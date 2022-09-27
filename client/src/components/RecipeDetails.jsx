import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions";
import { Link } from "react-router-dom";
import "./recipedetails.css";
import Image from "../images/logo.png";

export default function RecipeDetails(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const recipeDetails = useSelector((state) => state.recipeDetails);

  return (
    <Fragment>
      <div>
        <div className="header">
          <Link to="/home">
            <img src={Image} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="details" key={id}>
          <div className="divimg">
            <img
              className="detailImg"
              src={
                recipeDetails.image
                  ? recipeDetails.image
                  : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              }
              alt="recipe"
            />
            <h1 className="detailName">{recipeDetails.name}</h1>
          </div>
          {recipeDetails.dishTypes ? (
            <div className="ddsh">
              <h2 className="texts">Dish Type </h2>
              {recipeDetails.dishTypes?.map((e) => {
                return (
                  <h2 className="dishesanddiets" key={e}>
                    {" "}
                    {e}
                  </h2>
                );
              })}
            </div>
          ) : (
            <br />
          )}

          <div className="ddsh">
            <h2 className="texts">Diet Type </h2>
            {recipeDetails.dietTypes
              ? recipeDetails.dietTypes.map((e) => {
                  return (
                    <h2 className="dishesanddiets" key={e}>
                      {e}
                    </h2>
                  );
                })
              : recipeDetails.diets?.map((e) => {
                  return (
                    <h2 className="dishesanddiets" key={e.name}>
                      {e.name}
                    </h2>
                  );
                })}
          </div>

          <div className="ddsh">
            <h3 className="texts">Summary </h3>
            <p className="summary">
              {recipeDetails.summary?.replace(/<[^>]*>/g, "")}
            </p>
          </div>

          <div className="ddsh">
            <h3 className="scores">
              Healthiness points {recipeDetails.healthScore}
            </h3>
          </div>

          {recipeDetails.steps ?  (
          <div className="ddsh">
            <h3 className="texts">Steps </h3>
            <ul className="steps">
              {Array.isArray(recipeDetails.steps) ? ( 
                recipeDetails.steps.map((e) => {
                  return <li key={e.number}>{e.step}</li>;
                })
              ) : (
                <li>{recipeDetails.steps}</li>
              )}
            </ul>
          </div>
          ) : ( 
            <div className="ddsh">
              </div>
          )}
          <Link to="/home">
            <button className="backButton">Go back to recipes</button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <footer> Made with ♡ by Rodrigo Lanfri </footer>
      </div>
    </Fragment>
  );
}
