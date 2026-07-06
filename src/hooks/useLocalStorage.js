import { useState } from "react"



export const useLocalStorage = () => {
    const [value , setValue] = useState(0);

    const addValue = (val) => {
       setValue(val);
       localStorage.setItem('value', value);
    }

    const getValue = () => {
        const val = localStorage.getItem('value');
        setValue(val)

        return value
    }


    return {
        addValue,
        getValue
    }
}