import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateCustomer, getCustomerById } from "../../modules/CustomerManager"
import "./CustomerForm.css"
import { getAllLocations } from "../../modules/LocationManager";
import { getAllAnimals } from "../../modules/AnimalManager";

export const CustomerEditForm = () => {
    const[customer, setCustomer] = useState({name: "", address: "", animalId: "", locationId: ""})
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [animals, setAnimals] = useState([]);

    const {customerId} = useParams();
    const navigate = useNavigate();

    const handleFieldChange = evt => {
        const stateToChange = {...customer };
        if(evt.target.id.includes("Id")) {
            evt.target.value = parseInt(evt.target.value)
        }
        stateToChange[evt.target.id] = evt.target.value;
        setCustomer(stateToChange);
    };

    const updateExistingCustomer = evt => {
        evt.preventDefault();
        setIsLoading(true);

        const editedCustomer = {
            id: customerId,
            name: customer.name,
            address: customer.address,
            animalId: customer.animalId,
            locationId: customer.locationId
        };
        updateCustomer(editedCustomer)
        .then(() => navigate("/customers")
        )
    }

    useEffect(() => {
        getCustomerById(customerId)
        .then(customer => {
            setCustomer(customer);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        getAllLocations()
        .then(location => {
          setLocations(location)});
      }, []);

      useEffect(() => {
        getAllAnimals()
        .then(animals => {
          setAnimals(animals)});
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
                  value={customer.name}
                />
                <label htmlFor="name">Customer name</label>
                </div>
                </fieldset>
                <fieldset>
                <div className="formgrid">
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="address"
                  value={customer.address}
                />
                <label htmlFor="address">Address:</label>
              </div>
                </fieldset>
    
                <fieldset>
                    <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={customer.locationId} name="locationId" id="locationId" onChange={handleFieldChange} className="form-control" >
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
                    <label htmlFor="animalId">Animal: </label>
                    <select value={customer.animalId} name="animal" id="animalId" onChange={handleFieldChange} className="form-control" >
                        <option value="0">Select a customer</option>
                        {animals.map(c => (
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
                        onClick={updateExistingCustomer}
                        className="btn btn-primary"
                        >Submit</button>
                    </div>
          </form>
        </>
      );
    
        
}