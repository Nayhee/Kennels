import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom";


export const AnimalCard = ({ animal, handleDischarge }) => {
    return (
      <div className="card">
        <div className="card-content">
          <picture>
              <img src={animal.image} alt="My Dog" />
            </picture>
          <h3>Name: <span className="card-petname">
            {animal.name}
          </span></h3>
          <p>Breed: {animal.breed}</p>
          <Link to={`/animals/${animal.id}`}>
            <button>Details</button>
          </Link>
          <Link to={`/animals/${animal.id}/edit`}>
              <button>Edit</button>
          </Link>
          <button type="button" onClick={()=> handleDischarge(animal)}>Discharge</button>
        </div>
      </div>
    );
  }

//didn't have to use a react fragment cuz only using 1 section. 