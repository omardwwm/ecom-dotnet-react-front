import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { logOut } from "../../redux";
import { useNavigate, Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button, Input } from 'reactstrap';
import { GoSignIn } from 'react-icons/go';
import { RiLogoutBoxLine, RiUserFill, RiUserAddFill } from 'react-icons/ri';
import { FcSearch } from 'react-icons/fc';
import SearchBar from '../searchBar/SearchBar';
import avatar from "../../../src/assets/avatar-unisex.png";
import "./navBar.css";

const NavBar = (props) => {

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const token = localStorage.getItem('userToken');
  const user = JSON.parse(localStorage.getItem('myUser'));

  let navigate = useNavigate();
  const closeNavBar = (e) => {
    if (isOpen && !e.target.classList.contains('navbar-toggler')) {
      setIsOpen(false);
    }
  }

  const logoutFromNavBar = (e) => {
    // localStorage.removeItem('userToken');
    dispatch(logOut());
    closeNavBar(e);
    navigate("/");
  }

  return (
    <div className="navBarDiv" >
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Ecommerce</NavbarBrand>
        {/* <Input type='text'/> */}
        <SearchBar/>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navbarNav" navbar>
            <NavItem>
              <Link to="/categories/" onClick={closeNavBar} >Categories</Link>
            </NavItem>
            <NavItem>
              <Link to="/Articles/" onClick={closeNavBar} >Articles</Link>
            </NavItem>
            <NavItem>
              <Link to="/add-article/" ><Button className="d-inline-block" size="sm" onClick={closeNavBar}>Ajouter un article</Button></Link>
            </NavItem>
          </Nav>
          {user && token ?
            (
              <div>
                <Link to={{ pathname: `/profile/${user.id}` }} className="d-inline-block mx-2"  ><Button className="d-inline-block" onClick={closeNavBar}>
                  {/* <RiAccountPinBoxLine style={{color:'#ddff13', fontSize:'22px'}}/> */}
                  <img className="profilePic"
                    src={user && user.profilePicture ? user.profilePicture : avatar}
                    style={{ width: '24px', height: '24px' }}
                    alt="user profilePicture"
                  />
                  Mes info</Button></Link>
                <Button onClick={logoutFromNavBar}> <RiLogoutBoxLine style={{ color: '#f00', fontSize: '22px' }} onClick={closeNavBar} />DECONNEXION</Button>
              </div>
            )
            :
            (
              <div>
                <Link to='/login' ><Button className="d-inline-block mx-2" size="sm" onClick={closeNavBar}>SE CONNECTER<GoSignIn style={{ color: '#0f0', fontSize: '22px' }} /> <RiUserFill /></Button></Link>
                <Link to='/create-account' ><Button className="d-inline-block" size="sm" onClick={closeNavBar}>CREER UN COMPTE<RiUserAddFill style={{ color: '#0f0', fontSize: '22px' }} /></Button></Link>
              </div>
            )
          }
        </Collapse>
      </Navbar>
    </div>
  )
}
// export default withRouter (NavBar);
export default NavBar;