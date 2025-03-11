// src/layouts/AdminLayout.js
import React from 'react';
import NavBar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import AdminHeader from '../components/AdminHeader';

const AdminLayout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <NavBar />
            <div style={{ flex: 1 }}>
                {/* <AdminHeader /> */}
                <main>
                    {children} {/* Các trang con sẽ được render ở đây */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
