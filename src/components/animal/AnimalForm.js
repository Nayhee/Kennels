import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAnimal } from '../../modules/AnimalManager';
import {getAllCustomers} from '../../modules/CustomerManager';
import {getAllLocations} from '../../modules/LocationManager';
import './AnimalForm.css'

export const AnimalForm = () => {

	const [animal, setAnimal] = useState({
			name: "",
			breed: "",
			locationId: 0,
			customerId: 0
	});

	const [isLoading, setIsLoading] = useState(true); //initially disable until Locations and Customers load. 

	const [locations, setLocations] = useState([]);
	const [customers, setCustomers] = useState([]);

	const navigate = useNavigate();

	//when a field changes, update state. The return will re-render and display based on the values in state
	//Controlled component
	const handleControlledInputChange = (event) => {
		const newAnimal = { ...animal }
		console.log(event.target);
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		newAnimal[event.target.id] = selectedVal
		// update state
		setAnimal(newAnimal)
	}

    useEffect(() => {
		getAllLocations()
		.then(locations => {
			setLocations(locations);
		})
		getAllCustomers()
		.then(customers => {
			setCustomers(customers)
		})
		setIsLoading(false);
	}, []);


	const handleClickSaveAnimal = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form

		if(animal.name !== "" && animal.breed !== "" && animal.locationId !== 0 && animal.customerId !==0) {
			setIsLoading(true);
			addAnimal(animal)
			.then(() => navigate("/animals"))
		} else {
			window.alert("Please complete each field")
			// setIsLoading(false); //commenting out because setIsLoading is inside the IF, so this wouldn't matter. 
		}
	}

	return (
		<form className="animalForm">
			<h2 className="animalForm__title">New Animal</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Animal name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal name" value={animal.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="breed">Animal breed:</label>
					<input type="text" id="breed" onChange={handleControlledInputChange} required className="form-control" placeholder="Animal breed" value={animal.breed} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="location">Assign to location: </label>
					<select value={animal.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
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
					<select value={animal.customerId} name="customer" id="customerId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select a customer</option>
						{customers.map(c => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
			<button 
				type="button" 
				className="btn btn-primary"
				disabled={isLoading}
				onClick={handleClickSaveAnimal}>
				Save Animal
          </button>
		</form>
	)
};