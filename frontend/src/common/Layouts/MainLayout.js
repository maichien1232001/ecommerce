// src/layouts/MainLayout.js
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
