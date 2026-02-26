import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CategoryCard from "../../Card/FeaturedCard/CategoryCard";
import './FeaturedCategories.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Categories = () => {
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    useEffect(() => {
        fetchFeaturedCategories();
    }, []);

    useEffect(() => {
        if (featuredCategories.length === 0) return;

        // Start auto-scroll
        scrollIntervalRef.current = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const cardWidth = 360; // 320px card + 20px margin + 20px gap
                container.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            }
        }, 2500);

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, [featuredCategories]);

    // Handle infinite scroll reset
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || featuredCategories.length === 0) return;

        const handleScroll = () => {
            const cardWidth = 360;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;

            // When scrolled to near the end, reset to beginning
            if (scrollLeft + clientWidth >= scrollWidth - cardWidth * 2) {
                container.scrollLeft = 0;
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [featuredCategories]);

    const fetchFeaturedCategories = async () => {
        try {
            console.log('Fetching from:', `${API_URL}/categories/featured`);
            const { data } = await axios.get(`${API_URL}/categories/featured`);
            console.log('Featured categories data:', data);
            setFeaturedCategories(data);
        } catch (error) {
            console.error('Error fetching featured categories:', error);
            // Fallback: try to get all categories
            try {
                const { data } = await axios.get(`${API_URL}/categories`);
                console.log('All categories data:', data);
                setFeaturedCategories(data);
            } catch (err) {
                console.error('Error fetching all categories:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null; // Or a loading spinner
    }

    if (featuredCategories.length === 0) {
        return null; // Don't show section if no featured categories
    }

    // Duplicate categories for infinite scroll effect
    const duplicatedCategories = [...featuredCategories, ...featuredCategories];

    return (
        <div className="featured__categories__container">
            <div className="featured__categories">
                <div className="featured__categories__header">
                    <h1 className='featured__header__big'>Featured Categories </h1>
                </div>
                <div className="featured__categories__card__container" ref={scrollContainerRef}>
                    {duplicatedCategories.map((category, index) => (
                        <CategoryCard
                            key={`featured-${index}`}
                            data={category}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
