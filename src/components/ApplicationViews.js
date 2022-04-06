import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { AnimalCard } from './animal/AnimalCard.js'
import { LocationCard } from './locations/Locations.js'
import { CustomerCard } from './customers/Customers.js'
import { EmployeeCard } from './employees/Employees.js'

//we define how the app will resppond when the URL matches each of these patterns.
//when a user clicks on the hyperlinks in the navigation bar, this code dictates which 
// component should be rendered. 
export const ApplicationViews = () => {
    return (
        <>
            <Routes>
                {/* exact is needed on the first route otherwise it will also match the other routes and the Home will render for every route*/}
                <Route exact path="/" element={<Home />} />

                <Route path="/animals" element={<AnimalCard />} />

                <Route path="/locations" element={<LocationCard />} />

                <Route path="/customers" element={<CustomerCard />} />

                <Route path="/employees" element={<EmployeeCard />} />
            </Routes>
        </>
    )
}