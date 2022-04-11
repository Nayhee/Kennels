import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from './animal/AnimalList.js'
import { AnimalDetail } from "./animal/AnimalDetail.js"
import { LocationList } from './locations/LocationList.js'
import { LocationDetail } from "./locations/LocationDetail.js"
import { CustomerList } from './customers/CustomerList.js'
import { EmployeeList } from './employees/EmployeeList.js'
import { AnimalForm} from './animal/AnimalForm'
import { LocationForm } from "./locations/LocationForm"
import {EmployeeForm} from "./employees/EmployeeForm"
import {CustomerForm} from "./customers/CustomerForm";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AnimalEditForm } from "./animal/AnimalEditForm"
import { CustomerEditForm } from "./customers/CustomerEditForm"
import { EmployeeEditForm } from "./employees/EmployeeEditForm"
import { LocationEditForm } from "./locations/LocationEditForm"

//we define how the app will respond when the URL matches each of these patterns.
//when a user clicks on the hyperlinks in the nav bar, this code dictates which component should render. 
export const ApplicationViews = ({isAuthenticated, setIsAuthenticated}) => {

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("kennel_customer", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
    }
    
    return (
        <>
            <Routes> 
                
                <Route exact path="/" element={<Home/>}/>

                <Route exact path="/animals" element={
                    <PrivateRoute>
                        <AnimalList/>
                    </PrivateRoute>
                } />
                <Route path="animals/create" element={<AnimalForm/>}/>
                <Route exact path="/animals/:animalId" element={
                    <PrivateRoute>
                        <AnimalDetail />
                    </PrivateRoute>
                } />
                <Route path="/animals/:animalId/edit" element={
                    <PrivateRoute>
                        <AnimalEditForm />
                        </PrivateRoute>
                } />

                <Route exact path="/locations" element={
                    <PrivateRoute>
                        <LocationList/>
                    </PrivateRoute>
                } />
                <Route path="/locations/:locationId" element={<LocationDetail/>}/>
                <Route path="/locations/create" element={<LocationForm/>}/>
                <Route path="/locations/:locationId/edit" element={
                    <PrivateRoute>
                        <LocationEditForm />
                        </PrivateRoute>
                } />

                <Route exact path="/customers" element={
                    <PrivateRoute>
                        <CustomerList/>
                    </PrivateRoute>
                } />
                <Route path="/customers/create" element={<CustomerForm/>}/>
                <Route path="/customers/:customerId/edit" element={
                    <PrivateRoute>
                        <CustomerEditForm />
                        </PrivateRoute>
                } />


                <Route exact path="/employees" element={
                    <PrivateRoute>
                        <EmployeeList/>
                    </PrivateRoute>
                } />
                <Route path="/employees/create" element={<EmployeeForm/>}/>
                <Route path="/employees/:employeeId/edit" element={
                    <PrivateRoute>
                        <EmployeeEditForm />
                        </PrivateRoute>
                } />


                <Route exact path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </>
    )
}

// exact is needed on the first route otherwise it will also match the other routes and the Home will render for every route
//we added the :animalId at the end of the URL to serve as a variable to hold the actual value that will be in the URL
//basically sets it here, then we can use it in AnimalDetail by saying const {animalId} = useParams() 
