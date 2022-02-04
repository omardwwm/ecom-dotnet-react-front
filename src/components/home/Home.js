import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {getProfessionnals} from "../../redux/actions/UserActions";
import { Link } from "react-router-dom";
// import axios from "axios";
// import SideBarCategories from "../categories.js/SideBarCategories";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, NavLink } from "reactstrap";
import { getArticles } from "../../redux";
import "./home.css";

const Home = () => {

    const articles = useSelector(state => (state.articleReducer.articles));
    const [articlesList, setArticlesList] = useState([]);
    const dispatch = useDispatch();

    // Carousel implementation/config
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === articles.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? articles.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = articles && articles.map((item, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.photo}
            >
                <img id="carouselImg"
                    src={item.photo}
                    alt={item.designation}
                />
                <Link key={index} className="nav-link dataItem" to={`/article/${item.designation}/${item.id}`} data-id={item.Id} >
                    <CarouselCaption className="d-block" captionHeader={item.designation} />
                </Link>
            </CarouselItem>
        );
    });



    useEffect(() => {
        let mounted = true;
        console.log(articles);
        if (mounted) {
            dispatch(getArticles());
        }
        return () => mounted = false;
    }, [articles.length])

    return (

        <div className="row mx-1">
            {/* <h3>Bienvenu sur notre site (en cours de developpement...</h3> */}
            <Carousel className="homeCarousel mt-2"
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={articles} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>



    )
}

export default Home;