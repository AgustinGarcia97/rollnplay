import {Grid} from "@mui/material";
import SidebarFilter from "./SidebarFilter.jsx";
import CatalogView from "./CatalogView.jsx";
import {useState} from "react";







const Layout = () => {
    const [dictionary, setDictionary] = useState({});

    // Funcion para agregar una palabra a una clave existente o crear una nueva clave
    const addWord = (key, word) => {
        setDictionary(prevDictionary => {
            // Si la clave ya existe, agrega la palabra al array
            if (key in prevDictionary) {
                return {
                    ...prevDictionary,
                    [key]: [...prevDictionary[key], word]
                };
            } else {
                // Si la clave no existe, crea una nueva clave con un nuevo array
                return {
                    ...prevDictionary,
                    [key]: [word]
                };
            }
        });
    };

    // Funcion para eliminar una palabra de su clave correspondiente
    const removeWord = (key, word) => {
        setDictionary(prevDictionary => {
            // Si la clave existe y el array contiene la palabra, la elimina
            if (key in prevDictionary && prevDictionary[key].includes(word)) {
                const updatedArray = prevDictionary[key].filter(w => w !== word);
                return {
                    ...prevDictionary,
                    [key]: updatedArray
                };
            }
            // Si la clave no existe o la palabra no esta en el array,retorna el diccionario sin cambios
            return prevDictionary;
        });
    };





    return(
        <Grid container >
            <Grid item xs={4} sm={3} md={2} sx={{padding:'5px'}} >
                <SidebarFilter dictionary={dictionary} addWord={addWord} removeWord={removeWord}></SidebarFilter>
            </Grid>
            <Grid item xs={4} sm={4} md={10} sx={{padding:'5px'}} >
                <CatalogView dictionary={dictionary}></CatalogView>
            </Grid>
        </Grid>
    );
}


export default Layout;