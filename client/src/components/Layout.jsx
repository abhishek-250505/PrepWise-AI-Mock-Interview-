import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-light pb-20 md:pb-0">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:ml-64">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
