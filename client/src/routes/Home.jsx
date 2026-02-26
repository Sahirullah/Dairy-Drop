import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import CustomerSupport from "../components/CustomerSupport/CustomerSupport";
import CustomerReview from "../components/CustomerReview/CustomerReview";
import FAQ from "../components/FAQ/FAQ";
import { TabTitle } from "../utils/General";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState()
    TabTitle("Home - Dairy Drop");

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                console.log('Products fetched:', res.data);
                setFeaturedItems(res.data);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setFeaturedItems([]);
            })

        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems items={featuredItems} />
            <CustomerSupport />
            <CustomerReview />
            <FAQ />
        </Fragment>
    );
}

export default Home;