import { useState, useCallback } from 'react';
import { AlertContext } from './AlertContext';
import CustomAlert from '../components/CustomAlert/CustomAlert';

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info') => {
        setAlert({ message, type });
    }, []);

    const closeAlert = useCallback(() => {
        setAlert(null);
    }, []);

    const value = {
        alert,
        showAlert,
        closeAlert
    };

    return (
        <AlertContext.Provider value={value}>
            {children}
            <CustomAlert alert={alert} onClose={closeAlert} />
        </AlertContext.Provider>
    );
};

export default AlertProvider;
