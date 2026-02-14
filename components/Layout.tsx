import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Phone, Menu, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { isLeadCaptured } = useApp();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin && location.pathname !== '/admin') return <>{children}</>; // Custom layout for admin dashboard

  return (
    <div className="min-h-screen flex flex-col font-sans bg-soft-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md text-white border-b border-navy-800 shadow-lg">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center">
              <Building2 className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">Luxe<span className="text-gold-500">Estate</span></h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Premium Consulting</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm uppercase tracking-widest hover:text-gold-500 transition-colors ${location.pathname === '/' ? 'text-gold-500' : 'text-gray-300'}`}>Home</Link>
            <Link to="/projects" className={`text-sm uppercase tracking-widest hover:text-gold-500 transition-colors ${location.pathname.includes('projects') ? 'text-gold-500' : 'text-gray-300'}`}>Projects</Link>
            <Link to="/admin" className="text-sm uppercase tracking-widest hover:text-gold-500 transition-colors text-gray-300">Admin</Link>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-navy-900 px-6 py-2.5 rounded font-bold transition-all">
            <Phone className="w-4 h-4" />
            <span>+91 98765 43210</span>
          </button>
          
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white border-t border-navy-800">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Luxe<span className="text-gold-500">Estate</span></h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner for premium real estate investments. We curate the finest properties for discerning clients.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gold-500 mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/projects" className="hover:text-white">Featured Projects</Link></li>
                <li><Link to="/admin" className="hover:text-white">Partner Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gold-500 mb-4 uppercase text-xs tracking-widest">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Mumbai, Maharashtra</li>
                <li>contact@luxeestate.com</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
            <div>
               <h4 className="font-bold text-gold-500 mb-4 uppercase text-xs tracking-widest">Disclaimer</h4>
               <p className="text-xs text-gray-500 leading-relaxed">
                 <ShieldCheck className="w-4 h-4 inline mr-1 text-gold-500"/>
                 RERA Registered Channel Partner. All project details are for information purposes only. Prices subject to change.
               </p>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-12 pt-8 text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} LuxeEstate. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;