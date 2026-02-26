import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import ProductFormModal from '../../components/admin/ProductFormModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await productsAPI.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;
        
        try {
            await productsAPI.delete(productToDelete._id);
            setProducts(products.filter(p => p._id !== productToDelete._id));
            setShowDeleteConfirm(false);
            setProductToDelete(null);
            alert('Product deleted successfully');
        } catch (error) {
            alert('Error deleting product');
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setProductToDelete(null);
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

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <div className="products-loading">Loading products...</div>;
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <div>
                    <h2>Products Management</h2>
                    <p>Manage your product inventory</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-add-product">
                    <span>➕</span> Add New Product
                </button>
            </div>

            <div className="products-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-box">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Categories</option>
                        <option value="milk">Milk</option>
                        <option value="yogurt">Yogurt</option>
                        <option value="butter">Butter</option>
                        <option value="cheese">Cheese</option>
                        <option value="cream">Cream</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
            </div>

            <div className="products-stats">
                <span>Total Products: <strong>{filteredProducts.length}</strong></span>
            </div>

            {showForm && (
                <ProductFormModal
                    product={editingProduct}
                    onClose={handleFormClose}
                />
            )}

            <ConfirmModal
                isOpen={showDeleteConfirm}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
            />

            <div className="products-table-container">
                {filteredProducts.length > 0 ? (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Sizes</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.image[0] || '/placeholder.png'}
                                            alt={product.name}
                                            className="product-thumbnail"
                                        />
                                    </td>
                                    <td>
                                        <div className="product-name">{product.name}</div>
                                        <div className="product-desc">{product.description.substring(0, 50)}...</div>
                                    </td>
                                    <td>
                                        <span className={`category-tag category-${product.category}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td>{product.type}</td>
                                    <td className="product-price">
                                        <div className="price-display">
                                            <span className="current-price">${product.price}</span>
                                            {product.comparePrice && (
                                                <span className="compare-price">${product.comparePrice}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{product.color}</td>
                                    <td>
                                        <div className="sizes-list">
                                            {product.size.slice(0, 3).map((size, idx) => (
                                                <span key={idx} className="size-badge">{size}</span>
                                            ))}
                                            {product.size.length > 3 && <span className="size-more">+{product.size.length - 3}</span>}
                                        </div>
                                    </td>
                                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="btn-edit"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(product)}
                                                className="btn-delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-products">
                        <div className="no-products-icon">📦</div>
                        <h3>No products found</h3>
                        <p>Start by adding your first product or adjust your filters</p>
                        <button onClick={() => setShowForm(true)} className="btn-add-first">
                            Add Your First Product
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
