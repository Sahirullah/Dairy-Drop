import { useState, useCallback } from 'react';
import './CustomAlert.css';

export const useAlert = () => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info') => {
        setAlert({ message, type });
    }, []);

    const closeAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return { alert, showAlert, closeAlert };
};

const CustomAlert = ({ alert, onClose }) => {
    if (!alert) return null;

    const getIcon = (type) => {
        switch(type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };

    const getTitle = (type) => {
        switch(type) {
            case 'success':
                return 'Success';
            case 'error':
                return 'Error';
            case 'warning':
                return 'Warning';
            case 'info':
            default:
                return 'Notice';
        }
    };

    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className={`custom-alert custom-alert-${alert.type}`} onClick={(e) => e.stopPropagation()}>
                <div className="custom-alert-icon">
                    {getIcon(alert.type)}
                </div>
                <div className="custom-alert-title">
                    {getTitle(alert.type)}
                </div>
                <div className="custom-alert-content">
                    <p>{alert.message}</p>
                </div>
                <button className="custom-alert-button" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
