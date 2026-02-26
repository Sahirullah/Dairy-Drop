import { createContext } from 'react';

export const AlertContext = createContext({
    alert: null,
    showAlert: () => {},
    closeAlert: () => {}
});
