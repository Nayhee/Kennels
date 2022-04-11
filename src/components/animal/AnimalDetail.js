import React, { useState, useEffect } from 'react';
import { getAnimalById, deleteAnimal } from '../../modules/AnimalManager';
import './AnimalDetail.css';
import { useParams, useNavigate } from "react-router-dom"

export const AnimalDetail = () => {
  const [animal, setAnimal] = useState({ name: "", breed: ""});
  const [isLoading, setIsLoading] = useState(true);

  const {animalId} = useParams(); //this is how we access the animalsId inside the component. 
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsLoading(true)
    deleteAnimal(animalId).then(() => 
      navigate("/animals")
      );
  }

  useEffect(() => {
    getAnimalById(animalId)
      .then(animal => {
        setAnimal(animal);
        setIsLoading(false);
      });
  }, [animalId]); //still confused by this. 

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
        <img src={animal.image} alt="My Dog" />
      <div className="animal__breed">Breed: {animal.breed}</div>
      {/* What's up with the question mark???? See below.*/}
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Owner: {animal.customer?.name}</div>
      <button type="button" disabled={isLoading} onClick={handleDelete}>
        Discharge
      </button>
    </section>
  );
}

//question marks so things dont break. 