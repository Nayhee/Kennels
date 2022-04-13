import React, { useState, useEffect } from 'react';
import { AnimalCard } from './AnimalCard';
import { getDischargedAnimals } from '../../modules/AnimalManager';
import { useNavigate } from "react-router-dom"
import { DischargedAnimalCard } from './DischargedAnimalCard';


export const DischargedAnimals = () => {
  const [dischargedAnimals, setDischargedAnimals] = useState([]); //initial state is an Empty Array

  const getAnimals = () => {
    return getDischargedAnimals().then(animals => {
      setDischargedAnimals(animals) //Update state with the SetAnimals function once data comes back from API.
    });
  };

  useEffect(() => {
    getAnimals();
  }, []); 


  return (
    <>
      <div className="container-cards">
        {dischargedAnimals.map(animal =>
          <DischargedAnimalCard
            key={animal.id} //unique key so that React can keep track of re-rendering only the things that have changed. 
            animal={animal} //passing in a prop. Below we pass the function by ref to child so it can invoke it. 
            />)}
      </div>

    </>
  );
};