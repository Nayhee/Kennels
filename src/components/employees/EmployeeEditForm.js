import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateEmployee, getEmployeeById } from "../../modules/EmployeeManager"
import { getAllLocations } from "../../modules/LocationManager";
import "./EmployeeForm.css"

export const EmployeeEditForm = () => {
  const [employee, setEmployee] = useState({ name: "", locationId: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const {employeeId} = useParams();
  const navigate = useNavigate();
  
  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    if (evt.target.id.includes("Id")) {
      evt.target.value = parseInt(evt.target.value)
    }
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };
  const updateExistingAnimal = evt => {
    evt.preventDefault()
    setIsLoading(true);
    
    const editedEmployee = {
      id: employeeId,
      name: employee.name,
      locationId: employee.locationId
    };

  //pass the editedAnimal object to the database
  updateEmployee(editedEmployee)
    .then(() => navigate("/employees")
    )
  }
  useEffect(() => {
    getEmployeeById(employeeId)
      .then(employee => {
        setEmployee(employee);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    getAllLocations()
    .then(location => {
      setLocations(location)});
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
              value={employee.name}
            />
            <label htmlFor="name">Employee name</label>
            </div>
        </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="location">Assign to location: </label>
                <select value={employee.locationId} name="locationId" id="locationId" onChange={handleFieldChange} className="form-control" >
                    <option value="0">Select a location</option>
                    {employee.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.name}
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