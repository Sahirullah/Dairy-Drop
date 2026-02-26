import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await productsAPI.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const getProductById = async (id) => {
        try {
            const { data } = await productsAPI.getById(id);
            return data;
        } catch (err) {
            console.error('Error fetching product:', err);
            return null;
        }
    };

    const getProductsByCategory = (category) => {
        return products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        getProductsByCategory,
    };
};
