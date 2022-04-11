import React from "react"
import { Link } from "react-router-dom";
import "./Locations.css"

export const LocationCard = ({location, handleDeleteLocation}) => {
    return (
          <div className="card">
            <div className="card-content">
              <h3>Name: <span className="card-locationname">
                {location.name}
              </span></h3>
              <p>Address: {location.address}</p>
              <Link to={`/locations/${location.id}`}>
                <button>Details</button>
              </Link>
              <Link to={`/locations/${location.id}/edit`}>
                  <button>Edit</button>
              </Link>
              <button type="button" onClick={()=> handleDeleteLocation(location.id)}>Close Location</button>
            </div>
          </div>
    );
}
