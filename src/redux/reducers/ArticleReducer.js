const initialState = {
    articles:[],
    article:{}
}

export const articleReducer = (state = initialState, action) =>{
    switch(action.type){
        case "GET-ARTICLES-SUCCES":{
            return {
                ...state,
                articles:action.payload
            };
        }
        default:
            return state;
    }    

}