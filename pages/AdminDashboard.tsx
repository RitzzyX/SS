import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Download, Plus, Users, LayoutGrid, LogOut, Trash2 } from 'lucide-react';
import { Project } from '../types';

const AdminDashboard = () => {
  const { leads, projects, logoutAdmin, addProject, resetDemo } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'leads' | 'projects'>('leads');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // New Project State
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    location: '',
    startingPrice: '',
    image: 'https://picsum.photos/800/600',
    description: '',
    amenities: [],
    configurations: [],
    isFeatured: false
  });
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [configInput, setConfigInput] = useState({ type: '', size: '', price: '' });

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin');
  };

  const exportLeads = () => {
    const headers = ['Name,Phone,Email,Budget,Config,Date\n'];
    const rows = leads.map(l => 
      `${l.name},${l.phone},${l.email},${l.budget},${l.interestedConfig},${new Date(l.submittedAt).toLocaleDateString()}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name && newProject.location) {
      addProject({
        ...newProject,
        id: `p-${Date.now()}`,
        amenities: amenitiesInput.split(',').map(s => s.trim()).filter(s => s),
        configurations: newProject.configurations || []
      } as Project);
      setIsAddProjectModalOpen(false);
      // Reset form
      setNewProject({ name: '', location: '', startingPrice: '', image: 'https://picsum.photos/800/600', description: '', configurations: [] });
      setAmenitiesInput('');
    }
  };

  const addConfigToProject = () => {
    if (configInput.type && configInput.price) {
      setNewProject(prev => ({
        ...prev,
        configurations: [...(prev.configurations || []), configInput]
      }));
      setConfigInput({ type: '', size: '', price: '' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <h2 className="text-2xl font-serif font-bold">Admin<span className="text-gold-500">Panel</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'leads' ? 'bg-gold-600 text-white' : 'text-gray-400 hover:text-white hover:bg-navy-800'}`}
          >
            <Users className="w-5 h-5" />
            Leads
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'projects' ? 'bg-gold-600 text-white' : 'text-gray-400 hover:text-white hover:bg-navy-800'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            Projects
          </button>
        </nav>
        <div className="p-4 border-t border-navy-800 space-y-2">
            <button onClick={resetDemo} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 text-sm">
                <Trash2 className="w-4 h-4" /> Reset Demo Data
            </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-bold text-navy-900 capitalize">{activeTab} Manager</h1>
           <div className="flex gap-4">
              {activeTab === 'leads' && (
                <button onClick={exportLeads} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              )}
              {activeTab === 'projects' && (
                <button onClick={() => setIsAddProjectModalOpen(true)} className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800">
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              )}
           </div>
        </div>

        {activeTab === 'leads' ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No leads captured yet.</td></tr>
                ) : (
                    leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.submittedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">{lead.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div>{lead.phone}</div>
                        <div className="text-xs text-gray-400">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.budget}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.interestedConfig}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                        <span className={`px-2 py-1 rounded-full ${lead.buyingFor === 'Self' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {lead.buyingFor}
                        </span>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.id} className="bg-white rounded shadow p-4 border border-gray-100 flex flex-col">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="font-bold text-lg text-navy-900">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{p.location}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gold-600">{p.startingPrice}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{p.configurations.length} Configs</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between">
               <h2 className="text-xl font-bold text-navy-900">Add New Project</h2>
               <button onClick={() => setIsAddProjectModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
               <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <input required placeholder="Project Name" className="border p-2 rounded" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
                     <input required placeholder="Location" className="border p-2 rounded" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} />
                  </div>
                  <input required placeholder="Starting Price (e.g. ₹ 1.5 Cr)" className="border p-2 rounded w-full" value={newProject.startingPrice} onChange={e => setNewProject({...newProject, startingPrice: e.target.value})} />
                  <textarea required placeholder="Description" className="border p-2 rounded w-full" rows={3} value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                  
                  <div>
                    <label className="text-sm font-bold block mb-1">Amenities (comma separated)</label>
                    <input placeholder="Pool, Gym, Garden..." className="border p-2 rounded w-full" value={amenitiesInput} onChange={e => setAmenitiesInput(e.target.value)} />
                  </div>

                  <div className="bg-gray-50 p-4 rounded border">
                    <label className="text-sm font-bold block mb-2">Add Configuration</label>
                    <div className="flex gap-2 mb-2">
                       <input placeholder="Type (2 BHK)" className="border p-2 rounded w-1/3" value={configInput.type} onChange={e => setConfigInput({...configInput, type: e.target.value})} />
                       <input placeholder="Size (1200 sqft)" className="border p-2 rounded w-1/3" value={configInput.size} onChange={e => setConfigInput({...configInput, size: e.target.value})} />
                       <input placeholder="Price" className="border p-2 rounded w-1/3" value={configInput.price} onChange={e => setConfigInput({...configInput, price: e.target.value})} />
                       <button type="button" onClick={addConfigToProject} className="bg-navy-900 text-white px-4 rounded">+</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {newProject.configurations?.map((c, i) => (
                        <span key={i} className="text-xs bg-white border px-2 py-1 rounded">{c.type} - {c.price}</span>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-gold-600 text-white font-bold py-3 rounded hover:bg-gold-700">Publish Project</button>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
