import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CategoryView = () => {
    const param = useParams()
    const [items, setItems] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                // Fetch all categories to find the one matching the slug
                const categoriesRes = await axios.get(`${API_URL}/categories`);
                const category = categoriesRes.data.find(cat => cat.slug === param.id);
                
                if (!category) {
                    console.log('Category not found for slug:', param.id);
                    setLoading(false);
                    return;
                }

                setCategoryName(category.name);

                // Fetch all products and filter by category name (lowercase)
                const productsRes = await axios.get(`${API_URL}/products`);
                const categoryNameLower = category.name.toLowerCase().trim();
                
                const filteredItems = productsRes.data.filter((item) => {
                    const itemCategory = (item.category || '').toLowerCase().trim();
                    return itemCategory === categoryNameLower;
                });

                console.log('Filtered items for category', category.name, ':', filteredItems.length);
                setItems(filteredItems);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching category products:', err);
                setLoading(false);
            }
        };

        fetchCategoryProducts();
        window.scrollTo(0, 0);
    }, [param.id])

    return (
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
            {!loading && items.length > 0 && <Category name={categoryName} items={items} category={param.id} />}
            {!loading && items.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>No products found in this category</h2>
                    <p>Please check back later or browse other categories</p>
                </div>
            )}
        </div>
    );
}

export default CategoryView;