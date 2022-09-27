const { Router } = require('express');

//importo los controllers
const recipesRouter = require('./recipes'); //importa el router de las recetas
const typesRouter = require('./types'); //importa el router de los tipos de dieta
const recipeRouter = require('./recipe'); //importa post y delete de la receta


const router = Router();


// Configuración de rutas
router.use('/recipes', recipesRouter);
router.use('/types', typesRouter);
router.use('/recipe', recipeRouter);
router.use('/delete' , recipeRouter);



module.exports = router;