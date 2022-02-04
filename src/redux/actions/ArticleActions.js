import axios from "axios";

export const getArticles =()=>{
    return async(dispatch) =>{
        try {
            const response = await axios.get('https://localhost:7135/api/Articles');
        console.log(response.data);
        dispatch({
            type: "GET-ARTICLES-SUCCES",
            payload: response.data
        })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "GET-ARTICLES-SUCCES",
                payload:[]
            })            
        }
    }
}