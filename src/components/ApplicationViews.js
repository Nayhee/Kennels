import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from './animal/AnimalList.js'
import { LocationList } from './locations/LocationList.js'
import { CustomerList } from './customers/CustomerList.js'
import { EmployeeList } from './employees/EmployeeList.js'

//we define how the app will respond when the URL matches each of these patterns.
//when a user clicks on the hyperlinks in the nav bar, this code dictates which component should render. 
export const ApplicationViews = () => {
    return (
        <>
            <Routes>
                {/* exact is needed on the first route otherwise it will also match the other routes and the Home will render for every route*/}
                <Route exact path="/" element={<Home/>}/>
                <Route path="/animals" element={<AnimalList/>}/>
                <Route path="/locations" element={<LocationList/>}/>
                <Route path="/customers" element={<CustomerList/>}/>
                <Route path="/employees" element={<EmployeeList/>}/>
            </Routes>
        </>
    )
}