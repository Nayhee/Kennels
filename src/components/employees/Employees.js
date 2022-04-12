import React from "react"
import "./Employees.css"
import { Link } from "react-router-dom"

export const EmployeeCard = ({employee, handleDeleteEmployee}) => {
    return (
        <div className="card">
            <div className="card-content">
                <h3>Name: <span className="card-employeename">
                    {employee.name}
                </span></h3>
                <p>Location: {employee.location.name}</p>
                <Link to={`/employees/${employee.id}/edit`}>
                  <button>Edit</button>
                    </Link>
                <button type="button" onClick={()=> handleDeleteEmployee(employee.id)}>Terminate</button>
            </div>
      </div>
    )
}
