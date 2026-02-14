import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@estate.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const { loginAdmin } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Credentials. Try password "admin"');
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <ShieldCheck className="w-8 h-8 text-navy-900" />
           </div>
           <h2 className="text-2xl font-bold text-navy-900">Partner Login</h2>
           <p className="text-gray-500">Access your leads dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
               type="email" 
               className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-navy-900 outline-none"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
               type="password" 
               className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-navy-900 outline-none"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-gold-600 hover:bg-gold-700 text-white font-bold py-3 rounded transition-colors">
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          Demo Creds: admin / admin
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
