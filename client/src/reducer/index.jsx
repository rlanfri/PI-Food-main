import {
  GET_RECIPES,
  ADD_RECIPE,
  DIET_TYPE_FILTER,
  DIET_ORIGIN_FILTER,
  ALPHABETICAL_SORT,
  HEALTHSCORE_SORT,
  SEARCH_RECIPE,
  GET_DIET_TYPES,
  GET_RECIPE_DETAILS,
} from "../actions/types";

const initialState = {
  recipes: [],
  allRecipes: [],
  dietTypes: [],
  recipeDetails: [],
};
// el reducer es una funcion que recibe el estado y un action y devuelve el estado actualizado
// el store es un objeto que contiene el estado y el reducer se encarga de actualizar el estado

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case DIET_TYPE_FILTER:
      const allRecipes = state.allRecipes;
      const filteredByDietType = allRecipes.filter((r) =>
        r.dietTypes?.some(
          (d) => d.toLowerCase() === action.payload.toLowerCase()
        )
      );
      return {
        ...state,
        recipes: filteredByDietType,
      };

    case ALPHABETICAL_SORT:
      let sortedRecipes = [...state.recipes];
      sortedRecipes =
        action.payload === "atoz"
          ? state.recipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;  
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1; 
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipes,
      };

    case HEALTHSCORE_SORT:
      let sortedRecipesByHealthScore = [...state.recipes];
      sortedRecipesByHealthScore =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1; // se ubica el mayor en la primera posicion
              if (a.healthScore < b.healthScore) return -1; // se ubica el menor en la primera posicion
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });

      return {
        ...state,
        recipes: sortedRecipesByHealthScore,
      };

    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: action.payload,
      };

    case ADD_RECIPE:
      return {
        ...state,
      };
    
    case GET_DIET_TYPES:
      return {
        ...state,
        dietTypes: action.payload,
      };
    
    case DIET_ORIGIN_FILTER:
      const allRecipes2 = state.allRecipes;
      switch (action.payload) {
      case 'all': return { ...state, recipes: allRecipes2 };
      case 'createdindb'  : 
      const regex1 = /[^a-z0-9\x20]/i;
      return { 
      recipes: allRecipes2.filter((r) => regex1.test(r.id))};

      case 'api': 
      const regex2 = /[^a-z0-9\x20]/i;
      return { 
      recipes: allRecipes2.filter((r) => !regex2.test(r.id)) };

      default: return state;
      }
    default:
      return state;
  }
}



