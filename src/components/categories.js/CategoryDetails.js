import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, CardText } from "reactstrap";



const CategoryDetails = () => {

    const { Id } = useParams();
    // console.log(Id);
    const [details, setDetails] = useState([]);
    const getDetailsCat = async () => {
        try {
            const response = await axios.get(`https://localhost:7135/api/Categories/${Id}`);
            console.log(response.data);
            setDetails(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getDetailsCat();
        }
        return () => mounted = false;
    }, [Id]);

    const categoryArticlesList = details.articles;
    console.log(categoryArticlesList);
    return (
        <div>
            <h3>Nos Articles : <span style={{ color: '#0f0' }}>{details.name}</span></h3>
            <img src={`https://ecom-dotnet-react.s3.eu-west-3.amazonaws.com/${details.photo}`} width={200} height={100} className="mx-4 col-md-2" />
            <div className="m-1" >
                {categoryArticlesList && categoryArticlesList.length > 0 ? (
                    <div>
                        {categoryArticlesList.map((art, index) => {
                            return (
                                <Card key={index} className="m-2 p-2 d-inline-block col-md-3 col-sm-5" style={{ background: '#000' }}>
                                    <CardImg alt="Card image cap" src={art.photo} top height={200} width={200} />
                                    <CardBody>
                                        <CardTitle tag="h5" style={{ height: '48px', color: '#0ff' }}>{art.designation}</CardTitle>
                                        <CardSubtitle className="mb-2" style={{ color: '#0ff' }} tag="h6">{art.price} € </CardSubtitle>
                                        {/* <CardText>
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                        </CardText> */}
                                        {/* <Button style={{ color: '#d9ee1c' }}> */}
                                        <NavLink key={index} className="nav-link" to={`/article/${art.designation}/${art.id}`} data-id={art.Id} >
                                            <Button style={{ color: '#d9ee1c' }}>Voir plus</Button>
                                        </NavLink>
                                        {/* </Button> */}
                                    </CardBody>
                                </Card>
                            )
                        })}

                    </div>

                ) : (
                    <h5>Pas de produits </h5>
                )
                }
            </div>
        </div>
    )
}

export default CategoryDetails;