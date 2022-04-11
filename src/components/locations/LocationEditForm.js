import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateLocation, getLocationById } from "../../modules/LocationManager"
import "./LocationForm.css"

export const LocationEditForm = () => {
  const [location, setLocation] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {locationId} = useParams();
  const navigate = useNavigate();
  
  const handleFieldChange = evt => {
    const stateToChange = { ...location };
    if (evt.target.id.includes("Id")) {
      evt.target.value = parseInt(evt.target.value)
    }
    stateToChange[evt.target.id] = evt.target.value;
    setLocation(stateToChange);
  };
  const updateExistingLocation = evt => {
    evt.preventDefault()
    setIsLoading(true);
    
    const editedLocation = {
      id: locationId,
      name: location.name,
      address: location.address
    };

  //pass the editedLocation object to the database
  updateLocation(editedLocation)
    .then(() => navigate("/locations")
    )
  }
  useEffect(() => {
    getLocationById(locationId)
      .then(location => {
        setLocation(location);
        setIsLoading(false);
      });
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
            value={location.name}
          />
          <label htmlFor="name">Location name</label>
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
            value={location.address}
          />
          <label htmlFor="address">Address</label>
        </div>
          </fieldset>


              <div className="alignRight">
                  <button
                  type="button" disabled={isLoading}
                  onClick={updateExistingLocation}
                  className="btn btn-primary"
                  >Submit</button>
              </div>
    </form>
  </>
);
}