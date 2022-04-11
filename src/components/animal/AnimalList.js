import React, { useState, useEffect } from 'react';
import { AnimalCard } from './AnimalCard';
import { getAllAnimals, deleteAnimal } from '../../modules/AnimalManager';
import { useNavigate } from "react-router-dom"


export const AnimalList = () => {
  const [animals, setAnimals] = useState([]); //initial state is an Empty Array

  const navigate = useNavigate();

  const getAnimals = () => {
    return getAllAnimals().then(animalsFromAPI => {
      setAnimals(animalsFromAPI) //Update state with the SetAnimals function once data comes back from API.
    });
  };

  const handleDeleteAnimal = (id) => {
    deleteAnimal(id)
    .then(() => getAllAnimals()
    .then(animalsFromAPI => {
      setAnimals(animalsFromAPI)}))
  }

  //got the animals from the API on the component's first render
  //RULE IS THAT USE-EFFECT IS INVOKED IMMEDIETELY AFTER THE FIRST RETURN
  useEffect(() => {
    getAnimals();
  }, []); 


  return (
    <>
      <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {navigate("/animals/create")}}>
            Admit Animal
        </button>
      </section>

      <div className="container-cards">
        {animals.map(animal =>
          <AnimalCard
            key={animal.id} //unique key so that React can keep track of re-rendering only the things that have changed. 
            animal={animal} //passing in a prop. Below we pass the function by ref to child so it can invoke it. 
            handleDeleteAnimal={handleDeleteAnimal} />)}
      </div>
    </>
  );
};
    //foreach animal, return an AnimalCard and pass in the animal.
    //the key lets us provide a unique Identifier for React. That way react can keep
    //track of only the things that have changed.


//steps:
//1) creating a template. we say its an empty array.
//2) then returns nothing which is fine. 
//3) then useEffect gets the animals and sets the animals to the new state.
//4) then the return renders again but this time has the Animals!!