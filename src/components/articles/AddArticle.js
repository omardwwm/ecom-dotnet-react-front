import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { getCategories } from "../../redux";

const addArticle = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const catgrs = useSelector(state => state.categoryReducer.categories);
    const [categoryId, setCategoryId] = useState("");
    const [form, setForm] = useState({
        Designation: "",
        price: "",
        description: "",

        errors: {
            designationError: "",
            priceError: "",
            descriptionError: ""
        }
    })

    const [photoError, setPhotoError] = useState("");
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
            case 'Designation':
                // form.designationError=""
                errors.designationError =
                    value.length < 3
                        ? 'La designation/nom est de 3 caracteres min !'
                        : '';
                break;
            case 'price':
                errors.priceError =
                    value.length == ""
                        ? 'Le prix ne peut pas etre null !'
                        : '';
                break;
            case 'description':
                errors.descriptionError =
                    value.length < 16
                        ? 'Ce  chmaps ne doit pas etre vide, min 16 caracteres!'
                        : '';
                break;
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
        if (!form.Designation) {
            formIsValid = false;
            form.errors.designationError = 'Le nom/designation est obligatoire';
        };
        if (!form.price) {
            formIsValid = false;
            form.errors.priceError = 'Le prix est obligatoire';
        };
        if (!form.description) {
            formIsValid = false;
            form.errors.descriptionError = 'Ce champs est obligatoire et au min 16 caracteres';
        };
        if (!photo) {
            formIsValid = false;
            setPhotoError('La photo est obligatoire');
        }
        return formIsValid;
    }
    const addArticle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        console.log("token is : ==> ", token);
        const config = {
            headers: {
                'Accept': '*/*',
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        };
        console.log("okkk");
        const formData = new FormData();
        formData.append('Designation', form.Designation);
        formData.append('Price', form.price);
        formData.append('Description', form.description);
        formData.append('photoArticle', photo);
        formData.append('CategoryId', categoryId);
        // console.log(photo);
        if (checkCompleteFields()) {
            // dispatch(registerUser(formData, config));
            console.log(form.Designation);
            try {
                const res = await axios.post('https://localhost:7135/api/Articles', formData, config)
                console.log("suivant, implementer le fetch")
                console.log(res.data);
                if (res.status == 201) {
                    setSuccessMessage("Article ajoute avec succes");
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate('/categories');
                    }, 3000);
                    // dispatch(getCategories());
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setLoginCheckMessage('Vous devez renseigner tous les champs !')
        }
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getCategories());
            // console.log(catgrs);
        }
        return () => mounted = false;
    }, []);
    // console.log(categoryId);
    // console.log(form.price);

    return (
        <div className="col-md-6 m-3">
            <h3>Ajouter un article</h3>
            <Form className="" onSubmit={addArticle} encType="multipart/form-data">
                <FormGroup>
                    <Label for="exampledesignation">Nom/Designation</Label>
                    <Input type="text" name="Designation" id="exampledesignation" value={form.Designation} onChange={onChangeValue} />
                </FormGroup>
                {form.errors.designationError ?
                    <div style={{ color: 'red' }}>
                        {form.errors.designationError}
                    </div> :
                    null}
                <FormGroup>
                    <Label for="exampleprice">Prix</Label>
                    <Input type="number" min="0" step={0.01} name="price" id="exampleprice" value={Number(form.price).toFixed(2)} onChange={onChangeValue} />
                </FormGroup>
                {form.errors.priceError ?
                    <div style={{ color: 'red' }}>
                        {form.errors.priceError}
                    </div> :
                    null}
                <FormGroup>
                    <Label for="exampledescription">Description</Label>
                    <Input type="textarea" name="description" id="exampledescription" placeholder="Decrire ..." value={form.description} onChange={onChangeValue} />
                </FormGroup>
                {form.errors.descriptionError ?
                    <div style={{ color: 'red' }}>
                        {form.errors.descriptionError}
                    </div> :
                    null}
                <FormGroup>
                    <Label for="examplePhoto">Photo de l'article</Label>
                    <Input type="file" name="photo" id="examplePhoto" placeholder="Selecyionner une image" value={form.photo} onChange={selectImage} />
                </FormGroup>
                {photoError ?
                    <div style={{ color: 'red' }}>
                        {photoError}
                    </div> :
                    null}

                <FormGroup className="col-md-5 col-sm-6 my-3">
                    <Label for="ingredientUnity">Choisir une unite</Label>
                    <Input type="select" name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        {catgrs && catgrs.map((cat, index) => {
                            return (
                                <option key={index} value={cat.id}>{cat.name}</option>
                            )
                        })}
                    </Input>
                </FormGroup>

                <Button id="btn_inscription" type="submit" color="primary" className="mt-3">
                    Ajouter
                </Button>
                <span style={{ color: '#f00' }} className="m-3">{loginCheckMessage}</span>
                <span style={{ color: '#0f0' }}>{successMessage}</span>
            </Form>
        </div>
    )

}

export default addArticle;
