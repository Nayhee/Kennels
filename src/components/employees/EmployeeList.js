import React, { useState, useEffect } from 'react';
import { EmployeeCard } from './Employees';
import { getAllEmployees, deleteEmployee } from '../../modules/EmployeeManager';
import { useNavigate } from 'react-router-dom';

export const EmployeeList = () => {
    //set initial state to empty
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    //function that gets the data from API and SETS the new state of Customers
    const getEmployees = () => {
        return getAllEmployees().then(employeesFromAPI => {
            setEmployees(employeesFromAPI)
        })
    }
    
    const handleDeleteEmployee = (id) => {
        deleteEmployee(id)
        .then(() => getAllEmployees()
        .then(employees => {
            setEmployees(employees);
        }))
    }


    //get the customers from the API on the components first render.
    useEffect(() => {
        getEmployees();
    }, [])

    return (
        <>
        <section className="section-content">
            <button type="button"
                className="btn"
                onClick={() => {navigate("/employees/create")}}>
                Add Employee
            </button>
        </section>

        <div className='container-cards'>
            {employees.map(employee => 
                <EmployeeCard 
                key={employee.id}
                employee={employee}
                handleDeleteEmployee={handleDeleteEmployee}/>)}
        </div>
        
        </>
    );

}
