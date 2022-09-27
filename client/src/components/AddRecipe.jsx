import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from "../actions/index";
import "./AddRecipe.css";
import Image from "../images/logo.png";

function validate(input) {
  const errors = {};
  if (!input.name) errors.name = "Please complete with a recipe name"; 
  if (!input.summary)
    errors.summary = "Please add some comments about your recipe";
  if (input.healthScore < 1 || input.healthScore > 100)
    errors.healthScore = "The score must be a number between 1 and 100";
  if (!input.steps.length)
    errors.steps = "Please detail the steps for your recipe";
  if (!input.dietTypes.length)
    errors.dietTypes = "You must select at least one diet type";
  return errors;
}

export default function AddRecipe() {
  const dispatch = useDispatch();
  const dietTypes = useSelector((state) => state.dietTypes);
  const history = useHistory(); //

  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    dietTypes: [],
  });

  useEffect(() => { 
    dispatch(getDietTypes());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prevInput) => {  
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value, 
      };
      const validations = validate(newInput); //valido el input 
      setErrors(validations); //actualizo el estado de errores
      return newInput; //devuelvo el input actualizado
    });
  }

  function handleCheckBox(e) {
    let newArray = input.dietTypes; //creo un array con los tipos de dieta actuales
    let find = newArray.indexOf(e.target.value); //busco el valor del checkbox en el array de dietTypes

    if (find >= 0) { 
      newArray.splice(find, 1); //si el valor existe en el array, lo elimino
    } else {
      newArray.push(e.target.value); //si el valor no existe en el array, lo agrego
    }

    setInput({
      ...input,
      dietTypes: newArray,
    });
    const validations = validate(input);
    setErrors(validations);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      input.name === "" &&
      input.summary === "" &&
      input.healthScore === "" &&
      input.steps === "" &&
      !input.dietTypes.length
    ) {
      alert("Please complete the form");
    } else {
      dispatch(addRecipe(input));
      alert("New recipe added successfully!");
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        dietTypes: [],
      });
      history.push("/home");
    }
  }

  return (
    <Fragment>
      <div className="background">
        <div className="header">
          <Link to="/home">
            <img src={Image} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="addRecipe">
          <h1 className="msg">LET´S BE CREATIVELY !</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form">
              <div className="prettierForm">
                {/* NAME */}
                <div className="nameInput">
                  <label className="msgs">Name</label>
                  <input
                    className="inputs"
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.name && <span className="errors">{errors.name}</span>} 
                </div>
                {/* SUMMARY */}
                <div className="nameInput">
                  <label className="msgs">Summary</label>
                  <textarea
                    name="summary"
                    type="text"
                    rows="4"
                    cols="30" 
                    value={input.summary} 
                    onChange={(e) => handleChange(e)} 
                  />
                  {errors.summary && (
                    <span className="errors">{errors.summary}</span>
                  )}
                </div>
                {/* HEALTH SCORE */}
                <div className="nameInput">
                  <label className="msgs">Health Score (1/100)</label>
                  <input
                    name="healthScore"
                    type="number"
                    value={input.healthScore}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.healthScore && (
                    <span className="errors">{errors.healthScore}</span>
                  )}
                </div>
                {/* STEPS */}
                <div className="nameInput">
                  <label className="msgs">Steps:</label>
                  <textarea
                    name="steps"
                    type="text"
                    rows="4"
                    cols="40"
                    value={input.steps}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.steps && (
                    <span className="errors">{errors.steps}</span>
                  )}
                </div>
              </div>
              {/* DIET TYPES */}
              <div className="checkSelect">
                <label className="msgs">Diet Types:</label>
                {dietTypes.map((d) => {
                  return (
                    <div key={d} className="checks">
                      <label className="dietTypes">{d}</label>
                      <input
                        className="checks"
                        type="checkbox"
                        name={d} 
                        value={d}  
                        selected={input.dietTypes.includes(d)} //si esta seleccionado o no el checkbox (si esta en el array)
                        onChange={(e) => handleCheckBox(e)} //cuando selecciono el checkbox, se ejecuta la funcion handleCheckBox
                      />
                    </div>
                  );
                })}
                {errors.dietTypes && (
                  <span className="errors">{errors.dietTypes}</span>
                )}
              </div>
            </div>
            <button className="submitButton" type="submit">
              Submit Recipe
            </button>
            <br />
            <br />
            <br />

            <Link to="/home">
              <button className="goBackButton">Go back</button>
            </Link>
            <br />
            <div className="footer">
              <footer> Made with ♡ by Rodrigo Lanfri</footer>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
