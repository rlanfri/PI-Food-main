import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions";
import "./searchbar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      if (name === "") return alert("Please enter a valid recipe name");
      dispatch(getRecipesByName(name));
      setName('')
    };


  return (

      <form className="searchBar" onSubmit={e=>handleSubmit (e)}>
        <input className='searchInput' type="text" placeholder="Search recipe" value ={name} onChange={e=>handleChange(e)} />
        <input className= 'searchButton'type="submit" value="Search" />
        </form>
    
    );
}

