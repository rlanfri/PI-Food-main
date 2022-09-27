import React from "react";
/* import { useDispatch } from "react-redux"; */
import './recipe.css';
/* import { deleteRecipe } from "../actions/index"; */



let prevId = 1; 

export default function Recipe(recipes) {
  const { image, name, dietTypes, /* createdInDb, veryHealthy  */} = recipes;
   
/* const dispatch = useDispatch(); */

/* function handleDelete (e) {
  e.preventDefault();
  dispatch(deleteRecipe(e.id));
} */

  return (
    <div className="recipe">  
    {/* NAME */}
      <div>
        <h2 className="recipeName">{name}</h2>
      </div>
      {/* IMAGE */}
      <div>
        <img className="recipeImg" src={image} alt="Not found" />
      </div>
      {/* DIET TYPES */}
        <h4 className="dietsTitle">Diets:</h4>
      <div className="dietcointainer">

        {dietTypes?.map((e) => {
          return (
            <h5 className="diets" key={prevId++}> 
              {e} 
            </h5> // prevId++ me asegura que el id sea unico para cada elemento
          );
        })}
      </div>
      <div>
{/*       {createdInDb && (
        <button className="deleteRecipe" onClick={handleDelete}>
          Delete
        </button>
      )} */}
      </div>
      {/* VERY HEALTHY 
       <div> {veryHealthy ? <h5 className="veryHealthy">Very Healthy</h5> : null}</div> */}

    </div>
  );
}



