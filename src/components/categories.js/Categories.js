import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux";
// import {getProfessionnals} from "../../redux/actions/UserActions";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import axios from "axios";
import SideBarCategories from "../categories.js/SideBarCategories";
import AddCategory from "./FormAddCtgrs";
import Login from "../login/Login";
import CatHome from "./catHome";
import "./categoriesStyle.css"


const Categories = () => {

    const catgrs = useSelector(state => state.categoryReducer.categories);
    const [categories, setCategories] = useState(catgrs && catgrs);
    const dispatch = useDispatch();

    console.log(catgrs);
    useEffect(() => {
        let mounted = true;
        console.log(categories);
        console.log(catgrs);
        if (mounted) {
            dispatch(getCategories());
            setCategories(catgrs && catgrs);
        }
        return () => mounted = false;
    }, [dispatch, categories.length])

    return (

        <div className="row">
            <SideBarCategories categories={catgrs} />
            <div className="categories col-10 mb-1 mt-2 px-0">
                <Outlet className="m-2" />
            </div>
            {/* <div className="col">
            </div> */}
        </div>



    )
}

export default Categories;