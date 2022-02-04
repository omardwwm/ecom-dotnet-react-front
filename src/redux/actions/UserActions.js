import React from "react";
import axios from "axios";


export const registerUser = (formData, Headers)=>{
    return async(dispatch)=>{
        try {
            // const formData = new FormData();
            // console.log(formData);
            const response =  await axios.post('https://localhost:7135/api/Utilisateur/Register', formData, Headers);
            console.log(response);
            dispatch({
                type: "REGISTER-SUCCES",
                user: response.data.savedNewUser,
                // token: response.data.token,
                // showModale:true,
                // modalBody: response.data.message,
                // modalTitle: "Welcome redux test",
                // modalButtonDisabled: false,
                // modalImage:modalImgSuccess,
                isUserLogged: true
            });
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("myUser", JSON.stringify(response.data.savedNewUser));
        } catch (error) {
            console.log(error)
            dispatch({
                type: "REGISTER-FAILLUR",
                // showModale:true,
                // modalTitle: "Sever error redux test",
                // modalBody: error.response.data.message,
                // modalImage:modalImgFailed,
                isUserLogged: false           
            })           
        }
    }
}

export const login =(formData, Headers)=>{
    return async(dispatch) =>{
        try {
            const response = await axios
            .post(`https://localhost:7135/api/Utilisateur/Login`, formData, Headers);
        localStorage.setItem("userToken", response.data.generateToken);
        localStorage.setItem("myUser", JSON.stringify(response.data.u));
        console.log(response);
        dispatch({
            type: "LOGIN",
            user: response.data.user,
            token: response.data.token,
            isUserLogged: true,
        })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "LOGIN_FAIL",
                isUserLogged:false,
            })            
        }
    }
}

export const logOut =()=>{
    return  async(dispatch)=>{
        try {
           dispatch({
            type: "LOGOUT",
            isUserLogged: false,
            user: null,
            token: null
           });
           localStorage.clear();
        //    localStorage.setItem('userToken', null);
        //    localStorage.setItem('myUser', null)
        } catch (error) {
            console.log(error);
        }
    }
}
