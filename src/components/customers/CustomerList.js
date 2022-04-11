import React, { useState, useEffect } from 'react';
import { CustomerCard } from './Customers';
import { getAllCustomers, deleteCustomer } from '../../modules/CustomerManager';
import { useNavigate } from 'react-router-dom';

export const CustomerList = () => {
    //set initial state to empty
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

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
        <>
        <section className="section-content">
            <button type="button"
                className="btn"
                onClick={() => {navigate("/customers/create")}}>
                Add Customer
            </button>
        </section>
        
        <div className='container-cards'>
            {customers.map(customer => 
                <CustomerCard
                key={customer.id}
                customer={customer} 
                handleDeleteCustomer={handleDeleteCustomer}/>)}
        </div>
        
        </>
    );
}
