// resources/js/contexts/DrawerContext.jsx

import React, { createContext, useContext, useState } from "react";

// Create the context
const DrawerContext = createContext();

// Custom hook to use the DrawerContext
export const useDrawer = () => useContext(DrawerContext);

// Provider component
export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <DrawerContext.Provider
            value={{ isDrawerOpen, openDrawer, closeDrawer }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
