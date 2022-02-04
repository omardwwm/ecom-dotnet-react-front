import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, CardText } from "reactstrap";


const ArticleDetails = () => {

    const {Id}= useParams();
    console.log(Id);
    const [details, setDetails] = useState([]);
    const getArticleDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:7135/api/Articles/${Id}`);
            console.log(response.data);
            setDetails(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getArticleDetails();
        }
        return () => mounted = false;
    }, [Id]);

return(
    <div>
        <h4>Article Details Page en cours....</h4>
        <h5>{details.designation}</h5>
        <img src={details.photo} width={350} height={200}/>
        <p>{details.price} €</p>
        <p>{details.description}</p>
    </div>
)


}

export default ArticleDetails;