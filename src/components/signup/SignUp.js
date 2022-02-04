import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useNavigate } from "react-router-dom";


const Signup =(props)=>{
    const dispatch = useDispatch();
    const history = useNavigate ();
    const [form, setForm] = useState({
        firstName:"",
        lastName:"",
        username: "",
        email: "",
        password:"",
        passwordConfirm: "",
        errors:{
            firstNameError:"",
            lastNameError:"",
            usernameError: "",
            emailError: "",
            passwordError: "",
            passwordConfirmError: ""
        }
    })

    const isUserLogged = useSelector(state=>state.userReducer.isUserLogged);
    const [loginCheckMessage, setLoginCheckMessage] = useState('');
    const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
    // const [profilePicture, setProfilePicture] = useState(""); // A IMPLEMENTER COTE API PUIS ICI,
    const onChangeValue=(event)=>{
        event.preventDefault();
        const { name, value} = event.target; 
        let errors = form.errors;
        switch (name) {
            case 'firstName': 
            errors.firstNameError = 
              value.length < 2
                ? 'Le prenom doit contenir 2 caracters min!'
                : '';
            break;
            case 'lastName': 
            errors.lastNameError = 
              value.length < 2
                ? 'Le Nom doit contenir 2 caracters min!'
                : '';
            break;
            case 'username': 
              errors.usernameError = 
                value.length < 4
                  ? 'Username doit contenir 4 caracters min!'
                  : '';
              break;
            case 'email': 
              errors.emailError = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email n\'est pas valid!';
              break;
            case 'password': 
              errors.passwordError = 
                value.length < 6
                  ? 'Mot de passe doit avoir au min 6 caracters!'
                  : '';
              break;
            case 'passwordConfirm':
                errors.passwordConfirmError =
                form.password !== value ? 
                'les mots de passes doivent etre identiques' :
                '';
                break;
            default:
              break;
          }
        setForm({
            ...form,
            errors, [name]:value
        })
    }; 

    // check if all form fields are complete
const checkCompleteFields =()=>{
    let formIsValid = true;

    if(!form.firstName){
        formIsValid = false;
        form.errors.firstNameError = 'Le Prenom est obligatoire';
    };
    if(!form.lastName){
        formIsValid = false;
        form.errors.lastNameError = 'Le Nom est obligatoire';
    };
    if(!form.email){
        formIsValid = false;
        form.errors.emailError = 'L\'adresse mail est obligatoire';
    };
    if(!form.username){
        formIsValid = false;
        form.errors.usernameError = 'Le UserName est obligatoire';
    };
    if(!form.password){
        formIsValid = false;
        form.errors.passwordError = 'Le mot de passe est obligatoire';
    };
    if(!form.passwordConfirm){
        formIsValid = false;
        form.errors.passwordConfirmError = 'Vous devez confirmer le mot de passe';
    }
    return formIsValid;
}

const userCreate = (event)=>{
    event.preventDefault();
    const config = {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;multipart/form-data; boundary=<calculated when request is sent>'
    }};
    const formData = new FormData();
    formData.append('FirstName',form.firstName);
    formData.append('LastName',form.lastName);
    formData.append('Username',form.username);
    formData.append('Email',form.email);
    formData.append('Password',form.password);
    formData.append('PasswordConfirmation',form.passwordConfirm);
    // formData.append('profilePicture',profilePicture);
    // formData.append('role',form.role);
    if(checkCompleteFields()){
        dispatch(registerUser(formData, config));
        console.log(form.email);
        console.log(formData);
        // setModal(true);
        localStorage.getItem("userToken");
        if(isUserLogged){
            setTimeout(() => {
                // setModal(false);
                history.push("/recipes");
            }, 2500)
        }
    }else{
        setLoginCheckMessage('Vous devez renseigner tous les champs !')
    }
}

useEffect(()=>{
    if(isUserLogged){
        setTimeout(() => {
            // setModal(false);
            history.push("/recipes");
        }, 2500)
    }
}, [isUserLogged]);
useEffect(()=>{
    localStorage.getItem("userToken");
    setForm({
        ...form
    })
}, [])

return(
    <div className="divInscription col-xs-12 col-sm-10 col-md-6 col-lg-5">
        <div className=" m-3">
                    <h2>CREER VOTRE COMPTE</h2>
                    <Form className="" onSubmit={userCreate} encType="multipart/form-data">

                        <FormGroup>
                            <Label for="examplefirstName">Prenom</Label>
                            <Input type="text" name="firstName" id="examplefirstName" placeholder="Votre Prenom" value={form.firstName} onChange={onChangeValue}/>
                        </FormGroup>
                        {form.errors.firstNameError ? 
                            <div style={{color:'red'}}>
                                {form.errors.firstNameError}
                            </div>:
                             null}
                        <FormGroup>
                            <Label for="examplelastName">Nom</Label>
                            <Input type="text" name="lastName" id="examplelastName" placeholder="Votre Nom" value={form.lastName} onChange={onChangeValue}/>
                        </FormGroup>
                        {form.errors.lastNameError ? 
                            <div style={{color:'red'}}>
                                {form.errors.lastNameError}
                            </div>:
                             null}     

                        <FormGroup>
                            <Label for="exampleUsername">Username</Label>
                            <Input type="text" name="username" id="exampleUsername" placeholder="Choisir un Username" value={form.username} onChange={onChangeValue}/>
                        </FormGroup>
                        {form.errors.usernameError ? 
                            <div style={{color:'red'}}>
                                {form.errors.usernameError}
                            </div>:
                             null}
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Votre email" value={form.email} onChange={onChangeValue}/>
                        </FormGroup>
                        {form.errors.emailError ? 
                            <div style={{color:'red'}}>
                                {form.errors.emailError}
                            </div>:
                             null}
                        <FormGroup>
                            <Label for="examplePassword">Mot de passe</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Votre mot de passe" value={form.password} onChange={onChangeValue} />
                        </FormGroup>
                        {form.errors.passwordError ? 
                            <div style={{color:'red'}}>
                                {form.errors.passwordError}
                            </div>:
                             null}
                        <FormGroup>
                            <Label for="examplePasswordConfirm">Confirmer le mot de passe</Label>
                            <Input type="password" name="passwordConfirm" id="examplePasswordConfirm" placeholder="Confirmer votre mot de passe" value={form.passwordConfirm} onChange={onChangeValue} />
                        </FormGroup>
                        {form.errors.passwordConfirmError ? 
                            <div style={{color:'red'}}>
                                {form.errors.passwordConfirmError}
                            </div>:
                             null}

                        {/* <FormGroup>
                            <Label for="profilePicture">Image de profile</Label>
                            <Input type="file" name="profilePicture" id="profilePicture" placeholder="Select a picture" onChange={selectImage}/>
                        </FormGroup> */}
                        {/* <FormGroup check>
                            <Label check>
                            <Input type="checkbox" onClick={accepteCoditions}/>{' '}
                                Accepter nos conditions <br></br>
                            <Button color="secondary" style={{margin:5}} onClick={showConditions}>POLITIQUE ET CONFIDENTIALITE</Button>
                            </Label>
                        </FormGroup> */}
                        {/* <Button id="btn_inscription" type="submit"  color="primary" disabled={!conditionsAccepted}> */}
                        <Button id="btn_inscription" type="submit"  color="primary">
                        Inscription 
                        {/* <br></br>{conditionsAccepted===false? <p style={{color:'#f8d404'}}>Vous devez accepter les conditions</p>:null} */}
                        </Button>
                        <span style={{color:'#f00'}}>{loginCheckMessage}</span>
                    </Form>
                </div> 
    </div>
)

}    
export default Signup;