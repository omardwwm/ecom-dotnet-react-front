import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
// import { withRouter } from "react-router";
import {login} from "../../redux";
import {useNavigate} from "react-router-dom";
import ForgotPassword from "./ForgotPaasword";
import { Button, Collapse, Card, CardBody } from 'reactstrap';
import "./login.css";
import { isFocusable } from "@testing-library/user-event/dist/utils";

const Login = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const [ inputs, setInputs] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = (e) =>{
        // const {name} = e.target
        setIsOpen(!isOpen);
        setInputs(state=>({...state, name:''}))
    }
    const [loginMessage, setLoginMessage] = useState('');
    const isUserLogged = useSelector(state=>state.userReducer.isUserLogged);
    const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
    let [emailError, setEmailError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [msgUrlReset, setMsgUrlReset]= useState('');
    const [errorEmailReset, setErrorEmailReset]= useState('');

    const onChangeEmail=(e)=>{
        e.preventDefault();
        setSubmitError('');
        const {name, value} = e.target
        switch (name) {
            case 'email': 
            validEmailRegex.test(value) ? setEmailError('') : setEmailError('NOT VALID EMAIL')
              break;
            case 'emailToReset': 
            validEmailRegex.test(value) ? setErrorEmailReset('') : setErrorEmailReset('NOT VALID EMAIL')
              break;
              default:
                break;
        }
        setInputs({name:e.target.value})
    }
    const onChangePassword=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
        setSubmitError('');
    }

    // send urlREST 
    const sendUrl=async(e)=>{
        e.preventDefault();
        if(inputs.name){
           try {
            const response = await axios.post(`https://mern-recipes.herokuapp.com/reset/send-url/${inputs.name}`);
            // console.log(response.data);
            setMsgUrlReset(response.data.message)
        } catch (error) {
            // console.log(error.response.data);
            setMsgUrlReset(error.response.data.message)
        } 
        }else{
            setErrorEmailReset('vous devez saiair un email !')
        }
    }

    const userLogin = event => {
        event.preventDefault();
        // const config = {headers: {
        //     'Accept':'application/json, text/plain, */*',
        //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        // }};
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const formData = new FormData();
        formData.append('email',inputs.name);
        formData.append('password',password);
        if(!inputs.name || !password){
            setSubmitError('Vous devez renseigner les deux champs')
        }else{
            dispatch(login(formData, config));
        }   
        console.log(isUserLogged);
        if(isUserLogged){
            setTimeout(() => {
                navigate("/");
                setLoginMessage("");
            }, 3000);
        }
    }

        const redirect=()=>{
            setTimeout(() => {
                navigate("/");
                setLoginMessage("");
            }, 3000);
        }

        useEffect(() => {
            let mounted = true;
            console.log(isUserLogged);
            console.log(localStorage);
            if(mounted){
                if(isUserLogged){
                    redirect();
                } 
            }
            return () => mounted = false;
        }, [isUserLogged])



    return(
            <>
            <h3>Se connecter a votre compte</h3>
            {/* <ConvertImgToText/> */}
            <div className=" loginDiv col-sm-12 mt-5">
                <div className=" loginFormDiv col-md-6 m-3" >
                    <form onSubmit={userLogin} className="container d-inline-block col-lg-10">
                            <div className="form-group mb-3">
                                {/*<label htmlFor="email">Email</label>*/}
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="inlineFormInputGroup"
                                    placeholder="email"
                                    value={inputs.name || ""}
                                    onChange={onChangeEmail}
                                />
                            </div>
                                {emailError? 
                                    <div style={{color:"#f0f"}} >
                                        {emailError}
                                    </div>:
                                    null
                                }

                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password-field1"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </div>
                            {submitError && 
                                <div>
                                    <p style={{color:'#f00'}}>{submitError}</p>
                                </div>}
                            <Button type="submit" color="primary" size="sm">Se connecter</Button>
                    </form>
                </div>
                <div className="col-md-6 m-3">
                    <Button onClick={toggleCollapse} color="warning" size="sm">Mot de passe oublie?</Button>
                    <Collapse isOpen={isOpen}>
                        <Card id="forgotCollap" >
                            <CardBody>
                                <ForgotPassword value={inputs.name ||""} sendUrl={sendUrl} handleChange={onChangeEmail} messageResponse={msgUrlReset} errorEmailReset={errorEmailReset} name="emailToReset"  />
                            </CardBody>
                        </Card>                    
                    </Collapse>
                </div>   
            </div>
          {loginMessage && <div>
              <p style={{color:'rgb(72, 211, 12)'}}>{loginMessage}</p>
              </div>}
        </>
    )
}

// export default withRouter (Login);
export default Login; 