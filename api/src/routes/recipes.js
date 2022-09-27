const { Router } = require('express');
const axios = require('axios');
const { getApiById, getAllRecipes, getDbById} = require('../controllers/recipes');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes()    
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
           
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        id: e.id,
                        createInDb: e.createdInDb,
                     /*    veryHealthy: e.veryHealthy, */
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    healthScore: e.healthScore,
                    id: e.id,
                    createInDb: e.createdInDb,
                   /*  veryHealthy: e.veryHealthy, */

                }
            })
            return res.status(200).send(recipes);
        }
    } catch {
       return res.status(400).send('Invalid input');
    }
});

router.get('/:id', async (req, res, next) => {    
    const { id } = req.params   
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) { 
            let dbRecipesById = await getDbById(id);         
            return res.status(200).json(dbRecipesById) 
        } else { 
            apiRecipesById = await getApiById(id) 
            if (apiRecipesById.data.id) {    
                let recipeDetails =  {                     
                    image: apiRecipesById.data.image,
                    name: apiRecipesById.data.title,
                    dishTypes: apiRecipesById.data.dishTypes,
                    dietTypes: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    /*    veryHealthy: apiRecipesById.data.veryHealthy, */
                    createInDb: apiRecipesById.data.createInDb ,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
         
                        return {
                            number: e.number, //numero de paso
                            step: e.step //paso
                        }
                    })
                }
             
                return res.status(200).send(recipeDetails);  //envia la receta a la aplicacion
            }
        } 
    } catch {
        return res.status(404).send('Recipe not found') //envia el error a la aplicacion
    }
});
    
    
module.exports = router;