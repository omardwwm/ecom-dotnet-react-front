import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/redux";
import NavBar, { } from "../src/components/navBar/NavBar";
import Home from "../src/components/home/Home";
import Login from "../src/components/login/Login";
import Signup from "../src/components/signup/SignUp";
import Categories from "./components/categories.js/Categories";
import AddCategory from "./components/categories.js/FormAddCtgrs";
import CatHome from "./components/categories.js/catHome";
import CategoryDetails from "./components/categories.js/CategoryDetails";
import AddArticle from "./components/articles/AddArticle";
import ArticleDetails from "./components/articles/ArticleDetails";
import SearchBar from "./components/searchBar/SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, Row } from "reactstrap";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Row>
            <Col >
            {/* className="bg-dark border" md={{ offset: 3, size: 6 }} sm="12" */}
              {/* <SearchBar /> */}
            </Col>
          </Row>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/article/:name/:Id" element={<ArticleDetails />} />
            {/* <Route path="/categories" element={<Categories/>}/> */}
            <Route path="/categories" element={<Categories />}>
              <Route index element={<CatHome />} />
              <Route path="/categories/addCategory" element={<AddCategory />} />
              <Route path="/categories/:name/:Id" element={<CategoryDetails />} />
            </Route>
            {/* <Route path="addCategory" element={<AddCategory />} /> */}
            {/* <Route exact path="/profile/:id" component={Profile} /> */}

          </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
