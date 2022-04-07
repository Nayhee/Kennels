import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Kennel.css"

//Kennel is a container component. It renders no HTML itself, it simply returns other components that are 
//responsible for the presentation and behavior of the app.
//1) NavBar (presentation component). Directly expresses HTML. 
//2) AppViews (Controller component). Responsibility is to control behavior of the system and Map URLs to components.

export const Kennel = () => (
    <>
        <NavBar />
        <ApplicationViews /> 
        
    </>
)