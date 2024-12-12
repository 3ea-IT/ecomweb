// resources/js/Layouts/MainLayout.jsx
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;
