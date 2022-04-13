import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom";


export const DischargedAnimalCard = ({ animal }) => {
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
          <Link to={`/animals/discharged/${animal.id}/edit`}>
              <button>Edit</button>
          </Link>
        </div>
      </div>
    );
  }