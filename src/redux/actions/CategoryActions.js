import axios from "axios";



export const getCategories =()=>{
    return async(dispatch) =>{
        try {
            const response = await axios.get('https://localhost:7135/api/Categories');
        console.log(response.data);
        dispatch({
            type: "GET-CATGRS-SUCCES",
            payload: response.data
        })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "GET-CATGRS-FAILLUR",
                payload:[]
            })            
        }
    }
}