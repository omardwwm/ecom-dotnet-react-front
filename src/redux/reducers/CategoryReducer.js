const initialState = {
    categories:[]
}

export const categoryReducer = (state = initialState, action) =>{
    switch(action.type){
        case "GET-CATGRS-SUCCES":{
            return {
                ...state,
                categories:action.payload
            };
        }
        default:
            return state;
    }    

}