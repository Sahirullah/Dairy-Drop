import React, { useState, useEffect } from 'react';
import { productsAPI, ordersAPI, usersAPI } from '../../services/api';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [productsRes, ordersRes, usersRes] = await Promise.all([
                productsAPI.getAll(),
                ordersAPI.getAll(),
                usersAPI.getAll(),
            ]);

            const products = productsRes.data;
            const orders = ordersRes.data;
            const users = usersRes.data;

            // Calculate total revenue from paid orders
            const totalRevenue = orders
                .filter(order => order.isPaid)
                .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

            // Calculate stats
            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                totalUsers: users.length,
                totalRevenue: Number(totalRevenue.toFixed(2)),
            });

            // Get recent products (last 5)
            setRecentProducts(products.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard Overview</h2>
                <p>Welcome to your admin dashboard</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-products">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

                <div className="stat-card stat-orders">
                    <div className="stat-icon">🛒</div>
                    <div className="stat-info">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className="stat-card stat-users">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="stat-card stat-revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>${stats.totalRevenue}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h3>Recent Products</h3>
                <div className="recent-products">
                    {recentProducts.length > 0 ? (
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Date Added</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img
                                                src={product.image[0] || '/placeholder.png'}
                                                alt={product.name}
                                                className="product-thumb"
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>
                                            <span className="category-badge">{product.category}</span>
                                        </td>
                                        <td>
                                            <div className="price-display">
                                                <span className="current-price">${product.price}</span>
                                                {product.comparePrice && (
                                                    <span className="compare-price">${product.comparePrice}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">
                            <p>No products yet. Start by adding your first product!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button className="action-btn" onClick={() => window.location.href = '/admin/products'}>
                        <span className="action-icon">➕</span>
                        Add New Product
                    </button>
                    <button className="action-btn" onClick={() => window.location.href = '/admin/orders'}>
                        <span className="action-icon">📋</span>
                        View Orders
                    </button>
                    <button className="action-btn" onClick={() => window.location.href = '/admin/users'}>
                        <span className="action-icon">👤</span>
                        Manage Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
