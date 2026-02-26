import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AdminContext } from '../Context/AdminContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { admin, logout, loading } = useContext(AdminContext);
    const navigate = useNavigate();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#7f8c8d'
            }}>
                Loading...
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Dairy Drop Admin</h2>
                </div>
                <nav className="admin-nav">
                    <button onClick={() => navigate('/admin/dashboard')} className="nav-item">
                        <i className="icon">📊</i>
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => navigate('/admin/products')} className="nav-item">
                        <i className="icon">📦</i>
                        <span>Products</span>
                    </button>
                    <button onClick={() => navigate('/admin/orders')} className="nav-item">
                        <i className="icon">🛒</i>
                        <span>Orders</span>
                    </button>
                    <button onClick={() => navigate('/admin/users')} className="nav-item">
                        <i className="icon">👥</i>
                        <span>Users</span>
                    </button>
                    <button onClick={() => navigate('/admin/categories')} className="nav-item">
                        <i className="icon">📑</i>
                        <span>Categories</span>
                    </button>
                    <button onClick={() => navigate('/admin/settings')} className="nav-item">
                        <i className="icon">⚙️</i>
                        <span>Settings</span>
                    </button>
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <i className="icon">🚪</i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="admin-main">
                <header className="admin-header">
                    <div className="admin-header-left">
                        <h1>Admin Panel</h1>
                    </div>
                    <div className="admin-header-right">
                        <div className="admin-user-info">
                            <span className="admin-user-name">{admin.name}</span>
                            <span className="admin-user-role">{admin.role}</span>
                        </div>
                    </div>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
