import axios from "axios";
import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  DIET_TYPE_FILTER,
  DIET_ORIGIN_FILTER,
  ALPHABETICAL_SORT,
  HEALTHSCORE_SORT,
  SEARCH_RECIPE,
  GET_DIET_TYPES,
  LOCAL_HOST,
} from "./types";


export function getRecipes() {
  // get all recipes
  return async function (dispatch) {
    const response = await axios.get(`${LOCAL_HOST}/recipes`);
    dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
}
//PROMESAS
/* export const getRecipesByName = (payload) => {
  return function (dispatch) {
    try {
      axios
        .get(`${LOCAL_HOST}/recipes?name=${payload}`, {})
        .then((response) => {
          dispatch({
            type: SEARCH_RECIPE,
            payload: response.data,
          });
        });
    } catch (error){
     alert("Recipe Not Found");
    }
  }; 
 }; */
//ASYNC AWAIT
 export function getRecipesByName(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`${LOCAL_HOST}/recipes?name=${payload}`);
      return dispatch({ type: SEARCH_RECIPE, payload: response.data });
    } catch {
      return alert("Recipe Not Found");
    }
  };
} 
export function getDietTypes() {
  return async function (dispatch) {
    try {
      var response = await axios.get(`${LOCAL_HOST}/types`);
      return dispatch({
        type: GET_DIET_TYPES,
        payload: response.data.map((d) => d.name),
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function addRecipe(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post(`${LOCAL_HOST}/recipe`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
export function getRecipeDetails(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`${LOCAL_HOST}/recipes/${payload}`);
      return dispatch({ type: GET_RECIPE_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function dietTypeFilter(payload) {
  return {
    type: DIET_TYPE_FILTER,
    payload,
  };
}
export function dietOrigin(payload) {
  return {
    type: DIET_ORIGIN_FILTER,
    payload,
  };
}
export function aplhabeticalSort(payload) {
  return {
    type: ALPHABETICAL_SORT,
    payload,
  };
}
export function healthScoreSort(payload) {
  return {
    type: HEALTHSCORE_SORT,
    payload,
  };
}

