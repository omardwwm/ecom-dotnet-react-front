const initialState = {
    user: null,
    userMetaData:{},
    userToken: null,
    isUserLogged: false,
    redirect: false
    // modalBody:"",
    // modalSuccessLogin:"",
    // modalTitle: "",
    // modalButtonDisabled: false,
    // conditionsAccepted: false,
    // showModale: false,
    // modalImage: null,
    // successMsgPasswordChange: "",
    // modalBodyDeleteUser:""
}

export const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case "REGISTER-SUCCES":
            return {
                ...state,
                user: action.user,
                userToken: action.token,
                isUserLogged: action.isUserLogged
            };
        case "REGISTER-FAILLUR":
            return{
                ...state,
                user:null,
                userToken: null,
                isUserLogged: action.isUserLogged
    
            }; 

        case "LOGIN":
            return{
                ...state,
                user: action.user,
                userToken: action.token,
                isUserLogged: true,
            }; 
            case "LOGIN_FAIL":
                return{
                    ...state,
                    user: null,
                    userToken: null,
                    isUserLogged: action.isUserLogged,
                   
                };

            case "LOGOUT":
                return{
                    ...state,
                    user: action.user,
                    userToken: action.token,
                    isUserLogged: action.isUserLogged
                    // redirect: action.redirect
                };

            default:
                return state;
    }    

}