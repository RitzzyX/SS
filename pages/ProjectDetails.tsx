import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Check, Download, Calendar, ArrowRight, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LeadFormModal from '../components/LeadFormModal';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, isLeadCaptured } = useApp();
  const [showModal, setShowModal] = useState(false);

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    // If user lands here directly without filling form, prompt them
    if (!isLeadCaptured) {
        setShowModal(true);
    }
  }, [isLeadCaptured]);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-white min-h-screen relative">
      {/* If not captured, blur content behind modal */}
      {!isLeadCaptured && (
          <div className="fixed inset-0 z-40 bg-white/20 backdrop-blur-md flex items-center justify-center">
               <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm mx-4">
                  <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-navy-900" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">Restricted Access</h2>
                  <p className="text-gray-600 mb-6">Please provide your details to view exclusive pricing and floor plans for {project.name}.</p>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="bg-gold-500 text-white font-bold py-3 px-8 rounded hover:bg-gold-600 w-full"
                  >
                    Unlock Details
                  </button>
               </div>
          </div>
      )}

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="container mx-auto">
             <span className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                Open for Bookings
             </span>
             <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">{project.name}</h1>
             <div className="flex items-center text-xl text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                {project.location}
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
           
           {/* Description */}
           <section>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4">About Project</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
           </section>

           {/* Configurations Table */}
           <section>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Pricing & Configuration</h2>
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-navy-900 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Unit Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Carpet Area</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Price Quote</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.configurations.map((config, idx) => (
                      <tr key={idx} className="hover:bg-soft-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{config.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{config.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-navy-900">{config.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gold-600 hover:text-gold-500 font-bold text-xs uppercase border border-gold-500 px-3 py-1 rounded">
                             Enquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </section>

           {/* Amenities */}
           <section>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">World-Class Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {project.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center p-4 bg-soft-100 rounded-lg border border-gray-100">
                       <Check className="w-5 h-5 text-gold-500 mr-3" />
                       <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 space-y-6">
              <div className="bg-navy-900 text-white p-8 rounded-xl shadow-xl">
                 <h3 className="text-xl font-serif font-bold mb-2">Interested?</h3>
                 <p className="text-gray-400 text-sm mb-6">Schedule a site visit today and get a free pick-up & drop service.</p>
                 
                 <button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors">
                    <Calendar className="w-5 h-5" />
                    Book Site Visit
                 </button>
                 <button className="w-full border border-gray-600 hover:border-white hover:text-white text-gray-300 font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Download className="w-5 h-5" />
                    Download Brochure
                 </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                 <h3 className="font-bold text-navy-900 mb-4">Location Advantage</h3>
                 <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start"><ArrowRight className="w-4 h-4 text-gold-500 mr-2 mt-0.5" /> 5 Mins from Highway</li>
                    <li className="flex items-start"><ArrowRight className="w-4 h-4 text-gold-500 mr-2 mt-0.5" /> Close to International Schools</li>
                    <li className="flex items-start"><ArrowRight className="w-4 h-4 text-gold-500 mr-2 mt-0.5" /> 10 Mins from IT Park</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>

      <LeadFormModal 
        isOpen={showModal} 
        onClose={() => {
            // If they close without submitting and weren't captured, navigate back
            if (!isLeadCaptured) navigate('/projects');
            setShowModal(false);
        }}
        targetProjectId={id}
        onSuccess={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProjectDetails;
