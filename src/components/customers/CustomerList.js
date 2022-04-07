import React, { useState, useEffect } from 'react';
import { CustomerCard } from './Customers';
import { getAllCustomers, deleteCustomer } from '../../modules/CustomerManager';

export const CustomerList = () => {
    //set initial state to empty
    const [customers, setCustomers] = useState([]);

    //function that gets the data from API and SETS the new state of Customers
    const getCustomers = () => {
        return getAllCustomers().then(customersFromAPI => {
            setCustomers(customersFromAPI)
        })
    }
    
    const handleDeleteCustomer = (id) => {
        deleteCustomer(id)
        .then(() => getAllCustomers()
        .then(customers => {
            setCustomers(customers)
        }))
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <div className='container-cards'>
            {customers.map(customer => 
                <CustomerCard
                key={customer.id}
                customer={customer} 
                handleDeleteCustomer={handleDeleteCustomer}/>)}
        </div>
    );
}
