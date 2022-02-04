import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux";
import axios from "axios";


const AddCategory = () => {

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        catName: "",
        infos: "",
        // photo: "",
        errors: {
            catNameError: "",
            infosError: "",
            // photoError: ""
        }
    })

    const[photoError, setPhotoError] = useState("");
    // const [catName, setCatName] = useState("");
    // const [infos, setInfos] = useState("");
    const [photo, setPhoto] = useState();
    const [loginCheckMessage, setLoginCheckMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const selectImage = (event) => {
        event.preventDefault();
        setPhoto(event.target.files[0]);
        setPhotoError("");
    }

    const onChangeValue = (event) => {
        event.preventDefault();
        // console.log(event.target.name);
        setLoginCheckMessage("");
        const { name, value } = event.target;
        let errors = form.errors;
        switch (name) {
            case 'catName':
                errors.catNameError =
                    value.length < 3
                        ? 'Le nom doit contenir 3 caracters min !'
                        : '';
                break;
            case 'infos':
                errors.infosError =
                    value.length < 10
                        ? 'Ce champs contenir 10 caracters min !'
                        : '';
                break;
            // case 'photo':
            //     errors.photoError =
            //         value.length < 6
            //             ? 'Ce  chmaps ne doit pas etre vide !'
            //             : '';
            //     break;
            default:
                break;
        }
        setForm({
            ...form,
            errors, [name]: value
        })
    }

    const checkCompleteFields = () => {
        let formIsValid = true;
        if (!form.catName) {
            formIsValid = false;
            form.errors.catNameError = 'Le nom de la categorie est obligatoire';
        };
        if (!form.infos) {
            formIsValid = false;
            form.errors.infosError = 'Ce champs est obligatoire';
        };
        if (!photo) {
            formIsValid = false;
            setPhotoError('La photo est obligatoire');
        }
        return formIsValid;
    }

    const sendCategory = async(e) => {
        e.preventDefault();
        const config = {headers: {
            Accept:'*/*',
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }};
        console.log("okkk");
        const formData = new FormData();
        formData.append('name',form.catName);
        formData.append('info',form.infos);
        formData.append('photoCategory',photo);
        console.log(form.catName);
        console.log(photo);
        if(checkCompleteFields()){
            // dispatch(registerUser(formData, config));
            try {
                const res = await axios.post('https://localhost:7135/api/Categories', formData, config)
                // console.log("suivant, implementer le fetch")
                // console.log(res); 
                if(res.status==201){
                    setSuccessMessage("Categorie ajoutee avec succes");
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 3000);
                    dispatch(getCategories());
                }         
            } catch (error) {
                console.log(error);
            }
        }else{
            setLoginCheckMessage('Vous devez renseigner tous les champs !')
        }
    }

    return (
        <div>
            <div className="col-md-6 m-3">
                <h3>Ajouter une categorie</h3>
                <Form className="" onSubmit={sendCategory} encType="multipart/form-data">
                    <FormGroup>
                        <Label for="examplecatName">Nom Categorie</Label>
                        <Input type="text" name="catName" id="examplecatName" value={form.catName} onChange={onChangeValue} />
                    </FormGroup>
                    {form.errors.catNameError ?
                        <div style={{ color: 'red' }}>
                            {form.errors.catNameError}
                        </div> :
                        null}
                    <FormGroup>
                        <Label for="exampleInfo">Infos</Label>
                        <Input type="textarea" name="infos" id="exampleInfo" placeholder="Decrire ..." value={form.infos} onChange={onChangeValue} />
                    </FormGroup>
                    {form.errors.infosError ?
                        <div style={{ color: 'red' }}>
                            {form.errors.infosError}
                        </div> :
                        null}
                    <FormGroup>
                        <Label for="examplePhoto">Image de la categorie</Label>
                        <Input type="file" name="photo" id="examplePhoto" placeholder="Selecyionner une image" value={form.photo} onChange={selectImage} />
                    </FormGroup>
                    {photoError ?
                        <div style={{ color: 'red' }}>
                            {photoError}
                        </div> :
                        null}
                    <Button id="btn_inscription" type="submit" color="primary">
                        Ajouter
                    </Button>
                    <span style={{color:'#f00'}}>{loginCheckMessage}</span>
                    <span style={{color:'#0f0'}}>{successMessage}</span>
                </Form>
            </div>
        </div>
    )
}

export default AddCategory;