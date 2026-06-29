import { createContext, useContext, useState } from "react";


const AppContext = createContext();


const AppProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [library, setLibrary] = useState([]);
    const [rating, setRating] = useState([]);


    return (
        <AppContext.Provider value={{favorites, setFavorites, library, setLibrary, rating, setRating}}>
            {children}
        </AppContext.Provider>
    )
}


export const useApp = () => {
    const context = useContext(AppContext);

    if(!context) {
        throw new Error('useApp must used inside AppProvider')
    }

    return context
}

export default AppProvider;