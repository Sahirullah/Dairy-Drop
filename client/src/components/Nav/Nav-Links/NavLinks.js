import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './NavLinks.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const NavLinks = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/categories`);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to hardcoded categories
            setCategories([
                { _id: '1', name: 'Milk', slug: 'milk' },
                { _id: '2', name: 'Yogurt', slug: 'yogurt' },
                { _id: '3', name: 'Butter', slug: 'butter' },
                { _id: '4', name: 'Cheese', slug: 'cheese' },
                { _id: '5', name: 'Cream', slug: 'cream' }
            ]);
        }
    };

    return ( 
            <nav className="nav__bottom__container">
                <div className="bottom__container">
                    <ul className="nav">
                        <li className='nav-link'><Link to="/">Home</Link></li> 
                        <li className='nav-link dropdown-link' 
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}>
                            <span>Category</span>
                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    {categories.map((category) => (
                                        <li key={category._id} className='dropdown-item'>
                                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className='nav-link'><Link to="/about">About</Link></li> 
                        <li className='nav-link'><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
     );
}
 
export default NavLinks;