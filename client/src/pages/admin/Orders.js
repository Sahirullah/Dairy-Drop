import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await ordersAPI.getAll();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await ordersAPI.updateStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            alert('Order status updated successfully');
        } catch (error) {
            alert('Error updating order status');
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await ordersAPI.delete(id);
                setOrders(orders.filter(o => o._id !== id));
                alert('Order deleted successfully');
            } catch (error) {
                alert('Error deleting order');
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'all') return true;
        return order.status === filterStatus;
    });

    const getStatusColor = (status) => {
        const colors = {
            pending: '#ffc107',
            processing: '#2196f3',
            shipped: '#9c27b0',
            delivered: '#4caf50',
            cancelled: '#f44336',
        };
        return colors[status] || '#666';
    };

    const getTotalQuantity = (orderItems) => {
        return orderItems.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    if (loading) {
        return <div className="orders-loading">Loading orders...</div>;
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <div>
                    <h2>Orders Management</h2>
                    <p>Manage customer orders</p>
                </div>
            </div>

            <div className="orders-filters">
                <div className="filter-box">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="orders-stats">
                <span>Total Orders: <strong>{filteredOrders.length}</strong></span>
                <span>Pending: <strong>{orders.filter(o => o.status === 'pending').length}</strong></span>
                <span>Processing: <strong>{orders.filter(o => o.status === 'processing').length}</strong></span>
                <span>Delivered: <strong>{orders.filter(o => o.status === 'delivered').length}</strong></span>
            </div>

            {showDetails && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => {
                        setShowDetails(false);
                        setSelectedOrder(null);
                    }}
                    onStatusChange={handleStatusChange}
                />
            )}

            <div className="orders-table-container">
                {filteredOrders.length > 0 ? (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}></th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                                                className="expand-btn"
                                                title="Expand details"
                                            >
                                                {expandedOrderId === order._id ? '▼' : '▶'}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="order-id">#{order._id.slice(-8)}</div>
                                        </td>
                                        <td>
                                            <div className="customer-info">
                                                <div className="customer-name">{order.user?.name || 'N/A'}</div>
                                                <div className="customer-email">{order.user?.email || 'N/A'}</div>
                                            </div>
                                        </td>
                                        <td>{getTotalQuantity(order.orderItems)} item(s)</td>
                                        <td className="order-total">${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="status-select"
                                                style={{
                                                    backgroundColor: getStatusColor(order.status),
                                                    color: 'white'
                                                }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`payment-badge ${order.isPaid ? 'paid' : 'unpaid'}`}>
                                                {order.isPaid ? '✓ Paid' : '✗ Unpaid'}
                                            </span>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleViewDetails(order)}
                                                    className="btn-view"
                                                    title="View Details"
                                                >
                                                    👁️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order._id)}
                                                    className="btn-delete"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedOrderId === order._id && (
                                        <tr className="expanded-row">
                                            <td colSpan="9">
                                                <div className="expanded-content">
                                                    <div className="expanded-section">
                                                        <h4>Customer Details</h4>
                                                        <div className="details-grid">
                                                            <div className="detail-item">
                                                                <span className="detail-label">Name:</span>
                                                                <span className="detail-value">{order.customerInfo?.name || order.user?.name || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">Email:</span>
                                                                <span className="detail-value">{order.customerInfo?.email || order.user?.email || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">Phone:</span>
                                                                <span className="detail-value">{order.customerInfo?.phone || order.user?.phone || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="expanded-section">
                                                        <h4>Shipping Address</h4>
                                                        <div className="details-grid">
                                                            <div className="detail-item">
                                                                <span className="detail-label">Street:</span>
                                                                <span className="detail-value">{order.shippingAddress?.street || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">City:</span>
                                                                <span className="detail-value">{order.shippingAddress?.city || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">State/Province:</span>
                                                                <span className="detail-value">{order.shippingAddress?.state || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">ZIP Code:</span>
                                                                <span className="detail-value">{order.shippingAddress?.zipCode || 'N/A'}</span>
                                                            </div>
                                                            <div className="detail-item">
                                                                <span className="detail-label">Country:</span>
                                                                <span className="detail-value">{order.shippingAddress?.country || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="expanded-section">
                                                        <h4>Order Items</h4>
                                                        <div className="items-list">
                                                            {order.orderItems.map((item, idx) => (
                                                                <div key={idx} className="item-row">
                                                                    <img src={item.image} alt={item.name} />
                                                                    <div className="item-details">
                                                                        <p><strong>{item.name}</strong></p>
                                                                        <p>Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}</p>
                                                                        <p>Quantity: {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-orders">
                        <div className="no-orders-icon">📦</div>
                        <h3>No orders found</h3>
                        <p>No orders match your filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
