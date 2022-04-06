import React from "react"
import "./Animal.css"

export const AnimalCard = () => (
    <section className="animal">
        <h3 className="animal__name">Doodles</h3>
        <div className="animal__breed">Breed: Poodle</div>
    </section>
)

//didn't have to use a react fragment cuz only using 1 section. 