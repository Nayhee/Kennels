import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateAnimal, getAnimalById } from "../../modules/AnimalManager"
import { getAllLocations } from "../../modules/LocationManager";
import { getAllCustomers } from "../../modules/CustomerManager";
import "./AnimalForm.css"

export const AnimalEditForm = () => {
  const [animal, setAnimal] = useState({ name: "", breed: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [customers, setCustomers] = useState([]);
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
      locationId: animal.locationId,
      customerId: animal.customerId
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
  }, [animalId]);

  useEffect(() => {
    getAllLocations()
    .then(location => {
      setLocations(location)});
  }, []);

   useEffect(() => {
     getAllCustomers()
     .then(customer => {
      setCustomers(customer)});
    }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={animal.name}
            />
            <label htmlFor="name">Animal name</label>
          </div>
        </fieldset>
            <fieldset>
              <div className="formgrid">
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="breed"
                  value={animal.breed}
                />
                <label htmlFor="breed">Breed</label>
              </div>
            </fieldset>

            <fieldset>
              <div className="formgrid">
                <input
                  type="date"
                  readOnly
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
                <div className="form-group">
                <label htmlFor="location">Assign to location: </label>
                <select value={animal.locationId} name="locationId" id="locationId" onChange={handleFieldChange} className="form-control" >
                    <option value="0">Select a location</option>
                    {locations.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.name}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="customerId">Customer: </label>
                <select value={animal.customerId} name="customer" id="customerId" onChange={handleFieldChange} className="form-control" >
                    <option value="0">Select a customer</option>
                    {customers.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                    ))}
                </select>
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