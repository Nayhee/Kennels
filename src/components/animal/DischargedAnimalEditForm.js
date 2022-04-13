import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateAnimal, getAnimalById } from "../../modules/AnimalManager"
import { getAllLocations } from "../../modules/LocationManager";
import { getAllCustomers } from "../../modules/CustomerManager";
import "./AnimalForm.css"

export const DischargedAnimalEditForm = () => {
  const [animal, setAnimal] = useState({ name: "", breed: ""});
  const [isLoading, setIsLoading] = useState(false);
 
  const {animalId} = useParams();
  const navigate = useNavigate();
  
  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    if (evt.target.id.includes("Id")) {
      evt.target.value = parseInt(evt.target.value)
    }
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  };

  const updateExistingAnimal = evt => {
    evt.preventDefault()
    setIsLoading(true);
    
    const editedAnimal = {
      id: animalId,
      name: animal.name,
      breed: animal.breed,
      date: animal.date,
      dischargedDate: animal.dischargedDate
    };
    
  //pass the editedAnimal object to the database
  updateAnimal(editedAnimal)
    .then(() => navigate("/animals")
    )
  }

  useEffect(() => {
    getAnimalById(animalId)
      .then(animal => {
        setAnimal(animal);
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      <form>

            <fieldset>
              <div className="formgrid">
                <input
                  type="date"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="date"
                  value={animal.date}
                />
                <label htmlFor="date">Date Admitted:</label>
              </div>
            </fieldset>

            <fieldset>
              <div className="formgrid">
                <input
                  type="date"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="dischargedDate"
                  value={animal.dischargedDate}
                />
                <label htmlFor="date">Date Discharged:</label>
              </div>
            </fieldset>

                <div className="alignRight">
                    <button
                    type="button" disabled={isLoading}
                    onClick={updateExistingAnimal}
                    className="btn btn-primary"
                    >Submit</button>
                </div>
      </form>
    </>
  );
}