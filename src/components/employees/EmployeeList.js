import React, { useState, useEffect } from 'react';
import { EmployeeCard } from './Employees';
import { getAllEmployees, deleteEmployee } from '../../modules/EmployeeManager';

export const EmployeeList = () => {
    //set initial state to empty
    const [employees, setEmployees] = useState([]);

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
        <div className='container-cards'>
            {employees.map(employee => 
                <EmployeeCard 
                key={employee.id}
                employee={employee}
                handleDeleteEmployee={handleDeleteEmployee}/>)}
        </div>
    );

}
