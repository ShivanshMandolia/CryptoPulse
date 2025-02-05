import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Navbar Container */}
      <div className="fixed top-0 left-0 h-screen w-64">
        <Navbar />
      </div>
      
      {/* Main Content Area with Footer */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Content Area */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;