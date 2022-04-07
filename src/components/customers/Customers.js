import React from "react"
import "./Customers.css"

export const CustomerCard = ({customer, handleDeleteCustomer}) => {
    return (
        <div className="card">
            <div className="card-content">
                <h3>Name: <span className="card-customername">
                    {customer.name}
                </span></h3>
                <p>Dog: {customer.animal.name} the {customer.animal.breed}</p>
                <button type="button" onClick={() => handleDeleteCustomer(customer.id)}>Remove</button>
            </div>
        </div>
    );
}
    

