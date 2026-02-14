import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';
import LeadFormModal from '../components/LeadFormModal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { projects, isLeadCaptured } = useApp();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    if (isLeadCaptured) {
      navigate(`/projects/${projectId}`);
    } else {
      setSelectedProject(projectId);
      setIsModalOpen(true);
    }
  };

  const handleCtaClick = () => {
     if (isLeadCaptured) {
      navigate('/projects');
    } else {
      setSelectedProject(undefined);
      setIsModalOpen(true);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-3ad19fb812a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Luxury Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 to-navy-900/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 border border-gold-500 rounded-full text-gold-500 text-sm tracking-widest uppercase mb-6 animate-fade-in">
            Exclusive Real Estate Consulting
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-white">Dream Home</span> <br />
            At The Best Price
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            We provide exclusive access to pre-launch offers, floor plans, and negotiation support for premium properties.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={handleCtaClick}
              className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold rounded-lg shadow-lg hover:shadow-gold-500/50 transition-all transform hover:-translate-y-1"
            >
              Get Best Price & Floor Plans
            </button>
            <Link 
              to="/projects"
              className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy-900 transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">Why Choose LuxeEstate?</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'RERA Registered', desc: '100% compliant and transparent dealings.' },
              { icon: TrendingUp, title: 'Best ROI', desc: 'Curated projects with high appreciation potential.' },
              { icon: Star, title: 'Zero Brokerage', desc: 'Direct channel partner deals with zero extra cost.' },
              { icon: Users, title: 'Expert Negotiation', desc: 'We help you get the lowest possible price.' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-soft-100 rounded-xl text-center hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gold-200">
                <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-soft-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-2">Featured Collections</h2>
              <div className="w-20 h-1 bg-gold-500" />
            </div>
            <Link to="/projects" className="hidden md:flex items-center text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project.id)}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/projects" className="inline-flex items-center text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        targetProjectId={selectedProject}
        onSuccess={() => {
           if(selectedProject) navigate(`/projects/${selectedProject}`);
           else navigate('/projects');
        }}
      />
    </>
  );
};

export default Home;
