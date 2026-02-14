import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';
import LeadFormModal from '../components/LeadFormModal';
import { Search } from 'lucide-react';

const Projects = () => {
  const { projects, isLeadCaptured } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProjectClick = (projectId: string) => {
    if (isLeadCaptured) {
      navigate(`/projects/${projectId}`);
    } else {
      setSelectedProjectId(projectId);
      setIsModalOpen(true);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-soft-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-navy-900 py-16 text-center text-white">
        <h1 className="text-4xl font-serif font-bold mb-4">Curated Residences</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Explore our handpicked selection of premium properties.</p>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto mb-12 flex items-center gap-4 border border-gray-100">
           <Search className="text-gray-400 w-5 h-5" />
           <input 
             type="text" 
             placeholder="Search by project name or location..." 
             className="w-full outline-none text-gray-700"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found matching your search.
          </div>
        )}
      </div>

      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        targetProjectId={selectedProjectId}
        onSuccess={() => {
           if(selectedProjectId) navigate(`/projects/${selectedProjectId}`);
        }}
      />
    </div>
  );
};

export default Projects;
