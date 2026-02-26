import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import { productsAPI } from '../../services/api';
import ProductForm from './ProductForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { admin, logout } = useContext(AdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate('/admin/login');
            return;
        }
        fetchProducts();
    }, [admin, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await productsAPI.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productsAPI.delete(id);
                setProducts(products.filter(p => p._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                alert('Error deleting product');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="header-actions">
                    <span>Welcome, {admin?.name}</span>
                    <button onClick={() => setShowForm(true)} className="btn-primary">
                        Add New Product
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleFormClose}
                />
            )}

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="product-image">
                            {product.image && product.image[0] ? (
                                <img src={product.image[0]} alt={product.name} />
                            ) : (
                                <div className="no-image">No Image</div>
                            )}
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <div className="product-price-display">
                                <span className="current-price">${product.price}</span>
                                {product.comparePrice && (
                                    <span className="compare-price">${product.comparePrice}</span>
                                )}
                            </div>
                            <div className="product-actions">
                                <button onClick={() => handleEdit(product)} className="btn-edit">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="btn-delete">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="no-products">
                    <p>No products yet. Add your first product!</p>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
