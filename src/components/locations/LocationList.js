import React, { useState, useEffect } from 'react';
import { LocationCard } from './Locations';
import { getAllLocations, deleteLocation, addLocation } from '../../modules/LocationManager';
import { useNavigate } from 'react-router-dom';

export const LocationList = () => {
    //set initial state to empty
    const [locations, setLocations] = useState([]);

    const navigate = useNavigate();

    //function that gets the data from API and SETS the new state of Customers
    const getLocations = () => {
        return getAllLocations().then(locationsFromAPI => {
            setLocations(locationsFromAPI)
        })
    }

    const handleDeleteLocation = (id) => {
        deleteLocation(id)
        .then(() => getAllLocations()
        .then(locations => {
            setLocations(locations)
        }))
    }
    
    //get the customers from the API on the components first render.
    useEffect(() => {
        getLocations();
    }, [])

    return (
        <>
            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => {navigate("/locations/create")}}>
                    Add Location
                    </button>
            </section>
            
            <div className='container-cards'>
                {locations.map(location => 
                    <LocationCard
                        key={location.id}
                        location={location}
                        handleDeleteLocation={handleDeleteLocation} />)}
            </div>
        </>
    );
}
