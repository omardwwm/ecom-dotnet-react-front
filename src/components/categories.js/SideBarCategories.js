import React from "react";
import * as FaIcons from "react-icons/fa";
import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import AddCategory from "./FormAddCtgrs";
// import "./categoriesStyle.css"

const SideBarCategories = (props) => {

    // console.log(props.categories && props.categories[0]);
    const cats = props.categories && props.categories;

    return (
        <div className="col-2 px-0" style={{ background: "#000000" }}>
            <Navbar className="mr-auto-sideBar">
                <NavLink className="nav-link" to="/categories/addCategory">
                    Ajouter une categorie
                </NavLink>
                <NavbarBrand href="#" style={{ margin: "auto" }}>
                    {/* <FaIcons.FaHandPointDown style={{ color: "#00ff00", fontSize: "1.5em" }}/> */}
                </NavbarBrand>
                <Nav className="sidbarItem p-0 ">
                    {props.categories && props.categories.map((cat, index) => {
                        return (
                            <NavLink key={index} className="nav-link" to={`/categories/${cat.name}/${cat.id}`} data-id={cat.Id} >
                                <img className="chefPic" src={`https://ecom-dotnet-react.s3.eu-west-3.amazonaws.com/${cat.photo}`} width={150}/>
                            </NavLink>
                            // <div key={index}>
                            //     <p>{cat.name}</p>
                            // </div>
                        )
                    })}
                </Nav>
            </Navbar>
        </div>
    )
}

export default SideBarCategories;
