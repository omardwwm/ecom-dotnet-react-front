import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from '../../redux';
import { NavLink } from 'react-router-dom';
import { Input, Button } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "./searchBar.css";


const SearchBar = () => {


    // const[listArticles, setListArticles] = useState(articles);
    const [display, setDisplay] = useState(false);
    const dispatch = useDispatch();

    // implementer la searchBar
    const articles = useSelector(state => state.articleReducer.articles);
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const criter = e.target.value;
        setQuery(criter);
        const listToFilter = articles;
        const filteredData = listToFilter.filter((article) => {
            return article.designation.substring(0, criter.length).toLowerCase().includes(criter.toLowerCase());
            // return article.designation.substring(0, text.length).toLowerCase() === text.toLowerCase();
        });
        // console.log("on Handling change :==>", suggestions);

        if (criter === "") {
            setSuggestions([]);
        } else {
            setSuggestions(filteredData);
        }
    };

    const clearInput = () => {
        setSuggestions([]);
        setQuery("");
    };

    // console.log("Suggestions: ===>", suggestions);
    // console.log("Articles: ===>",articles);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getArticles());
        }
        return () => mounted = false;
    }, [dispatch, articles.length])

    return (
        <div className="search">
            <div className="searchInputs">
                <Input type="text" id="articleName" name="articleName" placeholder="Chercher" value={query} onChange={handleChange} />
                <div className="">
                    {suggestions.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            {suggestions && suggestions.length > 0 && (
                <div className="dataResult">
                    {suggestions.slice(0, 15).map((art, index) => {
                        return (
                            // <p>{art.designation}</p>
                            <NavLink key={index} className="nav-link dataItem" to={`/article/${art.designation}/${art.id}`} data-id={art.Id} >
                                <p className='d-inline-block px-2' style={{ color: '#000' }}>{art.designation}</p>
                                <img src={art.photo} width={30} height={30}/>
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;