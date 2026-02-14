import React from 'react';
import { MapPin, ArrowRight, Lock } from 'lucide-react';
import { Project } from '../types';
import { useApp } from '../context/AppContext';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { isLeadCaptured } = useApp();

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-80" />
        
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-gold-500 text-navy-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
            {project.isFeatured ? 'Featured' : 'New Launch'}
          </span>
          <h3 className="text-xl font-bold font-serif">{project.name}</h3>
          <div className="flex items-center text-gray-200 text-sm mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {project.location}
          </div>
        </div>

        {!isLeadCaptured && (
            <div className="absolute top-4 right-4 bg-navy-900/90 text-white p-2 rounded-full backdrop-blur-md">
                <Lock className="w-4 h-4" />
            </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Starting From</p>
            <p className="text-2xl font-bold text-navy-900">{project.startingPrice}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Configurations</p>
            <p className="text-sm font-semibold text-gray-700">
               {project.configurations.map(c => c.type).slice(0, 2).join(', ')}
               {project.configurations.length > 2 && '+'}
            </p>
          </div>
        </div>
        
        <button className="w-full py-3 border border-navy-900 text-navy-900 font-semibold rounded hover:bg-navy-900 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-navy-900 group-hover:text-white">
          {isLeadCaptured ? 'View Details' : 'Unlock Price & Floor Plan'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
