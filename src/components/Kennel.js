import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Kennel.css"

//kennel is a container component. it renders no HTML itself. It simply contains other components
//that are responsible for the presentation and behavior of the App. 
//this one contains 2 different kinds of components:
//1) NavBar - which is a Presentation Component. Directly expresses HTML. 
//2) Application views - which is a Controller Component. Its only responsibility is to control
//the behavior of the system and MAP URLs to components. 

export const Kennel = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)