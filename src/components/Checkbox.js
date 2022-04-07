import React, { useState }  from "react"

export const Checkbox = () => {
    //    stateVariable changeStateFunc   reactHook  default value 
    const [checkedState, setCheckedState] = useState(false) //setting default state to False means it starts Unchecked.

    const handleChange = () => {
        setCheckedState(!checkedState)
    }
    
    return (
            <input type="checkbox" checked={checkedState} onChange={handleChange}/>
    )
}

